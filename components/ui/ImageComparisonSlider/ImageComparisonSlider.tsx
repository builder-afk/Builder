"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronsLeftRight, Sparkles, Image as ImageIcon } from "lucide-react";
import { ImageComparisonSliderProps } from "./types";
import { useSliderDrag } from "./useSliderDrag";

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  roomName,
  subtitle,
  initialPosition = 50,
  showLabels = true,
  beforeLabel = "Original / Vacant",
  afterLabel = "Virtually Staged",
  showTooltip = true,
  tooltipText = "Drag to Compare",
  showHandle = true,
  autoAnimate = true,
  onPositionChange,
  aspectRatio = "aspect-[16/10]",
  className = "",
}: ImageComparisonSliderProps) {
  const {
    containerRef,
    position,
    isDragging,
    hasInteracted,
    setPosition,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
  } = useSliderDrag({
    initialPosition,
    onPositionChange,
  });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [hasAutoAnimated, setHasAutoAnimated] = useState(false);

  // Trigger optional hint auto-animation once when entering viewport
  useEffect(() => {
    if (isInView && autoAnimate && !hasAutoAnimated && !hasInteracted) {
      setHasAutoAnimated(true);

      const keyframes = [42, 58, 46, 54, initialPosition];
      let step = 0;
      const interval = setInterval(() => {
        if (step < keyframes.length) {
          setPosition(keyframes[step]);
          step++;
        } else {
          clearInterval(interval);
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInView, autoAnimate, hasAutoAnimated, hasInteracted, initialPosition, setPosition]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative w-full flex flex-col ${className}`}
    >
      {/* Outer Card Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full ${aspectRatio} rounded-[20px] overflow-hidden select-none touch-none cursor-ew-resize border border-gray-200/80 shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-slate-900`}
        style={{
          boxShadow: isDragging
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(242, 101, 34, 0.5)"
            : undefined,
        }}
      >
        {/* Layer 1: BEFORE Image (Original - Full Background) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={beforeImage}
            alt={beforeLabel}
            loading="lazy"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
        </div>

        {/* Layer 2: AFTER Image (Virtually Staged - Masked Reveal using clipPath) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          }}
        >
          <img
            src={afterImage}
            alt={afterLabel}
            loading="lazy"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
        </div>

        {/* Floating Corner Badges */}
        {showLabels && (
          <>
            {/* After Badge (Top Left) */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
                {afterLabel}
              </span>
            </div>

            {/* Before Badge (Top Right) */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium shadow-md">
                <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                {beforeLabel}
              </span>
            </div>
          </>
        )}

        {/* Draggable Vertical Line & Circular Handle */}
        {showHandle && (
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: `${position}%` }}
          >
            {/* Vertical Divider Line */}
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

            {/* "Drag to Compare" Floating Badge Above Handle */}
            {showTooltip && !hasInteracted && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-40 pointer-events-none"
              >
                <div className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide shadow-xl flex items-center gap-1.5 animate-bounce">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-pulse" />
                  {tooltipText}
                </div>
              </motion.div>
            )}

            {/* Draggable Circular Handle Button */}
            <div
              tabIndex={0}
              role="slider"
              aria-label={`Image comparison slider for ${roomName || "room"}`}
              aria-valuenow={Math.round(position)}
              aria-valuemin={0}
              aria-valuemax={100}
              onKeyDown={handleKeyDown}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 shadow-2xl border-2 border-slate-200/90 flex items-center justify-center pointer-events-auto transition-transform duration-200 ease-out focus:outline-none focus:ring-4 focus:ring-[#F26522]/40 ${
                isDragging
                  ? "scale-95 border-[#F26522] text-[#F26522] shadow-[0_0_20px_rgba(242,101,34,0.4)]"
                  : "hover:scale-110 hover:border-[#F26522] hover:text-[#F26522]"
              }`}
            >
              <ChevronsLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Room Label Below Card */}
      {roomName && (
        <div className="mt-4 flex items-center justify-between px-1">
          <div>
            <h4 className="font-heading italic text-xl sm:text-2xl text-slate-900 font-bold tracking-tight">
              {roomName}
            </h4>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="text-xs font-mono font-semibold text-slate-400">
            {Math.round(position)}% Staged
          </div>
        </div>
      )}
    </motion.div>
  );
}
