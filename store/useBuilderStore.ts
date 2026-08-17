import { create } from "zustand";

export interface BuilderProject {
  id: string;
  name: string;
  type: string;
  location: string;
  thumbnail: string;
  gradient: string;
  videoUrl?: string;
  views: number;
  floors: number;
  rooms: number;
  status: "completed" | "in-progress";
  tourAvailable: boolean;
}

export interface BuilderReview {
  id: string;
  userName: string;
  userInitials: string;
  userGradient: string;
  rating: number;
  review: string;
  projectType: string;
  date: string;
}

export interface BuilderService {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
}

export type ProfessionalCategory =
  | "Builder"
  | "Architect"
  | "Interior Designer"
  | "Landscape Architect"
  | "Structural Engineer"
  | "Supplier";

export interface TransformationStage {
  id: string;
  step: number;
  title: string;
  badge?: string;
  description: string;
  imageUrl: string;
}

export interface HouseTransformation {
  title: string;
  subtitle: string;
  location: string;
  duration: string;
  budgetSaved: string;
  stages: TransformationStage[];
}

export interface Builder {
  id: string;
  name: string;
  company: string;
  category: ProfessionalCategory;
  avatar: string;
  coverGradient: string;
  tagline: string;
  bio: string;
  location: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  projectCount: number;
  experience: string;
  verified: boolean;
  featured: boolean;
  contactEmail: string;
  website: string;
  completedProjects: number;
  activeTours: number;
  totalViews: number;
  startingPrice: string;
  avgPricePerSqft: string;
  responseTime: string;
  services: BuilderService[];
  reviews: BuilderReview[];
  projects: BuilderProject[];
  houseTransformation?: HouseTransformation;
}

export const houseTransformationsMap: Record<string, HouseTransformation> = {
  house1: {
    title: "Modernist Oceanview Villa Architectural Transformation",
    subtitle: "From raw site survey & structural cantilever framing to a fully staged ultra-luxury seaside residence.",
    location: "Goa, India",
    duration: "7 Months",
    budgetSaved: "₹18.5 Lakhs",
    stages: [
      { id: "h1-1", step: 1, title: "Raw Site Survey & Terrain Mapping", badge: "Phase 1: Survey", description: "Comprehensive contour modeling, geotechnical soil sampling, and structural footprint alignment.", imageUrl: "/house1/transform-1.png" },
      { id: "h1-2", step: 2, title: "Architectural 3D Schematic & Structural Framing", badge: "Phase 2: Framing", description: "Engineering seismic-resistant RCC framework and cantilevered terraces with panoramic viewports.", imageUrl: "/house1/transform-2.png" },
      { id: "h1-3", step: 3, title: "Reinforced Concrete Core & Cantilever Erection", badge: "Phase 3: Core Shell", description: "Precision casting of post-tensioned slabs, floating rooflines, and double-height ceiling voids.", imageUrl: "/house1/transform-3.png" },
      { id: "h1-4", step: 4, title: "Thermal Double-Glazed Facade & Weatherproofing", badge: "Phase 4: Glazing", description: "Installation of ultra-clear low-E acoustic glass facades and climate-sealed thermal barriers.", imageUrl: "/house1/transform-4.png" },
      { id: "h1-5", step: 5, title: "Interior Spatial Flow & Natural Light Chases", badge: "Phase 5: Spatial Layout", description: "Demarcation of open-plan living zones, skylight shafts, and integrated HVAC ventilation.", imageUrl: "/house1/transform-5.png" },
      { id: "h1-6", step: 6, title: "Italian Travertine & Teak Cladding Finishes", badge: "Phase 6: Finishes", description: "Hand-honed stone cladding, fluted wood paneling, and architectural cove lighting channels.", imageUrl: "/house1/transform-6.png" },
      { id: "h1-7", step: 7, title: "Finished Luxury Villa Masterpiece", badge: "Phase 7: Completed", description: "Fully commissioned turnkey luxury residence with infinity deck, ambient landscape illumination, and bespoke staging.", imageUrl: "/house1/transform-7.png" },
    ],
  },
  house2: {
    title: "Sustainable Eco-Heritage Residence Transformation",
    subtitle: "Preserving cultural architectural roots while integrating cutting-edge passive solar systems.",
    location: "Ahmedabad, Gujarat",
    duration: "5.5 Months",
    budgetSaved: "₹14.2 Lakhs",
    stages: [
      { id: "h2-1", step: 1, title: "Heritage Structure Assessment & Sunlight Mapping", badge: "Phase 1: Assessment", description: "Non-destructive testing of structural integrity and solar orientation analysis for passive cooling.", imageUrl: "/house2/transform-1.png" },
      { id: "h2-2", step: 2, title: "Bamboo Composite Reinforcement & Earth Walls", badge: "Phase 2: Eco-Structure", description: "Erecting treated bamboo trusses and breathable compressed stabilized earth block partitions.", imageUrl: "/house2/transform-2.png" },
      { id: "h2-3", step: 3, title: "Biophilic Central Courtyard & Jaali Lattice Integration", badge: "Phase 3: Micro-Climate", description: "Constructing traditional Jaali lattice screens and micro-climate water bodies for natural wind cooling.", imageUrl: "/house2/transform-3.png" },
      { id: "h2-4", step: 4, title: "Artisanal Terracotta & Kota Stone Flooring", badge: "Phase 4: Artisanal Detail", description: "Laying thermal-mass polished Kota stone slabs and handcrafted terracotta roof insulation tiles.", imageUrl: "/house2/transform-4.png" },
      { id: "h2-5", step: 5, title: "Completed Eco-Sanctuary Landmark", badge: "Phase 5: Completed", description: "A breath-taking sustainable home maintaining a 7°C temperature reduction naturally without heavy air conditioning.", imageUrl: "/house2/transform-5.png" },
    ],
  },
  house3: {
    title: "Metropolitan Glasshouse & Modern Facade Transformation",
    subtitle: "Re-engineering a dated concrete structure into an open-concept architectural icon.",
    location: "Delhi NCR, India",
    duration: "6 Months",
    budgetSaved: "₹22.0 Lakhs",
    stages: [
      { id: "h3-1", step: 1, title: "Demolition & Load-Bearing Beam Insertion", badge: "Phase 1: Demolition", description: "Safe structural demolition of non-load bearing interior walls and installing high-tensile steel I-beams.", imageUrl: "/house3/transform-1.png" },
      { id: "h3-2", step: 2, title: "Double-Height Steel Portals & Glass Envelope", badge: "Phase 2: Steel Atrium", description: "Erecting a dramatic 24-foot double-height glass atrium framework with motorized louvers.", imageUrl: "/house3/transform-2.png" },
      { id: "h3-3", step: 3, title: "Acoustic Glass Curtain Walls & Concealed MEP", badge: "Phase 3: Envelope & MEP", description: "Installing sound-insulated triple-glazed curtain walls and centralized air purification systems.", imageUrl: "/house3/transform-3.png" },
      { id: "h3-4", step: 4, title: "Architectural Millwork & Linear Accent Illumination", badge: "Phase 4: Millwork", description: "Custom geometric woodwork, bronze accents, and smart dimmable magnetic track lighting.", imageUrl: "/house3/transform-4.png" },
      { id: "h3-5", step: 5, title: "Finished Metropolitan Architectural Landmark", badge: "Phase 5: Completed", description: "Spectacular contemporary facade with integrated private garden and luminous evening ambiance.", imageUrl: "/house3/transform-5.png" },
    ],
  },
  house4: {
    title: "Boutique Luxury Penthouse Interior & Structural Makeover",
    subtitle: "A meticulous conversion from bare concrete shell to opulent haute-couture living.",
    location: "Pune & Mumbai",
    duration: "4.5 Months",
    budgetSaved: "₹16.8 Lakhs",
    stages: [
      { id: "h4-1", step: 1, title: "Raw Concrete Shell & Laser Spatial Survey", badge: "Phase 1: 3D Scan", description: "3D LiDAR spatial scanning to millimeter precision for bespoke furniture and ceiling alignments.", imageUrl: "/house4/transform-1.png" },
      { id: "h4-2", step: 2, title: "Concealed Home Automation & Acoustic Insulation", badge: "Phase 2: Smart Wiring", description: "Laying 4,000+ feet of concealed low-voltage smart wiring, audio conduits, and sound-dampening drywall.", imageUrl: "/house4/transform-2.png" },
      { id: "h4-3", step: 3, title: "Bookmatched Italian Statuario Marble Installation", badge: "Phase 3: Stone Artistry", description: "Precision waterjet cutting and seamless dry-lay installation of rare imported marble slabs.", imageUrl: "/house4/transform-3.png" },
      { id: "h4-4", step: 4, title: "Architectural Cove Coffering & Recessed Luminaires", badge: "Phase 4: Lighting", description: "Multi-layered drop ceilings with museum-grade 98+ CRI warm dimmable illumination.", imageUrl: "/house4/transform-4.png" },
      { id: "h4-5", step: 5, title: "Bespoke Walnut Veneer & Brass Inlay Paneling", badge: "Phase 5: Cabinetry", description: "Handcrafted fluted timber wall paneling concealing hidden pivot doors and storage units.", imageUrl: "/house4/transform-5.png" },
      { id: "h4-6", step: 6, title: "Custom Designer Staging & Silk Drapery", badge: "Phase 6: Staging", description: "Curated contemporary designer furnishings, velvet upholstery, and acoustic drapery installations.", imageUrl: "/house4/transform-6.png" },
      { id: "h4-7", step: 7, title: "Fully Realized Haute-Living Penthouse", badge: "Phase 7: Completed", description: "The pinnacle of urban elegance, complete with ambient balcony lounge and custom art curation.", imageUrl: "/house4/transform-7.png" },
    ],
  },
  house5: {
    title: "Tropical Waterfront Courtyard House Revitalization",
    subtitle: "Reimagining coastal vernacular living with weather-resistant hardwoods and panoramic deck.",
    location: "Alleppey / Kochi, Kerala",
    duration: "5 Months",
    budgetSaved: "₹12.4 Lakhs",
    stages: [
      { id: "h5-1", step: 1, title: "Waterfront Foundation Reinforcement & Timber Survey", badge: "Phase 1: Foundation", description: "Reinforcing moisture barriers, anti-termite treatment, and preserving century-old reclaimed Anjili timber.", imageUrl: "/house5/transform-1.png" },
      { id: "h5-2", step: 2, title: "Traditional Gable Roofline & Light Shaft Reconstruction", badge: "Phase 2: Roof & Light", description: "Re-framing high-pitched pitched roofs with insulated clay tiles and double-height light shafts.", imageUrl: "/house5/transform-2.png" },
      { id: "h5-3", step: 3, title: "Teak Wood Joinery & Weather-Shielded Verandas", badge: "Phase 3: Veranda Craft", description: "Custom hand-carved pillars, brass-fitted timber louvers, and shaded wrap-around sit-outs.", imageUrl: "/house5/transform-3.png" },
      { id: "h5-4", step: 4, title: "Completed Serene Waterfront Sanctuary", badge: "Phase 4: Completed", description: "An idyllic private retreat blending seamlessly with backwaters, featuring open-air rain showers and sunset deck.", imageUrl: "/house5/transform-4.png" },
    ],
  },
  house6: {
    title: "Parametric Smart Residence Computational Transformation",
    subtitle: "Algorithmic geometry turned into physical luxury with kinetic shading and fluid living spaces.",
    location: "Bangalore, Karnataka",
    duration: "6.5 Months",
    budgetSaved: "₹25.0 Lakhs",
    stages: [
      { id: "h6-1", step: 1, title: "Parametric Algorithmic Modeling & Structural Matrix", badge: "Phase 1: Computation", description: "Computational fluid dynamics simulation to optimize wind paths and organic structural curvature.", imageUrl: "/house6/transform-1.png" },
      { id: "h6-2", step: 2, title: "CNC-Milled Steel Ribs & Curved Shell Erection", badge: "Phase 2: Curved Shell", description: "Precision robotic fabrication and on-site assembly of continuous fluid structural ribs.", imageUrl: "/house6/transform-2.png" },
      { id: "h6-3", step: 3, title: "Dynamic Kinetic Facade Panels & High-Spec Insulation", badge: "Phase 3: Kinetic Facade", description: "Installing motorized responsive sun-tracking louvers that adapt continuously to solar angles.", imageUrl: "/house6/transform-3.png" },
      { id: "h6-4", step: 4, title: "Seamless Micro-Cement Flooring & Concealed Smart Hub", badge: "Phase 4: Smart Finishes", description: "Monolithic jointless micro-topping floors embedded with sub-floor hydronic radiant cooling.", imageUrl: "/house6/transform-4.png" },
      { id: "h6-5", step: 5, title: "Curved Glass Enclosures & Circadian Illumination", badge: "Phase 5: Glass & Light", description: "Custom curved architectural glass partitions and responsive ambient circadian illumination.", imageUrl: "/house6/transform-5.png" },
      { id: "h6-6", step: 6, title: "Completed Next-Gen Parametric Masterpiece", badge: "Phase 6: Completed", description: "A breathtaking architectural marvel that defines the next frontier of luxury residential design in India.", imageUrl: "/house6/transform-6.png" },
    ],
  },
};

const builders: Builder[] = [
  {
    id: "builder-1",
    name: "Arjun Kapoor",
    company: "Kapoor & Associates",
    category: "Builder",
    avatar: "AK",
    coverGradient: "from-blue-600 to-indigo-700",
    tagline: "Crafting luxury residences that redefine modern living",
    bio: "Award-winning architect with 15+ years of experience in luxury residential design. Specializing in villas and contemporary homes that blend seamlessly with their natural surroundings. Featured in Architectural Digest India and recognized with the IIID Award for Excellence.",
    location: "Mumbai, India",
    specializations: ["Luxury Villas", "Contemporary Homes", "Sustainable Design", "Interior Architecture"],
    rating: 4.9,
    reviewCount: 127,
    projectCount: 48,
    experience: "15+ years",
    verified: true,
    featured: true,
    contactEmail: "arjun@kapoor-associates.com",
    website: "kapoor-associates.com",
    completedProjects: 48,
    activeTours: 12,
    totalViews: 34500,
    startingPrice: "₹45L",
    avgPricePerSqft: "₹3,200",
    responseTime: "< 2 hours",
    services: [
      { id: "s1", name: "Turnkey Construction", description: "End-to-end construction from foundation to finishing with premium materials", icon: "🏗️" },
      { id: "s2", name: "Interior Design", description: "Luxury interior design with curated furniture and decor selection", icon: "🎨" },
      { id: "s3", name: "Renovation", description: "Transform existing spaces with modern design sensibilities", icon: "🔨" },
      { id: "s4", name: "Architecture", description: "Custom architectural design with 3D visualization and walkthroughs", icon: "📐" },
    ],
    reviews: [
      { id: "r1", userName: "Priya Sharma", userInitials: "PS", userGradient: "from-rose-400 to-pink-500", rating: 5, review: "Arjun transformed our vision into reality. The attention to detail in our villa is extraordinary. Every corner tells a story.", projectType: "Villa", date: "2 weeks ago" },
      { id: "r2", userName: "Rohit Mehta", userInitials: "RM", userGradient: "from-blue-400 to-cyan-500", rating: 5, review: "Professional, creative, and always on time. Our penthouse looks like it belongs in a magazine. Highly recommend!", projectType: "Apartment", date: "1 month ago" },
      { id: "r3", userName: "Anita Desai", userInitials: "AD", userGradient: "from-amber-400 to-orange-500", rating: 4, review: "Great design sensibility. The forest retreat exceeded our expectations. Minor delays but the result was worth the wait.", projectType: "Villa", date: "2 months ago" },
      { id: "r4", userName: "Vikash Kumar", userInitials: "VK", userGradient: "from-emerald-400 to-teal-500", rating: 5, review: "The Glass House is a masterpiece. Arjun understood exactly what we wanted — minimalism with warmth.", projectType: "House", date: "3 months ago" },
    ],
    projects: [
      { id: "bp-101", name: "Azure Infinity Pool Villa", type: "Villa", location: "Goa", thumbnail: "", gradient: "from-cyan-500 to-blue-600", videoUrl: "/poll/infinity-pool-showcase.mp4", views: 16500, floors: 3, rooms: 12, status: "completed", tourAvailable: true },
      { id: "bp-1", name: "Ocean Crest Villa", type: "Villa", location: "Goa", thumbnail: "", gradient: "from-cyan-500 to-blue-600", videoUrl: "/projects/boho-decor.mp4", views: 12800, floors: 3, rooms: 14, status: "completed", tourAvailable: true },
      { id: "bp-2", name: "Skyline Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-purple-500 to-indigo-600", videoUrl: "/projects/family-dinner.mp4", views: 6200, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-3", name: "Forest Retreat", type: "Villa", location: "Lonavala", thumbnail: "", gradient: "from-emerald-500 to-green-600", videoUrl: "/projects/quiet-garden.mp4", views: 5100, floors: 2, rooms: 10, status: "completed", tourAvailable: true },
      { id: "bp-4", name: "The Glass House", type: "House", location: "Pune", thumbnail: "", gradient: "from-sky-400 to-cyan-500", videoUrl: "/projects/air-fryer-dinner.mp4", views: 4800, floors: 1, rooms: 6, status: "completed", tourAvailable: true },
      { id: "bp-5", name: "Coral Bay Residence", type: "Villa", location: "Alibaug", thumbnail: "", gradient: "from-orange-400 to-rose-500", views: 2900, floors: 2, rooms: 11, status: "in-progress", tourAvailable: false },
      { id: "bp-6", name: "Urban Loft", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-slate-500 to-zinc-600", views: 4200, floors: 1, rooms: 5, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house1,
  },
  {
    id: "builder-2",
    name: "Meera Patel",
    company: "Studio Meera",
    category: "Architect",
    avatar: "MP",
    coverGradient: "from-rose-500 to-pink-600",
    tagline: "Sustainable architecture rooted in Indian heritage",
    bio: "Passionate about creating eco-conscious living spaces that honor traditional Indian architectural principles while embracing modern technology. Pioneer in bamboo construction and passive cooling systems. TEDx speaker on 'The Future of Sustainable Housing in India'.",
    location: "Ahmedabad, India",
    specializations: ["Sustainable Architecture", "Heritage Restoration", "Eco-Homes", "Bamboo Construction"],
    rating: 4.8,
    reviewCount: 93,
    projectCount: 35,
    experience: "12+ years",
    verified: true,
    featured: true,
    contactEmail: "meera@studiomeera.in",
    website: "studiomeera.in",
    completedProjects: 35,
    activeTours: 8,
    totalViews: 21200,
    startingPrice: "₹28L",
    avgPricePerSqft: "₹2,100",
    responseTime: "< 4 hours",
    services: [
      { id: "s5", name: "Turnkey Construction", description: "Eco-friendly construction using sustainable materials and methods", icon: "🏗️" },
      { id: "s6", name: "Interior Design", description: "Heritage-inspired interiors with modern sustainable materials", icon: "🎨" },
      { id: "s7", name: "Renovation", description: "Green renovation with energy-efficient upgrades", icon: "🔨" },
      { id: "s8", name: "Architecture", description: "Biophilic and passive design architecture", icon: "📐" },
    ],
    reviews: [
      { id: "r5", userName: "Deepak Joshi", userInitials: "DJ", userGradient: "from-green-400 to-emerald-500", rating: 5, review: "Meera's bamboo construction is genius. Our home stays cool naturally even in Ahmedabad summers. Truly innovative.", projectType: "House", date: "1 week ago" },
      { id: "r6", userName: "Kavita Reddy", userInitials: "KR", userGradient: "from-violet-400 to-purple-500", rating: 5, review: "The Heritage Courtyard Home is a dream. She perfectly blended traditional Rajasthani elements with modern living.", projectType: "House", date: "3 weeks ago" },
      { id: "r7", userName: "Suresh Nair", userInitials: "SN", userGradient: "from-cyan-400 to-blue-500", rating: 4, review: "Great sustainable approach. The solar integration works seamlessly. Would love to work with her again.", projectType: "House", date: "2 months ago" },
    ],
    projects: [
      { id: "bp-104", name: "Serenity Wellness Estate", type: "Villa", location: "Lonavala", thumbnail: "", gradient: "from-emerald-500 to-teal-600", videoUrl: "/poll/wellness-estate-stretch.mp4", views: 14800, floors: 2, rooms: 14, status: "completed", tourAvailable: true },
      { id: "bp-7", name: "Bamboo Haven", type: "House", location: "Ahmedabad", thumbnail: "", gradient: "from-lime-500 to-emerald-600", videoUrl: "/videos/suburban-ranch.mp4", views: 5600, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-8", name: "Heritage Courtyard Home", type: "House", location: "Jaipur", thumbnail: "", gradient: "from-amber-500 to-orange-600", views: 4200, floors: 2, rooms: 12, status: "completed", tourAvailable: true },
      { id: "bp-9", name: "Earth House", type: "Villa", location: "Udaipur", thumbnail: "", gradient: "from-stone-400 to-amber-600", views: 3800, floors: 1, rooms: 7, status: "completed", tourAvailable: true },
      { id: "bp-10", name: "Solar Residence", type: "House", location: "Vadodara", thumbnail: "", gradient: "from-yellow-400 to-orange-500", views: 2100, floors: 2, rooms: 9, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house2,
  },
  {
    id: "builder-3",
    name: "Vikram Singh",
    company: "VS Architects",
    category: "Architect",
    avatar: "VS",
    coverGradient: "from-amber-500 to-orange-600",
    tagline: "Transforming commercial spaces into iconic landmarks",
    bio: "Leading commercial architect known for designing some of India's most iconic office complexes and retail spaces. With a team of 40+ architects, VS Architects has delivered projects across 8 cities. Winner of the A+D Architecture Award 2024.",
    location: "Delhi NCR, India",
    specializations: ["Commercial Architecture", "Office Design", "Retail Spaces", "Urban Planning"],
    rating: 4.7,
    reviewCount: 156,
    projectCount: 72,
    experience: "20+ years",
    verified: true,
    featured: true,
    contactEmail: "vikram@vsarchitects.in",
    website: "vsarchitects.in",
    completedProjects: 72,
    activeTours: 18,
    totalViews: 52800,
    startingPrice: "₹1.2Cr",
    avgPricePerSqft: "₹4,500",
    responseTime: "< 6 hours",
    services: [
      { id: "s9", name: "Turnkey Construction", description: "Large-scale commercial construction with project management", icon: "🏗️" },
      { id: "s10", name: "Interior Design", description: "Corporate and retail interior design at scale", icon: "🎨" },
      { id: "s11", name: "Renovation", description: "Office space modernization and commercial upgrades", icon: "🔨" },
      { id: "s12", name: "Architecture", description: "Iconic commercial architecture and urban planning", icon: "📐" },
    ],
    reviews: [
      { id: "r8", userName: "Amit Gupta", userInitials: "AG", userGradient: "from-blue-400 to-indigo-500", rating: 5, review: "TechPark Alpha is the crown jewel of our portfolio. Vikram's team delivered a world-class facility on time and on budget.", projectType: "Commercial", date: "1 month ago" },
      { id: "r9", userName: "Neha Kapoor", userInitials: "NK", userGradient: "from-pink-400 to-rose-500", rating: 4, review: "The Innovation Hub is stunning. Great attention to employee wellbeing in the design. A few minor revisions needed but overall excellent.", projectType: "Office", date: "2 months ago" },
      { id: "r10", userName: "Rajesh Agarwal", userInitials: "RA", userGradient: "from-amber-400 to-yellow-500", rating: 5, review: "Nexus Mall has become a landmark. Vikram understood the retail experience perfectly. Footfall exceeded projections by 40%.", projectType: "Commercial", date: "3 months ago" },
    ],
    projects: [
      { id: "bp-105", name: "The Grand Pavilion Atrium", type: "Commercial", location: "Delhi NCR", thumbnail: "", gradient: "from-amber-400 to-rose-500", videoUrl: "/poll/grand-pavilion-decor.mp4", views: 13900, floors: 3, rooms: 28, status: "completed", tourAvailable: true },
      { id: "bp-11", name: "TechPark Alpha", type: "Commercial", location: "Gurugram", thumbnail: "", gradient: "from-blue-500 to-violet-600", videoUrl: "/projects/online-store.mp4", views: 12400, floors: 8, rooms: 45, status: "completed", tourAvailable: true },
      { id: "bp-12", name: "Nexus Mall", type: "Commercial", location: "Noida", thumbnail: "", gradient: "from-pink-500 to-rose-600", videoUrl: "/projects/wedding-aisle.mp4", views: 9800, floors: 4, rooms: 60, status: "completed", tourAvailable: true },
      { id: "bp-13", name: "Innovation Hub", type: "Office", location: "Delhi", thumbnail: "", gradient: "from-teal-500 to-cyan-600", videoUrl: "/projects/family-car.mp4", views: 7600, floors: 6, rooms: 32, status: "completed", tourAvailable: true },
      { id: "bp-14", name: "Skyway Tower", type: "Commercial", location: "Chandigarh", thumbnail: "", gradient: "from-indigo-500 to-purple-600", videoUrl: "/projects/hair-ideas.mp4", views: 5200, floors: 12, rooms: 80, status: "in-progress", tourAvailable: false },
      { id: "bp-15", name: "Co-Work Central", type: "Office", location: "Gurugram", thumbnail: "", gradient: "from-emerald-500 to-teal-600", views: 3400, floors: 3, rooms: 20, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house3,
  },
  {
    id: "builder-4",
    name: "Priya Deshmukh",
    company: "PD Interiors & Architecture",
    category: "Interior Designer",
    avatar: "PD",
    coverGradient: "from-violet-500 to-purple-600",
    tagline: "Where interior artistry meets architectural precision",
    bio: "Interior-focused architect who believes every room tells a story. Known for creating luxurious yet livable spaces with meticulous attention to detail. Has worked with top real estate developers including Lodha, Godrej, and Oberoi.",
    location: "Pune, India",
    specializations: ["Interior Architecture", "Luxury Apartments", "Penthouse Design", "Space Planning"],
    rating: 4.9,
    reviewCount: 84,
    projectCount: 41,
    experience: "10+ years",
    verified: true,
    featured: false,
    contactEmail: "priya@pd-interiors.com",
    website: "pd-interiors.com",
    completedProjects: 41,
    activeTours: 9,
    totalViews: 18700,
    startingPrice: "₹18L",
    avgPricePerSqft: "₹2,800",
    responseTime: "< 1 hour",
    services: [
      { id: "s13", name: "Turnkey Construction", description: "Complete apartment and penthouse fit-outs from scratch", icon: "🏗️" },
      { id: "s14", name: "Interior Design", description: "Bespoke luxury interiors with custom furniture design", icon: "🎨" },
      { id: "s15", name: "Renovation", description: "Apartment makeovers and space optimization", icon: "🔨" },
      { id: "s16", name: "Architecture", description: "Residential architectural design with interior integration", icon: "📐" },
    ],
    reviews: [
      { id: "r11", userName: "Meghna Shah", userInitials: "MS", userGradient: "from-fuchsia-400 to-pink-500", rating: 5, review: "Priya's eye for detail is unmatched. Our 3BHK feels like a boutique hotel. She thought of things we never even considered.", projectType: "Apartment", date: "2 weeks ago" },
      { id: "r12", userName: "Arjun Bhatia", userInitials: "AB", userGradient: "from-slate-400 to-gray-500", rating: 5, review: "The Royal Penthouse is beyond our wildest dreams. Every material, every light fixture — perfection.", projectType: "Apartment", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-103", name: "Sunset Deck & Terrace Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-amber-500 to-rose-600", videoUrl: "/poll/luxury-patio-lifestyle.mp4", views: 15200, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-17", name: "Royal Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-amber-400 to-yellow-500", videoUrl: "/videos/interior-walkthrough.mp4", views: 5900, floors: 2, rooms: 9, status: "completed", tourAvailable: true },
      { id: "bp-16", name: "Luxe Living 3BHK", type: "Apartment", location: "Pune", thumbnail: "", gradient: "from-fuchsia-500 to-pink-600", videoUrl: "/videos/modern-design-showcase.mp4", views: 4800, floors: 1, rooms: 6, status: "completed", tourAvailable: true },
      { id: "bp-18", name: "Minimalist Studio", type: "Apartment", location: "Bangalore", thumbnail: "", gradient: "from-gray-400 to-slate-500", views: 2400, floors: 1, rooms: 3, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house4,
  },
  {
    id: "builder-5",
    name: "Rahul Menon",
    company: "Menon Builders",
    category: "Builder",
    avatar: "RM",
    coverGradient: "from-emerald-500 to-teal-600",
    tagline: "Building dream homes across South India",
    bio: "Third-generation builder with deep roots in Kerala's construction industry. Specializes in tropical architecture that maximizes ventilation and natural light. Known for on-time delivery and transparent pricing.",
    location: "Kochi, India",
    specializations: ["Tropical Architecture", "Residential Construction", "Farm Houses", "Resort Design"],
    rating: 4.6,
    reviewCount: 198,
    projectCount: 95,
    experience: "18+ years",
    verified: true,
    featured: true,
    contactEmail: "rahul@menonbuilders.in",
    website: "menonbuilders.in",
    completedProjects: 95,
    activeTours: 22,
    totalViews: 67300,
    startingPrice: "₹22L",
    avgPricePerSqft: "₹1,800",
    responseTime: "< 3 hours",
    services: [
      { id: "s17", name: "Turnkey Construction", description: "Complete residential construction with Kerala craftsmanship", icon: "🏗️" },
      { id: "s18", name: "Interior Design", description: "Tropical and traditional Kerala interior design", icon: "🎨" },
      { id: "s19", name: "Renovation", description: "Heritage home restoration and modernization", icon: "🔨" },
      { id: "s20", name: "Architecture", description: "Climate-responsive tropical architecture design", icon: "📐" },
    ],
    reviews: [
      { id: "r13", userName: "Thomas George", userInitials: "TG", userGradient: "from-teal-400 to-green-500", rating: 5, review: "The Kerala Lake House is paradise. Rahul's understanding of tropical living is unmatched. The natural ventilation is incredible.", projectType: "House", date: "1 week ago" },
      { id: "r14", userName: "Lakshmi Nair", userInitials: "LN", userGradient: "from-orange-400 to-red-500", rating: 4, review: "Great value for money. The Spice Plantation Villa was delivered on time. Minor finishing issues resolved quickly.", projectType: "Villa", date: "1 month ago" },
      { id: "r15", userName: "Samuel Mathew", userInitials: "SM", userGradient: "from-sky-400 to-blue-500", rating: 5, review: "Riverside Resort is a masterpiece. The blend of Kerala architecture with modern amenities is perfect. Guests love it.", projectType: "Commercial", date: "2 months ago" },
    ],
    projects: [
      { id: "bp-22", name: "Riverside Resort", type: "Commercial", location: "Wayanad", thumbnail: "", gradient: "from-lime-500 to-green-600", videoUrl: "/projects/rustic-wedding.mp4", views: 11200, floors: 3, rooms: 24, status: "completed", tourAvailable: true },
      { id: "bp-19", name: "Kerala Lake House", type: "House", location: "Alleppey", thumbnail: "", gradient: "from-teal-400 to-emerald-500", videoUrl: "/videos/pnw-craftsman.mp4", views: 9200, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-23", name: "Heritage Nalukettu", type: "House", location: "Thrissur", thumbnail: "", gradient: "from-amber-600 to-red-700", videoUrl: "/videos/luxury-villa-tour.mp4", views: 8400, floors: 1, rooms: 15, status: "completed", tourAvailable: true },
      { id: "bp-20", name: "Spice Plantation Villa", type: "Villa", location: "Munnar", thumbnail: "", gradient: "from-green-600 to-emerald-700", videoUrl: "/videos/modern-farmhouse.mp4", views: 7800, floors: 2, rooms: 12, status: "completed", tourAvailable: true },
      { id: "bp-21", name: "Coastal Breeze Homes", type: "House", location: "Kochi", thumbnail: "", gradient: "from-sky-400 to-blue-500", views: 5400, floors: 2, rooms: 10, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house5,
  },
  {
    id: "builder-6",
    name: "Nisha Agarwal",
    company: "NexGen Architects",
    category: "Architect",
    avatar: "NA",
    coverGradient: "from-cyan-500 to-blue-600",
    tagline: "Futuristic designs for the next generation of living",
    bio: "Young, dynamic architect pushing the boundaries of parametric design and computational architecture. Her firm combines AI-assisted design with human creativity to deliver spaces that feel ahead of their time.",
    location: "Bangalore, India",
    specializations: ["Parametric Design", "Smart Homes", "Futuristic Architecture", "Mixed-Use Developments"],
    rating: 4.8,
    reviewCount: 62,
    projectCount: 24,
    experience: "7+ years",
    verified: true,
    featured: false,
    contactEmail: "nisha@nexgenarch.com",
    website: "nexgenarch.com",
    completedProjects: 24,
    activeTours: 7,
    totalViews: 15400,
    startingPrice: "₹35L",
    avgPricePerSqft: "₹3,600",
    responseTime: "< 2 hours",
    services: [
      { id: "s21", name: "Turnkey Construction", description: "Smart home construction with IoT and automation integration", icon: "🏗️" },
      { id: "s22", name: "Interior Design", description: "Futuristic interior design with smart material selection", icon: "🎨" },
      { id: "s23", name: "Renovation", description: "Smart home conversion and technology retrofitting", icon: "🔨" },
      { id: "s24", name: "Architecture", description: "Parametric and computational architectural design", icon: "📐" },
    ],
    reviews: [
      { id: "r16", userName: "Kiran Rao", userInitials: "KR", userGradient: "from-violet-400 to-indigo-500", rating: 5, review: "The Curve House is unlike anything I've seen. Nisha's parametric design creates spaces that feel alive. Truly next-gen.", projectType: "House", date: "2 weeks ago" },
      { id: "r17", userName: "Anand Sharma", userInitials: "AS", userGradient: "from-cyan-400 to-teal-500", rating: 5, review: "Smart Living Pod is the future. Everything is automated, the design is minimal yet functional. Nisha is a visionary.", projectType: "Apartment", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-26", name: "Parametric Office", type: "Office", location: "Bangalore", thumbnail: "", gradient: "from-indigo-400 to-violet-500", videoUrl: "/videos/architectural-highlight.mp4", views: 5800, floors: 4, rooms: 18, status: "completed", tourAvailable: true },
      { id: "bp-24", name: "The Curve House", type: "House", location: "Bangalore", thumbnail: "", gradient: "from-violet-500 to-blue-600", views: 4600, floors: 2, rooms: 7, status: "completed", tourAvailable: true },
      { id: "bp-25", name: "Smart Living Pod", type: "Apartment", location: "Hyderabad", thumbnail: "", gradient: "from-cyan-400 to-teal-500", views: 3200, floors: 1, rooms: 4, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house6,
  },
  // ── New: Interior Designer ──
  {
    id: "builder-7",
    name: "Aanya Sharma",
    company: "Aanya Studio",
    category: "Interior Designer",
    avatar: "AS",
    coverGradient: "from-pink-500 to-fuchsia-600",
    tagline: "Curating spaces that inspire everyday living",
    bio: "Award-winning interior designer with a signature style blending Scandinavian minimalism with warm Indian textures. Known for transforming compact urban apartments into luxurious, functional spaces. Featured in Elle Decor India and Beautiful Homes.",
    location: "Bangalore, India",
    specializations: ["Modern Minimalism", "Compact Spaces", "Luxury Apartments", "Home Staging"],
    rating: 4.9,
    reviewCount: 76,
    projectCount: 38,
    experience: "9+ years",
    verified: true,
    featured: true,
    contactEmail: "aanya@aanyastudio.in",
    website: "aanyastudio.in",
    completedProjects: 38,
    activeTours: 6,
    totalViews: 19800,
    startingPrice: "₹12L",
    avgPricePerSqft: "₹1,600",
    responseTime: "< 1 hour",
    services: [
      { id: "s25", name: "Full Home Interiors", description: "End-to-end interior design from concept to execution", icon: "🏠" },
      { id: "s26", name: "Kitchen & Bath Design", description: "Modular kitchen and luxury bathroom design", icon: "🍳" },
      { id: "s27", name: "Home Staging", description: "Professional staging for property sales and rentals", icon: "✨" },
      { id: "s28", name: "Furniture Curation", description: "Custom furniture design and sourcing from artisan workshops", icon: "🪑" },
    ],
    reviews: [
      { id: "r18", userName: "Ritika Jain", userInitials: "RJ", userGradient: "from-pink-400 to-rose-500", rating: 5, review: "Aanya transformed our 2BHK into something out of a magazine. Her sense of color and proportion is extraordinary.", projectType: "Apartment", date: "1 week ago" },
      { id: "r19", userName: "Siddharth Roy", userInitials: "SR", userGradient: "from-blue-400 to-indigo-500", rating: 5, review: "The Japandi Living Room is a masterpiece. Minimal yet warm. Aanya understood our lifestyle perfectly.", projectType: "Apartment", date: "3 weeks ago" },
    ],
    projects: [
      { id: "bp-30", name: "Bohemian Farmhouse", type: "House", location: "Goa", thumbnail: "", gradient: "from-yellow-400 to-lime-500", views: 6800, floors: 1, rooms: 6, status: "completed", tourAvailable: true },
      { id: "bp-27", name: "Japandi Living Room", type: "Apartment", location: "Bangalore", thumbnail: "", gradient: "from-stone-400 to-neutral-500", views: 5200, floors: 1, rooms: 4, status: "completed", tourAvailable: true },
      { id: "bp-28", name: "Terracotta Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-orange-400 to-amber-500", views: 4100, floors: 2, rooms: 7, status: "completed", tourAvailable: true },
      { id: "bp-29", name: "Cloud White Studio", type: "Apartment", location: "Pune", thumbnail: "", gradient: "from-slate-200 to-gray-300", views: 3400, floors: 1, rooms: 3, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house1,
  },
  // ── New: Landscape Architect ──
  {
    id: "builder-8",
    name: "Kabir Thakur",
    company: "GreenScape Design",
    category: "Landscape Architect",
    avatar: "KT",
    coverGradient: "from-lime-500 to-green-600",
    tagline: "Designing living landscapes that breathe with nature",
    bio: "Landscape architect specializing in creating immersive outdoor environments for residential estates, resort campuses, and commercial complexes. Pioneer in rooftop gardens and vertical green walls in Indian urban settings. Member of the Indian Society of Landscape Architects.",
    location: "Pune, India",
    specializations: ["Garden Design", "Rooftop Gardens", "Vertical Green Walls", "Resort Landscaping"],
    rating: 4.7,
    reviewCount: 54,
    projectCount: 29,
    experience: "11+ years",
    verified: true,
    featured: false,
    contactEmail: "kabir@greenscapedesign.in",
    website: "greenscapedesign.in",
    completedProjects: 29,
    activeTours: 5,
    totalViews: 12600,
    startingPrice: "₹8L",
    avgPricePerSqft: "₹900",
    responseTime: "< 4 hours",
    services: [
      { id: "s29", name: "Garden Design", description: "Custom garden layouts with native and exotic plants", icon: "🌿" },
      { id: "s30", name: "Rooftop Gardens", description: "Urban rooftop oases with irrigation and drainage systems", icon: "🌱" },
      { id: "s31", name: "Vertical Green Walls", description: "Living green walls for interiors and building facades", icon: "🌳" },
      { id: "s32", name: "Hardscape Design", description: "Pathways, water features, outdoor seating, and pergolas", icon: "⛲" },
    ],
    reviews: [
      { id: "r20", userName: "Devika Patil", userInitials: "DP", userGradient: "from-green-400 to-emerald-500", rating: 5, review: "Kabir created an oasis on our terrace. The rooftop garden is now our favourite spot in the house. Plants are thriving!", projectType: "House", date: "2 weeks ago" },
      { id: "r21", userName: "Manish Kulkarni", userInitials: "MK", userGradient: "from-lime-400 to-green-500", rating: 4, review: "The resort landscaping at our Lonavala property is stunning. Guests constantly compliment the gardens. Great work.", projectType: "Commercial", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-33", name: "Hillside Resort Landscape", type: "Commercial", location: "Lonavala", thumbnail: "", gradient: "from-green-500 to-teal-600", views: 5200, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
      { id: "bp-32", name: "Sky Garden Terrace", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-lime-400 to-emerald-500", views: 4500, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
      { id: "bp-31", name: "Zen Courtyard Garden", type: "House", location: "Pune", thumbnail: "", gradient: "from-emerald-400 to-green-500", views: 3800, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
      { id: "bp-34", name: "Villa Green Wall", type: "Villa", location: "Bangalore", thumbnail: "", gradient: "from-teal-400 to-cyan-500", views: 2900, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house2,
  },
  {
    id: "builder-9",
    name: "Rajiv Menon",
    company: "RM Developments",
    category: "Builder",
    avatar: "RM",
    coverGradient: "from-blue-500 to-cyan-600",
    tagline: "Building affordable luxury homes",
    bio: "Focused on delivering high-quality homes with premium finishes at accessible price points.",
    location: "Chennai, India",
    specializations: ["Apartments", "Gated Communities", "Affordable Luxury"],
    rating: 4.5,
    reviewCount: 112,
    projectCount: 45,
    experience: "12+ years",
    verified: true,
    featured: false,
    contactEmail: "rajiv@rmdevelopments.in",
    website: "rmdevelopments.in",
    completedProjects: 40,
    activeTours: 10,
    totalViews: 22000,
    startingPrice: "₹40L",
    avgPricePerSqft: "₹4,000",
    responseTime: "< 24 hours",
    services: [
      { id: "s33", name: "Turnkey Construction", description: "Complete residential construction", icon: "🏗️" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house3,
  },
  {
    id: "builder-10",
    name: "Sneha Reddy",
    company: "SR Architecture",
    category: "Architect",
    avatar: "SR",
    coverGradient: "from-rose-400 to-orange-500",
    tagline: "Modern designs for modern living",
    bio: "Passionate about minimalist architecture and maximizing natural light.",
    location: "Hyderabad, India",
    specializations: ["Villas", "Minimalist Design", "Modern Architecture"],
    rating: 4.8,
    reviewCount: 67,
    projectCount: 22,
    experience: "8+ years",
    verified: true,
    featured: false,
    contactEmail: "sneha@srarch.in",
    website: "srarch.in",
    completedProjects: 20,
    activeTours: 5,
    totalViews: 14000,
    startingPrice: "₹30L",
    avgPricePerSqft: "₹3,500",
    responseTime: "< 2 hours",
    services: [
      { id: "s34", name: "Architecture", description: "Residential architectural design", icon: "📐" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house4,
  },
  {
    id: "builder-11",
    name: "Karan Singh",
    company: "KS Landscapes",
    category: "Landscape Architect",
    avatar: "KS",
    coverGradient: "from-emerald-400 to-teal-500",
    tagline: "Bringing nature to your doorstep",
    bio: "Creating beautiful, sustainable gardens and outdoor living spaces.",
    location: "Delhi NCR, India",
    specializations: ["Garden Design", "Outdoor Living", "Sustainable Landscaping"],
    rating: 4.6,
    reviewCount: 45,
    projectCount: 30,
    experience: "10+ years",
    verified: true,
    featured: false,
    contactEmail: "karan@kslandscapes.in",
    website: "kslandscapes.in",
    completedProjects: 28,
    activeTours: 2,
    totalViews: 9000,
    startingPrice: "₹5L",
    avgPricePerSqft: "₹500",
    responseTime: "< 12 hours",
    services: [
      { id: "s35", name: "Garden Design", description: "Custom garden layouts", icon: "🌿" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house5,
  },
  {
    id: "builder-12",
    name: "Pooja Desai",
    company: "PD Studios",
    category: "Interior Designer",
    avatar: "PD",
    coverGradient: "from-purple-400 to-pink-500",
    tagline: "Elegant interiors for every budget",
    bio: "Specializing in cozy, elegant interiors that reflect your personal style.",
    location: "Mumbai, India",
    specializations: ["Apartment Interiors", "Cozy Spaces", "Budget-friendly Design"],
    rating: 4.7,
    reviewCount: 89,
    projectCount: 50,
    experience: "7+ years",
    verified: true,
    featured: false,
    contactEmail: "pooja@pdstudios.in",
    website: "pdstudios.in",
    completedProjects: 45,
    activeTours: 8,
    totalViews: 18000,
    startingPrice: "₹8L",
    avgPricePerSqft: "₹1,200",
    responseTime: "< 4 hours",
    services: [
      { id: "s36", name: "Interior Design", description: "Full apartment interiors", icon: "🎨" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house6,
  },
  {
    id: "builder-13",
    name: "Anil Kumar",
    company: "AK Builders",
    category: "Builder",
    avatar: "AK",
    coverGradient: "from-slate-600 to-gray-800",
    tagline: "Reliable construction, delivered on time",
    bio: "Known for our commitment to quality and strict adherence to timelines.",
    location: "Bangalore, India",
    specializations: ["Commercial Construction", "Office Spaces", "Retail Layouts"],
    rating: 4.4,
    reviewCount: 150,
    projectCount: 60,
    experience: "20+ years",
    verified: true,
    featured: false,
    contactEmail: "anil@akbuilders.in",
    website: "akbuilders.in",
    completedProjects: 55,
    activeTours: 15,
    totalViews: 30000,
    startingPrice: "₹60L",
    avgPricePerSqft: "₹3,000",
    responseTime: "< 24 hours",
    services: [
      { id: "s37", name: "Commercial Construction", description: "Large scale commercial projects", icon: "🏗️" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house1,
  },
  {
    id: "builder-14",
    name: "Riya Sharma",
    company: "RS Design Co.",
    category: "Interior Designer",
    avatar: "RS",
    coverGradient: "from-amber-400 to-orange-500",
    tagline: "Bold designs for creative spaces",
    bio: "Creating vibrant, inspiring spaces for creative professionals and startups.",
    location: "Pune, India",
    specializations: ["Startup Offices", "Creative Studios", "Vibrant Interiors"],
    rating: 4.9,
    reviewCount: 105,
    projectCount: 42,
    experience: "9+ years",
    verified: true,
    featured: true,
    contactEmail: "riya@rsdesignco.in",
    website: "rsdesignco.in",
    completedProjects: 38,
    activeTours: 12,
    totalViews: 25000,
    startingPrice: "₹15L",
    avgPricePerSqft: "₹2,000",
    responseTime: "< 2 hours",
    services: [
      { id: "s38", name: "Office Interiors", description: "Creative workspace design", icon: "🎨" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house2,
  },
  {
    id: "builder-15",
    name: "Dr. Alok Verma",
    company: "Apex Structural Engineering",
    category: "Structural Engineer",
    avatar: "AV",
    coverGradient: "from-blue-700 to-slate-900",
    tagline: "Precision structural analysis, seismic resilience & cantilever innovation",
    bio: "IIT-Bombay PhD with 18+ years of engineering leadership. Apex has engineered 120+ high-rises, seismic-isolated foundations, and architectural cantilever structures across Mumbai, Delhi, and Bangalore.",
    location: "Mumbai, India",
    specializations: ["Seismic Design", "Post-Tensioned Slabs", "Cantilever Frameworks", "Structural Audits"],
    rating: 4.9,
    reviewCount: 78,
    projectCount: 120,
    experience: "18+ years",
    verified: true,
    featured: true,
    contactEmail: "alok@apexstructural.in",
    website: "apexstructural.in",
    completedProjects: 114,
    activeTours: 16,
    totalViews: 31200,
    startingPrice: "₹10L",
    avgPricePerSqft: "₹450",
    responseTime: "< 1 hour",
    services: [
      { id: "s39", name: "Structural Design", description: "Seismic-resistant RCC & high-tensile steel engineering", icon: "🏗️" },
      { id: "s40", name: "Structural Audit", description: "Non-destructive testing and safety certification", icon: "📐" },
      { id: "s41", name: "Cantilever Engineering", description: "Bespoke architectural cantilever calculation & modeling", icon: "🔬" },
    ],
    reviews: [
      { id: "r22", userName: "Vivek Singhania", userInitials: "VS", userGradient: "from-blue-600 to-indigo-700", rating: 5, review: "Apex engineered our 30-foot cliffside cantilever pool villa with zero vibration. Outstanding technical mastery.", projectType: "Villa", date: "2 weeks ago" },
    ],
    projects: [
      { id: "bp-150", name: "Ocean Cantilever Core", type: "Villa", location: "Goa", thumbnail: "", gradient: "from-blue-600 to-indigo-800", videoUrl: "/poll/infinity-pool-showcase.mp4", views: 14200, floors: 3, rooms: 8, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house1,
  },
  {
    id: "builder-16",
    name: "CeraLux Architectural Materials",
    company: "CeraLux Global",
    category: "Supplier",
    avatar: "CL",
    coverGradient: "from-emerald-600 to-teal-800",
    tagline: "Next-gen Italian porcelain, low-E glazing & biophilic surface systems",
    bio: "Leading specification manufacturer supplying large-format porcelain slabs, acoustic acoustic wood louvers, and smart kinetic glass facades to premier architectural studios across India.",
    location: "Ahmedabad, India",
    specializations: ["Italian Porcelain", "Low-E Glazing", "Acoustic Wood Louvers", "Thermal Insulation"],
    rating: 4.8,
    reviewCount: 142,
    projectCount: 210,
    experience: "14+ years",
    verified: true,
    featured: true,
    contactEmail: "specifications@ceraluxglobal.com",
    website: "ceraluxglobal.com",
    completedProjects: 195,
    activeTours: 24,
    totalViews: 48900,
    startingPrice: "₹15L",
    avgPricePerSqft: "₹650",
    responseTime: "< 2 hours",
    services: [
      { id: "s42", name: "Material Specification", description: "Direct architect catalog & 3D sample swatch delivery", icon: "📦" },
      { id: "s43", name: "Custom Dry-Lay Consultation", description: "Full room scale dry-lay previews and edge beveling", icon: "✨" },
      { id: "s44", name: "Facade Supply & Fitting", description: "Engineered weather-sealed cladding systems", icon: "🏢" },
    ],
    reviews: [
      { id: "r23", userName: "Ar. Sunita Roy", userInitials: "SR", userGradient: "from-emerald-500 to-teal-600", rating: 5, review: "CeraLux provided flawless bookmatched Statuario slabs for our penthouse project in Mumbai. The 3D swatches were 100% accurate.", projectType: "Apartment", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-160", name: "Haute-Couture Marble Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-slate-700 to-stone-900", videoUrl: "/videos/interior-walkthrough.mp4", views: 18900, floors: 2, rooms: 10, status: "completed", tourAvailable: true },
    ],
    houseTransformation: houseTransformationsMap.house4,
  },
  {
    id: "builder-17",
    name: "Aditi Sengupta",
    company: "Nova Matrix Consultants",
    category: "Structural Engineer",
    avatar: "AS",
    coverGradient: "from-cyan-600 to-blue-800",
    tagline: "Eco-optimized structural matrices & sustainable load engineering",
    bio: "Pioneering green structural engineering with parametric computational optimization. Specialized in lightweight bamboo-steel hybrid framing, solar canopy integration, and LEED Platinum certifications.",
    location: "Bangalore, India",
    specializations: ["Green Engineering", "Parametric Structures", "Bamboo-Steel Hybrids", "LEED Certification"],
    rating: 4.8,
    reviewCount: 52,
    projectCount: 65,
    experience: "11+ years",
    verified: true,
    featured: false,
    contactEmail: "aditi@novamatrix.in",
    website: "novamatrix.in",
    completedProjects: 60,
    activeTours: 8,
    totalViews: 17400,
    startingPrice: "₹8L",
    avgPricePerSqft: "₹380",
    responseTime: "< 3 hours",
    services: [
      { id: "s45", name: "Green Structural Engineering", description: "Low carbon footprint structural calculations", icon: "🌱" },
      { id: "s46", name: "Parametric Truss Design", description: "Curvilinear robotic steel truss systems", icon: "📐" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house6,
  },
  {
    id: "builder-18",
    name: "SteelEdge & UltraForm Products",
    company: "SteelEdge Infrastructure",
    category: "Supplier",
    avatar: "SE",
    coverGradient: "from-amber-600 to-orange-800",
    tagline: "High-grade structural steel, composite decking & modular facades",
    bio: "Manufacturing certified high-yield corrosion-resistant steel I-beams, pre-engineered building components, and rapid modular framing systems for residential and commercial developers.",
    location: "Delhi NCR, India",
    specializations: ["High-Tensile Steel", "Pre-Engineered Systems", "Composite Decking", "Facade Brackets"],
    rating: 4.7,
    reviewCount: 94,
    projectCount: 160,
    experience: "16+ years",
    verified: true,
    featured: false,
    contactEmail: "orders@steeledge.in",
    website: "steeledge.in",
    completedProjects: 150,
    activeTours: 12,
    totalViews: 36000,
    startingPrice: "₹25L",
    avgPricePerSqft: "₹520",
    responseTime: "< 4 hours",
    services: [
      { id: "s47", name: "Bulk Steel Fabrication", description: "Precision CNC cut structural members delivered on site", icon: "⚙️" },
    ],
    reviews: [],
    projects: [],
    houseTransformation: houseTransformationsMap.house3,
  }
];

interface BuilderState {
  builders: Builder[];
  selectedBuilder: Builder | null;
  setSelectedBuilder: (builder: Builder | null) => void;
  getBuilderById: (id: string) => Builder | undefined;
  getFeaturedBuilders: () => Builder[];
  getByCategory: (category: ProfessionalCategory | "All") => Builder[];
  getCategories: () => ProfessionalCategory[];
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  builders,
  selectedBuilder: null,
  setSelectedBuilder: (builder) => set({ selectedBuilder: builder }),
  getBuilderById: (id) => get().builders.find((b) => b.id === id),
  getFeaturedBuilders: () => get().builders.filter((b) => b.featured),
  getByCategory: (category) =>
    category === "All"
      ? get().builders
      : get().builders.filter((b) => b.category === category),
  getCategories: () => {
    const cats = new Set(get().builders.map((b) => b.category));
    return Array.from(cats);
  },
}));
