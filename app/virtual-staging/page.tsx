"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/landing/Navbar";
import {
  VIRTUAL_STAGING_ROOMS,
  StagingRoomScene,
  FurnitureItem,
  MaterialVariant,
  StagingCategory,
} from "@/lib/data/virtualStagingData";
import StagingFullscreenViewer from "@/components/virtual-staging/StagingFullscreenViewer";
import FurnitureInspectionModal from "@/components/virtual-staging/FurnitureInspectionModal";
import ShopRoomDrawer, { CartItem } from "@/components/virtual-staging/ShopRoomDrawer";
import RoomGalleryStrip from "@/components/virtual-staging/RoomGalleryStrip";
import FurnitureCatalogGrid from "@/components/virtual-staging/FurnitureCatalogGrid";
import {
  Wand2,
  Sparkles,
  ShoppingBag,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  Eye,
  Sliders,
} from "lucide-react";
import Link from "next/link";

export default function VirtualStagingPage() {
  const [activeRoomId, setActiveRoomId] = useState<string>(VIRTUAL_STAGING_ROOMS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<StagingCategory>("all");
  const [inspectingItem, setInspectingItem] = useState<FurnitureItem | null>(null);
  const [isShopDrawerOpen, setIsShopDrawerOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Active room scene
  const activeRoom = useMemo(() => {
    return (
      VIRTUAL_STAGING_ROOMS.find((r) => r.id === activeRoomId) ||
      VIRTUAL_STAGING_ROOMS[0]
    );
  }, [activeRoomId]);

  // Aggregate all unique furniture items across all rooms
  const allFurnitureItems = useMemo(() => {
    const map = new Map<string, FurnitureItem>();
    VIRTUAL_STAGING_ROOMS.forEach((r) => {
      r.furnitureItems.forEach((item) => {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      });
    });
    return Array.from(map.values());
  }, []);

  // Cart operations
  const handleAddToCart = (item: FurnitureItem, variant: MaterialVariant) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.furniture.id === item.id && ci.variant.id === variant.id
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [...prev, { furniture: item, variant, quantity: 1 }];
    });

    setNotificationToast(`Added ${item.name} (${variant.name}) to cart!`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  const handleAddAllRoomItems = () => {
    activeRoom.furnitureItems.forEach((item) => {
      handleAddToCart(item, item.defaultMaterial);
    });
    setIsShopDrawerOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.furniture.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.furniture.id !== itemId));
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf5f0] text-[#50372b] font-body">
      <Navbar />

      {/* Hero Header Section */}
      <section className="pt-28 pb-12 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-4">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Full-Screen AI Virtual Staging & Real-Time 3D Showroom</span>
            </div>

            {/* Title */}
            <h1 className="font-heading italic text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#50372b]">
              See Staged Spaces in Full Screen. <br />
              <span className="text-[#F26522]">Shop Furniture in Real-Time 3D.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#50372b]/65 max-w-2xl leading-relaxed">
              Explore photorealistic AI-staged rooms in immersive full-screen. Move your cursor over tables, beds, paintings, sofas, and lamps to inspect them from every angle in real-time 3D and shop the complete look.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs font-mono text-[#50372b]/70">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F26522]" />
                <span>24-Hour AI Staging SLA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#10b981]" />
                <span>Real-Time WebGL 3D Meshes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#F26522]" />
                <span>Save 90% vs Physical Staging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Full-Screen Staging & 3D Interactive Viewport Section */}
      <section className="py-6 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Core Fullscreen Interactive Staging Canvas */}
        <StagingFullscreenViewer
          room={activeRoom}
          onInspectFurniture={(item) => setInspectingItem(item)}
          onOpenShopDrawer={() => setIsShopDrawerOpen(true)}
          cartCount={totalCartCount}
        />

        {/* Room Gallery Carousel & Category Tabs */}
        <div className="pt-4">
          <RoomGalleryStrip
            rooms={VIRTUAL_STAGING_ROOMS}
            activeRoomId={activeRoom.id}
            onSelectRoom={(id) => setActiveRoomId(id)}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        </div>
      </section>

      {/* Stats & Staging Value Proposition */}
      <section className="py-16 bg-white border-y border-[#50372b]/10 my-12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-[#faf5f0] border border-[#50372b]/10 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#F26522]/15 text-[#F26522] flex items-center justify-center font-bold">
                ₹
              </div>
              <div className="text-3xl font-bold font-heading italic text-[#50372b]">
                ₹3,50,000+
              </div>
              <p className="text-xs text-[#50372b]/60 leading-relaxed">
                Average staging cost saved per property vs renting physical furniture & hauling trucks.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#faf5f0] border border-[#50372b]/10 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold font-heading italic text-[#50372b]">
                360° Real-Time 3D
              </div>
              <p className="text-xs text-[#50372b]/60 leading-relaxed">
                Interact with beds, tables, lamps and art as real-time 3D meshes moving with your cursor.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#faf5f0] border border-[#50372b]/10 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold font-heading italic text-[#50372b]">
                24 Hours
              </div>
              <p className="text-xs text-[#50372b]/60 leading-relaxed">
                Lightning fast turnaround time. Send raw vacant property photos and receive 6 styled variations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#faf5f0] border border-[#50372b]/10 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold font-heading italic text-[#50372b]">
                15% Bundle Savings
              </div>
              <p className="text-xs text-[#50372b]/60 leading-relaxed">
                Shop curated room looks directly with designer manufacturer discounts and verified delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated 3D Shoppable Furniture Catalog Grid */}
      <section className="py-12 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <FurnitureCatalogGrid
          furnitureItems={allFurnitureItems}
          onInspectItem={(item) => setInspectingItem(item)}
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Bottom Call to Action for Builders & Developers */}
      <section className="py-20 bg-[#2c1b12] text-white relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="bg-[#1f130c] border border-[#50372b] p-8 sm:p-14 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F26522]/20 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stage Your Property In 24 Hours</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading italic leading-tight text-white">
                Turn your vacant listings into <br />
                <span className="text-[#F26522]">shoppable dream homes.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Upload your vacant photos or schedule a 3D LiDAR scanning session. Our AI staging engine delivers 6 interior styles with interactive 3D shoppable furniture hotspots in under 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F26522] hover:bg-[#e05a1a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(242,101,34,0.4)] transition-all active:scale-95"
              >
                <span>Get Free Staging Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white font-semibold text-sm flex items-center justify-center transition-all"
              >
                <span>How It Works</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Inspection Modal */}
      <FurnitureInspectionModal
        item={inspectingItem}
        isOpen={!!inspectingItem}
        onClose={() => setInspectingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shoppable Room Drawer */}
      <ShopRoomDrawer
        room={activeRoom}
        isOpen={isShopDrawerOpen}
        onClose={() => setIsShopDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onInspectItem={(item) => {
          setIsShopDrawerOpen(false);
          setInspectingItem(item);
        }}
        onAddAllRoomItems={handleAddAllRoomItems}
      />

      {/* Floating Notification Toast */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#1f1713] border border-[#F26522]/50 text-white shadow-2xl flex items-center gap-3 animate-fade-in font-medium text-xs">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span>{notificationToast}</span>
        </div>
      )}
    </div>
  );
}
