"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StagingRoomScene,
  FurnitureItem,
  MaterialVariant,
  StagingStyle,
} from "@/lib/data/virtualStagingData";
import Furniture3DViewer from "./Furniture3DViewer";
import {
  Maximize,
  Minimize,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Eye,
  Info,
  Layers,
  Wand2,
  Tag,
  ArrowRight,
  Bed,
  Coffee,
  Palette,
  Armchair,
  Lamp,
  HelpCircle,
} from "lucide-react";

interface StagingFullscreenViewerProps {
  room: StagingRoomScene;
  onInspectFurniture: (item: FurnitureItem) => void;
  onOpenShopDrawer: () => void;
  cartCount: number;
}

export default function StagingFullscreenViewer({
  room,
  onInspectFurniture,
  onOpenShopDrawer,
  cartCount,
}: StagingFullscreenViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StagingStyle>(room.style);
  const [isSplitComparison, setIsSplitComparison] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredFurniture, setHoveredFurniture] = useState<FurnitureItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });
  const [showHotspots, setShowHotspots] = useState(true);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Sync style when room changes
  useEffect(() => {
    setSelectedStyle(room.style);
    setZoomLevel(1);
  }, [room]);

  // Current active staged image based on chosen style variation
  const activeStagedImage = useMemo(() => {
    const variation = room.styleVariations.find((v) => v.style === selectedStyle);
    return variation ? variation.image : room.afterImage;
  }, [room, selectedStyle]);

  // Fullscreen handlers
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // 3D Parallax Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normalizedX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normalizedY = (y / rect.height - 0.5) * 2; // -1 to 1

    setMousePos({ x, y, normalizedX, normalizedY });

    if (isDraggingSlider) {
      const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(pos);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "bed":
        return <Bed className="w-3.5 h-3.5" />;
      case "table":
        return <Coffee className="w-3.5 h-3.5" />;
      case "painting":
        return <Palette className="w-3.5 h-3.5" />;
      case "sofa":
      case "chair":
        return <Armchair className="w-3.5 h-3.5" />;
      case "lamp":
        return <Lamp className="w-3.5 h-3.5" />;
      default:
        return <Tag className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDraggingSlider(false)}
      className={`relative w-full overflow-hidden bg-neutral-950 select-none transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen"
          : "rounded-3xl border border-[#50372b]/40 shadow-2xl h-[560px] sm:h-[680px] lg:h-[760px]"
      }`}
    >
      {/* 1. Main Background Staged Image with 3D Depth Perspective */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `scale(${zoomLevel}) perspective(1000px) rotateY(${
            mousePos.normalizedX * 1.8
          }deg) rotateX(${-mousePos.normalizedY * 1.8}deg)`,
          transformOrigin: "center center",
          transition: isDraggingSlider ? "none" : "transform 0.15s ease-out",
        }}
      >
        {/* If Split Comparison is enabled */}
        {isSplitComparison ? (
          <div className="relative w-full h-full">
            {/* After Staged Image */}
            <img
              src={activeStagedImage}
              alt="Virtual Staged Room"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Vacant Image with clip path */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={room.beforeImage}
                alt="Original Vacant Room"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Vertical Split Line Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_12px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPos}%` }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setIsDraggingSlider(true);
              }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-neutral-900 shadow-xl flex items-center justify-center font-bold text-xs">
                ↔
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-20 left-6 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono">
              Vacant Original
            </div>
            <div className="absolute top-20 right-6 z-10 px-3 py-1 rounded-full bg-[#F26522] text-white text-xs font-mono font-bold">
              AI Staged ({selectedStyle.toUpperCase()})
            </div>
          </div>
        ) : (
          <img
            src={activeStagedImage}
            alt={room.name}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        )}

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

        {/* 2. Interactive 3D Shoppable Hotspot Pins */}
        {showHotspots &&
          !isSplitComparison &&
          room.furnitureItems.map((item) => {
            const isHovered = hoveredFurniture?.id === item.id;
            return (
              <div
                key={item.id}
                style={{
                  left: `${item.pinPosition.x}%`,
                  top: `${item.pinPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20"
              >
                {/* Hotspot Button */}
                <button
                  onMouseEnter={() => setHoveredFurniture(item)}
                  onMouseLeave={() => setHoveredFurniture(null)}
                  onClick={() => onInspectFurniture(item)}
                  className={`group relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "bg-[#F26522] border-white scale-110 shadow-[0_0_24px_rgba(242,101,34,0.9)] text-white"
                      : "bg-[#2c1b12]/90 hover:bg-[#F26522] border-[#F26522]/80 text-white shadow-lg backdrop-blur-md"
                  }`}
                >
                  {/* Radar Pulse Ring */}
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F26522]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F26522] opacity-75" />
                    {getCategoryIcon(item.category)}
                  </span>

                  {/* Price Tag Badge */}
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold tracking-tight text-white leading-none">
                      {item.currency}{item.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] font-mono text-white/80 group-hover:text-white leading-none mt-0.5">
                      {item.name.split(" ")[0]} 3D
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
      </div>

      {/* 3. Real-Time 3D Furniture Live Hover HUD Card (Follows cursor smoothly or docks near hotspot) */}
      <AnimatePresence>
        {hoveredFurniture && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{
              position: "absolute",
              left: Math.min(window.innerWidth - 340, Math.max(20, mousePos.x + 20)),
              top: Math.min(window.innerHeight - 380, Math.max(20, mousePos.y - 120)),
              pointerEvents: "auto",
            }}
            className="z-40 w-72 sm:w-80 rounded-3xl bg-[#1a120e]/95 backdrop-blur-xl border border-[#F26522]/50 shadow-[0_12px_40px_rgba(0,0,0,0.8)] p-4 text-white space-y-3"
          >
            {/* HUD Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#F26522]/20 text-[#F26522] text-[10px] font-mono font-bold uppercase">
                {hoveredFurniture.category} · 3D Mesh
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                In Stock & Deliverable
              </span>
            </div>

            {/* Embedded Live 3D Mesh Preview that rotates with cursor */}
            <div className="relative w-full h-36 rounded-2xl bg-black/40 border border-white/10 overflow-hidden">
              <Furniture3DViewer
                modelType={hoveredFurniture.model3DType}
                activeVariant={hoveredFurniture.defaultMaterial}
                interactive={true}
                trackCursor={true}
                autoRotate={true}
                height="100%"
                width="100%"
                showControls={false}
              />
              <div className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-white/70">
                Move cursor to rotate 3D
              </div>
            </div>

            {/* Item Title & Specs */}
            <div>
              <h4 className="text-sm font-bold text-white leading-snug">
                {hoveredFurniture.name}
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                {hoveredFurniture.description}
              </p>
            </div>

            {/* Price & Action Button */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-base font-bold text-white font-mono">
                  {hoveredFurniture.currency}{hoveredFurniture.price.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-neutral-500 line-through ml-1.5 font-mono">
                  {hoveredFurniture.currency}{hoveredFurniture.originalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => onInspectFurniture(hoveredFurniture)}
                className="px-3 py-1.5 rounded-xl bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold flex items-center gap-1 shadow-md transition-all active:scale-95"
              >
                <span>Shop 3D</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Top Overlay Controls: Room Title, Staging Stats, Fullscreen & Controls */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        {/* Room Info Pill */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F26522]" />
              <h3 className="text-sm sm:text-base font-bold tracking-tight">{room.name}</h3>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              {room.roomType} · {room.areaSqFt} sq.ft · {room.styleLabel}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Toggle Hotspot Pins */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`p-2.5 rounded-xl backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              showHotspots
                ? "bg-[#F26522] border-[#F26522] text-white"
                : "bg-black/60 border-white/15 text-white/80 hover:text-white"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span className="hidden sm:inline">3D Furniture Tags</span>
          </button>

          {/* Before/After Split Mode Toggle */}
          <button
            onClick={() => setIsSplitComparison(!isSplitComparison)}
            className={`p-2.5 rounded-xl backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg ${
              isSplitComparison
                ? "bg-[#F26522] border-[#F26522] text-white"
                : "bg-black/60 border-white/15 text-white/80 hover:text-white"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Split Compare</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white transition-all shadow-lg"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 5. Bottom Overlay: Staging Style Switcher Pill Bar & "Shop The Room" Button */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Style Variations Pill Selector */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 overflow-x-auto max-w-full">
          <div className="flex items-center gap-1 px-2 text-[11px] font-mono text-[#c1a18c] uppercase tracking-wider shrink-0">
            <Wand2 className="w-3.5 h-3.5 text-[#F26522]" />
            <span className="hidden md:inline">AI Styles:</span>
          </div>

          {room.styleVariations.map((v) => {
            const isSelected = selectedStyle === v.style;
            return (
              <button
                key={v.style}
                onClick={() => setSelectedStyle(v.style)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? "bg-[#F26522] text-white shadow-md"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>

        {/* Floating "Shop The Room" Cart Button */}
        <button
          onClick={onOpenShopDrawer}
          className="pointer-events-auto px-5 py-3 rounded-full bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(242,101,34,0.45)] transition-all active:scale-95 shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop This Room ({room.furnitureItems.length} items)</span>
          {cartCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-white text-[#F26522] text-xs font-mono font-bold">
              {cartCount} in Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
