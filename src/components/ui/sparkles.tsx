import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export const Sparkles = ({
  children,
  className,
  id,
  background,
  minSize = 10,
  maxSize = 20,
  quantity = 20,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  quantity?: number;
  [key: string]: any;
}) => {
  const [sparkles, setSparkles] = useState<Array<any>>([]);

  useEffect(() => {
    const sparklesArray = Array.from({ length: quantity }, (_, i) => ({
      id: i.toString(),
      createdAt: Date.now(),
      size: Math.random() * (maxSize - minSize) + minSize,
      style: {
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        zIndex: 1,
        position: "absolute",
        transform: `rotate(${Math.random() * 360}deg)`,
        animation: `sparkle ${Math.random() * 2 + 1}s linear infinite`,
        color: `hsl(${Math.random() * 360}, 100%, 75%)`,
      },
    }));

    setSparkles(sparklesArray);

    return () => {
      setSparkles([]);
    };
  }, [maxSize, minSize, quantity]);

  return (
    <div
      className={cn("relative w-fit", className)}
      id={id}
      {...props}
    >
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            style={sparkle.style}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <svg
              width={sparkle.size}
              height={sparkle.size}
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
