export interface StagingImageItem {
  /** Unique ID for the staging style (e.g. "original", "modern", "luxury") */
  id: string;
  /** Display label on pill button (e.g. "Original", "Modern", "Luxury") */
  label: string;
  /** Image URL */
  src: string;
  /** Caption or description of this staging style */
  caption?: string;
  /** Optional badge text (e.g. "Popular", "New", "Trending") */
  badge?: string;
  /** Is this the original vacant photo? */
  isOriginal?: boolean;
}

export interface VirtualStageShowcaseProps {
  /** Section Title */
  title?: string;
  /** Section Subtitle / Category pill */
  subtitle?: string;
  /** Section Description */
  description?: string;
  /** Primary CTA button text */
  ctaText?: string;
  /** Primary CTA link URL */
  ctaHref?: string;
  /** List of staging images (unlimited supported) */
  images: StagingImageItem[];
  /** Default selected image ID. Defaults to first image or "original". */
  defaultSelectedId?: string;
  /** Enable automatic cycling between styles every X milliseconds. Default: true */
  autoPreview?: boolean;
  /** Autoplay cycle duration in ms. Default: 4000 */
  autoPreviewInterval?: number;
  /** Aspect ratio class for preview frame. Default: "aspect-[16/10]" */
  aspectRatio?: string;
  /** Custom container className */
  className?: string;
}
