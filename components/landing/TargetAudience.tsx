"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HardHat,
  Compass,
  PackageCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Target,
} from "lucide-react";

export interface AudienceSegment {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  highlights: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  ctaLink: string;
}

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    id: "contractors",
    title: "Contractors and Builders",
    shortTitle: "Builders & Contractors",
    badge: "For Builders",
    headline: "Get found by active owners and developers.",
    description:
      "Get found by active owners and developers - not just random views & clicks.",
    icon: HardHat,
    color: "#F26522",
    bgColor: "bg-orange-50/80",
    badgeBg: "bg-orange-100/80",
    badgeText: "text-orange-700 border-orange-200",
    borderColor: "hover:border-orange-300",
    highlights: [
      {
        title: "Qualified Builders",
        description: "Verified profile & portfolio showcasing active projects.",
      },
      {
        title: "Focused Visibility",
        description: "Targeted presence directly in the construction market.",
      },
      {
        title: "Less Noise",
        description: "Higher relevance than general advertising platforms.",
      },
    ],
    ctaText: "List Your Construction Firm",
    ctaLink: "/niche/contractors",
  },
  {
    id: "architects",
    title: "Architects & Designers",
    shortTitle: "Architects & Designers",
    badge: "For Architects",
    headline: "Increase your visibility where projects are specified.",
    description:
      "Increase visibility where projects take shape. Connect with owners and developers earlier.",
    icon: Compass,
    color: "#0284c7",
    bgColor: "bg-sky-50/80",
    badgeBg: "bg-sky-100/80",
    badgeText: "text-sky-700 border-sky-200",
    borderColor: "hover:border-sky-300",
    highlights: [
      {
        title: "Be Discovered Earlier",
        description: "Connect early in the design & specification process.",
      },
      {
        title: "Showcase Your Expertise",
        description: "Highlight architectural work rather than simple ad banners.",
      },
      {
        title: "Reach Serious Stakeholders",
        description: "Direct exposure to active project owners & developers.",
      },
    ],
    ctaText: "Showcase Your Design Studio",
    ctaLink: "/niche/architects",
  },
  {
    id: "suppliers",
    title: "Suppliers and Manufacturers",
    shortTitle: "Suppliers & Brands",
    badge: "For Suppliers",
    headline: "Reach key decision-makers before products are selected.",
    description:
      "Reach decision-makers at the right moment — before products are selected.",
    icon: PackageCheck,
    color: "#059669",
    bgColor: "bg-emerald-50/80",
    badgeBg: "bg-emerald-100/80",
    badgeText: "text-emerald-700 border-emerald-200",
    borderColor: "hover:border-emerald-300",
    highlights: [
      {
        title: "Visibility to Builders & Designers",
        description: "Direct discovery by decision-makers crafting project specs.",
      },
      {
        title: "Construction-Specific Ecosystem",
        description: "Placement inside a dedicated industry-focused platform.",
      },
      {
        title: "More Relevant ROI",
        description: "Outperforms broad display advertising in conversion intent.",
      },
    ],
    ctaText: "Join Product Ecosystem",
    ctaLink: "/niche/suppliers",
  },
  {
    id: "owners",
    title: "Project Owners and Developers",
    shortTitle: "Owners & Developers",
    badge: "For Developers",
    headline: "Find qualified professionals faster.",
    description:
      "Find qualified building and supply professionals faster, in one trusted place.",
    icon: Building,
    color: "#7c3aed",
    bgColor: "bg-purple-50/80",
    badgeBg: "bg-purple-100/80",
    badgeText: "text-purple-700 border-purple-200",
    borderColor: "hover:border-purple-300",
    highlights: [
      {
        title: "Compare Professionals Easily",
        description: "Evaluate builders, designers, & suppliers in one directory.",
      },
      {
        title: "Reduce Search Uncertainty",
        description: "Cut down search time with verified badges & past 3D tours.",
      },
      {
        title: "Effortless Connectivity",
        description: "Seamlessly connect with industry-focused providers.",
      },
    ],
    ctaText: "Find Qualified Professionals",
    ctaLink: "/niche/owners",
  },
];

export default function TargetAudience() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredSegments =
    activeTab === "all"
      ? AUDIENCE_SEGMENTS
      : AUDIENCE_SEGMENTS.filter((s) => s.id === activeTab);

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 text-slate-900 relative overflow-hidden" id="ecosystem">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-400/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-purple-400/10 blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Built For Construction Stakeholders</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading italic text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight mb-4"
          >
            Empowering the Entire <span className="text-[#F26522]">Building Ecosystem</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium"
          >
            Whether you are building, designing, supplying, or developing — our platform connects serious decision-makers with high-intent opportunities.
          </motion.p>

          {/* Segment Selector Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-300/70 max-w-2xl mx-auto backdrop-blur-sm"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/25"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              All Stakeholders
            </button>
            {AUDIENCE_SEGMENTS.map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveTab(seg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === seg.id
                    ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <seg.icon className="w-3.5 h-3.5" />
                <span>{seg.shortTitle}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Audience Cards Grid (Light Theme) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSegments.map((segment, idx) => {
              const IconComp = segment.icon;
              return (
                <motion.div
                  key={segment.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`relative rounded-3xl p-7 sm:p-8 bg-white border border-slate-200/90 shadow-sm hover:shadow-xl ${segment.borderColor} transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
                >
                  {/* Accent Top Gradient Line */}
                  <div
                    className="absolute top-0 left-8 right-8 h-1 rounded-b-full opacity-80"
                    style={{ background: segment.color }}
                  />

                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border ${segment.bgColor} shrink-0`}
                        style={{ color: segment.color }}
                      >
                        <IconComp className="w-7 h-7" />
                      </div>
                      <span
                        className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${segment.badgeBg} ${segment.badgeText}`}
                      >
                        {segment.badge}
                      </span>
                    </div>

                    {/* Segment Title & Headline */}
                    <h3 className="font-heading italic text-2xl sm:text-3xl text-slate-900 mb-2 leading-snug">
                      {segment.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base font-bold mb-3 tracking-tight"
                      style={{ color: segment.color }}
                    >
                      {segment.headline}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {segment.description}
                    </p>

                    {/* Key Highlights / Benefits Bullet Points */}
                    <div className="space-y-3.5 mb-8 pt-5 border-t border-slate-100">
                      {segment.highlights.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${segment.bgColor}`}
                            style={{ color: segment.color }}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                              {item.title}
                            </span>
                            <span className="text-xs text-slate-500 block mt-0.5 font-normal">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={segment.ctaLink}
                    className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 group/btn bg-slate-900 hover:bg-[#F26522] text-white shadow-md cursor-pointer hover:shadow-lg hover:shadow-[#F26522]/20"
                  >
                    <span>{segment.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
