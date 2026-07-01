"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"> {
  variant?: "primary" | "secondary" | "outline" | "text" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  style?: React.CSSProperties;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest text-xs transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-luxury-gold focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary: "bg-luxury-black text-luxury-white hover:bg-luxury-gold hover:text-luxury-black border border-luxury-black hover:border-luxury-gold",
      secondary: "bg-luxury-white text-luxury-black border border-luxury-gray-light hover:border-luxury-gold",
      outline: "bg-transparent text-luxury-black border border-luxury-black hover:bg-luxury-black hover:text-luxury-white",
      gold: "bg-luxury-gold text-luxury-black border border-luxury-gold hover:bg-luxury-black hover:text-luxury-white hover:border-luxury-black",
      text: "bg-transparent text-luxury-black border-b border-transparent hover:border-luxury-black px-0 pb-1 rounded-none",
    };

    const sizes = {
      sm: "px-4 py-2 text-[10px]",
      md: "px-8 py-3.5",
      lg: "px-10 py-4 text-sm",
    };

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={{ y: variant !== "text" ? -2 : 0 }}
        whileTap={{ scale: 0.98 }}
        className={twMerge(
          baseStyles,
          variants[variant],
          variant !== "text" ? sizes[size] : "",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
