import { GoogleGenerativeAI, Content, Part, GenerateContentResult } from "@google/generative-ai";

export type Role = "system" | "user" | "assistant" | "tool" | "function" | "model";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4";
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

// Get Gemini API key from environment
function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return apiKey;
}

// Convert OpenAI-style messages to Gemini format
function convertMessagesToGemini(messages: Message[]): { systemInstruction?: string; contents: Content[] } {
  let systemInstruction: string | undefined;
  const contents: Content[] = [];

  for (const msg of messages) {
    // Extract system message as system instruction
    if (msg.role === "system") {
      const content = Array.isArray(msg.content) ? msg.content : [msg.content];
      systemInstruction = content
        .map(c => (typeof c === "string" ? c : c.type === "text" ? c.text : ""))
        .join("\n");
      continue;
    }

    // Convert role
    const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";

    // Convert content to parts
    const parts: Part[] = [];
    const contentArray = Array.isArray(msg.content) ? msg.content : [msg.content];

    for (const content of contentArray) {
      if (typeof content === "string") {
        parts.push({ text: content });
      } else if (content.type === "text") {
        parts.push({ text: content.text });
      } else if (content.type === "image_url") {
        // For image URLs, we need to fetch and convert to inline data
        // For now, include as text reference (Gemini supports inline data)
        const url = content.image_url.url;
        if (url.startsWith("data:")) {
          // Handle base64 data URLs
          const matches = url.match(/^data:([^;]+);base64,(.+)$/);
          if (matches) {
            parts.push({
              inlineData: {
                mimeType: matches[1],
                data: matches[2],
              },
            });
          }
        } else {
          // For regular URLs, include as text (Gemini 1.5+ supports URLs directly in some cases)
          parts.push({ text: `[Image: ${url}]` });
        }
      } else if (content.type === "file_url") {
        parts.push({ text: `[File: ${content.file_url.url}]` });
      }
    }

    if (parts.length > 0) {
      contents.push({ role, parts });
    }
  }

  return { systemInstruction, contents };
}

// Convert Gemini tools to function declarations
function convertToolsToGemini(tools?: Tool[]) {
  if (!tools || tools.length === 0) return undefined;

  return [{
    functionDeclarations: tools.map(tool => ({
      name: tool.function.name,
      description: tool.function.description || "",
      parameters: tool.function.parameters || { type: "object", properties: {} },
    })),
  }];
}

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  const apiKey = getGeminiApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);

  const {
    messages,
    tools,
    maxTokens,
    max_tokens,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
  } = params;

  // Determine model - use gemini-2.0-flash as default
  const modelName = "gemini-2.0-flash";

  // Convert messages to Gemini format
  const { systemInstruction, contents } = convertMessagesToGemini(messages);

  // Build generation config
  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: maxTokens || max_tokens || 8192,
  };

  // Handle response format for JSON
  const format = responseFormat || response_format;
  const schema = outputSchema || output_schema;
  
  if (format?.type === "json_object" || format?.type === "json_schema" || schema) {
    generationConfig.responseMimeType = "application/json";
    
    if (format?.type === "json_schema" && format.json_schema?.schema) {
      generationConfig.responseSchema = format.json_schema.schema;
    } else if (schema?.schema) {
      generationConfig.responseSchema = schema.schema;
    }
  }

  // Create model with configuration
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction,
    generationConfig,
    tools: convertToolsToGemini(tools),
  });

  try {
    // Generate content
    const result: GenerateContentResult = await model.generateContent({
      contents,
    });

    const response = result.response;
    const candidate = response.candidates?.[0];
    
    if (!candidate) {
      throw new Error("No response candidate from Gemini");
    }

    // Extract text content
    let textContent = "";
    const toolCalls: ToolCall[] = [];

    for (const part of candidate.content?.parts || []) {
      if ("text" in part && part.text) {
        textContent += part.text;
      }
      if ("functionCall" in part && part.functionCall) {
        toolCalls.push({
          id: `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: "function",
          function: {
            name: part.functionCall.name,
            arguments: JSON.stringify(part.functionCall.args || {}),
          },
        });
      }
    }

    // Build OpenAI-compatible response
    const invokeResult: InvokeResult = {
      id: `gemini-${Date.now()}`,
      created: Math.floor(Date.now() / 1000),
      model: modelName,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: textContent,
            ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
          },
          finish_reason: candidate.finishReason || "stop",
        },
      ],
      usage: response.usageMetadata
        ? {
            prompt_tokens: response.usageMetadata.promptTokenCount || 0,
            completion_tokens: response.usageMetadata.candidatesTokenCount || 0,
            total_tokens: response.usageMetadata.totalTokenCount || 0,
          }
        : undefined,
    };

    return invokeResult;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Gemini LLM invoke failed: ${message}`);
  }
}
