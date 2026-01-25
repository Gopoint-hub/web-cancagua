import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    TrendingUp, TrendingDown, DollarSign, Target,
    Calendar as CalendarIcon, Plus, Trash2, ExternalLink
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const CHANNELS = [
    { id: "seo", name: "SEO / Google Organic", color: "#4ade80" },
    { id: "facebook_organic", name: "Facebook Organic", color: "#3b82f6" },
    { id: "instagram_organic", name: "Instagram Organic", color: "#ec4899" },
    { id: "tiktok_organic", name: "TikTok Organic", color: "#000000" },
    { id: "facebook_ads", name: "Meta Ads (Facebook)", color: "#1d4ed8" },
    { id: "instagram_ads", name: "Meta Ads (Instagram)", color: "#be185d" },
    { id: "google_ads", name: "Google Ads", color: "#f59e0b" },
    { id: "tiktok_ads", name: "TikTok Ads", color: "#ff0050" },
    { id: "other", name: "Otros / Directo", color: "#94a3b8" },
];

export default function CMSMarketingROI() {
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primer día del mes
        end: new Date(),
    });

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newInvestment, setNewInvestment] = useState({
        channel: "facebook_ads",
        amount: 0,
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
        description: "",
    });

    const { data: report, refetch: refetchReport } = trpc.marketing.getROIReport.useQuery({
        startDate: dateRange.start,
        endDate: dateRange.end,
    });

    const { data: investments, refetch: refetchInvestments } = trpc.marketing.getAllInvestments.useQuery();

    const createInvestment = trpc.marketing.createInvestment.useMutation({
        onSuccess: () => {
            toast.success("Inversión registrada correctamente");
            refetchInvestments();
            refetchReport();
            setIsAddDialogOpen(false);
        },
    });

    const deleteInvestment = trpc.marketing.deleteInvestment.useMutation({
        onSuccess: () => {
            toast.success("Inversión eliminada");
            refetchInvestments();
            refetchReport();
        },
    });

    const handleCreateInvestment = () => {
        if (newInvestment.amount <= 0) {
            toast.error("El monto debe ser mayor a 0");
            return;
        }
        createInvestment.mutate({
            ...newInvestment,
            channel: newInvestment.channel as "seo" | "facebook_organic" | "instagram_organic" | "tiktok_organic" | "facebook_ads" | "instagram_ads" | "google_ads" | "tiktok_ads" | "other",
            startDate: new Date(newInvestment.startDate),
            endDate: new Date(newInvestment.endDate),
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    const getChannelName = (id: string) => CHANNELS.find(c => c.id === id)?.name || id;

    const chartData = report?.channels.map(ch => ({
        name: getChannelName(ch.name),
        Inversión: ch.investment,
        Ingresos: ch.revenue,
        originalName: ch.name
    })) || [];

    const pieData = report?.channels.filter(ch => ch.revenue > 0).map(ch => ({
        name: getChannelName(ch.name),
        value: ch.revenue,
        color: CHANNELS.find(c => c.id === ch.name)?.color || "#CBD5E1"
    })) || [];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">ROI de Marketing</h1>
                        <p className="text-muted-foreground">
                            Conciliación de inversión publicitaria vs ingresos reales de Skedu.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-primary text-white hover:bg-primary/90">
                                    <Plus className="mr-2 h-4 w-4" /> Registrar Inversión
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Registrar Gasto de Marketing</DialogTitle>
                                    <DialogDescription>
                                        Ingresa el monto gastado en una plataforma específica para calcular el ROI.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="channel" className="text-right">Canal</Label>
                                        <div className="col-span-3">
                                            <Select
                                                value={newInvestment.channel}
                                                onValueChange={(v) => setNewInvestment({ ...newInvestment, channel: v })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona el canal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CHANNELS.map(c => (
                                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="amount" className="text-right">Monto ($)</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            className="col-span-3"
                                            value={newInvestment.amount}
                                            onChange={(e) => setNewInvestment({ ...newInvestment, amount: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="start" className="text-right">Desde</Label>
                                        <Input
                                            id="start"
                                            type="date"
                                            className="col-span-3"
                                            value={newInvestment.startDate}
                                            onChange={(e) => setNewInvestment({ ...newInvestment, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="end" className="text-right">Hasta</Label>
                                        <Input
                                            id="end"
                                            type="date"
                                            className="col-span-3"
                                            value={newInvestment.endDate}
                                            onChange={(e) => setNewInvestment({ ...newInvestment, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                                    <Button onClick={handleCreateInvestment} disabled={createInvestment.isPending}>
                                        {createInvestment.isPending ? "Guardando..." : "Guardar Inversión"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Resumen de Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-slate-50 border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-slate-500">Inversión Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(report?.totals.investment || 0)}</div>
                            <div className="flex items-center text-xs text-slate-500 mt-1">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                {format(dateRange.start, "dd MMM")} - {format(dateRange.end, "dd MMM, yyyy")}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-none shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-blue-600">Ingresos Totales (Skedu)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-700">{formatCurrency(report?.totals.revenue || 0)}</div>
                            <p className="text-xs text-blue-600/70 mt-1">Sólo ventas confirmadas con atribución</p>
                        </CardContent>
                    </Card>

                    <Card className={`${(report?.totals.roi || 0) >= 0 ? 'bg-emerald-50' : 'bg-rose-50'} border-none shadow-sm`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-slate-500">ROI Global</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${(report?.totals.roi || 0) >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {(report?.totals.roi || 0) * 100 > 0 ? '+' : ''}{((report?.totals.roi || 0) * 100).toFixed(1)}%
                            </div>
                            <div className="flex items-center text-xs mt-1">
                                {(report?.totals.roi || 0) >= 0 ? (
                                    <TrendingUp className="mr-1 h-3 w-3 text-emerald-600" />
                                ) : (
                                    <TrendingDown className="mr-1 h-3 w-3 text-rose-600" />
                                )}
                                Retorno sobre la inversión
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-none shadow-sm text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-slate-400">Eficiencia</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {report?.totals.investment ? (report.totals.revenue / report.totals.investment).toFixed(2) : '0'}x
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Pesos ingresados por cada $1 invertido</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inversión vs Ingresos por Canal</CardTitle>
                            <CardDescription>Comparativa directa del rendimiento</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" fontSize={10} angle={-15} textAnchor="end" height={60} />
                                    <YAxis fontSize={10} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Inversión" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Ingresos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Distribución de Ingresos</CardTitle>
                            <CardDescription>Canales que más dinero real generan</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px] flex items-center justify-center">
                            {pieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} fontSize={10} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-muted-foreground text-sm italic">Sin datos de ingresos suficientes</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Tabla Detallada */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detalle por Canal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Canal</TableHead>
                                    <TableHead className="text-right">Ventas (Cant)</TableHead>
                                    <TableHead className="text-right">Inversión</TableHead>
                                    <TableHead className="text-right">Ingresos</TableHead>
                                    <TableHead className="text-right">ROI</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {report?.channels.map((ch) => (
                                    <TableRow key={ch.name}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHANNELS.find(c => c.id === ch.name)?.color || '#ccc' }}></div>
                                            {getChannelName(ch.name)}
                                        </TableCell>
                                        <TableCell className="text-right">{ch.count}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(ch.investment)}</TableCell>
                                        <TableCell className="text-right font-semibold">{formatCurrency(ch.revenue)}</TableCell>
                                        <TableCell className={`text-right font-bold ${ch.roi >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {(ch.roi * 100).toFixed(1)}%
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Listado de Inversiones Registradas */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Inversiones Externas Registradas</CardTitle>
                            <CardDescription>Gastos manuales ingresados para conciliación</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Canal</TableHead>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead className="text-right">Monto</TableHead>
                                        <TableHead className="w-[100px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {investments?.map((inv: any) => (
                                        <TableRow key={inv.id}>
                                            <TableCell className="text-slate-500 font-mono text-xs">
                                                {format(new Date(inv.startDate), "dd/MM/yy")}
                                            </TableCell>
                                            <TableCell className="font-medium">{getChannelName(inv.channel)}</TableCell>
                                            <TableCell className="text-muted-foreground italic text-sm">
                                                {inv.description || "-"}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">{formatCurrency(inv.amount)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                                                    onClick={() => {
                                                        if (confirm("¿Eliminar este registro?")) {
                                                            deleteInvestment.mutate({ id: inv.id });
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {!investments || investments.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground h-24">
                                                Aún no hay inversiones registradas. Usa el botón superior para empezar.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
