"use client";

import React from "react";
import { StagingRoomScene, StagingCategory } from "@/lib/data/virtualStagingData";
import {
  Bed,
  Sofa,
  Utensils,
  ChefHat,
  Briefcase,
  Sun,
  Sparkles,
  Layers,
} from "lucide-react";

interface RoomGalleryStripProps {
  rooms: StagingRoomScene[];
  activeRoomId: string;
  onSelectRoom: (roomId: string) => void;
  selectedCategory: StagingCategory;
  onSelectCategory: (category: StagingCategory) => void;
}

export default function RoomGalleryStrip({
  rooms,
  activeRoomId,
  onSelectRoom,
  selectedCategory,
  onSelectCategory,
}: RoomGalleryStripProps) {
  const categories: { id: StagingCategory; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All Rooms", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "bedroom", label: "Bedrooms", icon: <Bed className="w-3.5 h-3.5" /> },
    { id: "living", label: "Living Rooms", icon: <Sofa className="w-3.5 h-3.5" /> },
    { id: "dining", label: "Dining Areas", icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: "office", label: "Executive Offices", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: "kitchen", label: "Kitchens", icon: <ChefHat className="w-3.5 h-3.5" /> },
    { id: "outdoor", label: "Terrace & Patio", icon: <Sun className="w-3.5 h-3.5" /> },
  ];

  const filteredRooms =
    selectedCategory === "all"
      ? rooms
      : rooms.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#50372b] text-white shadow-md"
                    : "bg-white/80 hover:bg-white text-[#50372b]/70 hover:text-[#50372b] border border-[#50372b]/10"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#50372b]/60">
          Showing {filteredRooms.length} Staged Spaces
        </div>
      </div>

      {/* Room Thumbnails Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {filteredRooms.map((room) => {
          const isActive = room.id === activeRoomId;
          return (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className={`group relative rounded-2xl overflow-hidden text-left transition-all duration-300 border ${
                isActive
                  ? "border-[#F26522] ring-2 ring-[#F26522]/30 shadow-lg scale-[1.02]"
                  : "border-[#50372b]/10 hover:border-[#50372b]/30 bg-white shadow-sm"
              }`}
            >
              {/* Image Preview */}
              <div className="relative h-32 w-full overflow-hidden bg-neutral-900">
                <img
                  src={room.afterImage}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Staging Style Badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/90">
                  {room.styleLabel.split(" ")[0]}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#F26522] text-[10px] font-bold text-white shadow-sm">
                    LIVE 3D
                  </div>
                )}
              </div>

              {/* Info Bottom */}
              <div className="p-3 space-y-1">
                <h4 className="text-xs font-bold text-[#50372b] truncate">
                  {room.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-[#50372b]/60 font-mono">
                  <span>{room.roomType}</span>
                  <span>{room.furnitureItems.length} items 3D</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
