import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Loader2, Send, Upload, Sparkles, ArrowLeft, ArrowRight, Eye, Calendar, 
  Clock, X, Bot, User, RefreshCw, Check, FileText, Users, Mail, Pencil,
  Wand2, ChevronRight, CheckCircle2
} from "lucide-react";
import { Link, useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Tipos de email predefinidos
const EMAIL_TYPES = [
  { 
    id: "promo", 
    icon: "🎁", 
    title: "Promoción", 
    description: "Descuentos y ofertas especiales",
    prompt: "Email promocional elegante anunciando una oferta especial de spa con descuento. Incluir botón de reserva destacado."
  },
  { 
    id: "newsletter", 
    icon: "📰", 
    title: "Newsletter", 
    description: "Novedades y actualizaciones",
    prompt: "Newsletter mensual con las últimas novedades del spa, nuevos servicios disponibles y próximos eventos."
  },
  { 
    id: "event", 
    icon: "🎉", 
    title: "Evento", 
    description: "Invitaciones y anuncios",
    prompt: "Invitación elegante a un evento especial en el spa. Incluir fecha, hora, lugar y botón de confirmación."
  },
  { 
    id: "welcome", 
    icon: "👋", 
    title: "Bienvenida", 
    description: "Para nuevos suscriptores",
    prompt: "Email de bienvenida cálido para nuevos suscriptores con beneficios exclusivos y código de descuento de bienvenida."
  },
  { 
    id: "custom", 
    icon: "✨", 
    title: "Personalizado", 
    description: "Describe tu idea",
    prompt: ""
  },
];

export default function CMSCrearNewsletter() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Step 1: Content
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  // Step 2: Design (generated)
  const [htmlContent, setHtmlContent] = useState("");
  const [generatedSubject, setGeneratedSubject] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  
  // Step 3: Recipients
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  
  // Step 4: Send
  const [subject, setSubject] = useState("");
  const [senderName, setSenderName] = useState("Newsletter Cancagua");
  const [sendOption, setSendOption] = useState<"now" | "schedule" | "draft">("draft");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Preview state
  const [showPreview, setShowPreview] = useState(false);
  
  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries
  const { data: lists, isLoading: listsLoading } = trpc.lists.getAll.useQuery();

  // Mutations
  const generateDesignMutation = trpc.newsletters.generateDesign.useMutation({
    onSuccess: (data) => {
      setHtmlContent(data.htmlContent);
      // Usar el asunto sugerido por la IA o generar uno basado en el prompt
      const suggestedSubject = data.suggestedSubject || extractSubjectFromHtml(data.htmlContent) || generateSubjectFromPrompt();
      setGeneratedSubject(suggestedSubject);
      setSubject(suggestedSubject);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "¡Diseño creado! He generado también un asunto sugerido. Puedes editarlo en el paso final o pedirme cambios aquí." },
      ]);
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error al generar diseño");
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hubo un error al generar el diseño. Por favor intenta de nuevo." },
      ]);
      setIsGenerating(false);
    },
  });

  const refineDesignMutation = trpc.newsletters.refineDesign.useMutation({
    onSuccess: (data) => {
      setHtmlContent(data.htmlContent);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Cambios aplicados. Revisa la vista previa." },
      ]);
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error al refinar diseño");
      setIsGenerating(false);
    },
  });

  const createNewsletterMutation = trpc.newsletters.create.useMutation({
    onSuccess: (data) => {
      if (isSending && data.id) {
        sendNewsletterMutation.mutate({
          newsletterId: data.id,
          listIds: selectedLists,
        });
      } else {
        toast.success("Newsletter guardado como borrador");
        navigate("/cms/newsletter");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Error al guardar newsletter");
      setIsSending(false);
    },
  });

  const sendNewsletterMutation = trpc.newsletters.send.useMutation({
    onSuccess: (data) => {
      toast.success(`Newsletter enviado a ${data.sent} destinatarios`);
      setIsSending(false);
      navigate("/cms/newsletter");
    },
    onError: (error) => {
      toast.error(error.message || "Error al enviar newsletter");
      setIsSending(false);
    },
  });

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Helper functions
  const extractSubjectFromHtml = (html: string): string => {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1] && !titleMatch[1].includes("Newsletter")) {
      return titleMatch[1];
    }
    return "";
  };

  const generateSubjectFromPrompt = (): string => {
    const type = EMAIL_TYPES.find(t => t.id === selectedType);
    if (!type) return "Newsletter de Cancagua";
    
    switch (selectedType) {
      case "promo":
        return "🎁 Oferta especial para ti - Cancagua Spa";
      case "newsletter":
        return "📰 Novedades de Cancagua - " + new Date().toLocaleDateString("es-CL", { month: "long", year: "numeric" });
      case "event":
        return "🎉 Estás invitado/a - Evento especial en Cancagua";
      case "welcome":
        return "👋 ¡Bienvenido/a a Cancagua!";
      default:
        return "Newsletter de Cancagua Spa";
    }
  };

  const getPromptForGeneration = (): string => {
    if (selectedType === "custom") {
      return customPrompt;
    }
    const type = EMAIL_TYPES.find(t => t.id === selectedType);
    return type?.prompt || customPrompt;
  };

  const handleListToggle = (listId: number) => {
    if (selectedLists.includes(listId)) {
      setSelectedLists(selectedLists.filter((id) => id !== listId));
    } else {
      setSelectedLists([...selectedLists, listId]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setUploadedImages((prev) => [...prev, dataUrl]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerateDesign = () => {
    const prompt = getPromptForGeneration();
    if (!prompt.trim()) {
      toast.error("Por favor describe el contenido del email");
      return;
    }

    setIsGenerating(true);
    setChatMessages([
      { role: "user", content: prompt },
      { role: "assistant", content: "Generando diseño con imágenes de marca..." },
    ]);

    generateDesignMutation.mutate({
      prompt,
      images: uploadedImages,
      generateImages: true,
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isGenerating) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsGenerating(true);
    setChatMessages((prev) => [...prev, { role: "assistant", content: "Aplicando cambios..." }]);
    refineDesignMutation.mutate({
      currentHtml: htmlContent,
      refinementRequest: userMessage,
    });
  };

  const handleAction = () => {
    if (!subject.trim()) {
      toast.error("Por favor ingresa un asunto");
      return;
    }

    if (!htmlContent) {
      toast.error("Por favor genera un diseño primero");
      return;
    }

    if (sendOption !== "draft" && selectedLists.length === 0) {
      toast.error("Por favor selecciona al menos una lista de destinatarios");
      return;
    }

    if (sendOption === "schedule" && (!scheduledDate || !scheduledTime)) {
      toast.error("Por favor selecciona fecha y hora para programar el envío");
      return;
    }

    if (sendOption === "now") {
      setIsSending(true);
    }

    const scheduledAt = sendOption === "schedule" 
      ? new Date(`${scheduledDate}T${scheduledTime}`) 
      : undefined;

    createNewsletterMutation.mutate({
      subject,
      senderName,
      htmlContent,
      designPrompt: getPromptForGeneration(),
      listIds: selectedLists.length > 0 ? selectedLists : [],
      scheduledAt,
    });

    if (sendOption === "schedule") {
      toast.success(`Newsletter programado para ${scheduledAt?.toLocaleString("es-CL")}`);
    }
  };

  const totalRecipients = lists
    ?.filter((list: any) => selectedLists.includes(list.id))
    .reduce((sum: number, list: any) => sum + (list.subscriberCount || 0), 0) || 0;

  const canProceedToStep = (step: number): boolean => {
    switch (step) {
      case 2: return selectedType !== null && (selectedType !== "custom" || customPrompt.trim().length > 0);
      case 3: return htmlContent.length > 0;
      case 4: return true; // Can always go to send step
      default: return true;
    }
  };

  const goToNextStep = () => {
    if (currentStep === 1 && canProceedToStep(2)) {
      handleGenerateDesign();
      setCurrentStep(2);
    } else if (currentStep < totalSteps && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Verificar permisos
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#44580E]" />
      </div>
    );
  }

  if (!user || (user.role !== "admin" && user.role !== "editor")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
            <CardDescription>No tienes permisos para crear newsletters.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/cms">Volver al Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step indicators
  const steps = [
    { number: 1, title: "Contenido", icon: FileText },
    { number: 2, title: "Diseño", icon: Wand2 },
    { number: 3, title: "Destinatarios", icon: Users },
    { number: 4, title: "Enviar", icon: Send },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cms/newsletter">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crear Newsletter</h1>
            <p className="text-gray-500">Crea tu email en 4 simples pasos</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep > step.number 
                        ? "bg-green-500 text-white" 
                        : currentStep === step.number 
                          ? "bg-[#44580E] text-white shadow-lg scale-110" 
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    currentStep >= step.number ? "text-gray-900" : "text-gray-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[500px]">
          {/* Step 1: Content */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">¿Qué tipo de email quieres crear?</h2>
                <p className="text-gray-500">Selecciona una plantilla o describe tu idea</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {EMAIL_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                      selectedType === type.id 
                        ? "border-[#44580E] bg-[#44580E]/5 shadow-md" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-4xl mb-3 block">{type.icon}</span>
                    <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </button>
                ))}
              </div>

              {selectedType === "custom" && (
                <Card className="mt-6">
                  <CardContent className="pt-6">
                    <Label htmlFor="customPrompt" className="text-base font-medium">
                      Describe tu email
                    </Label>
                    <Textarea
                      id="customPrompt"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Ejemplo: Quiero un email elegante anunciando un 20% de descuento en masajes para el mes de febrero, con colores relajantes y un botón de reserva destacado..."
                      className="mt-2 min-h-[120px]"
                    />
                  </CardContent>
                </Card>
              )}

              {/* Optional: Upload images */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Imágenes adicionales (opcional)</CardTitle>
                  <CardDescription>Sube imágenes que quieras incluir en el diseño</CardDescription>
                </CardHeader>
                <CardContent>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  
                  {uploadedImages.length > 0 && (
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Imagen ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imágenes
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Design */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat/Refinement */}
              <Card className="h-[500px] flex flex-col">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#44580E]/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-[#44580E]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Asistente de Diseño</CardTitle>
                      <CardDescription>Pide cambios o mejoras</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea className="h-[350px] p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          {msg.role === "assistant" && (
                            <div className="p-2 bg-[#44580E]/10 rounded-full h-fit">
                              <Bot className="w-4 h-4 text-[#44580E]" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.role === "user"
                                ? "bg-[#44580E] text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            {msg.content}
                          </div>
                          {msg.role === "user" && (
                            <div className="p-2 bg-gray-100 rounded-full h-fit">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                          )}
                        </div>
                      ))}
                      {isGenerating && (
                        <div className="flex gap-3">
                          <div className="p-2 bg-[#44580E]/10 rounded-full h-fit">
                            <Loader2 className="w-4 h-4 text-[#44580E] animate-spin" />
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="border-t p-4">
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ej: Cambia el color del botón a verde..."
                        disabled={isGenerating}
                      />
                      <Button
                        type="submit"
                        disabled={isGenerating || !chatInput.trim()}
                        className="bg-[#44580E] hover:bg-[#3a4c0c]"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="h-[500px] flex flex-col">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Vista Previa</CardTitle>
                        <CardDescription>Así se verá tu email</CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setChatMessages([]);
                        setHtmlContent("");
                        handleGenerateDesign();
                      }}
                      disabled={isGenerating}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                      Regenerar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  {htmlContent ? (
                    <iframe
                      srcDoc={htmlContent}
                      className="w-full h-full border-0"
                      title="Vista previa del newsletter"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-4" />
                      <p>Generando diseño...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Recipients */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">¿A quién quieres enviar?</h2>
                <p className="text-gray-500">Selecciona las listas de destinatarios</p>
              </div>

              {listsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#44580E]" />
                </div>
              ) : !lists || lists.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No hay listas creadas</h3>
                    <p className="text-gray-500 mb-4">Crea una lista de suscriptores primero</p>
                    <Button asChild>
                      <Link href="/cms/listas">Crear Lista</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {lists.map((list: any) => (
                    <div
                      key={list.id}
                      onClick={() => handleListToggle(list.id)}
                      className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedLists.includes(list.id)
                          ? "border-[#44580E] bg-[#44580E]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedLists.includes(list.id) ? "bg-[#44580E] text-white" : "bg-gray-100"
                        }`}>
                          {selectedLists.includes(list.id) ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Users className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{list.name}</h3>
                          {list.description && (
                            <p className="text-sm text-gray-500">{list.description}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-base px-3 py-1">
                        {list.subscriberCount || 0} suscriptores
                      </Badge>
                    </div>
                  ))}

                  {selectedLists.length > 0 && (
                    <div className="bg-[#44580E]/10 rounded-xl p-4 mt-6">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#44580E]">Total de destinatarios</span>
                        <span className="text-2xl font-bold text-[#44580E]">{totalRecipients}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Send */}
          {currentStep === 4 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Últimos detalles</h2>
                <p className="text-gray-500">Revisa y envía tu newsletter</p>
              </div>

              {/* Subject */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Asunto del Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Asunto del email"
                      className="pr-10 text-lg"
                    />
                    <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  {generatedSubject && subject !== generatedSubject && (
                    <p className="text-xs text-gray-500 mt-2">
                      Sugerido por IA: "{generatedSubject}"
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Sender Name */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre del Remitente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ej: Newsletter Cancagua"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Este nombre aparecerá como remitente del email
                  </p>
                </CardContent>
              </Card>

              {/* Send Options */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">¿Qué quieres hacer?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label 
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      sendOption === "draft" ? "border-[#44580E] bg-[#44580E]/5" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sendOption"
                      value="draft"
                      checked={sendOption === "draft"}
                      onChange={() => setSendOption("draft")}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      sendOption === "draft" ? "bg-[#44580E] text-white" : "bg-gray-100"
                    }`}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Guardar como borrador</p>
                      <p className="text-sm text-gray-500">Guarda para editar más tarde</p>
                    </div>
                  </label>

                  <label 
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      sendOption === "now" ? "border-[#44580E] bg-[#44580E]/5" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sendOption"
                      value="now"
                      checked={sendOption === "now"}
                      onChange={() => setSendOption("now")}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      sendOption === "now" ? "bg-[#44580E] text-white" : "bg-gray-100"
                    }`}>
                      <Send className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Enviar ahora</p>
                      <p className="text-sm text-gray-500">
                        Enviar inmediatamente a {totalRecipients} destinatarios
                      </p>
                    </div>
                  </label>

                  <label 
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      sendOption === "schedule" ? "border-[#44580E] bg-[#44580E]/5" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sendOption"
                      value="schedule"
                      checked={sendOption === "schedule"}
                      onChange={() => setSendOption("schedule")}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      sendOption === "schedule" ? "bg-[#44580E] text-white" : "bg-gray-100"
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Programar envío</p>
                      <p className="text-sm text-gray-500">Elige fecha y hora</p>
                    </div>
                  </label>

                  {sendOption === "schedule" && (
                    <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl ml-14">
                      <div>
                        <Label htmlFor="scheduledDate">Fecha</Label>
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="scheduledTime">Hora</Label>
                        <Input
                          id="scheduledTime"
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Preview Button */}
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Vista Previa del Email
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={goToPrevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={goToNextStep}
              disabled={!canProceedToStep(currentStep + 1) || isGenerating}
              className="bg-[#44580E] hover:bg-[#3a4c0c]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleAction}
              disabled={createNewsletterMutation.isPending || isSending}
              className="bg-[#44580E] hover:bg-[#3a4c0c] px-8"
            >
              {isSending || createNewsletterMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {sendOption === "now" ? "Enviando..." : "Guardando..."}
                </>
              ) : (
                <>
                  {sendOption === "now" && <Send className="w-4 h-4 mr-2" />}
                  {sendOption === "schedule" && <Calendar className="w-4 h-4 mr-2" />}
                  {sendOption === "draft" && <Clock className="w-4 h-4 mr-2" />}
                  {sendOption === "now" ? "Enviar Ahora" : sendOption === "schedule" ? "Programar Envío" : "Guardar Borrador"}
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Vista Previa del Email</DialogTitle>
            <DialogDescription>
              Asunto: {subject || "(sin asunto)"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto border rounded-lg bg-white">
            {htmlContent ? (
              <iframe
                srcDoc={htmlContent}
                className="w-full h-[500px] border-0"
                title="Vista previa del newsletter"
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No hay contenido para mostrar
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
