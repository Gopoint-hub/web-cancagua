'''
# Documentación del Proyecto: Cancagua Web

**Autor:** Manus AI
**Fecha:** 27 de enero de 2026

## 1. Introducción

Este documento proporciona una descripción técnica completa del proyecto **Cancagua Web**, una aplicación web full-stack moderna diseñada para gestionar las operaciones del spa y centro de retiros Cancagua. El objetivo de este análisis es facilitar la incorporación de nuevos desarrolladores y servir como una referencia central para futuras actualizaciones y mantenimiento.

El proyecto está construido sobre un monorepo que contiene tanto el frontend (cliente) como el backend (servidor), utilizando un conjunto de tecnologías modernas para ofrecer una experiencia de usuario rica y una gestión de datos eficiente.

## 2. Arquitectura General

El proyecto sigue una arquitectura de monorepo con una clara separación entre el cliente y el servidor, pero permitiendo compartir código a través de un directorio `shared`.

| Componente | Directorio | Descripción |
| :--- | :--- | :--- |
| **Frontend** | `/client` | Una Single-Page Application (SPA) construida con **React** y **Vite**. Se encarga de toda la interfaz de usuario, tanto para el sitio público como para el panel de administración (CMS). |
| **Backend** | `/server` | Un servidor **Node.js** con **Express** que expone una API utilizando **tRPC**. Maneja la lógica de negocio, autenticación y comunicación con servicios externos. |
| **Compartido** | `/shared` | Contiene tipos de TypeScript y constantes que se utilizan tanto en el frontend como en el backend, garantizando la coherencia. |
| **Base de Datos** | `/drizzle` | Define el esquema de la base de datos y las migraciones utilizando el ORM **Drizzle**. |

### Flujo de Datos

1.  El **cliente (React)** realiza llamadas a la API del backend a través de `tRPC`, que proporciona seguridad de tipos de extremo a extremo.
2.  El **servidor (Express/tRPC)** recibe las solicitudes, las procesa y, si es necesario, interactúa con la base de datos o servicios de terceros.
3.  La base de datos **TiDB Cloud Serverless** es consultada por el servidor a través de **Drizzle ORM**.
4.  Los archivos (imágenes, PDFs) son gestionados a través de **Cloudinary**.
5.  El servidor responde al cliente con los datos solicitados en formato JSON.

## 3. Tecnologías Principales

A continuación se detallan las tecnologías clave utilizadas en el proyecto.

| Categoría | Tecnología | Uso en el Proyecto |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, TypeScript | Construcción de la interfaz de usuario. |
| | Tailwind CSS, shadcn/ui | Estilos y sistema de componentes de UI. |
| | Wouter | Enrutamiento ligero para la SPA. |
| | i18next | Internacionalización y traducción de la UI. |
| **Backend** | Node.js, Express | Entorno de ejecución y servidor web. |
| | tRPC | Creación de APIs con seguridad de tipos. |
| | Drizzle ORM | Mapeo de objetos a la base de datos relacional. |
| **Base de Datos** | TiDB Cloud Serverless | Base de datos principal, compatible con MySQL. |
| **Despliegue** | Render | Plataforma en la nube para el despliegue continuo. |
| **Almacenamiento** | Cloudinary | Almacenamiento y servicio de archivos e imágenes. |
| **Autenticación** | JWT (jose), bcryptjs | Gestión de sesiones y seguridad de contraseñas. |
| **Pagos** | Transbank WebPay SDK | Integración con la pasarela de pagos chilena. |
| **Email** | Resend | Envío de correos transaccionales y masivos. |
| **IA** | Google Generative AI (Gemini) | Funcionalidades de inteligencia artificial. |
| **Reservas** | Skedu | Integración con sistema externo de gestión de reservas. |

## 4. Estructura del Proyecto

El repositorio está organizado de la siguiente manera para mantener un código limpio y escalable.

```
/home/ubuntu/cancagua-web/
├── client/                # Código fuente del frontend (React)
│   ├── src/
│   │   ├── components/    # Componentes de UI reutilizables
│   │   ├── contexts/      # Contextos de React (Tema, Idioma)
│   │   ├── i18n/          # Configuración y archivos de traducción
│   │   ├── lib/           # Librerías auxiliares (cliente tRPC)
│   │   ├── pages/         # Componentes de página (rutas)
│   │   │   ├── cms/       # Páginas del panel de administración
│   │   │   └── ...
│   │   └── App.tsx        # Componente raíz y definición de rutas
│   └── vite.config.ts     # Configuración del empaquetador Vite
├── server/                # Código fuente del backend (Node.js)
│   ├── _core/             # Lógica central del servidor (auth, tRPC, etc.)
│   ├── drizzle/           # Esquema y migraciones de la base de datos
│   ├── db.ts              # Funciones de acceso a la base de datos
│   ├── routers.ts         # Definición de los endpoints de la API tRPC
│   ├── storage.ts         # Integración con Cloudinary
│   ├── webpay.ts          # Integración con Transbank
│   └── ...                # Otros archivos de integración (email, skedu)
├── shared/                # Código compartido entre cliente y servidor
├── docs/                  # Documentación adicional del proyecto
├── .env.example           # Plantilla de variables de entorno
├── package.json           # Dependencias y scripts del proyecto
├── render.yaml            # Configuración de despliegue para Render
└── drizzle.config.ts      # Configuración de Drizzle ORM
```

## 5. Integraciones con Servicios Externos

El proyecto depende de varios servicios externos clave, configurados a través de variables de entorno.

### 5.1. Render (Despliegue)

-   **Archivo de Configuración**: `render.yaml`
-   **Descripción**: Define el servicio web, el entorno de ejecución (Node.js), los comandos de construcción (`pnpm install && pnpm run build`) y de inicio (`pnpm run start`).
-   **Gestión de Secretos**: Las variables de entorno sensibles (como `DATABASE_URL`, `CLOUDINARY_URL`, etc.) se configuran como "sync: false" y deben ser gestionadas de forma segura en el dashboard de Render.

### 5.2. TiDB Cloud (Base de Datos)

-   **Archivos Clave**: `server/db.ts`, `drizzle/schema.ts`, `drizzle.config.ts`
-   **Descripción**: Se utiliza el driver `@tidbcloud/serverless` para conectar a una base de datos TiDB Cloud Serverless. La conexión se establece utilizando la variable de entorno `DATABASE_URL`.
-   **ORM**: Drizzle ORM se utiliza para definir el esquema de la base de datos de forma declarativa en `drizzle/schema.ts` y para realizar consultas SQL seguras y tipadas.
-   **Esquema**: La base de datos es extensa y modela entidades como usuarios, servicios, eventos, clientes, newsletters, cotizaciones, gift cards, y un sistema de traducciones, entre otros.

### 5.3. Cloudinary (Almacenamiento de Archivos)

-   **Archivo Clave**: `server/storage.ts`
-   **Descripción**: Proporciona una capa de abstracción para subir, obtener y eliminar archivos en Cloudinary. Se configura a través de la variable de entorno `CLOUDINARY_URL`.
-   **Funcionalidad**: El módulo `storage.ts` determina automáticamente el tipo de recurso (imagen, video, raw) y gestiona la subida de archivos desde buffers o URLs.

## 6. Flujos de Trabajo Clave

### 6.1. Autenticación

-   **Archivos Clave**: `server/_core/auth.ts`, `server/routers.ts` (auth router)
-   **Flujo**: El sistema utiliza un sistema de autenticación basado en email y contraseña. Las contraseñas se hashean con `bcryptjs`. Las sesiones se gestionan mediante JSON Web Tokens (JWT) que se almacenan en una cookie `httpOnly`.
-   **Roles**: El sistema implementa un control de acceso basado en roles (`super_admin`, `admin`, `user`, `seller`), definido en la tabla `users`.

### 6.2. API con tRPC

-   **Archivos Clave**: `server/routers.ts`, `client/src/lib/trpc.ts`
-   **Descripción**: tRPC se utiliza para crear la API. Los "routers" en el backend definen procedimientos (queries y mutations) que pueden ser llamados directamente desde el frontend con total seguridad de tipos, eliminando la necesidad de generar clientes de API o escribir validaciones redundantes.

### 6.3. Panel de Administración (CMS)

-   **Ubicación**: `client/src/pages/cms/`
-   **Descripción**: El proyecto incluye un completo sistema de gestión de contenidos (CMS) como parte de la aplicación React. Este CMS permite administrar prácticamente todas las entidades de la base de datos: usuarios, servicios, menú del restaurante, cotizaciones, clientes, newsletters, etc.
-   **Acceso**: Las rutas del CMS están protegidas y solo son accesibles para usuarios con los roles adecuados (`admin`, `super_admin`).

## 7. Cómo Empezar

1.  **Clonar el Repositorio**: Clona el proyecto desde GitHub.
2.  **Instalar Dependencias**: Utiliza `pnpm install` para instalar todas las dependencias del proyecto.
3.  **Configurar Variables de Entorno**:
    -   Copia el archivo `.env.example` a un nuevo archivo llamado `.env`.
    -   Rellena todas las variables requeridas, incluyendo las credenciales para TiDB, Cloudinary, Resend, etc.
4.  **Ejecutar Migraciones**: Si es necesario, ejecuta las migraciones de la base de datos con `pnpm db:push`.
5.  **Iniciar el Servidor de Desarrollo**: Ejecuta `pnpm dev` para iniciar el servidor de desarrollo de Vite y el backend de Node.js simultáneamente.

## 8. Scripts Disponibles

-   `pnpm dev`: Inicia el entorno de desarrollo local.
-   `pnpm build`: Compila el frontend y el backend para producción.
-   `pnpm start`: Ejecuta la aplicación en modo producción (requiere `pnpm build` previo).
-   `pnpm db:push`: Aplica las migraciones de Drizzle a la base de datos.
-   `pnpm test`: Ejecuta los tests unitarios con Vitest.
-   `pnpm format`: Formatea todo el código con Prettier.
'''
