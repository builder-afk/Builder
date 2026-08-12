"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Camera,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  ArrowRight,
  Eye,
  Compass,
  Grid,
  ShieldCheck,
} from "lucide-react";
import { ImageComparisonSlider } from "@/components/ui/ImageComparisonSlider";
import Link from "next/link";

interface RoomAngleSet {
  id: string;
  roomName: string;
  category: string;
  description: string;
  emptyImage: string;
  angles: {
    id: string;
    label: string;
    angleName: string;
    src: string;
    styleTag: string;
  }[];
}

const ROOM_ANGLE_DATA: RoomAngleSet[] = [
  {
    id: "living-room",
    roomName: "Great Living Room",
    category: "Living Space",
    description: "Spatial consistency locked across 6 design styles & camera angles.",
    emptyImage: "/trick/living-room-empty.webp",
    angles: [
      {
        id: "living-modern",
        label: "Modern Italian",
        angleName: "Main Perspective",
        src: "/trick/living-room-modern.jpg",
        styleTag: "Modern",
      },
      {
        id: "living-scandi",
        label: "Scandinavian Oak",
        angleName: "Wide Angle View",
        src: "/trick/living-room-scandinavian.jpg",
        styleTag: "Scandinavian",
      },
      {
        id: "living-luxury",
        label: "Luxury Marble",
        angleName: "Seating Detail Angle",
        src: "/trick/living-room-luxury.jpg",
        styleTag: "Luxury",
      },
      {
        id: "living-midcentury",
        label: "Mid-Century Walnut",
        angleName: "Side Lounge View",
        src: "/trick/living-room-midcentury.jpg",
        styleTag: "Mid-Century",
      },
      {
        id: "living-farmhouse",
        label: "Modern Farmhouse",
        angleName: "Window Facing Angle",
        src: "/trick/living-room-farmhouse.jpg",
        styleTag: "Farmhouse",
      },
      {
        id: "living-coastal",
        label: "Coastal Linen",
        angleName: "Open Concept View",
        src: "/trick/living-room-coastal.jpg",
        styleTag: "Coastal",
      },
    ],
  },
  {
    id: "bedroom",
    roomName: "Primary Bedroom Suite",
    category: "Bedroom",
    description: "Consistent headboard, nightstand & textiles across all room perspectives.",
    emptyImage: "/trick/bedroom-1-empty.jpg",
    angles: [
      {
        id: "bed-midcentury",
        label: "Mid-Century Suite",
        angleName: "Bed Focal Angle",
        src: "/trick/bedroom-1-midcentury.jpg",
        styleTag: "Mid-Century",
      },
      {
        id: "bed-coastal",
        label: "Coastal Breeze",
        angleName: "Window Light View",
        src: "/trick/bedroom-1-coastal.jpg",
        styleTag: "Coastal",
      },
      {
        id: "bed-farmhouse",
        label: "Farmhouse Charm",
        angleName: "Corner Reading View",
        src: "/trick/bedroom-1-farmhouse.jpg",
        styleTag: "Farmhouse",
      },
      {
        id: "bed-industrial",
        label: "Urban Loft",
        angleName: "Accent Wall Angle",
        src: "/trick/bedroom-8-industrial.jpg",
        styleTag: "Industrial",
      },
      {
        id: "bed-luxury",
        label: "Luxury Hotel Suite",
        angleName: "Primary Suite Panorama",
        src: "/trick/bedroom-8-luxury.jpg",
        styleTag: "Luxury",
      },
    ],
  },
  {
    id: "kitchen",
    roomName: "Gourmet Chef's Kitchen",
    category: "Kitchen & Dining",
    description: "Barstool placement, counter decor & lighting perfectly synchronized.",
    emptyImage: "/trick/kitchen-empty.webp",
    angles: [
      {
        id: "kit-modern",
        label: "Modern Minimalist",
        angleName: "Island Perspective",
        src: "/trick/kitchen-modern.jpg",
        styleTag: "Modern",
      },
      {
        id: "kit-luxury",
        label: "Luxury Marble",
        angleName: "Cabinet & Counter View",
        src: "/trick/kitchen-luxury.jpg",
        styleTag: "Luxury",
      },
      {
        id: "kit-scandi",
        label: "Scandinavian Oak",
        angleName: "Breakfast Nook Angle",
        src: "/trick/kitchen-scandinavian.jpg",
        styleTag: "Scandinavian",
      },
      {
        id: "kit-midcentury",
        label: "Mid-Century Warmth",
        angleName: "Pendant Light View",
        src: "/trick/kitchen-midcentury.jpg",
        styleTag: "Mid-Century",
      },
      {
        id: "kit-coastal",
        label: "Coastal Kitchen",
        angleName: "Open Kitchen View",
        src: "/trick/kitchen-coastal.jpg",
        styleTag: "Coastal",
      },
    ],
  },
  {
    id: "home-office",
    roomName: "Executive Home Office",
    category: "Workspace",
    description: "Desk placement, shelving & decor preserved seamlessly across angles.",
    emptyImage: "/trick/home-office-empty.webp",
    angles: [
      {
        id: "off-modern",
        label: "Modern Tech Desk",
        angleName: "Desk Primary Angle",
        src: "/trick/home-office-modern.jpg",
        styleTag: "Modern",
      },
      {
        id: "off-luxury",
        label: "Executive Leather",
        angleName: "Bookshelf Perspective",
        src: "/trick/home-office-luxury.jpg",
        styleTag: "Luxury",
      },
      {
        id: "off-scandi",
        label: "Nordic Minimalist",
        angleName: "Window Desk View",
        src: "/trick/home-office-scandinavian.jpg",
        styleTag: "Scandinavian",
      },
      {
        id: "off-midcentury",
        label: "Mid-Century Executive",
        angleName: "Credenza Angle",
        src: "/trick/home-office-midcentury.jpg",
        styleTag: "Mid-Century",
      },
    ],
  },
  {
    id: "dining-room",
    roomName: "Formal Dining Room",
    category: "Dining",
    description: "Dining table dimensions, chandelier alignment & chair placement locked.",
    emptyImage: "/trick/dining-room-empty.webp",
    angles: [
      {
        id: "din-modern",
        label: "Modern Glass & Steel",
        angleName: "Table Center Angle",
        src: "/trick/dining-room-modern.jpg",
        styleTag: "Modern",
      },
      {
        id: "din-luxury",
        label: "Luxury Marble Dining",
        angleName: "Chandelier View",
        src: "/trick/dining-room-luxury.jpg",
        styleTag: "Luxury",
      },
      {
        id: "din-scandi",
        label: "Scandinavian Oak",
        angleName: "Sideboard Perspective",
        src: "/trick/dining-room-scandinavian.jpg",
        styleTag: "Scandinavian",
      },
      {
        id: "din-farmhouse",
        label: "Modern Farmhouse",
        angleName: "Host Chair View",
        src: "/trick/dining-room-farmhouse.jpg",
        styleTag: "Farmhouse",
      },
    ],
  },
  {
    id: "outdoor",
    roomName: "Outdoor Patio & Lounge",
    category: "Outdoor",
    description: "Outdoor patio furniture, firepit & lounge seating consistent across shots.",
    emptyImage: "/trick/outdoor-empty.webp",
    angles: [
      {
        id: "out-modern",
        label: "Modern Patio",
        angleName: "Pool Deck View",
        src: "/trick/outdoor-modern.jpg",
        styleTag: "Modern",
      },
      {
        id: "out-luxury",
        label: "Resort Luxury Lounge",
        angleName: "Firepit Perspective",
        src: "/trick/outdoor-luxury.jpg",
        styleTag: "Luxury",
      },
      {
        id: "out-scandi",
        label: "Scandinavian Teak",
        angleName: "Dining Deck Angle",
        src: "/trick/outdoor-scandinavian.jpg",
        styleTag: "Scandinavian",
      },
      {
        id: "out-coastal",
        label: "Coastal Cabana",
        angleName: "Pergola View",
        src: "/trick/outdoor-coastal.jpg",
        styleTag: "Coastal",
      },
    ],
  },
];

export default function MultiAngleStaging() {
  const [activeRoomId, setActiveRoomId] = useState<string>("living-room");
  const [activeAngleId, setActiveAngleId] = useState<string>("living-modern");
  const [isCompare, setIsCompare] = useState<boolean>(false);

  const currentRoom =
    ROOM_ANGLE_DATA.find((r) => r.id === activeRoomId) || ROOM_ANGLE_DATA[0];

  const currentAngle =
    currentRoom.angles.find((a) => a.id === activeAngleId) ||
    currentRoom.angles[0];

  const handleRoomChange = (roomId: string) => {
    setActiveRoomId(roomId);
    const targetRoom = ROOM_ANGLE_DATA.find((r) => r.id === roomId);
    if (targetRoom && targetRoom.angles[0]) {
      setActiveAngleId(targetRoom.angles[0].id);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-mono font-bold uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5" />
            Multi-Angle Staging Perfected
          </div>

          <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
            Consistent Furniture Placement Across Multiple Angles
          </h2>

          <p className="text-gray-500 text-base sm:text-lg max-w-3xl mt-4 font-medium leading-relaxed">
            Our 3D Spatial AI engine locks furniture position, fabric textures, lighting, and decor across multiple camera perspectives of the same space — delivering 100% realistic virtual walkthroughs.
          </p>

          {/* Room Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 p-1.5 rounded-full bg-slate-100 border border-slate-200">
            {ROOM_ANGLE_DATA.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomChange(room.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeRoomId === room.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {room.roomName}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Multi-Angle Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Frame (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Top Bar inside Visual */}
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  3D Spatial Consistency Locked
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {currentAngle.angleName}
                </span>
              </div>

              <button
                onClick={() => setIsCompare(!isCompare)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  isCompare
                    ? "bg-[#F26522] text-white shadow-md"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {isCompare ? "Slider Active" : "Compare Original"}
              </button>
            </div>

            {/* Visual Frame */}
            <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden border border-gray-200 shadow-2xl bg-slate-950 group">
              {isCompare ? (
                <ImageComparisonSlider
                  beforeImage={currentRoom.emptyImage}
                  afterImage={currentAngle.src}
                  roomName={`${currentRoom.roomName} (${currentAngle.label})`}
                  beforeLabel="Vacant Original"
                  afterLabel={`${currentAngle.label} Staged`}
                  initialPosition={50}
                  autoAnimate={false}
                  aspectRatio="aspect-[16/10]"
                  className="w-full h-full"
                />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAngle.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={currentAngle.src}
                      alt={currentAngle.label}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                      <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white text-xs sm:text-sm font-medium">
                        <span className="text-[#F26522] font-semibold mr-2">
                          {currentAngle.styleTag} Style
                        </span>
                        {currentAngle.angleName}
                      </div>

                      <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white/80 text-xs font-mono">
                        Camera Angle #{currentRoom.angles.findIndex(a => a.id === currentAngle.id) + 1}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Right Thumbnails & Multi-Angle Selector Panel (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-6 shadow-sm">
              <h3 className="font-heading italic text-2xl font-bold text-slate-900 mb-1">
                {currentRoom.roomName}
              </h3>
              <p className="text-xs text-slate-500 mb-5 leading-relaxed font-medium">
                {currentRoom.description}
              </p>

              {/* Angle Thumbnails */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Select Staging Angle ({currentRoom.angles.length} Available)
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {currentRoom.angles.map((angle, idx) => {
                    const isSelected = angle.id === activeAngleId;
                    return (
                      <button
                        key={angle.id}
                        onClick={() => {
                          setActiveAngleId(angle.id);
                        }}
                        className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 group ${
                          isSelected
                            ? "border-[#F26522] shadow-md ring-2 ring-[#F26522]/30 scale-[1.02]"
                            : "border-gray-200 hover:border-gray-300 hover:scale-[1.01]"
                        }`}
                      >
                        <img
                          src={angle.src}
                          alt={angle.label}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 transition-opacity ${isSelected ? "bg-black/20" : "bg-black/40 group-hover:bg-black/20"}`} />
                        
                        {/* Label Badge */}
                        <div className="absolute bottom-2 left-2 right-2 text-left">
                          <span className="text-[10px] font-bold text-white block leading-tight truncate">
                            {angle.label}
                          </span>
                          <span className="text-[9px] text-white/70 block font-mono">
                            Angle #{idx + 1}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Multi-Angle Guarantee Badges */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F26522]" />
                  <span>Multi-Angle Camera Calibration</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F26522]" />
                  <span>3D Scale & Furniture Placement Lock</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#F26522]" />
                  <span>Consistent Lighting & Raytracing</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-slate-900 hover:bg-[#F26522] text-white font-semibold text-xs shadow-md transition-all duration-300 group"
                >
                  <span>Order Multi-Angle Staging</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
