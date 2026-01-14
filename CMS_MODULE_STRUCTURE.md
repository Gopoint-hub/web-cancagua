# Estructura Estándar para Módulos del CMS

Este documento define la estructura estándar que deben seguir todos los módulos del CMS de Cancagua para mantener consistencia en la interfaz de usuario y experiencia del usuario.

## Requisitos Obligatorios

### 1. Uso de DashboardLayout

**TODOS** los módulos del CMS deben estar envueltos en el componente `DashboardLayout`. Este componente proporciona:

- Menú lateral de navegación consistente
- Header con información del usuario
- Estructura de layout responsive
- Manejo de autenticación

### 2. Estructura Básica de un Módulo

```tsx
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
// ... otros imports necesarios

export default function MiModuloCMS() {
  // 1. Estados del componente
  const [miEstado, setMiEstado] = useState<any>(null);

  // 2. Queries tRPC
  const { data, isLoading, refetch } = trpc.miRouter.miQuery.useQuery();

  // 3. Mutations tRPC
  const miMutation = trpc.miRouter.miMutation.useMutation({
    onSuccess: () => {
      toast.success("Operación exitosa");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Error en la operación");
    },
  });

  // 4. Funciones auxiliares
  const miFuncion = () => {
    // lógica
  };

  // 5. Return con DashboardLayout
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Contenido del módulo */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Título del Módulo</h1>
              <p className="text-gray-600 mt-1">
                Descripción breve del módulo
              </p>
            </div>
            <div className="flex gap-2">
              {/* Botones de acción principales */}
            </div>
          </div>

          {/* Contenido principal */}
          {/* ... */}
        </div>
      </div>
    </DashboardLayout>
  );
}
```

### 3. Convenciones de Nomenclatura

- **Archivos**: PascalCase, ejemplo: `ProductosCorporativos.tsx`
- **Componentes**: PascalCase, ejemplo: `CMSProductosCorporativos`
- **Rutas**: kebab-case, ejemplo: `/cms/productos-corporativos`

### 4. Estructura de Directorios

```
client/src/pages/cms/
├── Dashboard.tsx          # Página principal del CMS
├── Carta.tsx             # Gestión de carta del restaurant
├── Reservas.tsx          # Gestión de reservas
├── Mensajes.tsx          # Gestión de mensajes de contacto
├── Usuarios.tsx          # Gestión de usuarios
├── ProductosCorporativos.tsx  # Catálogo de productos corporativos
├── Cotizaciones.tsx      # CRM de cotizaciones
└── CrearCotizacion.tsx   # Creación de cotizaciones
```

### 5. Registro de Rutas

Todos los módulos del CMS deben registrarse en `client/src/App.tsx`:

```tsx
// Importar el módulo
import MiModuloCMS from "@/pages/cms/MiModulo";

// Agregar la ruta dentro del componente App
<Route path="/cms/mi-modulo" component={MiModuloCMS} />
```

### 6. Actualización del Menú Lateral

Para agregar un nuevo módulo al menú lateral, actualizar el componente `Dashboard.tsx`:

```tsx
// En la sección del sidebar, agregar un nuevo item:
<Link href="/cms/mi-modulo">
  <a className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
    location === "/cms/mi-modulo" ? "bg-accent" : ""
  }`}>
    <MiIcono className="h-4 w-4" />
    Mi Módulo
  </a>
</Link>
```

## Módulos Existentes

### Módulos Públicos
- **Dashboard** (`/cms`) - Vista general del CMS
- **Servicios** - Gestión de servicios (biopiscinas, eventos)
- **Carta** (`/cms/carta`) - Gestión de carta del restaurant
- **Reservas** (`/cms/reservas`) - Gestión de reservas de clientes
- **Mensajes** (`/cms/mensajes`) - Gestión de mensajes de contacto
- **Usuarios** (`/cms/usuarios`) - Gestión de usuarios del sistema

### Módulos Corporativos
- **Productos Corporativos** (`/cms/productos-corporativos`) - Catálogo de productos para eventos
- **Cotizaciones** (`/cms/cotizaciones`) - CRM de cotizaciones corporativas
- **Crear Cotización** (`/cms/crear-cotizacion`) - Generador de cotizaciones

## Componentes Reutilizables

### UI Components (shadcn/ui)
- `Button` - Botones con variantes
- `Card` - Tarjetas de contenido
- `Dialog` - Modales
- `Table` - Tablas de datos
- `Badge` - Etiquetas de estado
- `Input`, `Textarea`, `Select` - Formularios
- `Tabs` - Pestañas de navegación

### Hooks Personalizados
- `useAuth()` - Autenticación del usuario actual
- `trpc.*` - Queries y mutations del backend

### Utilidades
- `toast` (de sonner) - Notificaciones toast
- `formatPrice()` - Formateo de precios
- `formatDate()` - Formateo de fechas

## Mejores Prácticas

1. **Siempre usar DashboardLayout** - No crear layouts personalizados
2. **Manejo de errores** - Usar toast para feedback al usuario
3. **Loading states** - Mostrar spinners durante operaciones async
4. **Responsive design** - Usar clases de Tailwind para mobile-first
5. **Accesibilidad** - Usar componentes de shadcn/ui que ya incluyen ARIA
6. **Validación** - Validar inputs antes de enviar al backend
7. **Confirmaciones** - Pedir confirmación para operaciones destructivas

## Checklist para Nuevos Módulos

- [ ] Componente envuelto en `DashboardLayout`
- [ ] Ruta registrada en `App.tsx`
- [ ] Enlace agregado al menú lateral en `Dashboard.tsx`
- [ ] Queries y mutations tRPC implementadas
- [ ] Manejo de estados de loading y error
- [ ] Toast notifications para feedback
- [ ] Responsive design verificado
- [ ] Tests escritos para funcionalidades críticas
- [ ] Documentación actualizada en este archivo

## Soporte

Para dudas o problemas con la estructura del CMS, consultar:
- Documentación de shadcn/ui: https://ui.shadcn.com
- Documentación de tRPC: https://trpc.io
- Documentación de Tailwind CSS: https://tailwindcss.com
