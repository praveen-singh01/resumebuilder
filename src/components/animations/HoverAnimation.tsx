"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverAnimationProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  type?: "scale" | "lift" | "glow" | "pulse";
}

export default function HoverAnimation({
  children,
  scale = 1.05,
  className = "",
  type = "scale",
}: HoverAnimationProps) {
  const getAnimationProps = () => {
    switch (type) {
      case "scale":
        return {
          whileHover: { scale },
          transition: { duration: 0.2 },
        };
      case "lift":
        return {
          whileHover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
          transition: { duration: 0.2 },
        };
      case "glow":
        return {
          whileHover: { boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" },
          transition: { duration: 0.2 },
        };
      case "pulse":
        return {
          whileHover: { 
            scale: [1, 1.05, 1, 1.05, 1],
            transition: { 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop" 
            }
          },
        };
      default:
        return {
          whileHover: { scale },
          transition: { duration: 0.2 },
        };
    }
  };

  return (
    <motion.div className={className} {...getAnimationProps()}>
      {children}
    </motion.div>
  );
}
