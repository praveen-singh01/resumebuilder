import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  size?: number;
}

export function Spotlight({
  className = "",
  size = 500,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const updatePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", updatePosition);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", updatePosition);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px z-10 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-0 h-full w-full">
        {/* Content goes here */}
      </div>
    </div>
  );
}
