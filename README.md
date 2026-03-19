# WearLab — Marketplace de Moda 3D 🇨🇴

> Primer marketplace de moda con configurador 3D en tiempo real hecho en Colombia.  
> Proyecto desarrollado para el **Hackathon CubePath × midudev 2026**.

<!-- BADGES -->
![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![Unity](https://img.shields.io/badge/Unity-6000.x-000000?style=flat-square&logo=unity&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## ¿Qué es WearLab?

**WearLab** es una plataforma de moda digital con dos grandes pilares:

1. **Marketplace multi-tenant** — diseñadores independientes colombianos abren su propia mini-tienda con URL única (`wearlab.co/tienda/[diseñador]`), suben sus colecciones y las hacen accesibles a toda la comunidad.

2. **Configurador 3D en tiempo real** — cualquier prenda del catálogo se puede visualizar en un motor **Unity 6 WebGL** embebido en el navegador, sin plugins ni descargas. El cliente rota, cambia colores y texturas antes de comprar.

<!-- GIF DEMO AQUÍ -->
<!-- ![Demo WearLab](./docs/demo.gif) -->

---

## ✨ Features principales

| Feature | Descripción |
|---|---|
| 🛍️ Catálogo con fotos IA | 4 vistas por prenda generadas con IA generativa |
| 🎮 Configurador 3D | Unity 6 WebGL embebido — sin plugins |
| 👗 Marketplace multi-tenant | Cada diseñador tiene su URL propia |
| 🤖 IA generativa | Diseñadores generan estampados con prompts |
| 🔐 Auth dual | JWT para web + Unity WebGL |
| 📱 Responsive | Mobile-first, funciona en todos los dispositivos |

---

## 🗂️ Estructura del proyecto

```
wearlab-frontend/
├── src/
│   ├── components/        # Componentes Astro reutilizables
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── CatalogGrid.astro
│   │   ├── ProductCard.astro
│   │   ├── CategoryBar.astro
│   │   ├── DesignerStrip.astro
│   │   ├── Modal.astro        # Login / Register
│   │   └── DetailPanel.astro  # Slide-in detalle prenda
│   ├── layouts/
│   │   └── BaseLayout.astro   # Layout principal con Nav + Footer
│   ├── pages/
│   │   ├── index.astro              # Landing + catálogo
│   │   ├── catalogo.astro           # Catálogo completo con filtros
│   │   ├── prenda/[guid].astro      # Detalle de prenda por GUID
│   │   ├── tienda/[designer].astro  # Mini-tienda del diseñador
│   │   └── nosotros.astro           # Stack + misión del proyecto
│   ├── styles/
│   │   └── global.css        # Variables CSS + reset
│   └── data/
│       └── items.ts          # Datos mock del catálogo (→ API en producción)
├── public/
│   └── unity/                # Build WebGL de Unity (generado aparte)
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🎮 Flujo Astro ↔ Unity WebGL

```
Astro                          Unity WebGL
  │                                │
  │  SendMessage('Manager',        │
  │    'LoadItem', guid)  ──────→  │  Carga prenda 3D por GUID
  │                                │
  │  ←──── window.addToCart(guid)  │  Usuario hace click en comprar
  │                                │
  │  ←──── window.onReady()        │  Unity terminó de cargar
```

La comunicación se maneja a través de **SendMessage** (Astro → Unity) y archivos `.jslib` (Unity → Astro).

---

## 🔑 Roles de usuario

| Rol | Descripción | Escena Unity |
|---|---|---|
| **Cliente** | Navega catálogo, visualiza en 3D, compra | Escena Tienda 3D |
| **Diseñador** | Sube diseños, gestiona colección, mini-tienda | Escena Panel Diseñador |

---

## 🛠️ Stack tecnológico

### Frontend
- **Astro 5** — framework principal, SSG + SSR
- **TypeScript** — tipado estricto
- **CSS Custom Properties** — sin frameworks CSS, diseño propio
- **Unity 6 WebGL** — configurador 3D embebido

### Backend (repo separado: `wearlab-backend`)
- **Node.js + Express 5** — API REST
- **TypeScript + Zod v4** — validación y tipos
- **Prisma + PostgreSQL** — datos transaccionales (usuarios, órdenes, prendas)
- **Mongoose + MongoDB** — diseños, texturas, audit logs
- **JWT** — access token corto + refresh token httpOnly
- **Swagger** — documentación automática de la API

---

## 🚀 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/wearlab-frontend.git
cd wearlab-frontend

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Arrancar en desarrollo
npm run dev
```

Abre `http://localhost:4321` en tu navegador.

---

## 🌍 Variables de entorno

```env
# .env.example
PUBLIC_API_URL=http://localhost:3000
PUBLIC_UNITY_BUILD_URL=/unity/Build
```

---

## 📦 Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build
npm run check      # TypeScript check
```

---

## 🗺️ Roadmap

- [x] Landing con catálogo de ropa
- [x] Filtros por categoría y diseñador
- [x] Panel de detalle con GUID
- [x] Modal Login / Registro con roles
- [ ] Integración Unity WebGL real
- [ ] Conexión con API backend
- [ ] Página `/prenda/[guid]`
- [ ] Mini-tienda `/tienda/[designer]`
- [ ] Página `/nosotros`
- [ ] Generación de imágenes con IA
- [ ] Auth JWT funcional
- [ ] Deploy en producción (CubePath)

---

## 👥 Equipo

| Rol | Nombre |
|---|---|
| Fundador & Dev Full Stack | [@TU_USUARIO](https://github.com/TU_USUARIO) |

---

## 📄 Licencia

MIT © 2026 WearLab · Bogotá, Colombia

---

<div align="center">
  <sub>Hecho con ❤️ en Colombia · Hackathon CubePath × midudev 2026</sub>
</div>
