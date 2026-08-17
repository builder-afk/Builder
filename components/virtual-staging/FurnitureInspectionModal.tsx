"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FurnitureItem, MaterialVariant } from "@/lib/data/virtualStagingData";
import Furniture3DViewer from "./Furniture3DViewer";
import {
  X,
  ShoppingBag,
  Check,
  Star,
  Truck,
  ShieldCheck,
  Maximize2,
  Sun,
  Sunset,
  Sparkles,
  Layers,
  Ruler,
  QrCode,
  Share2,
  Heart,
  ArrowRight,
} from "lucide-react";

interface FurnitureInspectionModalProps {
  item: FurnitureItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: FurnitureItem, variant: MaterialVariant) => void;
}

export default function FurnitureInspectionModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: FurnitureInspectionModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<MaterialVariant | null>(null);
  const [lightingTheme, setLightingTheme] = useState<"studio" | "warm" | "daylight" | "cyber">("studio");
  const [showARModal, setShowARModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // Sync default variant when item opens
  React.useEffect(() => {
    if (item) {
      setSelectedVariant(item.defaultMaterial);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const currentVariant = selectedVariant || item.defaultMaterial;

  const handleAdd = () => {
    onAddToCart(item, currentVariant);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#1f1713] border border-[#50372b]/60 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col lg:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT: 3D Interactive Canvas & Lighting Controls */}
          <div className="relative flex-1 bg-gradient-to-b from-[#140e0b] to-[#241a14] min-h-[380px] lg:min-h-[560px] flex flex-col">
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F26522]/20 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-bold uppercase tracking-wider">
                {item.category.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium">
                {item.brand}
              </span>
            </div>

            {/* Lighting Switcher */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
              <button
                onClick={() => setLightingTheme("studio")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lightingTheme === "studio" ? "bg-[#F26522] text-white shadow-sm" : "hover:text-white"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Studio</span>
              </button>
              <button
                onClick={() => setLightingTheme("warm")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lightingTheme === "warm" ? "bg-[#F26522] text-white shadow-sm" : "hover:text-white"
                }`}
              >
                <Sunset className="w-3 h-3" />
                <span>Warm Sunset</span>
              </button>
              <button
                onClick={() => setLightingTheme("daylight")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lightingTheme === "daylight" ? "bg-[#F26522] text-white shadow-sm" : "hover:text-white"
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Daylight</span>
              </button>
            </div>

            {/* Core 3D Mesh Viewport */}
            <div className="flex-1 w-full h-full relative">
              <Furniture3DViewer
                modelType={item.model3DType}
                activeVariant={currentVariant}
                interactive={true}
                trackCursor={true}
                autoRotate={true}
                height="100%"
                width="100%"
                lightingTheme={lightingTheme}
                showControls={true}
              />
            </div>

            {/* Helper Hint */}
            <div className="absolute top-4 right-16 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xs text-[11px] text-white/60 font-mono">
              <Maximize2 className="w-3 h-3 text-[#F26522]" />
              <span>Drag to orbit 360° · Scroll to zoom</span>
            </div>
          </div>

          {/* RIGHT: Product Specs, Finish Swatches, Pricing & Actions */}
          <div className="w-full lg:w-[420px] bg-[#1a120e] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-[#50372b]/40">
            <div>
              {/* Reviews & Rating */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "text-neutral-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{item.rating}</span>
                  <span className="text-neutral-500 font-normal">({item.reviewsCount} reviews)</span>
                </div>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full border transition-all ${
                    isSaved ? "bg-red-500/20 border-red-500/40 text-red-400" : "border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? "fill-red-400" : ""}`} />
                </button>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {item.name}
              </h2>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[#291d17] border border-[#50372b]/50 mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
                  {item.currency}{item.price.toLocaleString("en-IN")}
                </div>
                <div className="text-sm text-neutral-500 line-through font-mono">
                  {item.currency}{item.originalPrice.toLocaleString("en-IN")}
                </div>
                <span className="ml-auto px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
                  Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                </span>
              </div>

              {/* Material & Color Variants Swatches */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c1a18c]">
                    Finish / Material Swatch
                  </span>
                  <span className="text-xs font-medium text-white/90">
                    {currentVariant.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {item.availableVariants.map((variant) => {
                    const isSelected = currentVariant.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-[#F26522]/15 border-[#F26522] text-white shadow-sm"
                            : "bg-[#241a14] border-[#50372b]/40 text-neutral-400 hover:border-[#50372b]"
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: variant.colorHex }}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white drop-shadow" />}
                        </span>
                        <span className="text-[11px] font-medium truncate">
                          {variant.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dimensions Specs */}
              <div className="p-4 rounded-2xl bg-[#241a14] border border-[#50372b]/40 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#c1a18c] uppercase tracking-wider mb-2">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Dimensional Wireframe</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="block text-[10px] text-neutral-500 font-mono">WIDTH</span>
                    <span className="text-xs font-bold text-white">{item.dimensions.width}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="block text-[10px] text-neutral-500 font-mono">DEPTH</span>
                    <span className="text-xs font-bold text-white">{item.dimensions.depth}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="block text-[10px] text-neutral-500 font-mono">HEIGHT</span>
                    <span className="text-xs font-bold text-white">{item.dimensions.height}</span>
                  </div>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-2 mb-6">
                {item.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions & Buy Now */}
            <div className="pt-4 border-t border-[#50372b]/50 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  In Stock & Verified
                </span>
                <span className="flex items-center gap-1 text-neutral-400">
                  <Truck className="w-3.5 h-3.5" />
                  Ships in {item.deliveryDays} days
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 rounded-2xl bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(242,101,34,0.35)] transition-all active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Room Cart · {item.currency}{item.price.toLocaleString("en-IN")}</span>
                </button>

                <button
                  onClick={() => setShowARModal(true)}
                  title="View in Mobile AR"
                  className="px-4 py-3.5 rounded-2xl bg-[#2c1b12] hover:bg-[#3d271b] border border-[#50372b] text-white/90 flex items-center justify-center transition-all"
                >
                  <QrCode className="w-5 h-5 text-[#F26522]" />
                </button>
              </div>

              {/* Add Success Toast */}
              <AnimatePresence>
                {addedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium"
                  >
                    ✓ Added "{item.name}" ({currentVariant.name}) to your room cart!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* AR Modal Dialog */}
        {showARModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowARModal(false)}
            />
            <div className="relative bg-[#2c1b12] border border-[#50372b] p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center z-10 space-y-4">
              <button
                onClick={() => setShowARModal(false)}
                className="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-[#F26522]/20 border border-[#F26522]/30 flex items-center justify-center mx-auto text-[#F26522]">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">View in Your Room (AR)</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Scan this QR code with your iPhone or Android camera to project this 3D {item.category} into your actual room in true 1:1 scale.
              </p>
              <div className="p-4 bg-white rounded-2xl mx-auto w-fit shadow-md">
                <img
                  src="/qrcode.png"
                  alt="AR QR Code"
                  className="w-40 h-40 object-contain mx-auto"
                />
              </div>
              <p className="text-[11px] text-[#c1a18c] font-mono">
                No app download required · Instant WebAR
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
