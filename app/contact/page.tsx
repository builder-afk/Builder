"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { BUSINESS, WHATSAPP, SOCIAL_LINKS } from "@/lib/constants";
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  Clock,
  Sparkles,
  Building2,
  Camera,
  BarChart3,
  Wand2,
  Video,
  Globe,
  Search,
  Bot,
  Cpu,
  FileCode,
  BookOpen,
  Quote,
  MessageSquare,
  Activity,
  LineChart,
  CheckCircle2,
  ShieldCheck,
  Box,
  Layers,
  Smartphone,
  Cloud,
  Compass,
  Ruler,
  Image as ImageIcon,
  Check,
  Star,
} from "lucide-react";

/* ─────────────────────────────────────────
   SERVICES FOR FORM SELECTION
   ───────────────────────────────────────── */
const services = [
  { id: "3d-tours", label: "3D Property Tours", icon: Building2 },
  { id: "360-tours", label: "360° Virtual Tours", icon: Camera },
  { id: "seo-aeo-geo", label: "SEO / AEO / GEO Optimization", icon: Search },
  { id: "ai-content", label: "AI-Ready Content & Knowledge Base", icon: Cpu },
  { id: "reddit-authority", label: "Reddit Authority Building", icon: MessageSquare },
  { id: "ai-tracking", label: "AI Tracking & Monitoring", icon: Activity },
  { id: "microsites", label: "Property Microsites", icon: Globe },
  { id: "ai-staging", label: "AI Staging & Visualization", icon: Wand2 },
  { id: "drone-video", label: "Drone & Video Content", icon: Video },
  { id: "analytics", label: "Analytics & Lead Gen", icon: BarChart3 },
  { id: "full-suite", label: "Full Marketing Suite", icon: Sparkles },
  { id: "other", label: "Something Else", icon: MessageCircle },
];

/* ─────────────────────────────────────────
   FEATURED VISUALIZATION & PRODUCTION SERVICES
   ───────────────────────────────────────── */
const visualizationServices = [
  {
    title: "Premium 3D Property Showcase",
    badge: "Flagship",
    description: "End-to-end interactive digital twin of your property designed for immersive web and mobile discovery.",
    icon: Box,
    color: "#F26522",
    features: [
      "Interactive 3D Walkthrough",
      "Web Viewer Integration",
      "Mobile & Tablet Compatible",
      "Cloud Hosting Included",
    ],
  },
  {
    title: "360° Virtual Tour",
    description: "High-definition panoramic virtual tours allowing buyers to navigate through every room effortlessly.",
    icon: Compass,
    color: "#06b6d4",
  },
  {
    title: "Interactive Floor Plan",
    description: "Clickable 2D & 3D floor plans with spatial dimension overlays and room transition hotspots.",
    icon: Ruler,
    color: "#10b981",
  },
  {
    title: "AI Virtual Staging",
    description: "Photorealistic AI staging to furnish vacant properties in multiple interior decor themes.",
    icon: Wand2,
    color: "#8b5cf6",
  },
  {
    title: "Property Microsite",
    description: "Custom, lightning-fast standalone property websites optimized for paid campaigns and lead conversion.",
    icon: Globe,
    color: "#ec4899",
  },
  {
    title: "Drone Shoot",
    description: "Professional 4K aerial video and high-resolution drone photography for project site elevation.",
    icon: Camera,
    color: "#0ea5e9",
  },
  {
    title: "Architectural CGI",
    description: "Ultra-realistic 3D exterior and interior architectural renders prior to physical construction.",
    icon: ImageIcon,
    color: "#f59e0b",
  },
];

/* ─────────────────────────────────────────
   AI SEARCH & GROWTH SERVICES (10 CORE OFFERINGS)
   ───────────────────────────────────────── */
const offerings = [
  {
    title: "SEO Optimization",
    category: "Search Strategy",
    description: "High-intent keyword ranking for real estate projects, builder domains, and localized property queries.",
    icon: Search,
    color: "#F26522",
  },
  {
    title: "AEO (Answer Engine Optimization)",
    category: "AI Answer Engines",
    description: "Positioning your properties so ChatGPT, Claude, and Perplexity recommend your projects to homebuyers.",
    icon: Bot,
    color: "#8b5cf6",
  },
  {
    title: "GEO (Generative Engine Optimization)",
    category: "Generative Search",
    description: "Optimizing content for Google AI Overviews, SearchGPT, and generative search recommendation layers.",
    icon: Cpu,
    color: "#06b6d4",
  },
  {
    title: "AI-Ready Structured Content",
    category: "Data Architecture",
    description: "Machine-readable schema markup, JSON-LD, and structured property data for seamless AI parsing.",
    icon: FileCode,
    color: "#10b981",
  },
  {
    title: "Knowledge Base Creation",
    category: "Brand Authority",
    description: "Building canonical entity graphs, builder knowledge bases, and verifiable property documentation.",
    icon: BookOpen,
    color: "#ec4899",
  },
  {
    title: "AI Citation Optimization",
    category: "Trust & Citations",
    description: "Securing authoritative citations across high-reputation real estate databases and trusted AI sources.",
    icon: Quote,
    color: "#f59e0b",
  },
  {
    title: "Reddit Authority Building",
    category: "Community Engagement",
    description: "Organic community presence, karma building, and authentic discussion authority in buyer forums.",
    icon: MessageSquare,
    color: "#ef4444",
  },
  {
    title: "AI Tracking Prompts & Monitoring",
    category: "Prompt Auditing",
    description: "Continuous prompt tracking to measure how AI assistants describe and rank your developments.",
    icon: Activity,
    color: "#3b82f6",
  },
  {
    title: "Monthly Visibility Reports",
    category: "Performance Analytics",
    description: "Detailed analytics tracking search positions, AI citations, buyer impressions, and lead conversions.",
    icon: LineChart,
    color: "#10b981",
  },
  {
    title: "Competitor AI Visibility Analysis",
    category: "Market Intelligence",
    description: "Deep benchmarking of your AI share-of-voice against competing regional builders and developers.",
    icon: ShieldCheck,
    color: "#8b5cf6",
  },
];

const faqs = [
  {
    q: "What is included in the Premium 3D Property Showcase?",
    a: "The Premium 3D Showcase includes an interactive 3D walkthrough, web viewer integration, mobile & tablet compatibility, and cloud hosting included with no extra monthly charges.",
  },
  {
    q: "What is AEO and GEO, and why do builders need it?",
    a: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) ensure your real estate projects appear when buyers ask AI tools like ChatGPT, Gemini, or Perplexity for property recommendations in your city.",
  },
  {
    q: "How long does a 3D tour or AI setup take to produce?",
    a: "From on-site capture to live deployment, 3D property tours take 48-72 hours. Digital SEO/AEO setups go live within 5-7 business days.",
  },
  {
    q: "Do you travel to different cities?",
    a: "Yes! We serve all major Indian cities including Mumbai, Bengaluru, Pune, Delhi NCR, Hyderabad, Ahmedabad, Kochi, and more.",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [refNumber, setRefNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: selectedService,
      message: formData.get("message"),
      source: "Contact Page",
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setFormState("success");
        setRefNumber(result.refNumber);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5f0] font-body">
      <Navbar />

      {/* Hero Header */}
      <div className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#50372b]/50 hover:text-[#50372b] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#50372b]/10 text-[#F26522] text-[12px] font-semibold tracking-wide mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Contact & Growth Solutions
            </div>
            <h1 className="font-heading italic text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-[#50372b] mb-4">
              Let&apos;s create something{" "}
              <span className="text-[#F26522]">stunning.</span>
            </h1>
            <p className="text-[#50372b]/60 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl font-medium">
              Tell us about your project. We&apos;ll get back within 24 hours with a
              tailored proposal — or chat with us instantly on WhatsApp.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section: Contact Form + Sidebar */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ─── LEFT: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              /* ── Success State ── */
              <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h2 className="font-heading italic text-3xl sm:text-4xl text-[#50372b] mb-3">
                  Message Received!
                </h2>
                <p className="text-[#50372b]/55 text-[15px] mb-2 max-w-md mx-auto font-medium">
                  We&apos;ve got your inquiry and will get back to you within 24 hours
                  with a tailored proposal.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#50372b]/5 text-[13px] font-mono text-[#50372b]/60 mt-4 mb-8">
                  Reference: {refNumber}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={WHATSAPP.getUrl("Hi, I just submitted an inquiry (Ref: " + refNumber + "). Looking forward to your response!")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-[14px] font-medium hover:bg-[#20BD5A] transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Follow up on WhatsApp
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#50372b]/10 text-[#50372b]/70 text-[14px] font-medium hover:border-[#50372b]/25 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Contact Form ── */
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6 sm:p-8 lg:p-10 space-y-6"
              >
                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-3">
                    What service(s) are you interested in?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedService === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(isSelected ? "" : service.id)}
                          className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-center transition-all duration-300 ${
                            isSelected
                              ? "bg-[#F26522]/10 border-[#F26522]/30 border text-[#F26522] shadow-sm font-semibold"
                              : "bg-[#faf5f0] border border-transparent text-[#50372b]/60 hover:bg-[#50372b]/5"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[11px] font-medium leading-tight">
                            {service.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Rajesh Kumar"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="rajesh@company.com"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-2">
                      Company / Builder Name
                    </label>
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Prestige Group"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Describe your property, what services you need (e.g. 3D tours, SEO/AEO/GEO optimization), and any specific requirements..."
                    className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none resize-none placeholder:text-[#50372b]/30"
                  />
                </div>

                {formState === "error" && (
                  <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-[13px] text-red-600 font-medium">
                    Something went wrong. Please try again or contact us on WhatsApp.
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#50372b] text-white text-[14px] font-medium hover:bg-[#624334] transition-all duration-300 hover:translate-y-[-1px] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </button>

                  <span className="text-[12px] text-[#50372b]/40 font-medium text-center sm:text-left">
                    or{" "}
                    <a
                      href={WHATSAPP.getUrl(WHATSAPP.defaultMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline font-semibold"
                    >
                      chat on WhatsApp
                    </a>{" "}
                    for instant response
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* ─── RIGHT: Contact Info + FAQ ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6 space-y-4">
              <h3 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-2">
                Quick Connect
              </h3>

              {/* WhatsApp */}
              <a
                href={WHATSAPP.getUrl(WHATSAPP.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/8 hover:bg-[#25D366]/15 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">
                    WhatsApp
                  </p>
                  <p className="text-[12px] text-[#50372b]/50">
                    Instant response • {BUSINESS.phone}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/60 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">
                    Email
                  </p>
                  <p className="text-[12px] text-[#50372b]/50">
                    {BUSINESS.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-amber-50/60 hover:bg-amber-50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">
                    Call Us
                  </p>
                  <p className="text-[12px] text-[#50372b]/50">
                    {BUSINESS.phone}
                  </p>
                </div>
              </a>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#F26522]/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#F26522]" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#50372b]">
                  Response Time
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#50372b]/60">WhatsApp</span>
                  <span className="text-[12px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    ~5 min
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#50372b]/60">Email</span>
                  <span className="text-[12px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">
                    &lt; 24 hrs
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#50372b]/60">Phone</span>
                  <span className="text-[12px] font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-semibold">
                    Mon–Sat 10–7
                  </span>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">{BUSINESS.address}</p>
                  <p className="text-[12px] text-[#50372b]/50">We serve all major Indian cities</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6">
              <h3 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/50 font-semibold mb-4">
                Common Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full text-left flex items-start gap-3 py-3 text-[13px] font-medium text-[#50372b]/80 hover:text-[#50372b] transition-colors"
                    >
                      <span className="text-[#F26522] shrink-0 mt-0.5 font-bold">
                        {expandedFaq === i ? "−" : "+"}
                      </span>
                      {faq.q}
                    </button>
                    {expandedFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[13px] text-[#50372b]/60 leading-relaxed pl-6 pb-3 font-normal"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-[#50372b]/8 flex items-center justify-center text-[#50372b]/40 hover:text-[#50372b] hover:border-[#50372b]/20 transition-all shadow-sm text-[12px] font-mono uppercase font-bold"
                  aria-label={platform}
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
         FEATURED VISUALIZATION & PRODUCTION SERVICES
         ───────────────────────────────────────── */}
      <section className="pb-12 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#2c1b12] text-white rounded-[24px] border border-neutral-800/50 shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F26522] font-semibold bg-[#F26522]/15 border border-[#F26522]/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4">
              <Star className="w-3.5 h-3.5 fill-[#F26522]" />
              FEATURED VISUALIZATION SERVICES
            </span>
            <h2 className="font-heading italic text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-white mb-4">
              3D Walkthroughs, Virtual Tours & Media Production
            </h2>
            <p className="text-neutral-300 text-[15px] sm:text-[16px] leading-relaxed font-medium">
              Transform physical properties into immersive digital twin experiences that engage buyers, pre-qualify site visits, and accelerate project sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {visualizationServices.map((service, idx) => {
              const Icon = service.icon;
              const isFlagship = service.badge === "Flagship";
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }}
                  className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isFlagship
                      ? "md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#3b2518] to-[#25160e] border-[#F26522]/60 shadow-[0_0_30px_rgba(242,101,34,0.12)]"
                      : "bg-[#352217]/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-[#3b2518]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${service.color}20`,
                          border: `1px solid ${service.color}40`,
                        }}
                      >
                        <Icon className="w-5.5 h-5.5" style={{ color: service.color }} />
                      </div>
                      {isFlagship && (
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-white bg-[#F26522] px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-3 h-3" />
                          Flagship Solution
                        </span>
                      )}
                    </div>

                    <h3 className={`font-semibold text-white mb-2 tracking-tight ${isFlagship ? "text-[20px] sm:text-[22px]" : "text-[17px]"}`}>
                      {service.title}
                    </h3>
                    <p className="text-neutral-300 text-[14px] leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Features list if available */}
                    {service.features && (
                      <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {service.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 bg-[#25160e] px-3.5 py-2.5 rounded-xl border border-[#F26522]/20">
                            <Check className="w-4 h-4 text-[#F26522] shrink-0" />
                            <span className="text-[13px] font-semibold text-white leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
         AI SEARCH & GROWTH SERVICES (10 CORE OFFERINGS)
         ───────────────────────────────────────── */}
      <section className="pb-24 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-[24px] border border-[#50372b]/8 shadow-sm p-6 sm:p-10 lg:p-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F26522] font-semibold bg-[#F26522]/8 border border-[#F26522]/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
              AI SEARCH & GROWTH INFRASTRUCTURE
            </span>
            <h2 className="font-heading italic text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] text-[#50372b] mb-4">
              SEO, AEO & GEO Search Optimization Services
            </h2>
            <p className="text-[#50372b]/60 text-[15px] sm:text-[16px] leading-relaxed font-medium">
              Cutting-edge Answer Engine (AEO) and Generative Engine Optimization (GEO) to ensure your real estate developments are recommended by ChatGPT, Gemini, Claude, and AI Search.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {offerings.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.04 }}
                  className="bg-[#faf5f0]/60 rounded-2xl p-5 border border-[#50372b]/6 hover:border-[#F26522]/30 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#50372b]/40 font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-[15px] font-semibold text-[#50372b] mb-2 leading-snug group-hover:text-[#F26522] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#50372b]/60 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#50372b]/5 flex items-center gap-1.5 text-[11px] font-semibold text-[#F26522]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Included Service</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
