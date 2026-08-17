"use client";

import React, { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import { getNicheBySlug, NICHE_SLUGS, NICHE_PAGES } from "@/lib/data/nichePageData";
import type { NichePageData, NicheFAQ } from "@/lib/data/nichePageData";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  Quote,
  Zap,
  Target,
  Clock,
  Users,
  Shield,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────
// FAQ Accordion Item
// ─────────────────────────────────────────
function FAQItem({ faq, accentColor }: { faq: NicheFAQ; accentColor: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all ${
        isOpen ? "bg-white shadow-lg border-[#50372b]/15" : "bg-white/60 border-[#50372b]/8 hover:border-[#50372b]/15"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
      >
        <span className="text-sm sm:text-base font-semibold text-[#50372b] leading-snug pr-4">
          {faq.question}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
          style={{ backgroundColor: isOpen ? accentColor : "transparent", color: isOpen ? "#fff" : "#50372b" }}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[#50372b]/70 leading-relaxed border-t border-[#50372b]/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Niche Page
// ─────────────────────────────────────────
export default function NicheCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = getNicheBySlug(slug);

  // 404 fallback
  if (!data) {
    return (
      <div className="min-h-screen bg-[#faf5f0] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <h1 className="text-4xl font-heading italic text-[#50372b]">Category Not Found</h1>
            <p className="text-[#50372b]/60 text-lg">The niche category you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F26522] text-white font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = data.icon;
  const relatedPages = data.relatedNiches.map((s) => NICHE_PAGES[s]).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#faf5f0] text-[#50372b] font-body">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Background Gradient Orbs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[150px] opacity-15 pointer-events-none"
          style={{ backgroundColor: data.accentColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ backgroundColor: data.accentColor }}
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          {/* Back Link */}
          <Link href="/#ecosystem" className="inline-flex items-center gap-2 text-[#50372b]/60 hover:text-[#50372b] transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Ecosystem
          </Link>

          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-xs"
              style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor, borderColor: `${data.accentColor}30`, borderWidth: 1 }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{data.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading italic leading-[1.08] tracking-tight mb-6"
            >
              {data.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl sm:text-2xl font-medium leading-relaxed mb-4"
              style={{ color: data.accentColor }}
            >
              {data.heroTagline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-[#50372b]/65 leading-relaxed max-w-3xl mb-8"
            >
              {data.heroDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href={data.ctaPrimaryLink}
                className="px-7 py-3.5 rounded-full text-white font-semibold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-[0.97] hover:shadow-xl"
                style={{ backgroundColor: data.accentColor }}
              >
                <span>{data.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={data.ctaSecondaryLink}
                className="px-7 py-3.5 rounded-full border border-[#50372b]/20 hover:bg-[#50372b]/5 text-[#50372b] font-semibold text-sm transition-all"
              >
                {data.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATISTICS BAR
      ═══════════════════════════════════════ */}
      <section className="py-12 border-y border-[#50372b]/8 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {data.statistics.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-heading italic font-bold tracking-tight" style={{ color: data.accentColor }}>
                  {stat.value}
                  <span className="text-lg sm:text-xl ml-0.5 font-mono">{stat.suffix}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#50372b]/60 mt-1.5 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PAIN POINTS — "The Challenge"
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/60 text-red-700 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Target className="w-3.5 h-3.5" />
              <span>The Real Challenges</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading italic tracking-tight mb-4">
              Sound Familiar?
            </h2>
            <p className="text-base sm:text-lg text-[#50372b]/60 leading-relaxed">
              {data.detailedDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {data.painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-red-100 hover:border-red-200 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-4 text-sm font-bold font-mono group-hover:bg-red-100 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-bold text-[#50372b] mb-2">{point.title}</h3>
                <p className="text-sm text-[#50372b]/60 leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#50372b]/8">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: `${data.accentColor}10`, color: data.accentColor, border: `1px solid ${data.accentColor}30` }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading italic tracking-tight mb-4">
              Get Started in <span style={{ color: data.accentColor }}>4 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {data.howItWorks.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-3xl bg-[#faf5f0] border border-[#50372b]/8 hover:shadow-lg transition-all group"
                >
                  {/* Step Number Connector Line (except last) */}
                  {i < data.howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-[#50372b]/15" />
                  )}

                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${data.accentColor}15`, color: data.accentColor }}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>

                  <div className="text-xs font-mono font-bold uppercase tracking-widest mb-2" style={{ color: data.accentColor }}>
                    Step {step.step}
                  </div>
                  <h3 className="text-base font-bold text-[#50372b] mb-2 leading-snug">{step.title}</h3>
                  <p className="text-sm text-[#50372b]/60 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BENEFITS & FEATURES
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: `${data.accentColor}10`, color: data.accentColor, border: `1px solid ${data.accentColor}30` }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform Benefits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading italic tracking-tight mb-4">
              Everything You Need to <span style={{ color: data.accentColor }}>Grow</span>
            </h2>
            <p className="text-base sm:text-lg text-[#50372b]/60 max-w-2xl mx-auto">
              Built specifically for {data.shortTitle.toLowerCase()} in the construction ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {data.benefits.map((benefit, i) => {
              const BenIcon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-2xl bg-white border border-[#50372b]/8 hover:border-[#50372b]/20 transition-all hover:shadow-lg group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${data.accentColor}12`, color: data.accentColor }}
                  >
                    <BenIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#50372b] mb-2 leading-snug">{benefit.title}</h3>
                  <p className="text-xs text-[#50372b]/55 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#50372b]/8">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Quote className="w-3.5 h-3.5" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading italic tracking-tight">
              Trusted by Industry <span style={{ color: data.accentColor }}>Leaders</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#faf5f0] border border-[#50372b]/8 flex flex-col justify-between"
              >
                {/* Stars */}
                <div>
                  <div className="flex items-center gap-0.5 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className={`w-4 h-4 ${s < test.rating ? "fill-amber-400 text-amber-400" : "text-neutral-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-[#50372b]/80 leading-relaxed italic mb-6">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#50372b]/8">
                  <div className="text-sm font-bold text-[#50372b]">{test.name}</div>
                  <div className="text-xs text-[#50372b]/60">{test.role}, {test.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRICING
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4"
              style={{ backgroundColor: `${data.accentColor}10`, color: data.accentColor, border: `1px solid ${data.accentColor}30` }}
            >
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading italic tracking-tight mb-4">
              Plans Built for <span style={{ color: data.accentColor }}>{data.shortTitle}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  plan.recommended
                    ? "bg-white shadow-xl border-2"
                    : "bg-white/80 shadow-sm border-[#50372b]/10"
                }`}
                style={plan.recommended ? { borderColor: data.accentColor } : undefined}
              >
                {plan.recommended && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: data.accentColor }}
                  >
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-[#50372b] mb-1">{plan.name}</h3>
                  <p className="text-xs text-[#50372b]/50 mb-4">{plan.description}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-heading italic font-bold text-[#50372b]">{plan.price}</span>
                    <span className="text-sm text-[#50372b]/50 font-mono">{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-[#50372b]/75">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: data.accentColor }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={data.ctaPrimaryLink}
                  className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all ${
                    plan.recommended
                      ? "text-white shadow-md hover:shadow-lg active:scale-[0.97]"
                      : "border border-[#50372b]/15 text-[#50372b] hover:bg-[#50372b]/5"
                  }`}
                  style={plan.recommended ? { backgroundColor: data.accentColor } : undefined}
                >
                  {plan.ctaText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQs
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#50372b]/8">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading italic tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#50372b]/55">Common questions from {data.shortTitle.toLowerCase()} joining the platform.</p>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} accentColor={data.accentColor} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RELATED NICHES
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading italic tracking-tight mb-2">
              Explore Other Categories
            </h2>
            <p className="text-sm text-[#50372b]/55">The building ecosystem is interconnected. See how other professionals use Builder&apos;s Central.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {relatedPages.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <Link
                  key={rel.slug}
                  href={`/niche/${rel.slug}`}
                  className="group p-6 rounded-2xl bg-white border border-[#50372b]/8 hover:border-[#50372b]/20 hover:shadow-lg transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${rel.accentColor}15`, color: rel.accentColor }}
                  >
                    <RelIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#50372b] group-hover:text-[#F26522] transition-colors">{rel.title}</h3>
                  <p className="text-xs text-[#50372b]/55 mt-1 line-clamp-2">{rel.heroTagline}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: rel.accentColor }}>
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#2c1b12] text-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[300px] rounded-full blur-[150px] opacity-20 pointer-events-none"
          style={{ backgroundColor: data.accentColor }}
        />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="bg-[#1f130c] border border-[#50372b] p-8 sm:p-14 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase"
                style={{ backgroundColor: `${data.accentColor}25`, color: data.accentColor, border: `1px solid ${data.accentColor}40` }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join the Building Ecosystem</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading italic leading-tight text-white">
                Ready to grow your<br />
                <span style={{ color: data.accentColor }}>{data.shortTitle.toLowerCase()}</span> business?
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Join hundreds of {data.shortTitle.toLowerCase()} who are already growing their business on Builder&apos;s Central. Get verified, get discovered, and win more projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <Link
                href={data.ctaPrimaryLink}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                style={{ backgroundColor: data.accentColor }}
              >
                <span>{data.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-sm flex items-center justify-center transition-all"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
