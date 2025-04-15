import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export const Typewriter = ({
  words,
  className,
  cursorClassName,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
}: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      const shouldDelete = isDeleting
        ? currentText.length > 0
        : currentText.length === currentWord.length;

      if (isPaused) {
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, delayBetweenWords);
        return;
      }

      if (shouldDelete) {
        if (!isDeleting) {
          setIsPaused(true);
          return;
        }

        setCurrentText((prev) => prev.slice(0, -1));
        timeoutRef.current = setTimeout(
          handleTyping,
          deletingSpeed
        );

        if (currentText.length === 1) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        timeoutRef.current = setTimeout(
          handleTyping,
          typingSpeed
        );
      }
    };

    timeoutRef.current = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isPaused,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return (
    <span className={cn("inline-block", className)}>
      {currentText}
      <span
        className={cn(
          "ml-1 inline-block h-4 w-[2px] animate-blink bg-current",
          cursorClassName
        )}
      />
    </span>
  );
};
