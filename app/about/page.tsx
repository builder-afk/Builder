"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import {
  ArrowRight,
  Building2,
  Target,
  Lightbulb,
  Layers,
  Eye,
  Zap,
  TrendingUp,
  Users,
  Globe,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Box,
  Camera,
  Ruler,
  CheckCircle2,
  ArrowUpRight,
  Heart,
  Rocket,
} from "lucide-react";
/* ─────────────────────────────────────────
   DATA
   ───────────────────────────────────────── */
const stats = [
  { value: "500+", label: "Properties Digitized" },
  { value: "40%", label: "Faster Conversions" },
  { value: "3x", label: "More Qualified Leads" },
  { value: "85%", label: "Fewer Site Visits" },
];
const principles = [
  {
    icon: Eye,
    title: "See It Before You Build It",
    description:
      "Every property deserves to be experienced, not just described. We transform blueprints and bare structures into immersive digital experiences that let buyers walk through their future home — before a single wall is painted.",
    color: "#F26522",
  },
  {
    icon: Layers,
    title: "Technology as Infrastructure",
    description:
      "We don't build flashy demos. We build marketing infrastructure — reliable, scalable, and always-on. Every 3D tour, every microsite, every analytics dashboard is engineered to become a permanent part of how you sell.",
    color: "#8b5cf6",
  },
  {
    icon: Target,
    title: "Data-Driven Decisions",
    description:
      "Gut feelings don't close deals — data does. We instrument every tour with behavioral analytics so builders know exactly which rooms captivate, which features convert, and which leads are ready to buy.",
    color: "#10b981",
  },
  {
    icon: Heart,
    title: "Builder-First Design",
    description:
      "Every feature we ship is designed for the Indian builder's workflow — not retrofitted from Western SaaS. From WhatsApp integration to regional pricing intelligence, we understand the market because we're part of it.",
    color: "#ec4899",
  },
];
const methodology = [
  {
    step: "01",
    title: "Capture",
    subtitle: "Professional On-Site Digitization",
    description:
      "Our trained technicians arrive at your property with LiDAR scanners, 360° cameras, and drone rigs. In 2–4 hours, we capture every dimension, texture, and spatial relationship of your property.",
    icon: Camera,
    accent: "#F26522",
  },
  {
    step: "02",
    title: "Process",
    subtitle: "AI-Powered Rendering Pipeline",
    description:
      "Raw scans flow through our proprietary processing pipeline — AI-enhanced textures, optimized mesh generation, and web-ready compression. What takes studios weeks, we deliver in 48–72 hours.",
    icon: Sparkles,
    accent: "#8b5cf6",
  },
  {
    step: "03",
    title: "Deploy",
    subtitle: "Instant Web-Based Distribution",
    description:
      "Your 3D showcase, microsite, and analytics dashboard go live on our CDN infrastructure. No app downloads, no plugins — buyers access everything from any browser, on any device.",
    icon: Globe,
    accent: "#0ea5e9",
  },
  {
    step: "04",
    title: "Optimize",
    subtitle: "Continuous Performance Intelligence",
    description:
      "Real-time analytics track every interaction — room visits, hotspot clicks, time-on-tour. We surface actionable insights so you can refine your marketing, prioritize leads, and close faster.",
    icon: BarChart3,
    accent: "#10b981",
  },
];
const whyNow = [
  {
    icon: TrendingUp,
    title: "Buyers Research Online First",
    stat: "92%",
    description:
      "of Indian home buyers start their search online. If your property can't be experienced digitally, you're invisible to the majority of your market.",
  },
  {
    icon: Users,
    title: "NRI Buyers Can't Visit",
    stat: "₹1.2L Cr",
    description:
      "NRI investment in Indian real estate annually. These buyers make ₹1–5 Cr decisions based on WhatsApp photos and PDFs. They deserve better. So do you.",
  },
  {
    icon: Zap,
    title: "Builders Are Losing Deals",
    stat: "60%",
    description:
      "of site visits result in no action. Buyers waste weekends, builders waste sales bandwidth. Virtual tours pre-qualify interest so every visit is meaningful.",
  },
  {
    icon: Globe,
    title: "AI Is Reshaping Search",
    stat: "2026",
    description:
      "Google, ChatGPT, and AI assistants now recommend properties. Without structured digital content, your listings don't exist in the AI-powered discovery layer.",
  },
];
const differentiators = [
  {
    title: "Built for India",
    description:
      "Regional pricing, WhatsApp-first communication, vernacular support, and deep understanding of RERA compliance and Indian buyer psychology.",
    icon: Building2,
  },
  {
    title: "End-to-End Platform",
    description:
      "Not just a tool — a complete marketing system. From capture to CRM, analytics to AI SEO, we own the entire pipeline so nothing falls through the cracks.",
    icon: Layers,
  },
  {
    title: "Speed at Scale",
    description:
      "48-hour turnaround. 500+ properties processed. Our pipeline handles individual villas and 200-unit townships with the same quality and speed.",
    icon: Rocket,
  },
  {
    title: "AI-Native Architecture",
    description:
      "Virtual staging, SEO descriptions, citation building, and visibility optimization — all powered by AI that understands real estate, not generic content generation.",
    icon: Sparkles,
  },
  {
    title: "Proven ROI",
    description:
      "Our builders report 40% faster conversions, 3x lead quality improvement, and 85% reduction in unqualified site visits. We measure outcomes, not vanity metrics.",
    icon: BarChart3,
  },
  {
    title: "Trusted & Verified",
    description:
      "Builder verification badges, secure data handling, and transparent pricing. We align our success with yours — marketplace plans charge only on completed deals.",
    icon: ShieldCheck,
  },
];
const team = [
  {
    role: "Product & Engineering",
    description:
      "Former architects, 3D artists, and full-stack engineers who understand both physical spaces and digital experiences.",
  },
  {
    role: "On-Ground Operations",
    description:
      "Trained capture technicians in every major Indian metro. Professional equipment, standardized workflows, consistent quality.",
  },
  {
    role: "AI & Data Science",
    description:
      "Machine learning engineers building the next generation of property intelligence — from virtual staging to market prediction.",
  },
  {
    role: "Growth & Marketing",
    description:
      "SEO, AEO, GEO, Reddit authority, and AI visibility specialists who understand how to make builders discoverable in 2026.",
  },
];
/* ─────────────────────────────────────────
   ANIMATED SECTION WRAPPER
   ───────────────────────────────────────── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
/* ─────────────────────────────────────────
   PAGE COMPONENT
   ───────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  return (
    <div className="bg-[#FAFAFA] min-h-screen font-body">
      <Navbar />
      {/* ═══════════════════════════════════
         HERO
         ═══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F26522]/10 to-transparent blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gray-300/30 to-transparent blur-[60px]" />
        </div>
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-gray-800 uppercase">
              About Builder&apos;s Central
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)] max-w-[900px]"
          >
            We believe every property deserves to be{" "}
            <span className="text-[#F26522]">experienced</span>, not just
            listed.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[17px] sm:text-[19px] text-gray-500 max-w-[640px] mt-6 leading-relaxed font-medium"
          >
            Builder&apos;s Central is the property marketing infrastructure for
            India&apos;s builders and developers. We combine 3D technology, AI,
            and deep market understanding to transform how properties are
            marketed, discovered, and sold.
          </motion.p>
          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[36px] sm:text-[42px] font-bold text-gray-900 tracking-tight leading-none font-heading italic">
                  {stat.value}
                </div>
                <div className="text-[13px] text-gray-400 font-semibold uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ═══════════════════════════════════
         PHILOSOPHY — Core Principles
         ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeInSection>
            <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-[#fafafa] shadow-[0px_1px_1px_#00000005] inline-block mb-6">
              OUR PHILOSOPHY
            </div>
            <h2 className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] max-w-[800px] mb-4">
              Four beliefs that shape everything we build.
            </h2>
            <p className="text-[16px] sm:text-[17px] text-gray-500 max-w-[560px] leading-relaxed mb-16">
              These aren&apos;t values on a poster. They&apos;re engineering
              decisions, product choices, and the reason our builders see
              measurable results.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((p, i) => (
              <FadeInSection key={p.title} delay={i * 0.08}>
                <div className="bg-[#fafafa] rounded-2xl p-8 sm:p-10 border border-gray-100 hover:border-gray-200 transition-all duration-300 h-full group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `${p.color}12`,
                      border: `1px solid ${p.color}25`,
                    }}
                  >
                    <p.icon
                      className="w-6 h-6"
                      style={{ color: p.color }}
                    />
                  </div>
                  <h3 className="text-[20px] font-semibold text-gray-900 mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════
         WHY NOW — The Market Moment
         ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#faf5f0] border-t border-gray-200/50">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeInSection>
            <div className="text-center mb-16">
              <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-white shadow-[0px_1px_1px_#00000005] inline-block mb-6">
                WHY NOW
              </div>
              <h2 className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] mb-4 max-w-[800px] mx-auto">
                The Indian real estate industry has a{" "}
                <span className="text-[#F26522]">visibility problem.</span>
              </h2>
              <p className="text-[16px] sm:text-[17px] text-gray-500 max-w-[560px] mx-auto leading-relaxed">
                ₹70 Lakh Crore worth of Indian real estate is marketed with
                brochure PDFs, WhatsApp photos, and hope. That era is over.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {whyNow.map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F26522]/8 border border-[#F26522]/15 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#F26522]" />
                    </div>
                    <div className="text-[32px] font-heading italic font-bold text-gray-900 tracking-tight leading-none">
                      {item.stat}
                    </div>
                  </div>
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════
         METHODOLOGY — How We Work
         ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeInSection>
            <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-[#fafafa] shadow-[0px_1px_1px_#00000005] inline-block mb-6">
              OUR METHODOLOGY
            </div>
            <h2 className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] max-w-[800px] mb-4">
              From physical space to digital experience in 48 hours.
            </h2>
            <p className="text-[16px] sm:text-[17px] text-gray-500 max-w-[560px] leading-relaxed mb-16">
              Our four-stage pipeline is built for speed, quality, and
              consistency — whether you have one villa or a 200-unit township.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step, i) => (
              <FadeInSection key={step.step} delay={i * 0.1}>
                <div className="relative bg-[#fafafa] rounded-2xl p-7 border border-gray-100 h-full group hover:border-gray-200 transition-all duration-300">
                  {/* Step number */}
                  <div
                    className="text-[11px] font-mono font-bold uppercase tracking-wider mb-5"
                    style={{ color: step.accent }}
                  >
                    STEP {step.step}
                  </div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${step.accent}12`,
                      border: `1px solid ${step.accent}25`,
                    }}
                  >
                    <step.icon
                      className="w-5 h-5"
                      style={{ color: step.accent }}
                    />
                  </div>
                  <h3 className="text-[18px] font-semibold text-gray-900 mb-1 tracking-tight">
                    {step.title}
                  </h3>
                  <p
                    className="text-[12px] font-semibold uppercase tracking-wider mb-3"
                    style={{ color: step.accent }}
                  >
                    {step.subtitle}
                  </p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════
         WHY US — Differentiators
         ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#2c1b12] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeInSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2c1b12]/80 border border-[#50372b] text-[12px] font-semibold tracking-wide text-[#c1a18c] mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                WHY BUILDER&apos;S CENTRAL
              </div>
              <h2 className="text-white font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] mb-4 max-w-[800px] mx-auto">
                We&apos;re not a SaaS tool.{" "}
                <span className="text-[#F26522]">
                  We&apos;re your marketing infrastructure.
                </span>
              </h2>
              <p className="text-[16px] sm:text-[17px] text-neutral-400 max-w-[560px] mx-auto leading-relaxed">
                Here&apos;s what makes us fundamentally different from generic
                virtual tour providers and marketing agencies.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((d, i) => (
              <FadeInSection key={d.title} delay={i * 0.06}>
                <div className="bg-[#3a2518]/50 rounded-2xl p-7 border border-neutral-800/40 h-full hover:border-neutral-700/60 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-[#F26522]/10 border border-[#F26522]/20 flex items-center justify-center mb-5">
                    <d.icon className="w-5 h-5 text-[#F26522]" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-2 tracking-tight">
                    {d.title}
                  </h3>
                  <p className="text-[14px] text-neutral-400 leading-relaxed">
                    {d.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════
         TEAM — Who Builds This
         ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <FadeInSection>
            <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-[#fafafa] shadow-[0px_1px_1px_#00000005] inline-block mb-6">
              THE TEAM
            </div>
            <h2 className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] max-w-[800px] mb-4">
              Built by people who understand both buildings and bytes.
            </h2>
            <p className="text-[16px] sm:text-[17px] text-gray-500 max-w-[560px] leading-relaxed mb-16">
              Our team combines deep construction industry expertise with
              cutting-edge technology capabilities.
            </p>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <FadeInSection key={t.role} delay={i * 0.08}>
                <div className="bg-[#fafafa] rounded-2xl p-7 border border-gray-100 h-full">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mb-5">
                    <span className="font-heading italic text-white text-[17px] font-bold leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-semibold text-gray-900 mb-2 tracking-tight">
                    {t.role}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    {t.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════
         MISSION STATEMENT — Bottom CTA
         ═══════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#faf5f0] border-t border-gray-200/50">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <FadeInSection>
            <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-white shadow-[0px_1px_1px_#00000005] inline-block mb-8">
              OUR MISSION
            </div>
            <h2 className="text-gray-900 font-heading italic leading-[1.1] tracking-[-0.03em] text-[clamp(1.8rem,4vw,3rem)] mb-6 max-w-[700px] mx-auto">
              To make every property in India discoverable, experienceable, and
              sellable — through technology that works as hard as the builders
              who use it.
            </h2>
            <p className="text-[16px] sm:text-[17px] text-gray-500 max-w-[520px] mx-auto leading-relaxed mb-10">
              We&apos;re just getting started. Join the builders who are already
              transforming how India buys homes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/how-it-works#pricing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F26522] text-white text-[15px] font-semibold hover:bg-[#e05a1a] transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-[#F26522]/20 group"
              >
                View Our Plans
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 text-[15px] font-semibold hover:border-gray-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                Talk to Our Team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}