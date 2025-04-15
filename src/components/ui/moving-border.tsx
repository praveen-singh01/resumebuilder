import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderRadius = "1.75rem",
  offset = 16,
  ...props
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  offset?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={cn("relative", containerClassName)}
      style={{
        borderRadius: borderRadius,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit] z-[1] backdrop-blur-[2px] bg-background/80",
          className
        )}
      >
        {children}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-[0]"
      >
        <div className="absolute inset-0 z-[0] overflow-hidden rounded-[inherit]">
          <div className="absolute inset-[-10px] z-[0]">
            <div className="absolute inset-0 z-[0] rounded-[inherit]">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: duration / 1000,
                  ease: "linear",
                }}
                className="absolute inset-0 z-[0]"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+32px)] h-[calc(100%+32px)] z-[0]">
                  <div
                    className="absolute inset-0 z-[0] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"
                    style={{
                      borderRadius: `calc(${borderRadius} + ${offset}px)`,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
