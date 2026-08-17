export type StagingCategory = "all" | "bedroom" | "living" | "dining" | "kitchen" | "office" | "outdoor";
export type StagingStyle = "modern" | "luxury" | "scandinavian" | "japandi" | "midcentury" | "coastal" | "farmhouse" | "industrial";

export interface MaterialVariant {
  id: string;
  name: string;
  colorHex: string;
  materialType: "fabric" | "wood" | "marble" | "leather" | "metal" | "canvas";
  roughness: number;
  metalness: number;
  previewImg?: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: "bed" | "table" | "painting" | "sofa" | "chair" | "lamp" | "rug" | "decor";
  price: number;
  originalPrice: number;
  currency: string;
  brand: string;
  pinPosition: { x: number; y: number }; // Percentage 0-100 on image
  dimensions: { width: string; depth: string; height: string };
  description: string;
  inStock: boolean;
  deliveryDays: number;
  rating: number;
  reviewsCount: number;
  model3DType: "bed" | "table" | "painting" | "sofa" | "chair" | "lamp" | "rug" | "decor";
  defaultMaterial: MaterialVariant;
  availableVariants: MaterialVariant[];
  features: string[];
  tags: string[];
}

export interface StagingRoomScene {
  id: string;
  name: string;
  roomType: "Primary Bedroom" | "Living Room" | "Dining Hall" | "Chef's Kitchen" | "Executive Office" | "Terrace Lounge";
  category: StagingCategory;
  areaSqFt: number;
  beforeImage: string;
  afterImage: string;
  style: StagingStyle;
  styleLabel: string;
  styleDescription: string;
  styleVariations: {
    style: StagingStyle;
    label: string;
    image: string;
    description: string;
  }[];
  furnitureItems: FurnitureItem[];
  estimatedStagingSavingINR: number;
  stagingTurnaroundHours: number;
}

export const VIRTUAL_STAGING_ROOMS: StagingRoomScene[] = [
  {
    id: "primary-bedroom-suite",
    name: "Primary Penthouse Suite",
    roomType: "Primary Bedroom",
    category: "bedroom",
    areaSqFt: 380,
    beforeImage: "/fort/bedroom-empty.webp",
    afterImage: "/fort/bedroom-modern.jpg",
    style: "modern",
    styleLabel: "Modern Italian Contemporary",
    styleDescription: "Sleek low-profile upholstered platform bed, sculptural fluted nightstands, warm ambient wall sconces and textured museum-grade canvas art.",
    estimatedStagingSavingINR: 320000,
    stagingTurnaroundHours: 24,
    styleVariations: [
      {
        style: "modern",
        label: "Modern Contemporary",
        image: "/fort/bedroom-modern.jpg",
        description: "Italian minimalism with upholstered bouclé bed, integrated lighting and brushed gold trims."
      },
      {
        style: "luxury",
        label: "High-End Luxury Suite",
        image: "/fort/bedroom-luxury.jpg",
        description: "5-star luxury hotel look with velvet fluted headboard, marble nightstands & warm crystal ambient lighting."
      },
      {
        style: "scandinavian",
        label: "Scandinavian Oak",
        image: "/fort/bedroom-scandinavian.jpg",
        description: "Light natural oak frame, washed organic linen textiles and serene neutral Scandinavian palette."
      },
      {
        style: "midcentury",
        label: "Mid-Century Walnut",
        image: "/fort/bedroom-midcentury.jpg",
        description: "Rich American walnut wood bed, brass cone pendants and geometric Bauhaus statement art."
      },
      {
        style: "coastal",
        label: "Coastal Resort",
        image: "/fort/bedroom-coastal.jpg",
        description: "Light bleached ash frame, woven natural rattan accents and breezy indigo ocean textiles."
      },
      {
        style: "farmhouse",
        label: "Modern Farmhouse",
        image: "/fort/bedroom-farmhouse.jpg",
        description: "Handcrafted rustic timber elements, matte black iron accents and layered chunky knit wool throws."
      },
    ],
    furnitureItems: [
      {
        id: "milan-bed-01",
        name: "Milanese Velvet Platform King Bed",
        category: "bed",
        price: 118000,
        originalPrice: 145000,
        currency: "₹",
        brand: "Aura Living Italia",
        pinPosition: { x: 48, y: 62 },
        dimensions: { width: "215 cm", depth: "220 cm", height: "115 cm" },
        description: "Architectural low-profile king bed with floating acoustic velvet headboard, reinforced hardwood internal structure, and hidden LED under-glow channels.",
        inStock: true,
        deliveryDays: 4,
        rating: 4.9,
        reviewsCount: 48,
        model3DType: "bed",
        defaultMaterial: {
          id: "sand-velvet",
          name: "Oatmeal Plush Velvet",
          colorHex: "#d8cfc4",
          materialType: "fabric",
          roughness: 0.85,
          metalness: 0.05,
        },
        availableVariants: [
          { id: "sand-velvet", name: "Oatmeal Plush Velvet", colorHex: "#d8cfc4", materialType: "fabric", roughness: 0.85, metalness: 0.05 },
          { id: "charcoal-velvet", name: "Anthracite Velvet", colorHex: "#353839", materialType: "fabric", roughness: 0.8, metalness: 0.08 },
          { id: "cognac-leather", name: "Tuscan Cognac Leather", colorHex: "#8d5524", materialType: "leather", roughness: 0.45, metalness: 0.12 },
          { id: "nordic-oak", name: "Nordic Bleached Oak", colorHex: "#c8b293", materialType: "wood", roughness: 0.6, metalness: 0.02 },
        ],
        features: ["Solid Teak Internal Core", "Acoustic Noise-Dampening Slats", "Stain-Resistant Performance Fabric", "Zero Squeak German Joinery"],
        tags: ["King Bed", "Velvet", "Modern", "Best Seller"],
      },
      {
        id: "abstract-canvas-02",
        name: "Zenith Textured Plaster Wall Painting",
        category: "painting",
        price: 34500,
        originalPrice: 42000,
        currency: "₹",
        brand: "Studio Minimalist Art",
        pinPosition: { x: 50, y: 28 },
        dimensions: { width: "160 cm", depth: "5 cm", height: "100 cm" },
        description: "Hand-sculpted heavy-texture mineral plaster canvas with geometric wabi-sabi reliefs, encased in an ultra-slim satin brass floater frame.",
        inStock: true,
        deliveryDays: 3,
        rating: 4.8,
        reviewsCount: 32,
        model3DType: "painting",
        defaultMaterial: {
          id: "white-plaster",
          name: "Sandstone Plaster & Gold",
          colorHex: "#ece7de",
          materialType: "canvas",
          roughness: 0.95,
          metalness: 0.1,
        },
        availableVariants: [
          { id: "white-plaster", name: "Sandstone Plaster & Gold", colorHex: "#ece7de", materialType: "canvas", roughness: 0.95, metalness: 0.1 },
          { id: "noir-concrete", name: "Noir Textured Basalt", colorHex: "#222224", materialType: "canvas", roughness: 0.9, metalness: 0.15 },
          { id: "terracotta-earth", name: "Earthy Terracotta & Ochre", colorHex: "#b3684a", materialType: "canvas", roughness: 0.92, metalness: 0.05 },
        ],
        features: ["Handcrafted Mineral Pigments", "Anti-Glare Museum Glass", "Brushed Brass Floater Frame", "Certificate of Authenticity"],
        tags: ["Wall Art", "Abstract", "Canvas", "Exclusive"],
      },
      {
        id: "marble-nightstand-03",
        name: "Verona Fluted Marble & Oak Nightstand",
        category: "table",
        price: 28900,
        originalPrice: 36000,
        currency: "₹",
        brand: "Verona Craft Studio",
        pinPosition: { x: 18, y: 68 },
        dimensions: { width: "55 cm", depth: "45 cm", height: "52 cm" },
        description: "Cylindrical tambour fluted side table topped with a honed Carrara marble slab, push-to-open soft-close concealed velvet-lined drawer.",
        inStock: true,
        deliveryDays: 5,
        rating: 4.9,
        reviewsCount: 27,
        model3DType: "table",
        defaultMaterial: {
          id: "carrara-oak",
          name: "Carrara Marble & Natural Oak",
          colorHex: "#e5ded3",
          materialType: "marble",
          roughness: 0.25,
          metalness: 0.1,
        },
        availableVariants: [
          { id: "carrara-oak", name: "Carrara Marble & Natural Oak", colorHex: "#e5ded3", materialType: "marble", roughness: 0.25, metalness: 0.1 },
          { id: "nero-marquina", name: "Nero Marquina & Smoked Oak", colorHex: "#1e1e1e", materialType: "marble", roughness: 0.2, metalness: 0.15 },
          { id: "travertine-walnut", name: "Roman Travertine & Walnut", colorHex: "#d1c2a5", materialType: "marble", roughness: 0.35, metalness: 0.08 },
        ],
        features: ["Honed Italian Marble Top", "Tambour Solid Oak Slats", "Soft-Close Drawer Mechanism", "Integrated Wireless Qi Charging Pad"],
        tags: ["Nightstand", "Marble", "Wood", "Luxury"],
      },
      {
        id: "brass-arc-lamp-04",
        name: "Lumina Brushed Brass Arc Floor Lamp",
        category: "lamp",
        price: 24500,
        originalPrice: 31000,
        currency: "₹",
        brand: "Nordic Lightcraft",
        pinPosition: { x: 86, y: 52 },
        dimensions: { width: "42 cm", depth: "95 cm", height: "185 cm" },
        description: "Sculptural counterbalanced arch lamp with spun brass lampshade, heavy solid Nero granite stabilizer base, and step-less dimming touch sensor.",
        inStock: true,
        deliveryDays: 3,
        rating: 4.7,
        reviewsCount: 54,
        model3DType: "lamp",
        defaultMaterial: {
          id: "brushed-brass",
          name: "Satin Brushed Brass",
          colorHex: "#d4af37",
          materialType: "metal",
          roughness: 0.3,
          metalness: 0.85,
        },
        availableVariants: [
          { id: "brushed-brass", name: "Satin Brushed Brass", colorHex: "#d4af37", materialType: "metal", roughness: 0.3, metalness: 0.85 },
          { id: "matte-black", name: "Matte Anodized Obsidian", colorHex: "#1c1c1c", materialType: "metal", roughness: 0.5, metalness: 0.6 },
          { id: "champagne-bronze", name: "Champagne Polished Bronze", colorHex: "#a98967", materialType: "metal", roughness: 0.25, metalness: 0.9 },
        ],
        features: ["CRI 98+ Eye-Care LED", "Step-less 2200K-4500K Color Temp", "Solid 18kg Granite Base", "Smart Home App Compatible"],
        tags: ["Lighting", "Floor Lamp", "Brass", "Designer"],
      },
    ],
  },
  {
    id: "luxury-living-lounge",
    name: "Architectural Living Room Salon",
    roomType: "Living Room",
    category: "living",
    areaSqFt: 520,
    beforeImage: "/trick/living-room-empty.webp",
    afterImage: "/port/staged-modern.jpg",
    style: "modern",
    styleLabel: "High-End Italian Luxury",
    styleDescription: "Curved organic bouclé cloud sectional, fluted calacatta marble centerpiece table, accent velvet armchairs and warm indirect coving.",
    estimatedStagingSavingINR: 480000,
    stagingTurnaroundHours: 24,
    styleVariations: [
      {
        style: "modern",
        label: "Modern Minimalist",
        image: "/port/staged-modern.jpg",
        description: "Open-concept modern living with organic curves, neutral palette and architectural lighting."
      },
      {
        style: "luxury",
        label: "Luxury Velvet & Marble",
        image: "/port/staged-luxury.jpg",
        description: "Rich jewel-toned velvet seating, mirror-polished brass accents and bookmatched marble finishes."
      },
      {
        style: "scandinavian",
        label: "Scandinavian Organic",
        image: "/port/staged-scandinavian.jpg",
        description: "Warm blonde birch woods, chunky woven wool rugs and serene light-filled Nordic minimalism."
      },
      {
        style: "japandi",
        label: "Japandi Zen Salon",
        image: "/port/staged-japandi.jpg",
        description: "Wabi-sabi aesthetics with low-slung wooden frames, paper lantern light sculptures and bonsai elements."
      },
    ],
    furnitureItems: [
      {
        id: "boucle-cloud-sofa-01",
        name: "Elysian Curved Bouclé Modular Sofa",
        category: "sofa",
        price: 185000,
        originalPrice: 220000,
        currency: "₹",
        brand: "Atelier Minimal",
        pinPosition: { x: 50, y: 68 },
        dimensions: { width: "320 cm", depth: "125 cm", height: "78 cm" },
        description: "Sculptural organic 4-piece sectional sofa upholstered in premium French textured bouclé with high-resilience ergonomic feather-down cushions.",
        inStock: true,
        deliveryDays: 7,
        rating: 5.0,
        reviewsCount: 64,
        model3DType: "sofa",
        defaultMaterial: {
          id: "cream-boucle",
          name: "French Ivory Bouclé",
          colorHex: "#f0ebe1",
          materialType: "fabric",
          roughness: 0.9,
          metalness: 0.02,
        },
        availableVariants: [
          { id: "cream-boucle", name: "French Ivory Bouclé", colorHex: "#f0ebe1", materialType: "fabric", roughness: 0.9, metalness: 0.02 },
          { id: "sage-boucle", name: "Nordic Sage Bouclé", colorHex: "#9baf9b", materialType: "fabric", roughness: 0.88, metalness: 0.02 },
          { id: "terracotta-velvet", name: "Burnt Terracotta Velvet", colorHex: "#a0522d", materialType: "fabric", roughness: 0.82, metalness: 0.06 },
          { id: "nero-fabric", name: "Midnight Charcoal Weave", colorHex: "#2b2b2e", materialType: "fabric", roughness: 0.85, metalness: 0.04 },
        ],
        features: ["Modular Magnetic Docking", "Memory Foam & Feather-Down Core", "OEKO-TEX Certified Fabric", "10-Year Frame Warranty"],
        tags: ["Sectional", "Boucle", "Living Room", "Award Winner"],
      },
      {
        id: "calacatta-coffee-table-02",
        name: "Pantheon Calacatta Fluted Coffee Table",
        category: "table",
        price: 58000,
        originalPrice: 72000,
        currency: "₹",
        brand: "Marmo D'Oro",
        pinPosition: { x: 52, y: 82 },
        dimensions: { width: "120 cm", depth: "75 cm", height: "38 cm" },
        description: "Low monolithic coffee table crafted with genuine 20mm Calacatta gold-veined marble slab seated upon dual fluted travertine pedestal columns.",
        inStock: true,
        deliveryDays: 5,
        rating: 4.9,
        reviewsCount: 39,
        model3DType: "table",
        defaultMaterial: {
          id: "calacatta-gold",
          name: "Calacatta Gold Marble",
          colorHex: "#f4f0ea",
          materialType: "marble",
          roughness: 0.22,
          metalness: 0.12,
        },
        availableVariants: [
          { id: "calacatta-gold", name: "Calacatta Gold Marble", colorHex: "#f4f0ea", materialType: "marble", roughness: 0.22, metalness: 0.12 },
          { id: "verde-guatemala", name: "Verde Guatemala Green Marble", colorHex: "#274e3a", materialType: "marble", roughness: 0.2, metalness: 0.14 },
          { id: "smoked-walnut", name: "Smoked American Walnut", colorHex: "#432818", materialType: "wood", roughness: 0.55, metalness: 0.05 },
        ],
        features: ["Beveled Bullnose Edge", "Stain-Proof Nano Sealing", "Dual Fluted Plinth Base", "Includes Care Kit"],
        tags: ["Coffee Table", "Marble", "Living Room", "Luxury"],
      },
      {
        id: "lounge-armchair-03",
        name: "Solstice Swivel Lounge Armchair",
        category: "chair",
        price: 46000,
        originalPrice: 58000,
        currency: "₹",
        brand: "Kobenhavn Design",
        pinPosition: { x: 18, y: 64 },
        dimensions: { width: "88 cm", depth: "92 cm", height: "76 cm" },
        description: "360-degree silent swivel lounge chair with continuous ergonomic shell, wrapped in top-grain saddle leather and cushioned with high-density latex.",
        inStock: true,
        deliveryDays: 4,
        rating: 4.8,
        reviewsCount: 42,
        model3DType: "chair",
        defaultMaterial: {
          id: "caramel-leather",
          name: "Caramel Saddle Leather",
          colorHex: "#a76d3e",
          materialType: "leather",
          roughness: 0.42,
          metalness: 0.1,
        },
        availableVariants: [
          { id: "caramel-leather", name: "Caramel Saddle Leather", colorHex: "#a76d3e", materialType: "leather", roughness: 0.42, metalness: 0.1 },
          { id: "ivory-boucle", name: "Ivory Teddy Bouclé", colorHex: "#f7f3ec", materialType: "fabric", roughness: 0.9, metalness: 0.02 },
          { id: "forest-velvet", name: "Deep Emerald Velvet", colorHex: "#1c3b2b", materialType: "fabric", roughness: 0.78, metalness: 0.08 },
        ],
        features: ["Heavy-Duty 360° Bearing", "Full-Grain Italian Leather", "Cold-Cured Molded Foam", "Floor-Safe Silicone Glides"],
        tags: ["Armchair", "Swivel", "Leather", "Ergonomic"],
      },
      {
        id: "diptych-art-04",
        name: "Aura Diptych Minimalist Wall Sculptures",
        category: "painting",
        price: 42000,
        originalPrice: 54000,
        currency: "₹",
        brand: "Galerie Moderniste",
        pinPosition: { x: 74, y: 32 },
        dimensions: { width: "180 cm (2x 85cm)", depth: "6 cm", height: "120 cm" },
        description: "Two-panel coordinated dimensional relief paintings featuring architectural arch carvings, muted stone wash pigments and slim black steel framing.",
        inStock: true,
        deliveryDays: 3,
        rating: 4.9,
        reviewsCount: 19,
        model3DType: "painting",
        defaultMaterial: {
          id: "stone-arch",
          name: "Muted Travertine & Clay",
          colorHex: "#d9d0c3",
          materialType: "canvas",
          roughness: 0.92,
          metalness: 0.06,
        },
        availableVariants: [
          { id: "stone-arch", name: "Muted Travertine & Clay", colorHex: "#d9d0c3", materialType: "canvas", roughness: 0.92, metalness: 0.06 },
          { id: "monochrome-grid", name: "Monochrome Bauhaus Geometry", colorHex: "#303030", materialType: "canvas", roughness: 0.88, metalness: 0.1 },
        ],
        features: ["Set of 2 Paired Canvases", "Reinforced Aluminum Subframe", "Gallery Hanging System Included", "Fade-Proof UV Resistant"],
        tags: ["Diptych", "Art", "Wall Decor", "Minimalist"],
      },
    ],
  },
  {
    id: "scandinavian-dining-hall",
    name: "Nordic Minimalist Dining Hall",
    roomType: "Dining Hall",
    category: "dining",
    areaSqFt: 320,
    beforeImage: "/trick/dining-room-empty.webp",
    afterImage: "/trick/dining-room-scandinavian.jpg",
    style: "scandinavian",
    styleLabel: "Scandinavian Organic Oak",
    styleDescription: "Solid white-oiled oak dining table, sculptural woven paper cord chairs, fluted pendant canopy and botanical ceramic centerpiece.",
    estimatedStagingSavingINR: 280000,
    stagingTurnaroundHours: 24,
    styleVariations: [
      {
        style: "scandinavian",
        label: "Scandinavian Light Oak",
        image: "/trick/dining-room-scandinavian.jpg",
        description: "Airy Nordic dining with natural solid oak, organic linen and warm matte lighting."
      },
      {
        style: "luxury",
        label: "Italian Travertine & Brass",
        image: "/trick/dining-room-luxury.jpg",
        description: "Substantial travertine dining slab with brass cantilever chairs and crystal chandelier."
      },
      {
        style: "midcentury",
        label: "Mid-Century Teak",
        image: "/trick/dining-room-midcentury.jpg",
        description: "Iconic tapered teak wood dining table with curved wishlist spindle chairs."
      },
      {
        style: "modern",
        label: "Modern Industrial Loft",
        image: "/trick/dining-room-modern.jpg",
        description: "Smoked glass & black steel dining ensemble with dramatic linear track lighting."
      },
    ],
    furnitureItems: [
      {
        id: "nordic-dining-table-01",
        name: "Stockholm Solid White-Oak Dining Table (8-Seater)",
        category: "table",
        price: 94000,
        originalPrice: 118000,
        currency: "₹",
        brand: "Svenska Möbler",
        pinPosition: { x: 50, y: 70 },
        dimensions: { width: "240 cm", depth: "100 cm", height: "76 cm" },
        description: "Heritage dining table in sustainably harvested European White Oak, finished with bio-based hardwax oil that resists wine, heat, and moisture.",
        inStock: true,
        deliveryDays: 6,
        rating: 4.9,
        reviewsCount: 38,
        model3DType: "table",
        defaultMaterial: {
          id: "white-oak",
          name: "Natural White Oiled Oak",
          colorHex: "#d2b48c",
          materialType: "wood",
          roughness: 0.62,
          metalness: 0.02,
        },
        availableVariants: [
          { id: "white-oak", name: "Natural White Oiled Oak", colorHex: "#d2b48c", materialType: "wood", roughness: 0.62, metalness: 0.02 },
          { id: "smoked-oak", name: "Smoked Charcoal Oak", colorHex: "#3c342c", materialType: "wood", roughness: 0.58, metalness: 0.04 },
          { id: "warm-walnut", name: "American Black Walnut", colorHex: "#5c3d2e", materialType: "wood", roughness: 0.5, metalness: 0.03 },
        ],
        features: ["Solid 40mm Oak Slab Top", "Chavetero Joint Detailing", "Water-Repellent Natural Oil Finish", "Seats 8-10 Comfortably"],
        tags: ["Dining Table", "Solid Oak", "Dining Room", "Handcrafted"],
      },
      {
        id: "wishbone-dining-chair-02",
        name: "Astrid Woven Paper Cord Dining Chair (Set of 2)",
        category: "chair",
        price: 36000,
        originalPrice: 46000,
        currency: "₹",
        brand: "Copenhagen Craft",
        pinPosition: { x: 30, y: 74 },
        dimensions: { width: "56 cm", depth: "54 cm", height: "78 cm" },
        description: "Steam-bent solid beech wood frame with 120 meters of hand-woven durable natural paper cord seating, designed for effortless posture and timeless beauty.",
        inStock: true,
        deliveryDays: 4,
        rating: 4.9,
        reviewsCount: 51,
        model3DType: "chair",
        defaultMaterial: {
          id: "natural-cord",
          name: "Bleached Oak & Natural Cord",
          colorHex: "#e3d3bd",
          materialType: "wood",
          roughness: 0.7,
          metalness: 0.02,
        },
        availableVariants: [
          { id: "natural-cord", name: "Bleached Oak & Natural Cord", colorHex: "#e3d3bd", materialType: "wood", roughness: 0.7, metalness: 0.02 },
          { id: "black-cord", name: "Matte Black & Charcoal Cord", colorHex: "#222222", materialType: "wood", roughness: 0.6, metalness: 0.08 },
        ],
        features: ["Hand-Woven Paper Cord Seat", "Steam-Bent Solid Backrest", "Set of 2 Chairs", "Stackable Design"],
        tags: ["Dining Chairs", "Set of 2", "Woven", "Iconic"],
      },
      {
        id: "dining-pendant-03",
        name: "Halo Ceramic Multi-Tier Pendant Chandelier",
        category: "lamp",
        price: 32000,
        originalPrice: 40000,
        currency: "₹",
        brand: "Lumen Scandinavia",
        pinPosition: { x: 50, y: 32 },
        dimensions: { width: "65 cm", depth: "65 cm", height: "45 cm" },
        description: "Layered matte bisque ceramic shades casting soft glare-free downward illumination, suspended on braided linen cables with brass ceiling rosette.",
        inStock: true,
        deliveryDays: 3,
        rating: 4.8,
        reviewsCount: 22,
        model3DType: "lamp",
        defaultMaterial: {
          id: "matte-white",
          name: "Matte Bisque Ceramic",
          colorHex: "#f1ece4",
          materialType: "marble",
          roughness: 0.85,
          metalness: 0.05,
        },
        availableVariants: [
          { id: "matte-white", name: "Matte Bisque Ceramic", colorHex: "#f1ece4", materialType: "marble", roughness: 0.85, metalness: 0.05 },
          { id: "brushed-brass", name: "Spun Golden Brass", colorHex: "#cfb53b", materialType: "metal", roughness: 0.32, metalness: 0.85 },
        ],
        features: ["3-Tier Anti-Glare Diffuser", "Adjustable Suspension Cable (up to 2.5m)", "Dimmable Warm White LEDs", "Zero Strobe Driver"],
        tags: ["Chandelier", "Pendant", "Ceramic", "Dining"],
      },
    ],
  },
  {
    id: "executive-home-office",
    name: "Architectural Executive Office Studio",
    roomType: "Executive Office",
    category: "office",
    areaSqFt: 260,
    beforeImage: "/trick/home-office-empty.webp",
    afterImage: "/trick/home-office-modern.jpg",
    style: "modern",
    styleLabel: "Modern Executive Studio",
    styleDescription: "Sculptural walnut & saddle leather executive desk, ergonomic cantilever task chair, architectural grid wall shelf and acoustic wood paneling.",
    estimatedStagingSavingINR: 240000,
    stagingTurnaroundHours: 24,
    styleVariations: [
      {
        style: "modern",
        label: "Executive Modern",
        image: "/trick/home-office-modern.jpg",
        description: "Dark walnut, concealed wire channels, ambient monitor glow and premium leather ergonomics."
      },
      {
        style: "luxury",
        label: "Luxury Leather & Marble",
        image: "/trick/home-office-luxury.jpg",
        description: "Black Portoro marble desk top, brass accents and executive Chesterfield armchairs."
      },
      {
        style: "scandinavian",
        label: "Scandinavian Creative",
        image: "/trick/home-office-scandinavian.jpg",
        description: "Airy light wood craft desk, felt pin-boards, natural daylight optimization."
      },
      {
        style: "midcentury",
        label: "Mid-Century Library",
        image: "/trick/home-office-midcentury.jpg",
        description: "Warm teak shelving, vintage bankers lamp, cognac leather reading chair."
      },
    ],
    furnitureItems: [
      {
        id: "executive-desk-01",
        name: "Krypton Floating Walnut & Leather Executive Desk",
        category: "table",
        price: 88000,
        originalPrice: 110000,
        currency: "₹",
        brand: "Studio Werkstatt",
        pinPosition: { x: 50, y: 68 },
        dimensions: { width: "190 cm", depth: "85 cm", height: "76 cm" },
        description: "Beveled American walnut desktop with inlaid magnetic Italian saddle leather writing pad, integrated power pop-up hubs, and dual concealed drawers.",
        inStock: true,
        deliveryDays: 5,
        rating: 5.0,
        reviewsCount: 31,
        model3DType: "table",
        defaultMaterial: {
          id: "walnut-leather",
          name: "Black Walnut & Saddle Tan",
          colorHex: "#4a3222",
          materialType: "wood",
          roughness: 0.48,
          metalness: 0.08,
        },
        availableVariants: [
          { id: "walnut-leather", name: "Black Walnut & Saddle Tan", colorHex: "#4a3222", materialType: "wood", roughness: 0.48, metalness: 0.08 },
          { id: "black-ash", name: "Ebonized Ash & Obsidian Leather", colorHex: "#1a1a1c", materialType: "wood", roughness: 0.42, metalness: 0.12 },
          { id: "natural-oak", name: "Bleached Oak & Bone Leather", colorHex: "#cbbba5", materialType: "wood", roughness: 0.6, metalness: 0.04 },
        ],
        features: ["Inlaid Leather Writing Mat", "Integrated Pop-Up Power & USB-C", "Soft-Close Drawer Slides", "Wire-Free Magnetic Leg Conduit"],
        tags: ["Desk", "Office", "Walnut", "Executive"],
      },
      {
        id: "ergonomic-task-chair-02",
        name: "Aeris Ergonomic Leather Executive Chair",
        category: "chair",
        price: 52000,
        originalPrice: 65000,
        currency: "₹",
        brand: "ErgoStudio Germany",
        pinPosition: { x: 50, y: 55 },
        dimensions: { width: "68 cm", depth: "68 cm", height: "118-128 cm" },
        description: "German-engineered synchro-tilt mechanism with 4D adjustable armrests, active lumbar feedback, and perforated breathable Nappa leather upholstery.",
        inStock: true,
        deliveryDays: 3,
        rating: 4.9,
        reviewsCount: 76,
        model3DType: "chair",
        defaultMaterial: {
          id: "nappa-black",
          name: "Perforated Black Nappa",
          colorHex: "#212124",
          materialType: "leather",
          roughness: 0.4,
          metalness: 0.15,
        },
        availableVariants: [
          { id: "nappa-black", name: "Perforated Black Nappa", colorHex: "#212124", materialType: "leather", roughness: 0.4, metalness: 0.15 },
          { id: "nappa-cognac", name: "Cognac Tan Nappa", colorHex: "#8f572a", materialType: "leather", roughness: 0.42, metalness: 0.12 },
          { id: "cool-grey", name: "Mineral Grey Wool Tech Weave", colorHex: "#5c636e", materialType: "fabric", roughness: 0.75, metalness: 0.05 },
        ],
        features: ["Synchro-Tilt & 4-Position Lock", "Dynamic Auto-Adjusting Lumbar", "BIFMA Class 4 Gas Lift", "Smooth Cast Rollerblade Wheels"],
        tags: ["Task Chair", "Ergonomic", "Nappa Leather", "Health"],
      },
      {
        id: "bauhaus-desk-lamp-03",
        name: "Vector Precision Counterpoise Task Lamp",
        category: "lamp",
        price: 18500,
        originalPrice: 24000,
        currency: "₹",
        brand: "Optika Design",
        pinPosition: { x: 32, y: 58 },
        dimensions: { width: "18 cm", depth: "60 cm", height: "55 cm" },
        description: "Linear counterweighted articulated arm in matte anodized aluminum with directional high-CRI glare-free asymmetric task lighting.",
        inStock: true,
        deliveryDays: 2,
        rating: 4.8,
        reviewsCount: 29,
        model3DType: "lamp",
        defaultMaterial: {
          id: "anodized-black",
          name: "Matte Anodized Black",
          colorHex: "#1b1c1e",
          materialType: "metal",
          roughness: 0.35,
          metalness: 0.8,
        },
        availableVariants: [
          { id: "anodized-black", name: "Matte Anodized Black", colorHex: "#1b1c1e", materialType: "metal", roughness: 0.35, metalness: 0.8 },
          { id: "raw-brass", name: "Raw Satin Brass", colorHex: "#c8a148", materialType: "metal", roughness: 0.28, metalness: 0.9 },
        ],
        features: ["Zero-Glare Asymmetric Beam", "Contactless Gesture Dimming", "Precision Counterweight Balance", "50,000 Hour Rated LEDs"],
        tags: ["Desk Lamp", "LED", "Precision", "Minimalist"],
      },
    ],
  },
  {
    id: "gourmet-chef-kitchen",
    name: "Luxury Minimalist Island Kitchen",
    roomType: "Chef's Kitchen",
    category: "kitchen",
    areaSqFt: 310,
    beforeImage: "/trick/kitchen-empty.webp",
    afterImage: "/trick/kitchen-modern.jpg",
    style: "modern",
    styleLabel: "Modern German Kitchen",
    styleDescription: "Waterfall quartz island countertop, fluted timber barstools, integrated seamless induction and warm under-counter shadowline lighting.",
    estimatedStagingSavingINR: 420000,
    stagingTurnaroundHours: 24,
    styleVariations: [
      {
        style: "modern",
        label: "Modern Matte & Quartz",
        image: "/trick/kitchen-modern.jpg",
        description: "Monolithic quartz island, handleless matte lacquer cabinetry and flush appliances."
      },
      {
        style: "luxury",
        label: "Grand Marble & Brass",
        image: "/trick/kitchen-luxury.jpg",
        description: "Bookmatched Arabescato marble backsplashes, fluted brass accents and wine display."
      },
      {
        style: "scandinavian",
        label: "Scandinavian Light Ash",
        image: "/trick/kitchen-scandinavian.jpg",
        description: "Light ash woodwork, open floating spice shelving and warm ceramic tiles."
      },
    ],
    furnitureItems: [
      {
        id: "island-barstool-01",
        name: "Kyoto Sculptural Solid Ash Barstool (Set of 3)",
        category: "chair",
        price: 48000,
        originalPrice: 62000,
        currency: "₹",
        brand: "Moku Woodworks",
        pinPosition: { x: 45, y: 72 },
        dimensions: { width: "44 cm", depth: "42 cm", height: "68 cm" },
        description: "Sculpted saddle seat in solid Japanese ash with seamless joinery and a solid brass footrest bar, set of 3 counter-height barstools.",
        inStock: true,
        deliveryDays: 4,
        rating: 4.9,
        reviewsCount: 35,
        model3DType: "chair",
        defaultMaterial: {
          id: "natural-ash",
          name: "Natural White Ash & Brass",
          colorHex: "#decbb5",
          materialType: "wood",
          roughness: 0.65,
          metalness: 0.05,
        },
        availableVariants: [
          { id: "natural-ash", name: "Natural White Ash & Brass", colorHex: "#decbb5", materialType: "wood", roughness: 0.65, metalness: 0.05 },
          { id: "ebonized-ash", name: "Ebonized Black Ash & Brass", colorHex: "#262626", materialType: "wood", roughness: 0.55, metalness: 0.1 },
          { id: "smoked-walnut", name: "Smoked American Walnut", colorHex: "#483222", materialType: "wood", roughness: 0.5, metalness: 0.05 },
        ],
        features: ["Ergonomic Contoured Saddle Seat", "Solid Brass Protective Footrest", "Includes Set of 3 Barstools", "Felt Glides Included"],
        tags: ["Barstools", "Set of 3", "Kitchen Island", "Solid Wood"],
      },
      {
        id: "linear-island-pendant-02",
        name: "Horizon Linear Brass Island Chandelier",
        category: "lamp",
        price: 38500,
        originalPrice: 48000,
        currency: "₹",
        brand: "Lumiere Atelier",
        pinPosition: { x: 50, y: 35 },
        dimensions: { width: "150 cm", depth: "8 cm", height: "12 cm" },
        description: "Slim architectural linear pendant light crafted from solid extruded brass with dual upward ambient and downward glare-free task diffusion.",
        inStock: true,
        deliveryDays: 3,
        rating: 4.8,
        reviewsCount: 28,
        model3DType: "lamp",
        defaultMaterial: {
          id: "satin-brass",
          name: "Brushed Satin Gold",
          colorHex: "#d4af37",
          materialType: "metal",
          roughness: 0.3,
          metalness: 0.88,
        },
        availableVariants: [
          { id: "satin-brass", name: "Brushed Satin Gold", colorHex: "#d4af37", materialType: "metal", roughness: 0.3, metalness: 0.88 },
          { id: "matte-black", name: "Matte Stealth Black", colorHex: "#1a1a1a", materialType: "metal", roughness: 0.45, metalness: 0.65 },
        ],
        features: ["Dual-Directional Up & Down Illumination", "Dali / Triac Dimmable", "Ultra-Slim 25mm Profile", "High CRI 95+ Color Accuracy"],
        tags: ["Pendant", "Linear", "Kitchen", "Brass"],
      },
    ],
  },
  {
    id: "outdoor-terrace-lounge",
    name: "Skyline Outdoor Terrace Lounge",
    roomType: "Terrace Lounge",
    category: "outdoor",
    areaSqFt: 450,
    beforeImage: "/trick/outdoor-empty.webp",
    afterImage: "/trick/outdoor-luxury.jpg",
    style: "luxury",
    styleLabel: "Resort Style Outdoor Living",
    styleDescription: "All-weather teak modular daybed, fluted concrete fire table, weather-resistant Sunbrella cushions and ambient solar lanterns.",
    estimatedStagingSavingINR: 350000,
    stagingTurnaroundHours: 24,
    styleVariations: [
      {
        style: "luxury",
        label: "Luxury Resort Lounge",
        image: "/trick/outdoor-luxury.jpg",
        description: "Plush oversized daybeds, concrete fire pit and panoramic sky lounge ambiance."
      },
      {
        style: "modern",
        label: "Modern Minimalist Patio",
        image: "/trick/outdoor-modern.jpg",
        description: "Sleek powder-coated aluminum frames with charcoal quick-dry reticulated foam."
      },
      {
        style: "scandinavian",
        label: "Scandinavian Teak Balcony",
        image: "/trick/outdoor-scandinavian.jpg",
        description: "Natural grade-A teak slats, woven rope weaving and potted olive trees."
      },
    ],
    furnitureItems: [
      {
        id: "outdoor-daybed-01",
        name: "Capri Grade-A Teak Outdoor Modular Daybed",
        category: "sofa",
        price: 142000,
        originalPrice: 175000,
        currency: "₹",
        brand: "Capri Outdoor Living",
        pinPosition: { x: 50, y: 70 },
        dimensions: { width: "260 cm", depth: "180 cm", height: "72 cm" },
        description: "Sustainably harvested Indonesian Grade-A teak frame with fast-dry reticulated foam cushions wrapped in UV & mildew proof Sunbrella performance fabric.",
        inStock: true,
        deliveryDays: 6,
        rating: 4.9,
        reviewsCount: 23,
        model3DType: "sofa",
        defaultMaterial: {
          id: "sunbrella-sand",
          name: "Sunbrella Sandstone",
          colorHex: "#e3dbcb",
          materialType: "fabric",
          roughness: 0.88,
          metalness: 0.02,
        },
        availableVariants: [
          { id: "sunbrella-sand", name: "Sunbrella Sandstone", colorHex: "#e3dbcb", materialType: "fabric", roughness: 0.88, metalness: 0.02 },
          { id: "sunbrella-navy", name: "Sunbrella Mediterranean Navy", colorHex: "#1c2b42", materialType: "fabric", roughness: 0.85, metalness: 0.04 },
          { id: "sunbrella-charcoal", name: "Sunbrella Charcoal Heather", colorHex: "#3f4045", materialType: "fabric", roughness: 0.86, metalness: 0.03 },
        ],
        features: ["Grade-A Plantation Teak", "Quick-Dry Open Cell Foam", "5-Year Sunbrella Colorfast Warranty", "Includes Heavy-Duty Weather Cover"],
        tags: ["Outdoor", "Daybed", "Teak", "Sunbrella"],
      },
      {
        id: "concrete-fire-table-02",
        name: "Vesuvius Fluted GFRC Concrete Fire Table",
        category: "table",
        price: 68000,
        originalPrice: 85000,
        currency: "₹",
        brand: "Elements Outdoor",
        pinPosition: { x: 52, y: 84 },
        dimensions: { width: "110 cm", depth: "110 cm", height: "40 cm" },
        description: "Glass-fiber reinforced architectural concrete low table with integrated 60,000 BTU smokeless electronic ignition gas burner and lava stone infill.",
        inStock: true,
        deliveryDays: 5,
        rating: 5.0,
        reviewsCount: 18,
        model3DType: "table",
        defaultMaterial: {
          id: "limestone-concrete",
          name: "Limestone GFRC Concrete",
          colorHex: "#ccc4b4",
          materialType: "marble",
          roughness: 0.75,
          metalness: 0.08,
        },
        availableVariants: [
          { id: "limestone-concrete", name: "Limestone GFRC Concrete", colorHex: "#ccc4b4", materialType: "marble", roughness: 0.75, metalness: 0.08 },
          { id: "basalt-concrete", name: "Basalt Charcoal Concrete", colorHex: "#38383a", materialType: "marble", roughness: 0.7, metalness: 0.1 },
        ],
        features: ["60,000 BTU Stainless Steel Burner", "Electronic Push-Button Spark Ignition", "Weatherproof & Freeze-Resistant", "Includes Black Lava Glass & Canvas Lid"],
        tags: ["Fire Table", "Concrete", "Outdoor", "Luxury"],
      },
    ],
  },
];
