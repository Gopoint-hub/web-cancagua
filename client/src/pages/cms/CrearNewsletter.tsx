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
import { toast } from "sonner";
import { Loader2, Send, Upload, Image as ImageIcon, Sparkles, ArrowLeft, Eye, Calendar, Clock, X, Bot, User, RefreshCw } from "lucide-react";
import { Link, useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function CMSCrearNewsletter() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // Form state
  const [subject, setSubject] = useState("");
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  const [designPrompt, setDesignPrompt] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState("");
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Preview state
  const [showPreview, setShowPreview] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  
  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Queries
  const { data: lists, isLoading: listsLoading } = trpc.lists.getAll.useQuery();

  // Mutations
  const generateDesignMutation = trpc.newsletters.generateDesign.useMutation({
    onSuccess: (data) => {
      setHtmlContent(data.htmlContent);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "¡Listo! He generado el diseño del email. Puedes verlo en la vista previa o pedirme que haga cambios." },
      ]);
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error al generar diseño");
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, hubo un error al generar el diseño. Por favor intenta de nuevo." },
      ]);
      setIsGenerating(false);
    },
  });

  const refineDesignMutation = trpc.newsletters.refineDesign.useMutation({
    onSuccess: (data) => {
      setHtmlContent(data.htmlContent);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "He aplicado los cambios solicitados. Revisa la vista previa para ver el resultado." },
      ]);
      setIsGenerating(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error al refinar diseño");
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, hubo un error al aplicar los cambios. Por favor intenta de nuevo." },
      ]);
      setIsGenerating(false);
    },
  });

  const createNewsletterMutation = trpc.newsletters.create.useMutation({
    onSuccess: () => {
      toast.success("Newsletter guardado correctamente");
      navigate("/cms/newsletter");
    },
    onError: (error) => {
      toast.error(error.message || "Error al guardar newsletter");
    },
  });

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
            <CardDescription>
              No tienes permisos para crear newsletters.
            </CardDescription>
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

    // Por ahora solo guardamos las URLs de las imágenes
    // En producción, subirías a S3 y guardarías las URLs
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
    if (!designPrompt.trim()) {
      toast.error("Por favor describe el contenido del email");
      return;
    }

    setIsGenerating(true);
    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: designPrompt },
      { role: "assistant", content: "Generando diseño..." },
    ]);

    generateDesignMutation.mutate({
      prompt: designPrompt,
      images: uploadedImages,
    });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isGenerating) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    if (!htmlContent) {
      // Si no hay diseño, generar uno nuevo
      setIsGenerating(true);
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Generando diseño..." }]);
      generateDesignMutation.mutate({
        prompt: userMessage,
        images: uploadedImages,
      });
    } else {
      // Si ya hay diseño, refinarlo
      setIsGenerating(true);
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Aplicando cambios..." }]);
      refineDesignMutation.mutate({
        currentHtml: htmlContent,
        refinementRequest: userMessage,
      });
    }
  };

  const handleSave = (status: "draft" | "scheduled") => {
    if (!subject.trim()) {
      toast.error("Por favor ingresa un asunto");
      return;
    }

    if (!htmlContent) {
      toast.error("Por favor genera un diseño primero");
      return;
    }

    if (selectedLists.length === 0) {
      toast.error("Por favor selecciona al menos una lista de destinatarios");
      return;
    }

    createNewsletterMutation.mutate({
      subject,
      htmlContent,
      designPrompt,
      listIds: selectedLists,
    });
  };

  const totalRecipients = lists
    ?.filter((list: any) => selectedLists.includes(list.id))
    .reduce((sum: number, list: any) => sum + (list.subscriberCount || 0), 0) || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cms/newsletter">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crear Newsletter</h1>
            <p className="text-gray-500">Diseña tu email con ayuda de IA</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Subject */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Asunto del Email *</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ej: ¡Nuevas ofertas de spa para ti!"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lists */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Destinatarios</CardTitle>
                <CardDescription>
                  Selecciona las listas a las que enviar el newsletter
                </CardDescription>
              </CardHeader>
              <CardContent>
                {listsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : !lists || lists.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    <p>No hay listas creadas</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link href="/cms/listas">Crear una lista</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lists.map((list: any) => (
                      <div
                        key={list.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedLists.includes(list.id)
                            ? "border-[#44580E] bg-[#44580E]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleListToggle(list.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedLists.includes(list.id)}
                            onCheckedChange={() => handleListToggle(list.id)}
                          />
                          <div>
                            <p className="font-medium">{list.name}</p>
                            {list.description && (
                              <p className="text-sm text-gray-500">{list.description}</p>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {list.subscriberCount || 0} suscriptores
                        </span>
                      </div>
                    ))}
                    {selectedLists.length > 0 && (
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium text-[#44580E]">
                          Total: {totalRecipients} destinatarios
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imágenes</CardTitle>
                <CardDescription>
                  Sube imágenes para incluir en el diseño (opcional)
                </CardDescription>
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
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Imágenes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Chat */}
          <div className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#44580E]/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-[#44580E]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Asistente de Diseño</CardTitle>
                    <CardDescription>
                      Describe el email que quieres crear
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                      <Bot className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">
                        ¿Qué tipo de email quieres crear?
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Describe el contenido, estilo y propósito del email. Puedo ayudarte a crear:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <button
                          onClick={() => setDesignPrompt("Email promocional con oferta especial de spa, descuento del 20% en masajes")}
                          className="p-2 border rounded-lg hover:bg-gray-50 text-left"
                        >
                          📢 Promoción
                        </button>
                        <button
                          onClick={() => setDesignPrompt("Newsletter mensual con novedades del spa, nuevos servicios y eventos")}
                          className="p-2 border rounded-lg hover:bg-gray-50 text-left"
                        >
                          📰 Newsletter
                        </button>
                        <button
                          onClick={() => setDesignPrompt("Invitación a evento especial de yoga y meditación al amanecer")}
                          className="p-2 border rounded-lg hover:bg-gray-50 text-left"
                        >
                          🎉 Evento
                        </button>
                        <button
                          onClick={() => setDesignPrompt("Email de bienvenida para nuevos suscriptores con beneficios exclusivos")}
                          className="p-2 border rounded-lg hover:bg-gray-50 text-left"
                        >
                          👋 Bienvenida
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex gap-3 ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
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
                      <div ref={chatEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  {chatMessages.length === 0 ? (
                    <div className="space-y-3">
                      <Textarea
                        value={designPrompt}
                        onChange={(e) => setDesignPrompt(e.target.value)}
                        placeholder="Describe el email que quieres crear. Por ejemplo: 'Quiero un email promocional elegante para anunciar un 20% de descuento en masajes, con colores relajantes y un botón de reserva'"
                        className="min-h-[100px]"
                      />
                      <Button
                        onClick={handleGenerateDesign}
                        disabled={isGenerating || !designPrompt.trim()}
                        className="w-full bg-[#44580E] hover:bg-[#3a4c0c]"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generar Diseño con IA
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Escribe cambios o mejoras..."
                        disabled={isGenerating}
                      />
                      <Button
                        type="submit"
                        disabled={isGenerating || !chatInput.trim()}
                        className="bg-[#44580E] hover:bg-[#3a4c0c]"
                      >
                        {isGenerating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                disabled={!htmlContent}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                Vista Previa
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={createNewsletterMutation.isPending || !htmlContent}
                className="flex-1"
              >
                Guardar Borrador
              </Button>
              <Button
                onClick={() => setShowSchedule(true)}
                disabled={!htmlContent || selectedLists.length === 0}
                className="flex-1 bg-[#44580E] hover:bg-[#3a4c0c]"
              >
                <Send className="w-4 h-4 mr-2" />
                Programar Envío
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Vista Previa del Email</DialogTitle>
            <DialogDescription>
              Así se verá el email en el cliente de correo
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
            <Button
              onClick={() => {
                setChatMessages([]);
                setHtmlContent("");
                setShowPreview(false);
              }}
              variant="outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programar Envío</DialogTitle>
            <DialogDescription>
              Selecciona cuándo enviar el newsletter a {totalRecipients} destinatarios
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="scheduleDate">Fecha</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="scheduleDate"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="scheduleTime">Hora</Label>
              <div className="relative mt-1">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="scheduleTime"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSchedule(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => handleSave("scheduled")}
              disabled={createNewsletterMutation.isPending}
              className="bg-[#44580E] hover:bg-[#3a4c0c]"
            >
              {createNewsletterMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Programar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
