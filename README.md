# WearLab — Marketplace de Moda 3D 🇨🇴

> Primer marketplace de moda con configurador 3D en tiempo real hecho en Colombia.  
> Proyecto desarrollado para el **Hackathon CubePath × midudev 2026**.

<!-- BADGES -->
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

2. **Configurador 3D en tiempo real** — cualquier prenda del catálogo se puede visualizar en un motor **Unity 6 WebGL** embebido en el navegador, sin plugins ni descargas.

---

## ✨ Features principales

| Feature | Descripción |
|---|---|
| 🛍️ Catálogo con fotos IA | 4 vistas por prenda generadas con IA generativa |
| 🎮 Configurador 3D | Unity 6 WebGL embebido — sin plugins |
| 👗 Marketplace multi-tenant | Cada diseñador tiene su URL propia |
| 🤖 IA generativa | Diseñadores generan estampados con prompts |
| 🔐 Auth con 3 roles | Usuario · Diseñador · Admin — JWT + middleware Astro |
| 📊 Dashboard diseñador | Gestión de colecciones, subida de prendas, estadísticas |
| ⚙️ Panel admin | Backoffice completo para gestión de la plataforma |
| 📱 Responsive | Mobile-first, funciona en todos los dispositivos |

---

## 👥 Roles de usuario

| Rol | Descripción | Acceso |
|---|---|---|
| **Usuario** | Se registra como cliente, navega y compra | Rutas públicas + `/cuenta` |
| **Diseñador** | Vende sus creaciones, gestiona su colección | Todo lo anterior + `/dashboard/*` |
| **Admin** | Gestiona toda la plataforma (creado en BD) | Todo lo anterior + `/admin/*` |

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
│   │   │   ├── UserTable.astro
│   │   │   └── DesignerTable.astro
│   │   └── unity/
│   │       └── UnityViewer.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Nav + Footer — rutas públicas
│   │   ├── DashboardLayout.astro    # Sidebar dorado — diseñador
│   │   └── AdminLayout.astro        # Sidebar rojo — admin
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── catalogo.astro
│   │   ├── nosotros.astro
│   │   ├── prenda/[guid].astro
│   │   ├── tienda/[designer].astro
│   │   ├── auth/
│   │   │   ├── login.astro
│   │   │   └── register.astro
│   │   ├── dashboard/               # 🔒 Solo diseñador + admin
│   │   │   ├── index.astro
│   │   │   ├── perfil.astro
│   │   │   └── prendas/
│   │   │       ├── index.astro
│   │   │       ├── nueva.astro
│   │   │       └── [id].astro
│   │   └── admin/                   # 🔒 Solo admin
│   │       ├── index.astro
│   │       ├── usuarios.astro
│   │       ├── diseñadores.astro
│   │       └── prendas.astro
│   │
│   ├── middleware.ts
│   ├── styles/global.css
│   ├── data/items.ts
│   ├── types/index.ts
│   └── lib/
│       ├── httpClient.ts
│       └── auth.ts
│
├── public/
│   └── unity/.gitkeep
├── .env.example
├── .gitignore
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🔒 Protección de rutas — middleware.ts

```
/dashboard/*  →  requiere rol DISEÑADOR o ADMIN
/admin/*      →  requiere rol ADMIN únicamente
/cuenta       →  requiere cualquier usuario autenticado
Resto         →  público, sin auth
```

---

## 🎮 Flujo Astro ↔ Unity WebGL

```
Astro                              Unity WebGL
  │                                    │
  │  SendMessage('Manager',            │
  │    'LoadItem', guid)   ─────────→  │  Carga prenda 3D por GUID
  │                                    │
  │  ←──── window.addToCart(guid)      │  Usuario hace click en comprar
  │  ←──── window.onUnityReady()       │  Unity terminó de cargar
```

---

## 🛠️ Stack tecnológico

### Frontend (este repo)
- **Astro 5** — SSG + SSR
- **Tailwind CSS 4** — utilidades de estilos
- **TypeScript strict**
- **Unity 6 WebGL** — configurador 3D

### Backend ([wearlab-backend](https://github.com/TU_USUARIO/wearlab-backend))
- **Node.js + Express 5 + TypeScript**
- **Prisma + PostgreSQL** — datos transaccionales
- **Mongoose + MongoDB** — diseños y audit logs
- **JWT** — access token + refresh httpOnly
- **Zod v4 + Swagger**

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

## 📦 Scripts

```bash
npm run dev        # Desarrollo
npm run build      # Build producción
npm run preview    # Preview del build
npm run check      # TypeScript check
```

---

## 🗺️ Roadmap

- [x] Astro + Tailwind + TypeScript strict inicializado
- [x] Arquitectura de 3 roles definida
- [ ] Estructura de carpetas y componentes base
- [ ] BaseLayout + Nav + Footer
- [ ] Landing con catálogo
- [ ] Middleware de protección de rutas
- [ ] Auth modal (login / registro)
- [ ] Dashboard diseñador
- [ ] Panel admin
- [ ] Integración Unity WebGL
- [ ] Conexión con API backend
- [ ] Deploy en CubePath

---

## 👥 Equipo

| Rol | Perfil |
|---|---|
| Fundador & Dev Full Stack | [@TU_USUARIO](https://github.com/TU_USUARIO) |

---

## 📄 Licencia

MIT © 2026 WearLab · Bogotá, Colombia

---

<div align="center">
  <sub>Hecho por Checho con ❤️ en Colombia · Hackathon CubePath × midudev 2026</sub>
</div>