import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const animationSpeed = speed === "fast" ? 0.1 : 0.05;
  const defaultColors = [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const actualColors = colors ?? defaultColors;
    const waves = createWaves(actualColors, waveWidth);
    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (backgroundFill) {
        ctx.fillStyle = backgroundFill;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      waves.forEach((wave) => {
        drawWave(ctx, wave, time, canvas.height, waveOpacity);
      });

      time += animationSpeed;
      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, waveWidth, backgroundFill, animationSpeed, waveOpacity]);

  const createWaves = (colors: string[], width = 50) => {
    return colors.map((color, i) => ({
      color,
      amplitude: Math.random() * 10 + 10, // Height of the wave
      frequency: Math.random() * 0.02 + 0.02, // How many waves
      offset: Math.random() * 100, // Phase offset
      width: width || 50, // Width of each wave
    }));
  };

  const drawWave = (
    ctx: CanvasRenderingContext2D,
    wave: {
      color: string;
      amplitude: number;
      frequency: number;
      offset: number;
      width: number;
    },
    time: number,
    height: number,
    opacity: number
  ) => {
    const { color, amplitude, frequency, offset, width } = wave;
    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let x = 0; x < width * 100; x += 1) {
      const y =
        Math.sin(x * frequency + time + offset) * amplitude +
        height / 2 +
        amplitude;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width * 100, height);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          filter: `blur(${blur}px)`,
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
