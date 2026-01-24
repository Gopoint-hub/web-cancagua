/**
 * Image generation helper
 * 
 * Note: Gemini's image generation (Imagen) requires specific API access.
 * This implementation provides a placeholder that can be extended when
 * Imagen API access is available, or you can integrate with other services
 * like DALL-E, Stable Diffusion, etc.
 *
 * Example usage:
 *   const { url: imageUrl } = await generateImage({
 *     prompt: "A serene landscape with mountains"
 *   });
 */
import { storagePut } from "../storage";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
  error?: string;
};

/**
 * Generate an image from a text prompt
 * 
 * Current implementation options:
 * 1. Use GEMINI_IMAGE_API_KEY for Google's Imagen API (when available)
 * 2. Use OPENAI_API_KEY for DALL-E
 * 3. Return a placeholder if no image generation service is configured
 */
export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  // Check for OpenAI DALL-E configuration
  const openaiApiKey = process.env.OPENAI_IMAGE_API_KEY || process.env.OPENAI_API_KEY;
  
  if (openaiApiKey) {
    return generateWithDallE(options, openaiApiKey);
  }
  
  // If no image generation service is configured, return an error
  console.warn("[ImageGeneration] No image generation service configured. Set OPENAI_API_KEY or OPENAI_IMAGE_API_KEY for DALL-E.");
  
  return {
    error: "Image generation service not configured. Please set up an image generation API.",
  };
}

/**
 * Generate image using OpenAI DALL-E
 */
async function generateWithDallE(
  options: GenerateImageOptions,
  apiKey: string
): Promise<GenerateImageResponse> {
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: options.prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`DALL-E request failed (${response.status}): ${errorText}`);
    }

    const result = await response.json() as {
      data: Array<{ b64_json: string }>;
    };

    if (!result.data?.[0]?.b64_json) {
      throw new Error("No image data in DALL-E response");
    }

    const base64Data = result.data[0].b64_json;
    const buffer = Buffer.from(base64Data, "base64");

    // Save to Cloudinary
    const { url } = await storagePut(
      `generated/${Date.now()}.png`,
      buffer,
      "image/png"
    );

    return { url };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[ImageGeneration] DALL-E error:", message);
    return { error: message };
  }
}

/**
 * Edit an existing image (placeholder for future implementation)
 * This would require integration with an image editing API
 */
export async function editImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  if (!options.originalImages?.length) {
    return generateImage(options);
  }
  
  // For now, just generate a new image based on the prompt
  // Future: Implement actual image editing with inpainting/outpainting
  console.warn("[ImageGeneration] Image editing not fully implemented, generating new image instead");
  return generateImage(options);
}
