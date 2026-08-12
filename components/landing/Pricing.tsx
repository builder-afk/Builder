"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Check,
  Minus,
  Home,
  TrendingUp,
  Briefcase,
  ShoppingBag,
  Building2,
  ArrowUpRight,
  Sparkles,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  Box,
  Camera,
  Ruler,
  Wand2,
  Globe,
  Plane,
  Image as ImageIcon,
  Search,
  MessageCircle,
  Eye,
} from "lucide-react";
import PaymentGatewayModal from "@/components/checkout/PaymentGatewayModal";
/* ──────────────────────────────────────────
   DATA — Main Plans
   ────────────────────────────────────────── */
const plans = [
  {
    id: "starter",
    name: "Starter",
    emoji: "🟢",
    subtitle: "For Individual Builders & Agents",
    priceMonthly: "5,890",
    priceAnnual: "4,908",
    billedAnnual: "58,900",
    annualSavings: "2 months free",
    icon: Home,
    color: "#10b981",
    borderColor: "rgba(16, 185, 129, 0.3)",
    glowColor: "rgba(16, 185, 129, 0.08)",
    features: [
      { name: "Professional Builder Profile", included: true },
      { name: "Up to 20 Project Uploads", included: true },
      { name: "Portfolio Website", included: true },
      { name: "1 Property Microsite", included: true },
      { name: "Web-based 3D Property Viewer", included: true },
      { name: "Interactive Floor Plans", included: true },
      { name: "Basic SEO Optimization", included: true },
      { name: "Lead Inbox", included: true },
      { name: "Quote Management", included: true },
      { name: "WhatsApp Integration", included: true },
      { name: "Basic CRM", included: true },
      { name: "Follow-up Reminders", included: true },
      { name: "Analytics Dashboard", included: true },
      { name: "Monthly Performance Report", included: true },
      { name: "Email Support", included: true },
    ],
    buttonText: "Get Started",
    buttonType: "outline",
    popular: false,
  },
  {
   
    id: "growth",
    name: "Growth",
    emoji: "🔵",
    subtitle: "For Growing Construction Companies",
    priceMonthly: "14,999",
    priceAnnual: "12,499",
    billedAnnual: "1,49,990",
    annualSavings: "Save ₹29,998",
    icon: TrendingUp,
    color: "#F26522",
    borderColor: "rgba(242, 101, 34, 0.5)",
    glowColor: "rgba(242, 101, 34, 0.12)",
    features: [
      { name: "Everything in Starter", included: true, highlight: true },
      { name: "Unlimited Portfolio Uploads", included: true },
      { name: "Up to 10 Property Microsites", included: true },
      { name: "Unlimited 3D Property Showcases", included: true },
      { name: "Unlimited Interactive Floor Plans", included: true },
      { name: "360° Virtual Tours", included: true },
      { name: "AI Virtual Staging (10/month)", included: true },
      { name: "AI Generated SEO Descriptions", included: true },
      { name: "SEO + AEO + GEO Optimization", included: true },
      { name: "Google Business Optimization", included: true },
      { name: "AI Citation Strategy", included: true },
      { name: "Reddit Authority Accounts", included: true },
      { name: "Reddit Community Marketing", included: true },
      { name: "AI Tracking Prompts", included: true },
      { name: "Advanced CRM", included: true },
      { name: "Lead Source Tracking", included: true },
      { name: "Pipeline Management", included: true },
      { name: "Site Visit Scheduling", included: true },
      { name: "Team Members", included: true },
      { name: "Quote Comparison", included: true },
      { name: "Builder Verification Badge", included: true },
      { name: "Monthly Strategy Call", included: true },
      { name: "Priority Listing", included: true },
    ],
    buttonText: "Get Started",
    buttonType: "filled",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro Agency",
    emoji: "🟣",
    subtitle: "Complete Digital Marketing Partner",
    priceMonthly: "59,999",
    priceAnnual: "49,999",
    billedAnnual: "5,99,999",
    annualSavings: "Save ₹1,19,989",
    icon: Briefcase,
    color: "#8b5cf6",
    borderColor: "rgba(139, 92, 246, 0.4)",
    glowColor: "rgba(139, 92, 246, 0.10)",
    features: [
      { name: "Everything in Growth", included: true, highlight: true },
      { name: "Dedicated Marketing Team", included: true },
      { name: "Complete Brand Strategy", included: true },
      { name: "Website Design", included: true },
      { name: "Landing Pages", included: true },
      { name: "Conversion Optimization", included: true },
      { name: "Professional Copywriting", included: true },
      { name: "Unlimited AI Content", included: true },
      { name: "Instagram Management", included: true },
      { name: "LinkedIn Management", included: true },
      { name: "Facebook Management", included: true },
      { name: "YouTube SEO", included: true },
      { name: "Short-form Video Strategy", included: true },
      { name: "Drone Shoot Planning", included: true },
      { name: "Property Shoot Coordination", included: true },
      { name: "Monthly Campaigns", included: true },
      { name: "Paid Ads Management", included: true },
      { name: "Google Ads", included: true },
      { name: "Meta Ads", included: true },
      { name: "Remarketing", included: true },
      { name: "Email Campaigns", included: true },
      { name: "WhatsApp Campaigns", included: true },
      { name: "Sales Funnel Design", included: true },
      { name: "Lead Qualification", included: true },
      { name: "CRM Automation", included: true },
      { name: "Quarterly Business Review", included: true },
      { name: "Dedicated Account Manager", included: true },
      { name: "48-hour Support", included: true },
    ],
    buttonText: "Contact Sales",
    buttonType: "outline",
    popular: false,
  },
];
const specialPlans = [
  {
    id: "marketplace",
    name: "Marketplace Plus",
    emoji: "🟡",
    subtitle: "Success-based Pricing",
    tagline: "No Monthly Fee — Only Pay When You Win",
    icon: ShoppingBag,
    color: "#eab308",
    borderColor: "rgba(234, 179, 8, 0.3)",
    glowColor: "rgba(234, 179, 8, 0.08)",
    features: [
      "Builder Listing",
      "Verified Profile",
      "Portfolio Showcase",
      "AI Builder Match",
      "Budget Matching",
      "Project Recommendations",
    ],
    platformFee: [
      "Qualified Lead Fee",
      "OR 1–3% Success Commission on completed projects",
    ],
    note: "Perfect for builders who don't want fixed subscriptions.",
    buttonText: "Join Marketplace",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    emoji: "⚫",
    subtitle: "For Large Developers & Construction Brands",
    tagline: "Custom Pricing — Everything in Pro +",
    icon: Building2,
    color: "#f5f5f5",
    borderColor: "rgba(255, 255, 255, 0.15)",
    glowColor: "rgba(255, 255, 255, 0.04)",
    features: [
      "Unlimited Projects",
      "Unlimited Microsites",
      "Custom APIs",
      "White-label Portal",
      "Multiple Office Management",
      "Team Permissions",
      "Custom CRM",
      "ERP Integration",
      "SAP Integration",
      "Salesforce Integration",
      "Builder Analytics",
      "AI Market Intelligence",
      "Construction Cost Intelligence Dashboard",
      "Dedicated Customer Success Manager",
      "SLA Support",
      "Quarterly Executive Reviews",
    ],
    buttonText: "Contact Sales",
  },
];
/* ──────────────────────────────────────────
   DATA — Add-on Services
   ────────────────────────────────────────── */
const addOnServices = [
  {
    id: "addon_3d_showcase",
    name: "Premium 3D Property Showcase",
    icon: Box,
    color: "#F26522",
    details: [
      "Interactive 3D Walkthrough & Dollhouse View",
      "Web Viewer with Embed Code & QR Code",
      "Mobile, Tablet & Desktop Compatible",
      "High-speed CDN Hosting Included for 1 Year",
    ],
  },
  {
    id: "addon_virtual_tour_360",
    name: "360° Virtual Tour",
    icon: Globe,
    color: "#06b6d4",
    details: [
      "Up to 15 Ultra-HDR 360° Panoramas",
      "Interactive Info Hotspots & Radar Maps",
      "Audio Narration & Ambient Soundtracks",
      "Immersive VR Headset Compatible",
    ],
  },
  {
    id: "addon_interactive_floorplan",
    name: "Interactive Floor Plan",
    icon: Ruler,
    color: "#10b981",
    details: [
      "2D Schematic & 3D Isometric Views",
      "Precision Dimension & Area Annotations",
      "Interactive Click-to-View Room Photos",
      "High-Res Vector SVG & Printable PDF",
    ],
  },
  {
    id: "addon_ai_staging_pack",
    name: "AI Virtual Staging",
    icon: Wand2,
    color: "#8b5cf6",
    details: [
      "Photorealistic 4K Furnished Renders",
      "8+ Designer Styles (Modern, Luxe, Japandi)",
      "Clutter Removal & Room Filling",
      "Fast 24-Hour Delivery with Revisions",
    ],
  },
  {
    id: "addon_property_microsite",
    name: "Property Microsite",
    icon: Globe,
    color: "#ec4899",
    details: [
      "Custom Branded Single-Property Domain",
      "Instant Lead Capture & WhatsApp Integration",
      "High-Speed Mobile Responsive Design",
      "SEO & Social Share Preview Optimization",
    ],
  },
  {
    id: "addon_drone_shoot",
    name: "Drone Shoot",
    icon: Camera,
    color: "#0ea5e9",
    details: [
      "Licensed DGCA Pilot On-Site (Half Day)",
      "4K 60fps Stabilized Cinematic Aerial Footage",
      "15+ High-Res Edited Aerial Stills",
      "60-Second Color-Graded Marketing Reel",
    ],
  },
  {
    id: "addon_architectural_cgi",
    name: "Architectural CGI",
    icon: ImageIcon,
    color: "#f59e0b",
    details: [
      "Day, Dusk & Night Exterior Elevations",
      "Hyper-Realistic Materials & Lighting",
      "8K Resolution for Hoardings & Brochures",
      "Full Source 3D Scene Files Included",
    ],
  },
];
const addOnPackages = [
  {
    name: "AI SEO Package",
    price: "₹15,000/month",
    icon: Search,
    color: "#3b82f6",
    includes: [
      "SEO",
      "GEO",
      "AEO",
      "AI Search Optimization",
      "AI Citation Building",
      "Technical SEO",
    ],
  },
  {
    name: "Reddit Authority Package",
    price: "₹25,000/month",
    icon: MessageCircle,
    color: "#ef4444",
    includes: [
      "Reddit Account Creation",
      "Karma Building",
      "Community Participation",
      "AI Citation Strategy",
      "AI Visibility Campaigns",
      "Authority Posting",
      "Brand Mentions",
    ],
  },
  {
    name: "AI Visibility Suite",
    price: "₹40,000/month",
    icon: Eye,
    color: "#8b5cf6",
    description:
      "Designed for businesses that want to appear in AI-powered search and recommendation systems.",
    includes: [
      "Full SEO & Technical Optimization",
      "AEO (Answer Engine Optimization)",
      "GEO (Generative Engine Optimization)",
      "AI-ready structured content & schema",
      "Knowledge base creation",
      "AI citation optimization",
      "Reddit authority building",
      "AI tracking prompts and monitoring",
      "Monthly visibility reports",
      "Competitor AI visibility analysis",
    ],
  },
];
/* ──────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────── */
export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>(
    {}
  );
  const [showAddOns, setShowAddOns] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState("growth");
  const [checkoutAddOnId, setCheckoutAddOnId] = useState<string | undefined>(undefined);

  const handleOpenCheckout = (planId: string = "growth", addOnId?: string) => {
    setCheckoutPlanId(planId);
    setCheckoutAddOnId(addOnId);
    setIsCheckoutOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const INITIAL_FEATURES_SHOWN = 8;
  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-transparent pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden font-sans"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        

        {/* ═══════════════════════════════════
           SECTION HEADER
           ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2c1b12]/80 border border-[#50372b] text-[12px] font-semibold tracking-wide text-[#c1a18c] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            Builder&apos;s Central Pricing
          </div>
          <h2 className="text-gray-900 font-heading italic leading-[1.12] tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)] mb-4 max-w-[900px] mx-auto">
            Invest in growth, not guesswork.
          </h2>
          
          <p className="text-[16px] sm:text-[18px] text-gray-500 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            From solo builders to enterprise developers — choose a plan that
            scales with your ambition. No hidden fees, cancel anytime.
          </p>
          {/* Animated Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <span
              className={`text-[15px] font-medium transition-colors ${
                !isAnnual ? "text-gray-900" : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-gray-900 rounded-full p-1 relative flex items-center transition-colors border border-gray-800 focus:outline-none"
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <div className="flex items-center gap-2">
               <span
                className={`text-[15px] font-medium transition-colors ${
                  isAnnual ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Annual
              </span>
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[12px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full"
                  >
                    Save up to 17%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      
        {/* ═══════════════════════════════════
           MAIN 3 PRICING CARDS
           ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1200px] mx-auto items-start">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.name;
            const isFeatured = plan.popular;
            
            const isExpanded = expandedPlans[plan.id];
            const visibleFeatures = isExpanded
              ? plan.features
              : plan.features.slice(0, INITIAL_FEATURES_SHOWN);
            const hasMore = plan.features.length > INITIAL_FEATURES_SHOWN;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onHoverStart={() => setHoveredPlan(plan.name)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-300 ${ 
                  isFeatured
                    ? "bg-[#2c1b12] border-2 shadow-[0_0_40px_rgba(242,101,34,0.15)]"
                    : "bg-[#2c1b12] border border-neutral-800/50 shadow-lg"
                }`}
                style={{
                  borderColor: isFeatured ? plan.borderColor : undefined,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                   
                    <div className="px-4 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white bg-[#F26522] shadow-[0_4px_12px_rgba(242,101,34,0.4)] flex items-center gap-1.5">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                                            <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          background: plan.glowColor,
                          border: `1px solid ${plan.borderColor}`,
                        }}
                      >
                        <plan.icon
                          className="w-4.5 h-4.5"
                          style={{ color: plan.color }}
                        />
                      </div>
                      <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-[14px] text-neutral-400 font-medium">
                      {plan.subtitle}
                    </p>
                  </div>
                  {/* Price Area */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[20px] font-semibold text-white">
                        ₹
                      </span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isAnnual ? "annual" : "monthly"}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="text-[36px] sm:text-[40px] font-bold text-white tracking-tight"
                        >
                          {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[14px] font-medium text-neutral-400">
                        /mo
                      </span>
                    </div>
                    
                    <div className="h-6 mt-1">
                      <AnimatePresence>
                        {isAnnual && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-[13px] text-neutral-500">
                              Billed as ₹{plan.billedAnnual}/yr
                            </span>
                            <span className="text-[11px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                              {plan.annualSavings}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  {/* Features List */}

                  <div className="flex-1 mb-6">
                    <div className="text-[11px] font-bold tracking-widest uppercase text-[#c1a18c] mb-4">
                      WHAT&apos;S INCLUDED
                    </div>
                    <ul className="space-y-3">
                      {visibleFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-[2px] shrink-0">
                            {feature.included ? (
                              <Check
                                className="w-[16px] h-[16px]"
                                style={{
                                  color: (feature as { highlight?: boolean })
                                    .highlight
                                    ? plan.color
                                    : "#10b981",
                             }}
                              />
                            ) : (
                              <Minus className="w-[16px] h-[16px] text-[#785340]" />
                            )}
                          </div>
                         
                          <span
                            className={`text-[13px] leading-snug ${
                              feature.included
                                ? (feature as { highlight?: boolean }).highlight
                                  ? "text-white font-semibold"
                                  : "text-[#fdf8f5]"
                                : "text-[#936850]"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {/* Show More / Less */}
                    {hasMore && (
                      <button
                        onClick={() => toggleExpand(plan.id)}
                        className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold tracking-wide transition-colors hover:text-white"
                        style={{ color: plan.color }}
                      >
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            +{plan.features.length - INITIAL_FEATURES_SHOWN}{" "}
                            more features{" "}
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {/* CTA Button */}
                  <button
                    onClick={() => handleOpenCheckout(plan.id)}
                    className={`w-full py-3.5 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer ${
                      plan.buttonType === "filled"
                        ? "bg-[#F26522] hover:bg-[#e05a1a] text-white shadow-[0_4px_14px_rgba(242,101,34,0.3)] hover:scale-[1.01]"
                        : "bg-[#50372b]/20 border border-[#50372b] hover:border-[#785340] hover:bg-[#50372b]/40 text-[#fdf8f5] hover:scale-[1.01]"
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>


                </div>
              </motion.div>
            );
          })}
        </div>
        {/* ═══════════════════════════════════
           SPECIAL PLANS — Marketplace Plus & Enterprise
           ═══════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1200px] mx-auto mt-8">
          {specialPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.35 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative rounded-3xl p-8 sm:p-10 bg-[#2c1b12] border border-neutral-800/50 shadow-lg flex flex-col"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: plan.glowColor,
                        border: `1px solid ${plan.borderColor}`,
                      }}
                    >
                      <plan.icon
                        className="w-4.5 h-4.5"
                        style={{ color: plan.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
                        {plan.emoji} {plan.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[14px] text-neutral-400 font-medium">
                    {plan.subtitle}
                  </p>
                </div>
                {/* Tagline */}
                <div
                  className="mb-6 px-4 py-3 rounded-xl border"
                  style={{
                    background: plan.glowColor,
                    borderColor: plan.borderColor,
                  }}
                >
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: plan.color }}
                  >
                    {plan.tagline}
                  </p>
                </div>
                {/* Features */}
                <div className="flex-1 mb-6">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-[#c1a18c] mb-4">
                    {plan.id === "marketplace" ? "INCLUDES" : "KEY FEATURES"}
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check
                          className="w-[15px] h-[15px] mt-[2px] shrink-0"
                          style={{ color: plan.color }}
                        />
                        <span className="text-[13px] text-[#fdf8f5] leading-snug">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Platform fee (Marketplace only) */}
                  {plan.id === "marketplace" && (
                    <div className="mt-6">
                      <div className="text-[11px] font-bold tracking-widest uppercase text-[#c1a18c] mb-3">
                        PLATFORM FEE
                      </div>
                      <ul className="space-y-2">
                        {(plan as typeof specialPlans[0]).platformFee?.map(
                          (fee, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <Zap className="w-[15px] h-[15px] mt-[2px] shrink-0 text-yellow-400" />
                              <span className="text-[13px] text-[#fdf8f5] leading-snug">
                                {fee}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                      {(plan as typeof specialPlans[0]).note && (
                        <p className="mt-3 text-[12px] text-neutral-500 italic">
                          {(plan as typeof specialPlans[0]).note}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                {/* CTA */}
                <button
                  onClick={() => handleOpenCheckout(plan.id === "marketplace" ? "starter" : "pro")}
                  className="w-full py-3.5 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 group bg-[#50372b]/20 border border-[#50372b] hover:border-[#785340] hover:bg-[#50372b]/40 text-[#fdf8f5] cursor-pointer hover:scale-[1.01]"
                >
                  <span>{plan.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* ═══════════════════════════════════
           ADD-ON SERVICES
           ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-[1200px] mx-auto mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-gray-900 font-heading italic leading-[1.12] tracking-[-0.02em] text-[clamp(1.5rem,3vw,2.5rem)] mb-3">
              Add-On Services
            </h3>
            <p className="text-[15px] text-gray-500 max-w-lg mx-auto">
              Enhance any plan with premium production and marketing services.
            </p>
          </div>
          {/* Standalone Service Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {addOnServices.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.55 + i * 0.05,
                }}
                className="group relative rounded-2xl p-5 bg-[#2c1b12] border border-neutral-800/50 hover:border-neutral-700/60 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${service.color}15`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <service.icon
                    className="w-5 h-5"
                    style={{ color: service.color }}
                  />
                </div>
                <h4 className="text-[15px] font-semibold text-white mb-2 leading-snug">
                  {service.name}
                </h4>
                {service.details && (
                  <ul className="space-y-2 mb-5">
                    {service.details.map((d, j) => (
                      <li
                        key={j}
                        className="text-[12px] text-neutral-300 flex items-start gap-2 leading-relaxed"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                          style={{ background: service.color }}
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex-1" />
                <button
                  onClick={() => handleOpenCheckout("growth", service.id || "addon_3d_showcase")}
                  className="w-full mt-2 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-[#F26522] hover:text-white border border-white/10 text-neutral-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>+ Add to Plan</span>
                </button>
              </motion.div>
            ))}
          </div>
          {/* Premium Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOnPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + i * 0.08,
                }}
                className="relative rounded-2xl p-6 bg-[#2c1b12] border border-neutral-800/50 hover:border-neutral-700/60 transition-all duration-300"
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full"
                  style={{ background: pkg.color }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mt-2"
                  style={{
                    background: `${pkg.color}15`,
                    border: `1px solid ${pkg.color}30`,
                  }}
                >
                  <pkg.icon
                    className="w-5 h-5"
                    style={{ color: pkg.color }}
                  />
                </div>
                <h4 className="text-[17px] font-semibold text-white mb-3">
                  {pkg.name}
                </h4>
                {(pkg as typeof addOnPackages[2]).description && (
                  <p className="text-[12px] text-neutral-400 mb-4 leading-relaxed">
                    {(pkg as typeof addOnPackages[2]).description}
                  </p>
                )}
                <div className="text-[10px] font-bold tracking-widest uppercase text-[#c1a18c] mb-3">
                  INCLUDES
                </div>
                <ul className="space-y-2 mb-4">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        className="w-[14px] h-[14px] mt-[2px] shrink-0"
                        style={{ color: pkg.color }}
                      />
                      <span className="text-[12px] text-[#fdf8f5] leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleOpenCheckout("growth", "addon_ai_seo_suite")}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-[#F26522] hover:text-white border border-white/10 text-neutral-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>+ Add Package</span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* ═══════════════════════════════════
           BOTTOM CTA
           ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20 max-w-2xl mx-auto"
        >
          <div className="bg-[#2c1b12] rounded-3xl p-10 border border-neutral-800/50">
            <h3 className="text-[22px] font-semibold text-white mb-3">
              Not sure which plan fits?
            </h3>
            <p className="text-[14px] text-neutral-400 mb-6 leading-relaxed">
              Book a free 15-minute consultation. We&apos;ll understand your
              goals and recommend the perfect plan for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="px-6 py-3 rounded-xl font-semibold text-[14px] bg-[#F26522] hover:bg-[#e05a1a] text-white shadow-[0_4px_14px_rgba(242,101,34,0.3)] transition-all duration-300 flex items-center gap-2 group">
                Schedule a Call
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <button className="px-6 py-3 rounded-xl font-semibold text-[14px] bg-[#50372b]/20 border border-[#50372b] hover:border-[#785340] hover:bg-[#50372b]/40 text-[#fdf8f5] transition-all duration-300">
                WhatsApp Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment Gateway Checkout Modal */}
      <PaymentGatewayModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialPlanId={checkoutPlanId}
        initialIsAnnual={isAnnual}
        initialAddOnId={checkoutAddOnId}
      />
    </section>
  );
}
