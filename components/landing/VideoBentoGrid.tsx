"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Film,
  Maximize2,
  Building2,
  MapPin,
} from "lucide-react";

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  sourceInfo: string;
  videoUrl: string;
  gridClass: string;
  aspectRatioClass?: string;
  tag: string;
}

const VIDEO_LIST: VideoItem[] = [
  {
    id: "vid-1",
    title: "Luxury Coastal Villa Tour",
    category: "Villa Architecture",
    location: "Goa, India",
    sourceInfo: "AI Generated from 12 Listing Photos",
    videoUrl: "/videos/luxury-villa-tour.mp4",
    gridClass: "col-span-1 md:col-span-2 row-span-2",
    tag: "Hero Showcase",
  },
  {
    id: "vid-2",
    title: "Modernist Glass Mansion",
    category: "Architectural Showcase",
    location: "Mumbai, India",
    sourceInfo: "AI Generated from 8 Staging Photos",
    videoUrl: "/videos/architectural-highlight.mp4",
    gridClass: "col-span-1 md:col-span-1 row-span-2",
    tag: "3D Cinematic",
  },
  {
    id: "vid-3",
    title: "Penthouse Interior Motion Tour",
    category: "Interior Design",
    location: "Bangalore, India",
    sourceInfo: "AI Generated from 6 Interior Photos",
    videoUrl: "/videos/interior-walkthrough.mp4",
    gridClass: "col-span-1 md:col-span-1 row-span-1",
    tag: "Interior Motion",
  },
  {
    id: "vid-4",
    title: "Contemporary Farmhouse Estate",
    category: "Rural Architecture",
    location: "Pune, India",
    sourceInfo: "AI Generated from 10 Exterior Photos",
    videoUrl: "/videos/modern-farmhouse.mp4",
    gridClass: "col-span-1 md:col-span-2 row-span-1",
    tag: "Panoramic Tour",
  },
  {
    id: "vid-5",
    title: "Minimalist Studio Showcase",
    category: "Modern Living",
    location: "Delhi NCR, India",
    sourceInfo: "AI Generated from 7 Studio Photos",
    videoUrl: "/videos/modern-design-showcase.mp4",
    gridClass: "col-span-1 md:col-span-1 row-span-1",
    tag: "Studio Tour",
  },
  {
    id: "vid-6",
    title: "Pacific Craftsman Residence",
    category: "Custom Craftsmanship",
    location: "Kochi, India",
    sourceInfo: "AI Generated from 9 HD Photos",
    videoUrl: "/videos/pnw-craftsman.mp4",
    gridClass: "col-span-1 md:col-span-1 row-span-1",
    tag: "Exterior Flythrough",
  },
  {
    id: "vid-7",
    title: "Suburban Ranch Transformation",
    category: "Renovation Tour",
    location: "Ahmedabad, India",
    sourceInfo: "AI Generated from 5 Renovation Shots",
    videoUrl: "/videos/suburban-ranch.mp4",
    gridClass: "col-span-1 md:col-span-1 row-span-1",
    tag: "Before & After",
  },
];

export default function VideoBentoGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const selectedVideo = selectedIndex !== null ? VIDEO_LIST[selectedIndex] : null;

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % VIDEO_LIST.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + VIDEO_LIST.length) % VIDEO_LIST.length
      );
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-mono font-bold uppercase tracking-widest mb-4">
              <Film className="w-3.5 h-3.5" />
              AI Video Generator
            </div>
            <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
              Real AI Videos Generated from Photos
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mt-3 font-medium">
              Transform static 2D listing photos into dynamic 4K virtual video tours. Click any video below to watch in full-screen with sound.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {VIDEO_LIST.length} AI Video Tours
            </span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px]">
          {VIDEO_LIST.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedIndex(index)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200/80 bg-gray-900 ${item.gridClass}`}
            >
              {/* Video Element (Autoplay Muted Loop) */}
              <video
                src={item.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/30" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#F26522]" />
                  {item.tag}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Center Play Button Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-16 h-16 rounded-full bg-[#F26522]/90 text-white flex items-center justify-center shadow-lg shadow-[#F26522]/40 backdrop-blur-md transform transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F26522]">
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 text-white pointer-events-none">
                <span className="text-xs font-mono font-semibold text-[#F26522] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h3 className="font-heading italic text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 line-clamp-1">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F26522]" />
                    {item.location}
                  </span>
                  <span className="text-white/60 font-mono text-[11px]">
                    {item.sourceInfo}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Video Lightbox Modal with Audio */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F26522]/20 border border-[#F26522]/30 flex items-center justify-center text-[#F26522]">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-xs text-white/60">
                      {selectedVideo.location} • {selectedVideo.sourceInfo}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Video Viewport (With Sound Enabled) */}
              <div className="relative bg-black flex-1 flex items-center justify-center min-h-[350px] sm:min-h-[480px]">
                <video
                  ref={modalVideoRef}
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full max-h-[65vh] object-contain"
                />

                {/* Next / Previous Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#F26522] border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
                  title="Previous Video (Left Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#F26522] border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg z-20"
                  title="Next Video (Right Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Footer Info */}
              <div className="px-6 py-4 bg-neutral-900/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white font-medium">
                    {selectedVideo.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    Full 4K Motion Rendered
                  </span>
                </div>
                <div className="text-white/40 font-mono">
                  Video {selectedIndex !== null ? selectedIndex + 1 : 1} of {VIDEO_LIST.length} • Use Arrow Keys to Navigate
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
