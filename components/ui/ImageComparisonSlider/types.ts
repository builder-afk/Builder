export interface ImageComparisonSliderProps {
  /** Image URL for the "Before" (e.g. Original / Empty room) */
  beforeImage: string;
  /** Image URL for the "After" (e.g. Virtually Staged room) */
  afterImage: string;
  /** Label for the room / space (e.g. "Living Room", "Master Suite") */
  roomName?: string;
  /** Subtitle or location detail (e.g. "Modern Scandinavian Staging") */
  subtitle?: string;
  /** Initial slider position percentage (0 to 100). Default is 50. */
  initialPosition?: number;
  /** Whether to show the top "Before" & "After" corner badges. Default is true. */
  showLabels?: boolean;
  /** Custom label for "Before" badge. Default is "Original". */
  beforeLabel?: string;
  /** Custom label for "After" badge. Default is "Virtually Staged". */
  afterLabel?: string;
  /** Whether to show the "Drag to Compare" tooltip badge above the handle. Default is true. */
  showTooltip?: boolean;
  /** Custom text for tooltip badge. Default is "Drag to Compare". */
  tooltipText?: string;
  /** Whether to show the central handle & divider line. Default is true. */
  showHandle?: boolean;
  /** Automatically trigger a subtle hint swipe animation when entering viewport. Default is true. */
  autoAnimate?: boolean;
  /** Callback fired whenever the slider position changes. */
  onPositionChange?: (positionPercentage: number) => void;
  /** Optional custom CSS aspect ratio class (e.g. "aspect-[4/3]", "aspect-[16/9]"). Default is "aspect-[16/10]". */
  aspectRatio?: string;
  /** Optional container className for additional custom styling. */
  className?: string;
}
