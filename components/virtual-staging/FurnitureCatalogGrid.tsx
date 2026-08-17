"use client";

import React, { useState } from "react";
import { FurnitureItem, MaterialVariant } from "@/lib/data/virtualStagingData";
import Furniture3DViewer from "./Furniture3DViewer";
import {
  ShoppingBag,
  Eye,
  Star,
  ShieldCheck,
  Ruler,
  Maximize2,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

interface FurnitureCatalogGridProps {
  furnitureItems: FurnitureItem[];
  onInspectItem: (item: FurnitureItem) => void;
  onAddToCart: (item: FurnitureItem, variant: MaterialVariant) => void;
}

export default function FurnitureCatalogGrid({
  furnitureItems,
  onInspectItem,
  onAddToCart,
}: FurnitureCatalogGridProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "All 3D Furnishings" },
    { id: "bed", label: "Beds & Suites" },
    { id: "table", label: "Tables & Desks" },
    { id: "painting", label: "Wall Art & Paintings" },
    { id: "sofa", label: "Sofas & Daybeds" },
    { id: "chair", label: "Armchairs & Stools" },
    { id: "lamp", label: "Lighting & Chandeliers" },
  ];

  const filteredItems =
    selectedFilter === "all"
      ? furnitureItems
      : furnitureItems.filter((item) => item.category === selectedFilter);

  return (
    <div className="space-y-8">
      {/* Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#50372b] tracking-tight">
            Explore 3D Shoppable Furniture Pieces
          </h3>
          <p className="text-xs sm:text-sm text-[#50372b]/60 mt-1">
            Move cursor over any piece to rotate in real time 3D. Click to customize finishes or buy.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#50372b]/5 border border-[#50372b]/10 overflow-x-auto max-w-full">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === f.id
                  ? "bg-[#50372b] text-white shadow-sm"
                  : "text-[#50372b]/70 hover:text-[#50372b]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 3D Furniture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className="group rounded-3xl bg-white border border-[#50372b]/10 hover:border-[#F26522]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Interactive 3D Canvas Card Viewport */}
              <div className="relative h-60 w-full bg-gradient-to-b from-[#faf5f0] to-[#f0e6dc] overflow-hidden">
                {/* 3D Canvas */}
                <Furniture3DViewer
                  modelType={item.model3DType}
                  activeVariant={item.defaultMaterial}
                  interactive={true}
                  trackCursor={true}
                  autoRotate={true}
                  height="100%"
                  width="100%"
                  showControls={false}
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                  {item.category.toUpperCase()}
                </div>

                {/* Inspect Button overlay */}
                <button
                  onClick={() => onInspectItem(item)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#50372b] shadow-md transition-all opacity-0 group-hover:opacity-100"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Cursor Hint */}
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[#50372b]/50 pointer-events-none">
                  Move mouse to rotate 3D
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#50372b]/50 font-mono mb-1">
                    <span>{item.brand}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {item.rating}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#50372b] group-hover:text-[#F26522] transition-colors leading-snug">
                    {item.name}
                  </h4>

                  <p className="text-xs text-[#50372b]/60 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="pt-3 border-t border-[#50372b]/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#50372b] font-mono">
                        {item.currency}{item.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[#50372b]/40 line-through ml-1.5 font-mono">
                        {item.currency}{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                      {item.dimensions.width}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onInspectItem(item)}
                      className="flex-1 py-2.5 rounded-xl bg-[#50372b]/5 hover:bg-[#50372b]/10 text-[#50372b] font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect 3D</span>
                    </button>

                    <button
                      onClick={() => onAddToCart(item, item.defaultMaterial)}
                      className="px-3 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
