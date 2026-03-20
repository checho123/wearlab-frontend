export interface Item {
  guid:       string;
  name:       string;
  designer:   string;
  category:   string;
  price:      string;
  priceNum:   number;
  img:        string;
  sizes:      string[];
  desc:       string;
  isNew:      boolean;
}

export const ITEMS: Item[] = [
  {
    guid:     "a1b2c3d4",
    name:     "Chaqueta Noir Vol.2",
    designer: "Studio Cero",
    category: "chaquetas",
    price:    "$289.000",
    priceNum:  289000,
    img:      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    sizes:    ["XS","S","M","L"],
    desc:     "Chaqueta oversize en tela técnica negra. Corte asimétrico con costuras visibles.",
    isNew:    true,
  },
  {
    guid:     "b2c3d4e5",
    name:     "Vestido Umbra",
    designer: "Noche Lab",
    category: "vestidos",
    price:    "$195.000",
    priceNum:  195000,
    img:      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    sizes:    ["XS","S","M","L","XL"],
    desc:     "Vestido midi en seda sintética color medianoche. Abertura lateral derecha.",
    isNew:    false,
  },
  {
    guid:     "c3d4e5f6",
    name:     "Hoodie Circuit",
    designer: "Colores MX",
    category: "hoodies",
    price:    "$145.000",
    priceNum:  145000,
    img:      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    sizes:    ["S","M","L","XL","XXL"],
    desc:     "Hoodie unisex 100% algodón. Estampado generado con IA.",
    isNew:    true,
  },
  {
    guid:     "d4e5f6a1",
    name:     "Pantalón Velo",
    designer: "Studio Cero",
    category: "pantalones",
    price:    "$178.000",
    priceNum:  178000,
    img:      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    sizes:    ["XS","S","M","L"],
    desc:     "Pantalón de tela fluida con caída amplia. Pretina alta elástica.",
    isNew:    false,
  },
  {
    guid:     "e5f6a1b2",
    name:     "Camisa Geo",
    designer: "Studio Cero",
    category: "camisas",
    price:    "$128.000",
    priceNum:  128000,
    img:      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    sizes:    ["S","M","L","XL"],
    desc:     "Camisa de algodón con patrones geométricos. Cuello mao.",
    isNew:    false,
  },
  {
    guid:     "f6a1b2c3",
    name:     "Vestido Lattice",
    designer: "Noche Lab",
    category: "vestidos",
    price:    "$225.000",
    priceNum:  225000,
    img:      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    sizes:    ["XS","S","M"],
    desc:     "Vestido de red estructurada con forro interior. Mangas largas.",
    isNew:    true,
  },
  {
    guid:     "a2b3c4d5",
    name:     "Chaqueta Axis",
    designer: "Noche Lab",
    category: "chaquetas",
    price:    "$312.000",
    priceNum:  312000,
    img:      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    sizes:    ["S","M","L","XL"],
    desc:     "Chaqueta de cuero vegano con capucha desmontable.",
    isNew:    false,
  },
  {
    guid:     "b3c4d5e6",
    name:     "Hoodie Forma",
    designer: "Studio Cero",
    category: "hoodies",
    price:    "$162.000",
    priceNum:  162000,
    img:      "https://images.unsplash.com/photo-1614093302611-8efc4a9a4e16?w=600&q=80",
    sizes:    ["S","M","L","XL"],
    desc:     "Hoodie minimalista con logo bordado. Tela francesa pesada.",
    isNew:    false,
  },
];

export const CATEGORIES = [
  "todos",
  "chaquetas",
  "vestidos",
  "hoodies",
  "pantalones",
  "camisas",
  "accesorios",
];

export const DESIGNERS = [
  { slug: "studio-cero",  name: "Studio Cero",  city: "Bogotá",   count: 14 },
  { slug: "noche-lab",    name: "Noche Lab",    city: "Medellín", count: 9  },
  { slug: "colores-mx",   name: "Colores MX",   city: "Cali",     count: 7  },
];