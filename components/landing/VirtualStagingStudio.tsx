"use client";

import { VirtualStageShowcase } from "@/components/ui/VirtualStageShowcase";

const FORT_STAGING_IMAGES = [
  {
    id: "original",
    label: "Original",
    src: "/fort/bedroom-empty.webp",
    caption: "Original vacant primary bedroom photo before AI virtual staging",
    isOriginal: true,
  },
  {
    id: "modern",
    label: "Modern Contemporary",
    src: "/fort/bedroom-modern.jpg",
    caption: "Clean modern design with upholstered platform bed, custom lighting & plush rug",
    badge: "Popular",
  },
  {
    id: "luxury",
    label: "Luxury Suite",
    src: "/fort/bedroom-luxury.jpg",
    caption: "5-star luxury hotel aesthetic with velvet headboard, warm gold accents & ambient lighting",
    badge: "Trending",
  },
  {
    id: "scandinavian",
    label: "Scandinavian",
    src: "/fort/bedroom-scandinavian.jpg",
    caption: "Nordic light wood finishes, soft organic cotton textiles & serene neutral palette",
  },
  {
    id: "midcentury",
    label: "Mid-Century Modern",
    src: "/fort/bedroom-midcentury.jpg",
    caption: "Iconic mid-century walnut furniture, retro artwork & warm earth tones",
    badge: "New",
  },
  {
    id: "coastal",
    label: "Coastal Retreat",
    src: "/fort/bedroom-coastal.jpg",
    caption: "Breezy coastal resort look with light linen, woven textures & soft blue accents",
  },
  {
    id: "farmhouse",
    label: "Modern Farmhouse",
    src: "/fort/bedroom-farmhouse.jpg",
    caption: "Cozy modern farmhouse feel with rustic wood beam accents & warm textiles",
  },
];

export default function VirtualStagingStudio() {
  return (
    <VirtualStageShowcase
      title="Primary Suite AI Virtual Staging Studio"
      subtitle="AI Staging Studio"
      description="Experience how one vacant primary bedroom is transformed into 6 photorealistic design styles using our AI Virtual Staging Studio. Switch styles or drag the split-slider to compare against the original photo."
      ctaText="Start Staging Your Property"
      ctaHref="/contact"
      images={FORT_STAGING_IMAGES}
      autoPreview={true}
      autoPreviewInterval={4000}
    />
  );
}
