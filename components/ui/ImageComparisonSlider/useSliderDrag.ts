import { useState, useRef, useCallback, useEffect } from "react";

interface UseSliderDragProps {
  initialPosition?: number;
  onPositionChange?: (pos: number) => void;
}

export function useSliderDrag({
  initialPosition = 50,
  onPositionChange,
}: UseSliderDragProps) {
  const [position, setPositionState] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const positionRef = useRef<number>(initialPosition);

  // Helper to update position safely with RAF
  const updatePosition = useCallback(
    (newPos: number) => {
      const clamped = Math.min(100, Math.max(0, newPos));
      positionRef.current = clamped;

      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        setPositionState(clamped);
        if (onPositionChange) {
          onPositionChange(clamped);
        }
      });
    },
    [onPositionChange]
  );

  // Calculate percentage from pointer event clientX
  const calculatePositionFromX = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      updatePosition(percentage);
    },
    [updatePosition]
  );

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Primary button or touch
      if (e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      setIsDragging(true);
      setHasInteracted(true);

      // Capture pointer to container
      if (containerRef.current && e.pointerId !== undefined) {
        try {
          containerRef.current.setPointerCapture(e.pointerId);
        } catch {
          // Fallback if pointer capture is unsupported
        }
      }

      calculatePositionFromX(e.clientX);
    },
    [calculatePositionFromX]
  );

  // Pointer Move
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      calculatePositionFromX(e.clientX);
    },
    [isDragging, calculatePositionFromX]
  );

  // Pointer Up / Cancel
  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      if (containerRef.current && e.pointerId !== undefined) {
        try {
          containerRef.current.releasePointerCapture(e.pointerId);
        } catch {
          // Ignore
        }
      }
    },
    [isDragging]
  );

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      setHasInteracted(true);
      const step = e.shiftKey ? 10 : 2;
      let newPos = positionRef.current;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newPos -= step;
          break;
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newPos += step;
          break;
        case "Home":
          e.preventDefault();
          newPos = 0;
          break;
        case "End":
          e.preventDefault();
          newPos = 100;
          break;
        default:
          return;
      }

      updatePosition(newPos);
    },
    [updatePosition]
  );

  // Programmatic setter
  const setPosition = useCallback(
    (newPos: number) => {
      updatePosition(newPos);
    },
    [updatePosition]
  );

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return {
    containerRef,
    position,
    isDragging,
    hasInteracted,
    setPosition,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
  };
}
