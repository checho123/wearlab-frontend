# WearLab — Marketplace de Moda 3D 🇨🇴

> Primer marketplace de moda con configurador 3D en tiempo real hecho en Colombia.  
> Proyecto desarrollado para el **Hackathon CubePath × midudev 2026**.

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-6000.x-000000?style=flat-square&logo=unity&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## ¿Qué es WearLab?

**WearLab** es una plataforma de moda digital con dos grandes pilares:

1. **Marketplace multi-tenant** — diseñadores independientes colombianos abren su propia mini-tienda con URL única (`wearlab.co/tienda/[diseñador]`), suben sus colecciones y las hacen accesibles a toda la comunidad.

2. **Configurador 3D en tiempo real** — cualquier prenda del catálogo se puede visualizar en un motor **Unity 6 WebGL** embebido en el navegador, sin plugins ni descargas. El cliente rota, cambia colores y texturas antes de comprar.

<!-- ![Demo WearLab](./docs/demo.gif) -->

---

## ✨ Features principales

| Feature | Descripción |
|---|---|
| 🛍️ Catálogo con fotos IA | 4 vistas por prenda generadas con IA generativa |
| 🎮 Configurador 3D | Unity 6 WebGL embebido — sin plugins |
| 👗 Marketplace multi-tenant | Cada diseñador tiene su URL propia |
| 🤖 IA generativa | Diseñadores generan estampados con prompts |
| 🔐 Auth con roles | JWT · 3 roles: Admin, Diseñador, Usuario |
| 📱 Responsive | Mobile-first, funciona en todos los dispositivos |

---

## 👥 Roles de usuario

| Rol | Descripción | Acceso |
|---|---|---|
| **Usuario** | Navega catálogo, visualiza en 3D, compra | Rutas públicas + `/cuenta` |
| **Diseñador** | Sube diseños, gestiona colección, mini-tienda | Todo lo anterior + `/dashboard/*` |
| **Admin** | Control total de la plataforma | Todo + `/admin/*` |

> El rol Admin se crea directamente en la base de datos — no hay registro público para este rol.

---

## 🗂️ Estructura del proyecto

```
wearlab-frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   └── BaseLayout.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Badge.astro
│   │   │   └── Modal.astro
│   │   ├── catalog/
│   │   │   ├── ProductCard.astro
│   │   │   ├── CatalogGrid.astro
│   │   │   ├── CategoryBar.astro
│   │   │   └── DetailPanel.astro
│   │   ├── dashboard/
│   │   │   ├── Sidebar.astro
│   │   │   ├── PrendaForm.astro
│   │   │   └── StatsCard.astro
│   │   ├── admin/
│   │   │   ├── AdminSidebar.astro
│   │   │   ├── UserTable.astro
│   │   │   └── DesignerTable.astro
│   │   └── unity/
│   │       └── UnityViewer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Público — Nav + Footer
│   │   ├── DashboardLayout.astro   # Diseñador — sidebar dorado
│   │   └── AdminLayout.astro       # Admin — sidebar rojo
│   ├── pages/
│   │   ├── index.astro
│   │   ├── catalogo.astro
│   │   ├── nosotros.astro
│   │   ├── prenda/[guid].astro
│   │   ├── tienda/[designer].astro
│   │   ├── auth/
│   │   │   ├── login.astro
│   │   │   └── register.astro
│   │   ├── dashboard/              # 🔒 Diseñador + Admin
│   │   │   ├── index.astro
│   │   │   ├── perfil.astro
│   │   │   └── prendas/
│   │   │       ├── index.astro
│   │   │       ├── nueva.astro
│   │   │       └── [id].astro
│   │   └── admin/                  # 🔒 Solo Admin
│   │       ├── index.astro
│   │       ├── usuarios.astro
│   │       ├── disenadores.astro
│   │       ├── prendas.astro
│   │       └── stats.astro
│   ├── middleware.ts               # Protección de rutas por rol
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   └── items.ts               # Mock catálogo → API en producción
│   ├── types/
│   │   └── index.ts
│   └── lib/
│       ├── httpClient.ts
│       └── auth.ts
├── public/
│   └── unity/
│       └── .gitkeep               # Build WebGL no va al repo
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🔐 Protección de rutas

```
/dashboard/*  →  requiere rol DISEÑADOR o ADMIN
/admin/*      →  requiere rol ADMIN únicamente
/cuenta       →  requiere cualquier usuario autenticado
/*            →  público
```

---

## 🎮 Flujo Astro ↔ Unity WebGL

```
Astro                              Unity WebGL
  │                                    │
  │  SendMessage('Manager',            │
  │    'LoadItem', guid)  ──────────→  │  Carga prenda por GUID
  │                                    │
  │  ←──── window.addToCart(guid)      │  Click en comprar
  │                                    │
  │  ←──── window.onUnityReady()       │  Unity listo
```

---

## 🎮 Escenas Unity

| Escena | Acceso | Descripción |
|---|---|---|
| **Tienda 3D** | Usuario / Diseñador | Prenda por GUID, rotación, color |
| **Panel Diseñador** | Solo Diseñador | Subir texturas, previsualizar en 3D |
| **Lobby** | Todos | Menú de entrada, navegar al catálogo |

---

## 🛠️ Stack

### Frontend
- **Astro 5** + **Tailwind CSS 4** + **TypeScript strict**
- **Unity 6 WebGL** embebido

### Backend — [`wearlab-backend`](https://github.com/TU_USUARIO/wearlab-backend)
- **Node.js + Express 5** + **TypeScript + Zod v4**
- **Prisma + PostgreSQL** — datos transaccionales
- **Mongoose + MongoDB** — diseños, texturas, logs
- **JWT** access token + refresh httpOnly
- **Swagger** — documentación automática

---

## 🚀 Instalación local

```bash
git clone https://github.com/TU_USUARIO/wearlab-frontend.git
cd wearlab-frontend
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:4321`

---

## 🌍 Variables de entorno

```env
PUBLIC_API_URL=http://localhost:3000
PUBLIC_UNITY_BUILD_URL=/unity/Build
AI_IMAGE_API_KEY=tu_api_key_aqui
```

---

## 📦 Scripts

```bash
npm run dev        # Desarrollo
npm run build      # Producción
npm run preview    # Preview del build
npm run check      # TypeScript check
```

---

## 🗺️ Roadmap

- [x] Proyecto Astro + Tailwind inicializado
- [x] Repositorio GitHub configurado
- [x] README + .gitignore + .env.example
- [ ] Estructura de carpetas y componentes base
- [ ] Landing con catálogo
- [ ] Modal Login / Registro con roles
- [ ] Middleware de protección de rutas
- [ ] Dashboard del diseñador
- [ ] Panel de administración
- [ ] Integración Unity WebGL
- [ ] Conexión con API backend
- [ ] Deploy en CubePath

---

## 👥 Equipo

| Rol | Perfil |
|---|---|
| Fundador & Dev Full Stack | [@TU_USUARIO](https://github.com/checho123) |

---

## 📄 Licencia

MIT © 2026 WearLab · Bogotá, Colombia

---

<div align="center">
  <sub>Hecho por Checho con ❤️ en Colombia · Hackathon CubePath × midudev 2026</sub>
</div>