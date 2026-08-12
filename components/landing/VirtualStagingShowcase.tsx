"use client";

import { useState } from "react";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import { Sparkles, Layers, Sliders, Wand2 } from "lucide-react";

const STAGING_ITEMS = [
  {
    id: "modern-living",
    roomName: "Modern Minimalist Staging",
    subtitle: "Original Vacant Room vs Modern Italian Contemporary Staging",
    beforeImage: "/port/original.webp",
    afterImage: "/port/staged-modern.jpg",
    styleTag: "Modern Minimalist",
  },
  {
    id: "luxury-living",
    roomName: "Luxury Velvet & Marble Staging",
    subtitle: "Original Vacant Room vs High-End Luxury Living Room Staging",
    beforeImage: "/port/original.webp",
    afterImage: "/port/staged-luxury.jpg",
    styleTag: "Modern Luxury",
  },
  {
    id: "scandi-living",
    roomName: "Scandinavian Oak Staging",
    subtitle: "Original Vacant Room vs Light Wood & Soft Organic Linen Staging",
    beforeImage: "/port/original.webp",
    afterImage: "/port/staged-scandinavian.jpg",
    styleTag: "Scandinavian",
  },
  {
    id: "japandi-living",
    roomName: "Japandi Zen Staging",
    subtitle: "Original Vacant Room vs Wabi-Sabi Organic Minimalist Staging",
    beforeImage: "/port/original.webp",
    afterImage: "/port/staged-japandi.jpg",
    styleTag: "Japandi Zen",
  },
];

export default function VirtualStagingShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems =
    activeTab === "all"
      ? STAGING_ITEMS
      : STAGING_ITEMS.filter((item) => item.id === activeTab);

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Wand2 className="w-3.5 h-3.5" />
            Virtual Staging Comparison Sliders
          </div>
          <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
            Original Photo vs Staged Variations
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mt-4 font-medium leading-relaxed">
            Drag the vertical divider handle left or right to compare the exact vacant property photo from the <code className="text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">port</code> folder against its AI-staged style variations.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 rounded-full bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Comparisons ({STAGING_ITEMS.length})
            </button>
            {STAGING_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.styleTag}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredItems.map((item) => (
            <ImageComparisonSlider
              key={item.id}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              roomName={item.roomName}
              subtitle={item.subtitle}
              initialPosition={50}
              showLabels={true}
              beforeLabel="Vacant Original"
              afterLabel={`${item.styleTag} Staged`}
              showTooltip={true}
              tooltipText="Drag to Compare"
              autoAnimate={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
