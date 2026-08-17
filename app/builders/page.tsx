"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  ArrowRight,
  ArrowUpDown,
  Grid,
  List as ListIcon,
  CheckCircle2,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  X,
  Plus,
  Check,
  Trophy,
  Building2,
  Users,
  Clock,
  IndianRupee,
  Layers,
  Compass,
  HardHat,
  Palette,
  TreePine,
  Factory,
  Cpu,
  ChevronDown,
  Eye,
  Play,
  Award,
  Scale,
  Send,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import {
  useBuilderStore,
  Builder,
  ProfessionalCategory,
} from "@/store/useBuilderStore";
import VerifiedBadge from "@/components/builders/VerifiedBadge";
import ChatPanel from "@/components/builders/ChatPanel";

// ─────────────────────────────────────────
// Category Metadata & Icons
// ─────────────────────────────────────────
const CATEGORIES: {
  id: ProfessionalCategory | "All";
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  badgeBg: string;
}[] = [
  {
    id: "All",
    label: "All Professionals",
    shortLabel: "All",
    icon: Users,
    color: "#F26522",
    bgLight: "bg-orange-50",
    badgeBg: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    id: "Builder",
    label: "Builders & Contractors",
    shortLabel: "Builders",
    icon: HardHat,
    color: "#F26522",
    bgLight: "bg-orange-50",
    badgeBg: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    id: "Architect",
    label: "Architects & Planners",
    shortLabel: "Architects",
    icon: Compass,
    color: "#0284c7",
    bgLight: "bg-sky-50",
    badgeBg: "bg-sky-500/10 text-sky-600 border-sky-200",
  },
  {
    id: "Interior Designer",
    label: "Interior Designers & Studios",
    shortLabel: "Interiors",
    icon: Palette,
    color: "#d946ef",
    bgLight: "bg-fuchsia-50",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-200",
  },
  {
    id: "Landscape Architect",
    label: "Landscape & Outdoor Designers",
    shortLabel: "Landscape",
    icon: TreePine,
    color: "#10b981",
    bgLight: "bg-emerald-50",
    badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  {
    id: "Structural Engineer",
    label: "Structural & MEP Engineers",
    shortLabel: "Engineers",
    icon: Cpu,
    color: "#6366f1",
    bgLight: "bg-indigo-50",
    badgeBg: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    id: "Supplier",
    label: "Suppliers & Material Brands",
    shortLabel: "Suppliers",
    icon: Factory,
    color: "#059669",
    bgLight: "bg-teal-50",
    badgeBg: "bg-teal-500/10 text-teal-600 border-teal-200",
  },
];

const LOCATIONS = [
  "All Locations",
  "Mumbai",
  "Bangalore",
  "Delhi NCR",
  "Pune",
  "Ahmedabad",
  "Kochi",
  "Hyderabad",
  "Chennai",
  "Goa",
  "Jaipur",
];

const BUDGET_OPTIONS = [
  { id: "all", label: "Any Budget" },
  { id: "under-15l", label: "Under ₹15L", max: 15 },
  { id: "15l-40l", label: "₹15L — ₹40L", min: 15, max: 40 },
  { id: "40l-1cr", label: "₹40L — ₹1Cr", min: 40, max: 100 },
  { id: "above-1cr", label: "Above ₹1Cr", min: 100 },
];

const EXPERIENCE_OPTIONS = [
  { id: "all", label: "Any Experience" },
  { id: "5", label: "5+ Years", min: 5 },
  { id: "10", label: "10+ Years", min: 10 },
  { id: "15", label: "15+ Years", min: 15 },
];

const POPULAR_SPECIALIZATIONS = [
  "Luxury Villas",
  "Contemporary Homes",
  "Sustainable Architecture",
  "Heritage Restoration",
  "Commercial Architecture",
  "Penthouse Design",
  "Modern Minimalism",
  "Rooftop Gardens",
  "Smart Homes",
  "Seismic Design",
  "Italian Porcelain",
];

// Helper to parse price string like "₹45L" or "₹1.2Cr" to Lakhs
function parsePriceToLakhs(priceStr: string): number {
  if (!priceStr) return 0;
  const clean = priceStr.replace(/[₹\s,]/g, "");
  if (clean.includes("Cr")) {
    return parseFloat(clean.replace("Cr", "")) * 100;
  }
  if (clean.includes("L")) {
    return parseFloat(clean.replace("L", ""));
  }
  return parseFloat(clean) || 0;
}

// Helper to parse experience string like "15+ years"
function parseExp(expStr: string): number {
  if (!expStr) return 0;
  const match = expStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function BuildersDirectoryPage() {
  const builders = useBuilderStore((s) => s.builders);

  // States
  const [selectedCategory, setSelectedCategory] = useState<
    ProfessionalCategory | "All"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedExp, setSelectedExp] = useState("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string | null
  >(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [toursOnly, setToursOnly] = useState(false);
  const [fastResponseOnly, setFastResponseOnly] = useState(false);
  const [sortBy, setSortBy] = useState<
    "featured" | "rating" | "projects" | "views" | "price-asc" | "price-desc"
  >("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Chat & Quote Modal States
  const [activeChatBuilder, setActiveChatBuilder] = useState<Builder | null>(
    null
  );
  const [quoteModalBuilder, setQuoteModalBuilder] = useState<Builder | null>(
    null
  );
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Compare Dock States
  const [compareList, setCompareList] = useState<Builder[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: builders.length };
    builders.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, [builders]);

  // Filtering Logic
  const filteredBuilders = useMemo(() => {
    return builders.filter((builder) => {
      // Category filter
      if (
        selectedCategory !== "All" &&
        builder.category !== selectedCategory
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = builder.name.toLowerCase().includes(q);
        const matchesCompany = builder.company.toLowerCase().includes(q);
        const matchesTagline = builder.tagline.toLowerCase().includes(q);
        const matchesLocation = builder.location.toLowerCase().includes(q);
        const matchesSpecs = builder.specializations.some((s) =>
          s.toLowerCase().includes(q)
        );
        if (
          !matchesName &&
          !matchesCompany &&
          !matchesTagline &&
          !matchesLocation &&
          !matchesSpecs
        ) {
          return false;
        }
      }

      // Location
      if (
        selectedLocation !== "All Locations" &&
        !builder.location.toLowerCase().includes(selectedLocation.toLowerCase())
      ) {
        return false;
      }

      // Specialization chip
      if (
        selectedSpecialization &&
        !builder.specializations.includes(selectedSpecialization)
      ) {
        return false;
      }

      // Verified toggle
      if (verifiedOnly && !builder.verified) {
        return false;
      }

      // Active 3D tours
      if (toursOnly && builder.activeTours < 1) {
        return false;
      }

      // Fast response
      if (
        fastResponseOnly &&
        !builder.responseTime.includes("1 hour") &&
        !builder.responseTime.includes("2 hours")
      ) {
        return false;
      }

      // Budget
      if (selectedBudget !== "all") {
        const priceLakhs = parsePriceToLakhs(builder.startingPrice);
        const option = BUDGET_OPTIONS.find((b) => b.id === selectedBudget);
        if (option) {
          if (option.min && priceLakhs < option.min) return false;
          if (option.max && priceLakhs > option.max) return false;
        }
      }

      // Experience
      if (selectedExp !== "all") {
        const expYears = parseExp(builder.experience);
        const option = EXPERIENCE_OPTIONS.find((e) => e.id === selectedExp);
        if (option && option.min && expYears < option.min) return false;
      }

      return true;
    });
  }, [
    builders,
    selectedCategory,
    searchQuery,
    selectedLocation,
    selectedSpecialization,
    verifiedOnly,
    toursOnly,
    fastResponseOnly,
    selectedBudget,
    selectedExp,
  ]);

  // Sorting Logic
  const sortedBuilders = useMemo(() => {
    const list = [...filteredBuilders];
    switch (sortBy) {
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "projects":
        return list.sort((a, b) => b.projectCount - a.projectCount);
      case "views":
        return list.sort((a, b) => b.totalViews - a.totalViews);
      case "price-asc":
        return list.sort(
          (a, b) =>
            parsePriceToLakhs(a.startingPrice) -
            parsePriceToLakhs(b.startingPrice)
        );
      case "price-desc":
        return list.sort(
          (a, b) =>
            parsePriceToLakhs(b.startingPrice) -
            parsePriceToLakhs(a.startingPrice)
        );
      case "featured":
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredBuilders, sortBy]);

  // Comparison toggle
  const toggleCompare = (builder: Builder) => {
    setCompareList((prev) => {
      const exists = prev.some((b) => b.id === builder.id);
      if (exists) {
        return prev.filter((b) => b.id !== builder.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 professionals at a time.");
        return prev;
      }
      return [...prev, builder];
    });
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedLocation !== "All Locations" ||
    selectedBudget !== "all" ||
    selectedExp !== "all" ||
    selectedSpecialization !== null ||
    verifiedOnly ||
    toursOnly ||
    fastResponseOnly ||
    selectedCategory !== "All";

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSelectedLocation("All Locations");
    setSelectedBudget("all");
    setSelectedExp("all");
    setSelectedSpecialization(null);
    setVerifiedOnly(false);
    setToursOnly(false);
    setFastResponseOnly(false);
    setSortBy("featured");
  };

  // Top Spotlight Builder
  const spotlightBuilder = useMemo(() => {
    return (
      builders.find((b) => b.featured && b.houseTransformation) || builders[0]
    );
  }, [builders]);

  return (
    <div className="min-h-screen bg-[#faf5f0] text-[#50372b] font-body flex flex-col selection:bg-[#F26522]/20 selection:text-[#F26522]">
      <Navbar />

      {/* Spacer for Fixed Navbar */}
      <div className="h-20 sm:h-24" />

      {/* ═════════════════════════════════════════════
          HERO SECTION
      ═════════════════════════════════════════════ */}
      <section className="relative pt-6 pb-12 overflow-hidden border-b border-[#50372b]/10 bg-gradient-to-b from-[#faf5f0] via-white to-[#faf5f0]">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Building & Design Directory</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading italic tracking-tight text-[#50372b] leading-[1.1] mb-4"
            >
              Explore Top Builders,{" "}
              <span className="text-[#F26522]">Architects</span> & Designers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-[#50372b]/70 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Discover and connect directly with verified construction firms,
              architecture studios, interior designers, and engineering
              specialists. Explore real 3D project transformations, compare pricing, and hire with confidence.
            </motion.p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#50372b]/10 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-heading italic font-bold text-[#F26522]">
                {builders.length}+
              </div>
              <div className="text-xs text-[#50372b]/60 font-semibold uppercase tracking-wider mt-0.5">
                Verified Studios
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#50372b]/10 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-heading italic font-bold text-[#50372b]">
                4.8 ★
              </div>
              <div className="text-xs text-[#50372b]/60 font-semibold uppercase tracking-wider mt-0.5">
                Avg Rating
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#50372b]/10 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-heading italic font-bold text-[#0284c7]">
                ₹850Cr+
              </div>
              <div className="text-xs text-[#50372b]/60 font-semibold uppercase tracking-wider mt-0.5">
                Projects Delivered
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#50372b]/10 text-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-heading italic font-bold text-emerald-600">
                100%
              </div>
              <div className="text-xs text-[#50372b]/60 font-semibold uppercase tracking-wider mt-0.5">
                Verified Licenses
              </div>
            </div>
          </div>

          {/* Big Interactive Search Bar */}
          <div className="max-w-3xl mx-auto relative">
            <div className="relative flex items-center bg-white rounded-full p-2 border border-[#50372b]/20 shadow-xl shadow-[#50372b]/5 focus-within:border-[#F26522] focus-within:ring-2 focus-within:ring-[#F26522]/20 transition-all">
              <Search className="w-5 h-5 text-[#50372b]/40 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search by professional name, studio, specialization (e.g., Luxury Villa, Bamboo, Japandi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2.5 text-sm sm:text-base text-[#50372b] placeholder:text-[#50372b]/40 bg-transparent focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-[#50372b]/40 hover:text-[#50372b] mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {}}
                className="bg-[#F26522] hover:bg-[#d95315] text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shrink-0 transition-all shadow-md active:scale-95"
              >
                <span>Find Pros</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          CATEGORY SELECTOR TABS
      ═════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#50372b]/10 sticky top-[72px] sm:top-[80px] z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#50372b] text-white shadow-md shadow-[#50372b]/20"
                      : "bg-[#faf5f0] text-[#50372b]/70 hover:bg-[#50372b]/10 hover:text-[#50372b] border border-[#50372b]/10"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-[#F26522]" : "text-[#50372b]/60"
                    }`}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-[#50372b]/10 text-[#50372b]/70"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════
          MAIN CONTENT & FILTERS
      ═════════════════════════════════════════════ */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        {/* Filters & Control Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#50372b]/10 shadow-sm mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Dropdown Filters Group */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Location Select */}
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="appearance-none bg-[#faf5f0] border border-[#50372b]/15 text-[#50372b] text-xs sm:text-sm font-semibold rounded-xl pl-8 pr-8 py-2.5 focus:outline-none focus:border-[#F26522] cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <MapPin className="w-3.5 h-3.5 text-[#50372b]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-[#50372b]/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Budget Select */}
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="appearance-none bg-[#faf5f0] border border-[#50372b]/15 text-[#50372b] text-xs sm:text-sm font-semibold rounded-xl pl-8 pr-8 py-2.5 focus:outline-none focus:border-[#F26522] cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <IndianRupee className="w-3.5 h-3.5 text-[#50372b]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-[#50372b]/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Experience Select */}
              <div className="relative">
                <select
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value)}
                  className="appearance-none bg-[#faf5f0] border border-[#50372b]/15 text-[#50372b] text-xs sm:text-sm font-semibold rounded-xl pl-8 pr-8 py-2.5 focus:outline-none focus:border-[#F26522] cursor-pointer"
                >
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.label}
                    </option>
                  ))}
                </select>
                <Trophy className="w-3.5 h-3.5 text-[#50372b]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-[#50372b]/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Selector */}
              <div className="flex items-center gap-2 bg-[#faf5f0] border border-[#50372b]/15 rounded-xl px-3 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#50372b]/50" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-[#50372b] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="projects">Most Projects</option>
                  <option value="views">Most Views</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-[#faf5f0] p-1 rounded-xl border border-[#50372b]/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-[#F26522] shadow-xs"
                      : "text-[#50372b]/50 hover:text-[#50372b]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-white text-[#F26522] shadow-xs"
                      : "text-[#50372b]/50 hover:text-[#50372b]"
                  }`}
                  aria-label="List view"
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Toggle Checkboxes & Specialization Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#50372b]/5">
            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                  verifiedOnly
                    ? "bg-emerald-500 text-white border-emerald-600 shadow-xs"
                    : "bg-[#faf5f0] text-[#50372b]/70 border-[#50372b]/10 hover:border-[#50372b]/20"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified License Only</span>
              </button>

              <button
                onClick={() => setToursOnly(!toursOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                  toursOnly
                    ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                    : "bg-[#faf5f0] text-[#50372b]/70 border-[#50372b]/10 hover:border-[#50372b]/20"
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>3D Tours Available</span>
              </button>

              <button
                onClick={() => setFastResponseOnly(!fastResponseOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                  fastResponseOnly
                    ? "bg-[#F26522] text-white border-[#F26522] shadow-xs"
                    : "bg-[#faf5f0] text-[#50372b]/70 border-[#50372b]/10 hover:border-[#50372b]/20"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Fast Response (&lt;2h)</span>
              </button>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* Popular Specialization Tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 no-scrollbar">
            <span className="text-[11px] font-bold text-[#50372b]/50 uppercase tracking-wider shrink-0 mr-1">
              Popular Tags:
            </span>
            {POPULAR_SPECIALIZATIONS.map((spec) => {
              const isSelected = selectedSpecialization === spec;
              return (
                <button
                  key={spec}
                  onClick={() =>
                    setSelectedSpecialization(isSelected ? null : spec)
                  }
                  className={`text-xs px-2.5 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#50372b] text-white font-semibold"
                      : "bg-[#faf5f0] text-[#50372b]/60 hover:text-[#50372b] hover:bg-[#50372b]/10 border border-[#50372b]/5"
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-heading italic font-bold text-[#50372b]">
              Showing {sortedBuilders.length} Professional
              {sortedBuilders.length !== 1 ? "s" : ""}
            </h2>
            {selectedCategory !== "All" && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F26522]/10 text-[#F26522]">
                in {selectedCategory}
              </span>
            )}
          </div>

          {compareList.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-2 bg-[#50372b] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md hover:bg-[#3d2a21] transition-all cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Compare ({compareList.length}) Selected</span>
            </button>
          )}
        </div>

        {/* ═════════════════════════════════════════════
            RESULTS: GRID OR LIST VIEW
        ═════════════════════════════════════════════ */}
        {sortedBuilders.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-3xl border border-[#50372b]/10 p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-[#faf5f0] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#50372b]/30" />
            </div>
            <h3 className="text-2xl font-heading italic font-bold text-[#50372b] mb-2">
              No matching professionals found
            </h3>
            <p className="text-sm text-[#50372b]/60 mb-6">
              We couldn&apos;t find any studios or builders matching your
              current search and filter criteria. Try resetting your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-[#F26522] hover:bg-[#d95315] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedBuilders.map((builder, index) => {
              const isCompared = compareList.some((b) => b.id === builder.id);
              const transformation = builder.houseTransformation;
              const lastStage =
                transformation?.stages && transformation.stages.length > 0
                  ? transformation.stages[transformation.stages.length - 1]
                  : null;

              return (
                <motion.div
                  key={builder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="bg-white rounded-3xl border border-[#50372b]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Top Cover / Transformation Stage Preview */}
                  <div
                    className={`relative h-48 sm:h-52 bg-gradient-to-br ${builder.coverGradient} overflow-hidden`}
                  >
                    {lastStage ? (
                      <img
                        src={lastStage.imageUrl}
                        alt={builder.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-40">
                        <Building2 className="w-16 h-16 text-white" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                    {/* Category & Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
                        {builder.category}
                      </span>
                      {builder.featured && (
                        <span className="bg-[#F26522] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Compare Checkbox Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCompare(builder);
                      }}
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer ${
                        isCompared
                          ? "bg-[#50372b] text-white shadow-md border border-[#F26522]"
                          : "bg-black/50 text-white/90 hover:bg-black/80 border border-white/20"
                      }`}
                    >
                      {isCompared ? (
                        <Check className="w-3.5 h-3.5 text-[#F26522]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      <span>{isCompared ? "Compared" : "Compare"}</span>
                    </button>

                    {/* Bottom overlay info on cover */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      {/* Avatar */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${builder.coverGradient} border-2 border-white flex items-center justify-center text-white font-heading italic font-bold text-lg shadow-lg shrink-0`}
                        >
                          {builder.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-white font-bold text-base leading-tight">
                            <span>{builder.name}</span>
                            {builder.verified && (
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/80 font-medium truncate max-w-[170px]">
                            {builder.company}
                          </p>
                        </div>
                      </div>

                      {/* Starting Price Pill */}
                      <div className="bg-white/95 backdrop-blur-md rounded-xl px-2.5 py-1 text-right shadow-sm shrink-0">
                        <div className="text-[10px] uppercase font-bold text-slate-500">
                          Starting
                        </div>
                        <div className="text-xs font-bold text-[#50372b]">
                          {builder.startingPrice}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tagline */}
                      <p className="text-xs sm:text-sm text-[#50372b]/80 line-clamp-2 leading-relaxed mb-4 font-medium">
                        &ldquo;{builder.tagline}&rdquo;
                      </p>

                      {/* Key Stats Bar */}
                      <div className="grid grid-cols-3 gap-2 bg-[#faf5f0] p-2.5 rounded-2xl border border-[#50372b]/5 mb-4 text-center">
                        <div>
                          <div className="text-[10px] font-bold text-[#50372b]/50 uppercase">
                            Rating
                          </div>
                          <div className="text-xs font-bold text-[#50372b] flex items-center justify-center gap-0.5 mt-0.5">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{builder.rating}</span>
                            <span className="text-[10px] text-[#50372b]/50">
                              ({builder.reviewCount})
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[#50372b]/50 uppercase">
                            Experience
                          </div>
                          <div className="text-xs font-bold text-[#50372b] mt-0.5">
                            {builder.experience}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[#50372b]/50 uppercase">
                            Projects
                          </div>
                          <div className="text-xs font-bold text-[#50372b] mt-0.5">
                            {builder.projectCount} Done
                          </div>
                        </div>
                      </div>

                      {/* Specializations Tag Cloud */}
                      <div className="mb-5">
                        <div className="flex flex-wrap gap-1.5">
                          {builder.specializations.slice(0, 3).map((spec, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium bg-white border border-[#50372b]/10 text-[#50372b]/70 px-2 py-0.5 rounded-md"
                            >
                              {spec}
                            </span>
                          ))}
                          {builder.specializations.length > 3 && (
                            <span className="text-[11px] font-semibold text-[#50372b]/50 self-center">
                              +{builder.specializations.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-[#50372b]/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#50372b]/60 font-semibold truncate max-w-[130px]">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-[#F26522]" />
                        <span className="truncate">{builder.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveChatBuilder(builder)}
                          className="p-2 rounded-xl bg-[#faf5f0] hover:bg-[#50372b]/10 text-[#50372b] transition-colors cursor-pointer"
                          title="Instant Chat"
                          aria-label={`Chat with ${builder.name}`}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/builders/${builder.id}`}
                          className="px-3.5 py-2 rounded-xl bg-[#50372b] hover:bg-[#3d2a21] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* List / Table View */
          <div className="space-y-4">
            {sortedBuilders.map((builder, index) => {
              const isCompared = compareList.some((b) => b.id === builder.id);
              const transformation = builder.houseTransformation;
              const lastStage =
                transformation?.stages && transformation.stages.length > 0
                  ? transformation.stages[transformation.stages.length - 1]
                  : null;

              return (
                <motion.div
                  key={builder.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#50372b]/10 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  {/* Left: Avatar & Bio */}
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-white font-heading italic font-bold text-xl shadow-md shrink-0`}
                    >
                      {builder.avatar}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Link
                          href={`/builders/${builder.id}`}
                          className="font-heading italic font-bold text-xl text-[#50372b] hover:text-[#F26522] transition-colors"
                        >
                          {builder.name}
                        </Link>
                        {builder.verified && (
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        )}
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#faf5f0] border border-[#50372b]/10 text-[#50372b]/80 font-semibold">
                          {builder.category}
                        </span>
                        {builder.featured && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F26522] text-white font-bold">
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#50372b]/60 font-semibold mb-2 flex items-center gap-2">
                        <span>{builder.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#F26522]" />
                          {builder.location}
                        </span>
                      </p>

                      <p className="text-xs text-[#50372b]/80 line-clamp-1 max-w-xl font-medium">
                        {builder.tagline}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {builder.specializations.slice(0, 4).map((spec, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#faf5f0] px-2 py-0.5 rounded-md text-[#50372b]/70 border border-[#50372b]/5 font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Key Data Specs */}
                  <div className="grid grid-cols-3 gap-6 text-center border-y md:border-y-0 md:border-x border-[#50372b]/10 py-3 md:py-0 md:px-6 w-full md:w-auto shrink-0">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#50372b]/50">
                        Rating
                      </div>
                      <div className="text-sm font-bold text-[#50372b] flex items-center justify-center gap-1 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{builder.rating}</span>
                      </div>
                      <div className="text-[10px] text-[#50372b]/50">
                        ({builder.reviewCount} reviews)
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#50372b]/50">
                        Projects
                      </div>
                      <div className="text-sm font-bold text-[#50372b] mt-0.5">
                        {builder.projectCount}
                      </div>
                      <div className="text-[10px] text-[#50372b]/50">
                        {builder.experience}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#50372b]/50">
                        Starting
                      </div>
                      <div className="text-sm font-bold text-[#F26522] mt-0.5">
                        {builder.startingPrice}
                      </div>
                      <div className="text-[10px] text-[#50372b]/50">
                        {builder.avgPricePerSqft}/sqft
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                    <button
                      onClick={() => toggleCompare(builder)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isCompared
                          ? "bg-[#50372b] text-white border-[#50372b]"
                          : "bg-white text-[#50372b] border-[#50372b]/20 hover:bg-[#faf5f0]"
                      }`}
                    >
                      {isCompared ? "Compared" : "Compare"}
                    </button>
                    <button
                      onClick={() => setActiveChatBuilder(builder)}
                      className="p-2.5 rounded-xl bg-[#faf5f0] hover:bg-[#50372b]/10 text-[#50372b] transition-colors cursor-pointer"
                      title="Direct Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/builders/${builder.id}`}
                      className="px-5 py-2.5 rounded-xl bg-[#50372b] hover:bg-[#3d2a21] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ═════════════════════════════════════════════
            FEATURED SPOTLIGHT BANNER
        ═════════════════════════════════════════════ */}
        {spotlightBuilder && (
          <div className="mt-16 bg-[#2c1b12] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F26522]/20 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Spotlight Studio of the Month</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading italic text-white leading-tight">
                  {spotlightBuilder.name} &bull;{" "}
                  <span className="text-[#F26522]">
                    {spotlightBuilder.company}
                  </span>
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                  {spotlightBuilder.bio}
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{spotlightBuilder.rating} / 5 Rating</span>
                  </div>
                  <div className="text-neutral-300">
                    {spotlightBuilder.projectCount}+ Projects Delivered
                  </div>
                  <div className="text-neutral-300">
                    {spotlightBuilder.experience} Active
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Link
                    href={`/builders/${spotlightBuilder.id}`}
                    className="px-6 py-3 rounded-full bg-[#F26522] hover:bg-[#d95315] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                  >
                    <span>View 3D Transformation Showcase</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActiveChatBuilder(spotlightBuilder)}
                    className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Chat With Studio
                  </button>
                </div>
              </div>

              {/* Right Image Preview */}
              <div className="lg:col-span-5 relative">
                {spotlightBuilder.houseTransformation?.stages ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3 group">
                    <img
                      src={
                        spotlightBuilder.houseTransformation.stages[
                          spotlightBuilder.houseTransformation.stages.length - 1
                        ].imageUrl
                      }
                      alt="Spotlight Project"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-xs font-mono uppercase text-[#F26522] font-bold">
                        {spotlightBuilder.houseTransformation.location}
                      </div>
                      <div className="text-sm font-bold text-white leading-snug">
                        {spotlightBuilder.houseTransformation.title}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═════════════════════════════════════════════
          FLOATING COMPARISON DOCK
      ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1f130c] border border-[#50372b] text-white p-3 sm:p-4 rounded-3xl shadow-2xl flex items-center gap-4 max-w-[90vw] sm:max-w-xl"
          >
            <div className="flex items-center gap-2">
              {compareList.map((builder) => (
                <div key={builder.id} className="relative group">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-white font-bold text-xs shadow-md border border-white/20`}
                  >
                    {builder.avatar}
                  </div>
                  <button
                    onClick={() => toggleCompare(builder)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-xs">
              <span className="font-bold text-white">
                {compareList.length} of 3
              </span>{" "}
              <span className="text-neutral-400">selected to compare</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-neutral-400 hover:text-white px-2 py-1 transition-colors cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-4 py-2 rounded-full bg-[#F26522] hover:bg-[#d95315] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Now</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════
          SIDE-BY-SIDE COMPARISON MODAL
      ═════════════════════════════════════════════ */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#F26522] mb-1">
                <Scale className="w-4 h-4" />
                <span>Side-by-Side Comparison</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading italic font-bold text-[#50372b] mb-6">
                Compare Selected Professionals
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compareList.map((builder) => (
                  <div
                    key={builder.id}
                    className="p-5 rounded-2xl bg-[#faf5f0] border border-[#50372b]/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0`}
                        >
                          {builder.avatar}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#50372b] text-base leading-tight">
                            {builder.name}
                          </h3>
                          <p className="text-xs text-[#50372b]/60">
                            {builder.company}
                          </p>
                        </div>
                      </div>

                      {/* Specs Matrix */}
                      <div className="space-y-2.5 text-xs text-[#50372b] border-t border-[#50372b]/10 pt-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Category:
                          </span>
                          <span className="font-bold">{builder.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Location:
                          </span>
                          <span className="font-bold">{builder.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Rating:
                          </span>
                          <span className="font-bold text-amber-600 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            {builder.rating} ({builder.reviewCount})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Experience:
                          </span>
                          <span className="font-bold">{builder.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Completed Projects:
                          </span>
                          <span className="font-bold">
                            {builder.projectCount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Starting Price:
                          </span>
                          <span className="font-bold text-[#F26522]">
                            {builder.startingPrice}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Avg Rate / sq.ft:
                          </span>
                          <span className="font-bold">
                            {builder.avgPricePerSqft}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#50372b]/60 font-medium">
                            Response Time:
                          </span>
                          <span className="font-bold">
                            {builder.responseTime}
                          </span>
                        </div>
                      </div>

                      {/* Specializations */}
                      <div className="border-t border-[#50372b]/10 pt-3 mb-4">
                        <div className="text-[10px] uppercase font-bold text-[#50372b]/50 mb-1.5">
                          Specializations
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {builder.specializations.map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#50372b]/10 text-[#50372b]/70"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2">
                      <Link
                        href={`/builders/${builder.id}`}
                        className="w-full py-2 rounded-xl bg-[#50372b] hover:bg-[#3d2a21] text-white text-xs font-bold text-center block transition-all"
                      >
                        Explore Full Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsCompareModalOpen(false);
                          setActiveChatBuilder(builder);
                        }}
                        className="w-full py-2 rounded-xl border border-[#50372b]/20 hover:bg-white text-[#50372b] text-xs font-bold text-center block transition-all cursor-pointer"
                      >
                        Chat Directly
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════
          INSTANT CHAT MODAL
      ═════════════════════════════════════════════ */}
      {activeChatBuilder && (
        <ChatPanel
          builder={activeChatBuilder}
          isOpen={!!activeChatBuilder}
          onClose={() => setActiveChatBuilder(null)}
        />
      )}
    </div>
  );
}
