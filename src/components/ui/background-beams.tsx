import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({
  className,
  ...props
}: {
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "h-full w-full overflow-hidden [--x:0px] [--y:0px]",
        className
      )}
      {...props}
    >
      <div className="relative h-full w-full">
        <div
          className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 20%
              ),
              radial-gradient(
                circle at ${mousePosition.x + 100}px ${mousePosition.y + 100}px,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 40%
              ),
              radial-gradient(
                circle at ${mousePosition.x - 150}px ${mousePosition.y - 150}px,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 30%
              )
            `,
            backgroundBlendMode: "screen",
          }}
        />
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite
                in="SourceGraphic"
                in2="blur"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="0"
                k4="0"
              />
            </filter>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gradient)"
            filter="url(#glow)"
          />
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
        </svg>
      </div>
    </div>
  );
};
