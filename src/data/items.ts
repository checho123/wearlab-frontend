export interface Item {
  guid:       string;
  name:       string;
  designer:   string;
  category:   string;
  price:      string;
  priceNum:   number;
  img:        string;
  sizes:      string[];
  colors:     { hex: string; name: string }[];
  desc:       string;
  isNew:      boolean;
  rating:     number;
  createdAt:  string;
  gender:     "hombre" | "mujer" | "unisex";
}

export interface Category {
  key:   string;
  label: string;
  sub:   string;
  img:   string;
  soon?: boolean;
}

export interface Designer {
  slug:     string;
  name:     string;
  avatar:   string;
  products: number;
  bio:      string;
}

export const CATEGORIES: Category[] = [
  {
    key:   "camisas",
    label: "Camisas",
    sub:   "Manga corta",
    img:   "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
  },
  {
    key:   "camisas-manga-larga",
    label: "Manga Larga",
    sub:   "Formales & casuales",
    img:   "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  },
  {
    key:   "buzos",
    label: "Buzos",
    sub:   "Oversize & slim fit",
    img:   "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&q=80",
  },
  {
    key:   "chaquetas",
    label: "Chaquetas",
    sub:   "Outerwear & abrigos",
    img:   "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
  },
  {
    key:   "pantalones",
    label: "Pantalones",
    sub:   "Casuales & formales",
    img:   "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
  },
  {
    key:   "gorras",
    label: "Gorras",
    sub:   "Próximamente",
    img:   "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    soon:  true,
  },
];

export const ITEMS: Item[] = [
  {
    guid:      "a1b2c3d4",
    name:      "Chaqueta Noir Vol.2",
    designer:  "Studio Cero",
    category:  "chaquetas",
    price:     "$68",
    priceNum:   68,
    img:       "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
    sizes:     ["XS","S","M","L"],
    colors: [
      { hex: "#0a0a0a", name: "Negro" },
      { hex: "#1a1a2e", name: "Midnight" },
      { hex: "#6b2737", name: "Borgoña" },
      { hex: "#2d4a22", name: "Oliva" },
    ],
    desc:      "Chaqueta oversize en tela técnica negra. Corte asimétrico con costuras visibles.",
    isNew:     true,
    rating:    5,
    createdAt: "2026-03-18",
    gender:    "unisex",
  },
  {
    guid:      "b2c3d4e5",
    name:      "Camisa Geo",
    designer:  "Studio Cero",
    category:  "camisas",
    price:     "$30",
    priceNum:   30,
    img:       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    sizes:     ["S","M","L","XL"],
    colors: [
      { hex: "#ffffff", name: "Blanco" },
      { hex: "#f5f0e8", name: "Crema" },
      { hex: "#1a1a2e", name: "Midnight" },
      { hex: "#c4a35a", name: "Gold" },
    ],
    desc:      "Camisa de algodón con patrones geométricos. Cuello mao.",
    isNew:     false,
    rating:    4,
    createdAt: "2026-03-10",
    gender:    "hombre",
  },
  {
    guid:      "c3d4e5f6",
    name:      "Hoodie Circuit",
    designer:  "Colores MX",
    category:  "buzos",
    price:     "$34",
    priceNum:   34,
    img:       "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
    sizes:     ["S","M","L","XL","XXL"],
    colors: [
      { hex: "#e8e8e8", name: "Gris claro" },
      { hex: "#3a3a3a", name: "Grafito" },
      { hex: "#c41a1a", name: "Rojo" },
      { hex: "#1a3a5c", name: "Azul marino" },
    ],
    desc:      "Hoodie unisex 100% algodón. Estampado generado con IA.",
    isNew:     true,
    rating:    5,
    createdAt: "2026-03-15",
    gender:    "unisex",
  },
  {
    guid:      "d4e5f6a1",
    name:      "Pantalón Velo",
    designer:  "Studio Cero",
    category:  "pantalones",
    price:     "$42",
    priceNum:   42,
    img:       "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
    sizes:     ["XS","S","M","L"],
    colors: [
      { hex: "#1a1a1a", name: "Negro" },
      { hex: "#4a3728", name: "Café" },
      { hex: "#2d3a4a", name: "Azul pizarra" },
      { hex: "#6b6b6b", name: "Gris medio" },
    ],
    desc:      "Pantalón de tela fluida con caída amplia. Pretina alta elástica.",
    isNew:     false,
    rating:    4,
    createdAt: "2026-03-05",
    gender:    "hombre",
  },
  {
    guid:      "e5f6a1b2",
    name:      "Camisa Manga Larga",
    designer:  "Studio Cero",
    category:  "camisas-manga-larga",
    price:     "$34",
    priceNum:   34,
    img:       "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    sizes:     ["S","M","L","XL"],
    colors: [
      { hex: "#ffffff", name: "Blanco" },
      { hex: "#d4c5b0", name: "Arena" },
      { hex: "#1a2a3a", name: "Azul noche" },
      { hex: "#2d2d2d", name: "Carbón" },
    ],
    desc:      "Camisa manga larga en algodón peinado. Corte slim fit.",
    isNew:     false,
    rating:    4,
    createdAt: "2026-03-12",
    gender:    "hombre",
  },
  {
    guid:      "a2b3c4d5",
    name:      "Chaqueta Axis",
    designer:  "Noche Lab",
    category:  "chaquetas",
    price:     "$74",
    priceNum:   74,
    img:       "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    sizes:     ["S","M","L","XL"],
    colors: [
      { hex: "#1a1a1a", name: "Negro" },
      { hex: "#3d1a1a", name: "Vino oscuro" },
      { hex: "#1a2d1a", name: "Verde oscuro" },
      { hex: "#2a2a3d", name: "Índigo" },
    ],
    desc:      "Chaqueta de cuero vegano con capucha desmontable.",
    isNew:     false,
    rating:    4,
    createdAt: "2026-03-08",
    gender:    "unisex",
  },
  {
    guid:      "b3c4d5e6",
    name:      "Hoodie Forma",
    designer:  "Studio Cero",
    category:  "buzos",
    price:     "$38",
    priceNum:   38,
    img:       "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&q=80",
    sizes:     ["S","M","L","XL"],
    colors: [
      { hex: "#f0f0f0", name: "Blanco humo" },
      { hex: "#c8c8c8", name: "Gris perla" },
      { hex: "#0a0a0a", name: "Negro" },
      { hex: "#c4a35a", name: "Champagne" },
    ],
    desc:      "Hoodie minimalista con logo bordado. Tela francesa pesada.",
    isNew:     false,
    rating:    3,
    createdAt: "2026-03-01",
    gender:    "unisex",
  },
];

export const DESIGNERS: Designer[] = [
  {
    slug:     "studio-cero",
    name:     "Studio Cero",
    avatar:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    products: 5,
    bio:      "Estudio de moda independiente nacido en Bogotá. Fusionamos técnica artesanal con tecnología 3D para crear prendas únicas.",
  },
  {
    slug:     "noche-lab",
    name:     "Noche Lab",
    avatar:   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    products: 1,
    bio:      "Diseñadora de Medellín especializada en prendas nocturnas. Cada colección nace de la ciudad y su luz artificial.",
  },
  {
    slug:     "colores-mx",
    name:     "Colores MX",
    avatar:   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    products: 1,
    bio:      "Colectivo de Cali que explora el color como identidad. Sus estampados son generados con inteligencia artificial.",
  },
  {
    slug:     "luz-urbana",
    name:     "Luz Urbana",
    avatar:   "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
    products: 0,
    bio:      "Marca emergente de Barranquilla enfocada en ropa urbana sostenible. Próximamente en WearLabs.",
  },
  {
    slug:     "taller-arte",
    name:     "Taller Arte",
    avatar:   "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&q=80",
    products: 0,
    bio:      "Colectivo de artistas y diseñadores de Cali. Sus prendas son lienzos para ilustraciones originales.",
  },
  {
    slug:     "viento-sud",
    name:     "Viento Sud",
    avatar:   "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    products: 0,
    bio:      "Marca de moda de Cartagena que celebra la cultura caribeña. Prendas coloridas con tejidos naturales.",
  },
  {
    slug:     "eco-forma",
    name:     "Eco Forma",
    avatar:   "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    products: 0,
    bio:      "Marca de moda sostenible de Cali. Utilizan materiales reciclados y procesos de bajo impacto ambiental.",
  },
];