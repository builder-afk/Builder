"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Wand2,
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  Eye,
  Layers,
  Zap,
} from "lucide-react";
import { VirtualStageShowcaseProps, StagingImageItem } from "./types";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";

export default function VirtualStageShowcase({
  title = "AI Virtual Staging Studio",
  subtitle = "Interactive Style Selector",
  description = "Transform vacant spaces into fully furnished, magazine-worthy luxury interiors in seconds. Switch between architectural styles to discover the perfect look for your property listing.",
  ctaText = "Get AI Staging for Your Listing",
  ctaHref = "/contact",
  images,
  defaultSelectedId,
  autoPreview = true,
  autoPreviewInterval = 4000,
  aspectRatio = "aspect-[16/10]",
  className = "",
}: VirtualStageShowcaseProps) {
  const [selectedId, setSelectedId] = useState<string>(
    defaultSelectedId || images[0]?.id || "original"
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPreview);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [preloaded, setPreloaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Preload all staging images to ensure zero lag / flickering during transitions
  useEffect(() => {
    let loadedCount = 0;
    const total = images.length;
    if (total === 0) return;

    images.forEach((item) => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) {
          setPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === total) {
          setPreloaded(true);
        }
      };
    });
  }, [images]);

  // Memoized current and original images
  const currentIndex = useMemo(() => {
    const idx = images.findIndex((img) => img.id === selectedId);
    return idx >= 0 ? idx : 0;
  }, [images, selectedId]);

  const currentImage = useMemo(
    () => images[currentIndex] || images[0],
    [images, currentIndex]
  );

  const originalImage = useMemo(() => {
    return images.find((img) => img.isOriginal) || images[0];
  }, [images]);

  // Next / Prev style handler
  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % images.length;
    setSelectedId(images[nextIdx].id);
  }, [currentIndex, images]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    setSelectedId(images[prevIdx].id);
  }, [currentIndex, images]);

  // Autoplay effect
  useEffect(() => {
    if (!isPlaying || isHovered || isCompareMode) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPreviewInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isCompareMode, handleNext, autoPreviewInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className={`py-20 bg-slate-950 text-white relative overflow-hidden ${className}`}>
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F26522]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Main Grid: 60% Left Preview, 40% Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT 60% COLUMN: Preview & Interactive Glass Controls */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Top Bar Controls: Style Tag & Compare Toggle */}
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                  {currentImage.label} Style
                </span>
                {currentImage.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 text-[#F26522] text-[10px] font-bold uppercase tracking-wider">
                    {currentImage.badge}
                  </span>
                )}
              </div>

              {/* Compare Mode Toggle Button */}
              <button
                onClick={() => setIsCompareMode(!isCompareMode)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isCompareMode
                    ? "bg-[#F26522] text-white shadow-lg shadow-[#F26522]/30"
                    : "bg-white/10 hover:bg-white/20 text-white/90 border border-white/15"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {isCompareMode ? "Split Slider Active" : "Enable Slider Compare"}
              </button>
            </div>

            {/* PREVIEW CONTAINER FRAME */}
            <div
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`relative w-full ${aspectRatio} rounded-[24px] overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group`}
            >
              {isCompareMode ? (
                /* Compare Mode: Draggable Slider comparing Original vs Selected Staging */
                <ImageComparisonSlider
                  key={`compare-${currentImage.id}`}
                  beforeImage={originalImage.src}
                  afterImage={currentImage.src}
                  roomName={currentImage.label}
                  beforeLabel="Vacant Original"
                  afterLabel={`${currentImage.label} Staged`}
                  initialPosition={50}
                  autoAnimate={false}
                  aspectRatio={aspectRatio}
                  className="w-full h-full"
                />
              ) : (
                /* Single Style Preview Mode with Smooth Framer Motion Transitions */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.id}
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={currentImage.src}
                      alt={currentImage.label}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom Caption Overlay */}
                    {currentImage.caption && (
                      <div className="absolute bottom-16 left-6 right-6 z-10 pointer-events-none">
                        <p className="text-white/90 text-xs sm:text-sm font-medium backdrop-blur-md bg-black/40 px-4 py-2 rounded-xl border border-white/10 inline-block shadow-lg">
                          {currentImage.caption}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Prev / Next Floating Arrows */}
              {!isCompareMode && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#F26522] border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                    aria-label="Previous Style"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#F26522] border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-20"
                    aria-label="Next Style"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* FLOATING GLASS PANEL CONTROLS (BOTTOM OF IMAGE) */}
              <div className="absolute bottom-4 inset-x-4 z-30 flex items-center justify-center">
                <div className="w-full max-w-xl bg-black/60 backdrop-blur-xl border border-white/20 rounded-full p-1.5 shadow-2xl flex items-center justify-between gap-1 overflow-x-auto no-scrollbar scroll-smooth snap-x">
                  
                  {/* Autoplay Play/Pause Toggle */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors ml-1"
                    title={isPlaying ? "Pause Autoplay" : "Start Autoplay"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 translate-x-0.5" />
                    )}
                  </button>

                  {/* Staging Style Selectable Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1 flex-1 justify-start sm:justify-center">
                    {images.map((item) => {
                      const isSelected = item.id === selectedId;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedId(item.id)}
                          className={`relative shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 snap-center select-none ${
                            isSelected
                              ? "text-slate-900 font-bold shadow-md"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {/* Sliding Active Highlight Background */}
                          {isSelected && (
                            <motion.div
                              layoutId="activeStagingPill"
                              className="absolute inset-0 bg-white rounded-full shadow-lg"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1.5">
                            {item.isOriginal && <Eye className="w-3 h-3 text-slate-500" />}
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Helper Note */}
            <div className="mt-3 text-xs text-white/50 flex items-center gap-3">
              <span>Use Left / Right arrow keys to switch styles</span>
              <span>•</span>
              <span>{images.length} Staging Variations Available</span>
            </div>
          </div>

          {/* RIGHT 40% COLUMN: Heading, Description & Feature Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-bold uppercase tracking-widest mb-4 w-fit">
              <Wand2 className="w-3.5 h-3.5" />
              {subtitle}
            </div>

            <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-white mb-6">
              {title}
            </h2>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 font-medium">
              {description}
            </p>

            {/* Feature Highlights List */}
            <div className="flex flex-col gap-3.5 mb-10">
              <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[#F26522] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Photorealistic 4K Render Quality</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[#F26522] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Instant Style Switcher (Scandinavian, Modern, Japandi & more)</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[#F26522] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Interactive Split-Slider Compare Mode</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90 font-medium">
                <div className="w-6 h-6 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[#F26522] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Turn Vacant Listings into Sold Properties 73% Faster</span>
              </div>
            </div>

            {/* CTA Button */}
            {ctaText && (
              <div>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold text-base shadow-lg shadow-[#F26522]/30 hover:shadow-[#F26522]/50 hover:-translate-y-0.5 transition-all duration-300 group w-full sm:w-auto"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
