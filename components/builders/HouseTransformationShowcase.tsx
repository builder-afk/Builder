"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  X,
  Sliders,
  Layers,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  Zap,
  ArrowRight,
  Expand,
  Eye,
  Info,
} from "lucide-react";
import { HouseTransformation, TransformationStage } from "@/store/useBuilderStore";

interface HouseTransformationShowcaseProps {
  transformation: HouseTransformation;
  builderName: string;
}

export default function HouseTransformationShowcase({
  transformation,
  builderName,
}: HouseTransformationShowcaseProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"journey" | "compare" | "gallery">("journey");
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const stages = transformation.stages;
  const currentStage = stages[activeStepIndex] || stages[0];
  const initialStage = stages[0];
  const finalStage = stages[stages.length - 1];

  // Auto-play progression slideshow
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % stages.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, stages.length]);

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev + 1) % stages.length);
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev - 1 + stages.length) % stages.length);
  };

  // Compare slider drag logic
  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingSlider && e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSlider) {
      handleSliderMove(e.clientX);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-xl overflow-hidden mb-14">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Architectural Transformation Showcase
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md p-1 rounded-full border border-white/10 text-xs font-medium">
              <button
                onClick={() => setViewMode("journey")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                  viewMode === "journey"
                    ? "bg-white text-slate-900 font-semibold shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Step-by-Step ({stages.length})
              </button>
              <button
                onClick={() => setViewMode("compare")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                  viewMode === "compare"
                    ? "bg-white text-slate-900 font-semibold shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Before vs After
              </button>
              <button
                onClick={() => setViewMode("gallery")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                  viewMode === "gallery"
                    ? "bg-white text-slate-900 font-semibold shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Expand className="w-3.5 h-3.5" />
                All Stages
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="font-heading italic text-3xl sm:text-4xl text-white mb-2 tracking-tight">
              {transformation.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {transformation.subtitle}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Duration</div>
                <div className="text-sm font-semibold text-white">{transformation.duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Est. Value Added</div>
                <div className="text-sm font-semibold text-emerald-300">{transformation.budgetSaved}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Location</div>
                <div className="text-sm font-semibold text-white">{transformation.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-purple-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Executed By</div>
                <div className="text-sm font-semibold text-white truncate max-w-[120px]">{builderName}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="p-6 sm:p-10">
        {/* ─── MODE 1: STEP-BY-STEP JOURNEY ─── */}
        {viewMode === "journey" && (
          <div className="space-y-8">
            {/* Stage Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {stages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                    activeStepIndex === idx
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      activeStepIndex === idx ? "bg-white text-slate-900 font-bold" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{stage.badge || `Stage ${idx + 1}`}</span>
                  {idx === stages.length - 1 && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white">Final</span>
                  )}
                </button>
              ))}
            </div>

            {/* Stage Main Visual Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image Frame */}
              <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] shadow-2xl border border-slate-200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStage.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentStage.imageUrl}
                      alt={currentStage.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Top Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    Stage {activeStepIndex + 1} of {stages.length}
                  </span>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 text-xs font-medium border border-white/20 transition-all"
                      title={isPlaying ? "Pause Tour" : "Auto-play Tour"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isPlaying ? "Pause" : "Auto Tour"}</span>
                    </button>
                    <button
                      onClick={() => setLightboxIndex(activeStepIndex)}
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 border border-white/20 transition-all"
                      title="Fullscreen Zoom"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Prev / Next Arrows */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/80 text-[11px] font-semibold tracking-wide">
                      {currentStage.badge || `Stage ${currentStage.step}`}
                    </span>
                  </div>
                  <h3 className="font-heading italic text-xl sm:text-2xl text-white drop-shadow-md">
                    {currentStage.title}
                  </h3>
                </div>

                {/* Slide Auto-play Progress Bar */}
                {isPlaying && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.8, ease: "linear" }}
                    key={activeStepIndex}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-rose-400 z-20"
                  />
                )}
              </div>

              {/* Stage Description & Architectural Notes */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-2">
                    <Info className="w-4 h-4" />
                    Architectural Progression Note
                  </div>

                  <h3 className="font-heading italic text-2xl sm:text-3xl text-slate-900 mb-3">
                    {currentStage.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {currentStage.description}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Transformation Progress:</span>
                      <span className="font-bold text-slate-900">
                        {Math.round(((activeStepIndex + 1) / stages.length) * 100)}% Completed
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 rounded-full"
                        animate={{ width: `${((activeStepIndex + 1) / stages.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Timeline Strip */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Jump to Stage
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                    {stages.map((stg, i) => (
                      <button
                        key={stg.id}
                        onClick={() => {
                          setActiveStepIndex(i);
                          setIsPlaying(false);
                        }}
                        className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all group ${
                          activeStepIndex === i
                            ? "border-blue-600 ring-2 ring-blue-400/40 scale-105"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={stg.imageUrl}
                          alt={stg.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-white font-bold py-0.5 text-center">
                          #{i + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── MODE 2: BEFORE VS AFTER COMPARISON ─── */}
        {viewMode === "compare" && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-4">
              <h3 className="font-heading italic text-2xl text-slate-900 mb-1">
                Raw Structure vs. Architectural Masterpiece
              </h3>
              <p className="text-sm text-slate-500">
                Drag the interactive slider handle sideways to reveal the full transformation contrast.
              </p>
            </div>

            <div
              ref={sliderContainerRef}
              onMouseDown={() => setIsDraggingSlider(true)}
              onMouseUp={() => setIsDraggingSlider(false)}
              onMouseLeave={() => setIsDraggingSlider(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDraggingSlider(true)}
              onTouchEnd={() => setIsDraggingSlider(false)}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-black shadow-2xl border border-slate-200"
            >
              {/* After / Completed Image (Base) */}
              <img
                src={finalStage.imageUrl}
                alt="Final Transformed Residence"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold border border-emerald-400/30">
                ✓ AFTER: Completed Transformation
              </div>

              {/* Before / Raw Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={initialStage.imageUrl}
                  alt="Raw Starting House"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : "100%",
                    maxWidth: "none",
                  }}
                />
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  🏗️ BEFORE: Initial State / Blueprint
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-2xl border-4 border-slate-900 flex items-center justify-center text-slate-900">
                  <Sliders className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Stage comparison caption footer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Before (Stage 1)</span>
                <h4 className="font-heading italic text-lg text-slate-900 mt-1 mb-1">{initialStage.title}</h4>
                <p className="text-xs text-slate-500">{initialStage.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">After (Final Stage)</span>
                <h4 className="font-heading italic text-lg text-slate-900 mt-1 mb-1">{finalStage.title}</h4>
                <p className="text-xs text-slate-600">{finalStage.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── MODE 3: ALL STAGES GALLERY ─── */}
        {viewMode === "gallery" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-heading italic text-2xl text-slate-900">
                  Complete Stage Sequence ({stages.length} Phases)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Click any architectural transformation image to zoom in full resolution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stages.map((stg, idx) => (
                <motion.div
                  key={stg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[16/11] relative overflow-hidden bg-slate-900">
                    <img
                      src={stg.imageUrl}
                      alt={stg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20">
                        Phase {idx + 1}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-heading italic text-lg leading-tight mb-1">
                        {stg.title}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {stg.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── FULLSCREEN LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center border border-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next in lightbox */}
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev! - 1 + stages.length) % stages.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center border border-white/20 transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev! + 1) % stages.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center border border-white/20 transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Visual */}
              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={stages[lightboxIndex].imageUrl}
                  alt={stages[lightboxIndex].title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Lightbox Info Bar */}
              <div className="p-6 bg-slate-900 border-t border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
                    <span>Phase {lightboxIndex + 1} of {stages.length}</span>
                    <span>•</span>
                    <span>{stages[lightboxIndex].badge}</span>
                  </div>
                  <h3 className="font-heading italic text-2xl text-white">
                    {stages[lightboxIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                    {stages[lightboxIndex].description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500 font-medium">
                    {lightboxIndex + 1} / {stages.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
