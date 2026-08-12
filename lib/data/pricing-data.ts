export interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

export interface PlanTier {
  id: string;
  name: string;
  emoji: string;
  subtitle: string;
  priceMonthlyNum: number;
  priceAnnualNum: number;
  priceMonthly: string;
  priceAnnual: string;
  billedAnnual: string;
  annualSavings: string;
  color: string;
  borderColor: string;
  glowColor: string;
  popular?: boolean;
  buttonText: string;
  features: PlanFeature[];
}

export interface AddOnService {
  id: string;
  name: string;
  category: "3d_visual" | "ai_staging" | "marketing" | "production";
  subtitle: string;
  basePrice: number;
  priceLabel: string;
  unit: string;
  minQty: number;
  maxQty: number;
  defaultQty: number;
  iconName: string;
  color: string;
  features: string[];
  popular?: boolean;
}

export const PLAN_TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    emoji: "🟢",
    subtitle: "For Individual Builders & Agents",
    priceMonthlyNum: 5890,
    priceAnnualNum: 4908,
    priceMonthly: "5,890",
    priceAnnual: "4,908",
    billedAnnual: "58,900",
    annualSavings: "2 months free",
    color: "#10b981",
    borderColor: "rgba(16, 185, 129, 0.3)",
    glowColor: "rgba(16, 185, 129, 0.08)",
    popular: false,
    buttonText: "Get Started",
    features: [
      { name: "Professional Builder Profile", included: true },
      { name: "Up to 20 Project Uploads", included: true },
      { name: "Portfolio Website", included: true },
      { name: "1 Property Microsite", included: true },
      { name: "Web-based 3D Property Viewer", included: true },
      { name: "Interactive Floor Plans", included: true },
      { name: "Basic SEO Optimization", included: true },
      { name: "Lead Inbox & WhatsApp Integration", included: true },
      { name: "Quote Management & CRM", included: true },
      { name: "Monthly Performance Report", included: true },
      { name: "Standard Email Support", included: true },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    emoji: "🔵",
    subtitle: "For Growing Construction Companies",
    priceMonthlyNum: 14999,
    priceAnnualNum: 12499,
    priceMonthly: "14,999",
    priceAnnual: "12,499",
    billedAnnual: "1,49,990",
    annualSavings: "Save ₹29,998",
    color: "#F26522",
    borderColor: "rgba(242, 101, 34, 0.5)",
    glowColor: "rgba(242, 101, 34, 0.12)",
    popular: true,
    buttonText: "Get Started",
    features: [
      { name: "Everything in Starter", included: true, highlight: true },
      { name: "Unlimited Portfolio Uploads", included: true },
      { name: "Up to 10 Property Microsites", included: true },
      { name: "Unlimited 3D Property Showcases", included: true },
      { name: "360° Virtual Tours with VR Support", included: true },
      { name: "AI Virtual Staging (10/month)", included: true, highlight: true },
      { name: "SEO + AEO + GEO AI Search Optimization", included: true },
      { name: "Google Business & AI Citation Strategy", included: true },
      { name: "Reddit Community Authority Growth", included: true },
      { name: "Advanced CRM & Lead Source Attribution", included: true },
      { name: "Team Members (Up to 5)", included: true },
      { name: "Builder Verification Badge", included: true },
      { name: "Monthly 1-on-1 Growth Strategy Call", included: true },
      { name: "Priority Search Listing", included: true },
    ],
  },
  {
    id: "pro",
    name: "Pro Agency",
    emoji: "🟣",
    subtitle: "Complete Digital Marketing & Growth Partner",
    priceMonthlyNum: 59999,
    priceAnnualNum: 49999,
    priceMonthly: "59,999",
    priceAnnual: "49,999",
    billedAnnual: "5,99,999",
    annualSavings: "Save ₹1,19,989",
    color: "#8b5cf6",
    borderColor: "rgba(139, 92, 246, 0.4)",
    glowColor: "rgba(139, 92, 246, 0.10)",
    popular: false,
    buttonText: "Get Started",
    features: [
      { name: "Everything in Growth", included: true, highlight: true },
      { name: "Dedicated Marketing Team & Copywriters", included: true },
      { name: "Complete Brand & Digital Asset Strategy", included: true },
      { name: "Unlimited High-Converting Landing Pages", included: true },
      { name: "Unlimited AI Virtual Staging & Content", included: true, highlight: true },
      { name: "Social Media Management (IG, LinkedIn, FB, YT)", included: true },
      { name: "4K Drone Shoot Planning & Coordination", included: true },
      { name: "Paid Ads Management (Google Ads & Meta Ads)", included: true },
      { name: "WhatsApp & Email Marketing Automation", included: true },
      { name: "CRM Automation & Sales Funnel Optimization", included: true },
      { name: "Dedicated Account Manager & 24/7 SLA Support", included: true },
    ],
  },
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: "addon_3d_showcase",
    name: "Premium 3D Property Showcase",
    category: "3d_visual",
    subtitle: "Matterport-style photorealistic 3D web walkthrough",
    basePrice: 12500,
    priceLabel: "₹12,500 / property",
    unit: "Property",
    minQty: 1,
    maxQty: 10,
    defaultQty: 1,
    iconName: "Box",
    color: "#F26522",
    popular: true,
    features: [
      "Interactive 3D Walkthrough & Dollhouse View",
      "Web Viewer with Embed Code & QR Code",
      "Mobile, Tablet & Desktop Compatible",
      "High-speed CDN Hosting Included for 1 Year",
    ],
  },
  {
    id: "addon_virtual_tour_360",
    name: "360° HDR Virtual Tour",
    category: "3d_visual",
    subtitle: "High-resolution panoramic tour with interactive hotspots",
    basePrice: 9999,
    priceLabel: "₹9,999 / tour",
    unit: "Tour",
    minQty: 1,
    maxQty: 10,
    defaultQty: 1,
    iconName: "Globe",
    color: "#06b6d4",
    features: [
      "Up to 15 HDR 360° Panoramas",
      "Custom Info Hotspots with floor plan radar",
      "Audio narration & background music option",
      "Compatible with VR Headsets",
    ],
  },
  {
    id: "addon_interactive_floorplan",
    name: "Interactive 2D/3D Floor Plan",
    category: "3d_visual",
    subtitle: "Dimensioned architectural floor plans with live room previews",
    basePrice: 6500,
    priceLabel: "₹6,500 / layout",
    unit: "Layout",
    minQty: 1,
    maxQty: 10,
    defaultQty: 1,
    iconName: "Ruler",
    color: "#10b981",
    features: [
      "Precision measurement annotations",
      "2D Schematic + 3D Rendered Isometric View",
      "Printable High-Res PDF & Vector SVG",
      "Interactive click-to-view room photos",
    ],
  },
  {
    id: "addon_ai_staging_pack",
    name: "AI Virtual Staging Pack (5 Rooms)",
    category: "ai_staging",
    subtitle: "Transform vacant room photos into furnished designer interiors",
    basePrice: 3500,
    priceLabel: "₹3,500 / pack (5 photos)",
    unit: "Pack",
    minQty: 1,
    maxQty: 20,
    defaultQty: 1,
    iconName: "Wand2",
    color: "#8b5cf6",
    popular: true,
    features: [
      "5 Photorealistic 4K Rendered Images",
      "Choice of 8 Design Styles (Modern, Scandinavian, Japandi, etc.)",
      "Removal of existing clutter or empty room fill",
      "24-Hour Turnaround with revisions",
    ],
  },
  {
    id: "addon_drone_shoot",
    name: "4K Aerial Drone Shoot & Video Edit",
    category: "production",
    subtitle: "Cinematic drone video and aerial photographs of project site",
    basePrice: 18500,
    priceLabel: "₹18,500 / shoot",
    unit: "Shoot",
    minQty: 1,
    maxQty: 5,
    defaultQty: 1,
    iconName: "Camera",
    color: "#0ea5e9",
    features: [
      "Licensed DGCA Drone Pilot on-site (Half day)",
      "4K 60fps stabilized cinematic aerial footage",
      "15 High-resolution edited aerial stills",
      "60-second color-graded marketing reel with music",
    ],
  },
  {
    id: "addon_architectural_cgi",
    name: "Architectural 3D Exterior CGI Render",
    category: "production",
    subtitle: "Hyper-realistic exterior renders before construction completes",
    basePrice: 25000,
    priceLabel: "₹25,000 / elevation",
    unit: "Elevation",
    minQty: 1,
    maxQty: 5,
    defaultQty: 1,
    iconName: "ImageIcon",
    color: "#f59e0b",
    features: [
      "Day & Dusk Lighting Elevations",
      "Landscaping, lighting & material realism",
      "8K Ultra-High Resolution for hoardings & brochures",
      "Full source 3D scene files provided",
    ],
  },
  {
    id: "addon_ai_seo_suite",
    name: "AI SEO & GEO Search Suite",
    category: "marketing",
    subtitle: "Rank on Google, ChatGPT, Perplexity & AI Search Engines",
    basePrice: 15000,
    priceLabel: "₹15,000 / month",
    unit: "Month",
    minQty: 1,
    maxQty: 12,
    defaultQty: 1,
    iconName: "Search",
    color: "#3b82f6",
    features: [
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "AI Knowledge Graph & Schema Markup",
      "Monthly AI Visibility & Citation Tracking",
    ],
  },
  {
    id: "addon_reddit_authority",
    name: "Reddit Real Estate Authority Growth",
    category: "marketing",
    subtitle: "Organic brand mentions & community authority building",
    basePrice: 25000,
    priceLabel: "₹25,000 / month",
    unit: "Month",
    minQty: 1,
    maxQty: 12,
    defaultQty: 1,
    iconName: "MessageCircle",
    color: "#ef4444",
    features: [
      "Dedicated high-karma real estate persona accounts",
      "Targeted discussions in city subreddits (r/mumbai, r/bangalore, etc.)",
      "High-intent buyer query responses & project highlights",
      "Guaranteed organic visibility without ad blockers",
    ],
  },
];

export interface PromoCode {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  description: string;
  requiresAnnual: boolean;
  badge: string;
  tagline?: string;
}

export const AVAILABLE_PROMO_CODES: Record<string, PromoCode> = {
  ANNUAL30: {
    code: "ANNUAL30",
    discountPercent: 30,
    description: "30% Mega Discount exclusive to Annual Subscriptions",
    requiresAnnual: true,
    badge: "Annual Exclusive 30% OFF",
    tagline: "Save an additional 30% when billed yearly",
  },
  ANNUALSAVE: {
    code: "ANNUALSAVE",
    flatDiscount: 25000,
    description: "Flat ₹25,000 Instant Cash Off on Annual Growth & Pro Plans",
    requiresAnnual: true,
    badge: "Annual Special ₹25k Off",
    tagline: "Flat ₹25,000 deducted on annual subscriptions",
  },
  YEARLYVIP: {
    code: "YEARLYVIP",
    discountPercent: 35,
    description: "35% Elite VIP Partner Discount for Annual Billing",
    requiresAnnual: true,
    badge: "Annual VIP 35% OFF",
    tagline: "Highest Tier discount for committed annual partners",
  },
  BUILDER20: {
    code: "BUILDER20",
    discountPercent: 20,
    description: "20% Discount applicable on all plans & billing cycles",
    requiresAnnual: false,
    badge: "20% OFF Any Plan",
  },
  LAUNCH10: {
    code: "LAUNCH10",
    discountPercent: 10,
    description: "10% Standard Launch Discount on Order Total",
    requiresAnnual: false,
    badge: "10% OFF Any Plan",
  },
};

export interface PromoValidationResult {
  valid: boolean;
  code?: string;
  promo?: PromoCode;
  errorMessage?: string;
  requiresAnnualPrompt?: boolean;
}

export function validatePromoCode(
  rawCode: string,
  isAnnual: boolean
): PromoValidationResult {
  const code = rawCode.toUpperCase().trim();
  if (!code) {
    return { valid: false, errorMessage: "Please enter a coupon code" };
  }

  const promo = AVAILABLE_PROMO_CODES[code];
  if (!promo) {
    return {
      valid: false,
      errorMessage: "Invalid coupon code. Please check and try again.",
    };
  }

  if (promo.requiresAnnual && !isAnnual) {
    return {
      valid: false,
      promo,
      requiresAnnualPrompt: true,
      errorMessage: `This coupon code is exclusive to Annual Plans. Switch to Annual Billing to apply.`,
    };
  }

  return {
    valid: true,
    code: promo.code,
    promo,
  };
}

export function calculateCheckoutPricing(
  planId: string,
  isAnnual: boolean,
  selectedAddOns: Record<string, number>,
  promoCode?: string
) {
  const plan = PLAN_TIERS.find((p) => p.id === planId) || PLAN_TIERS[1];
  
  // Base plan price
  const basePlanPrice = isAnnual ? plan.priceAnnualNum * 12 : plan.priceMonthlyNum;
  
  // Calculate add-ons
  const addOnsBreakdown = Object.entries(selectedAddOns)
    .filter(([_, qty]) => qty > 0)
    .map(([addOnId, qty]) => {
      const addOn = ADD_ON_SERVICES.find((a) => a.id === addOnId);
      if (!addOn) return null;
      const total = addOn.basePrice * qty;
      return {
        ...addOn,
        qty,
        total,
      };
    })
    .filter(Boolean) as (AddOnService & { qty: number; total: number })[];

  const addOnsTotal = addOnsBreakdown.reduce((sum, item) => sum + item.total, 0);
  
  // Subtotal
  const subtotal = basePlanPrice + addOnsTotal;

  // Promo discount calculation with annual restriction check
  let discount = 0;
  let appliedPromo: PromoCode | null = null;
  let promoValidation: PromoValidationResult = { valid: false };

  if (promoCode) {
    promoValidation = validatePromoCode(promoCode, isAnnual);
    if (promoValidation.valid && promoValidation.promo) {
      appliedPromo = promoValidation.promo;
      if (appliedPromo.flatDiscount) {
        discount = Math.min(subtotal, appliedPromo.flatDiscount);
      } else if (appliedPromo.discountPercent) {
        discount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
      }
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(taxableAmount * 0.18); // 18% GST in India
  const total = taxableAmount + gst;

  return {
    plan,
    isAnnual,
    basePlanPrice,
    addOnsBreakdown,
    addOnsTotal,
    subtotal,
    discount,
    appliedPromo,
    promoValidation,
    taxableAmount,
    gst,
    total,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
