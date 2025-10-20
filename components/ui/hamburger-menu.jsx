"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function HamburgerMenu({ 
  isOpen, 
  onClick, 
  className,
  ...props 
}) {
  return (
    <button
      className={cn(
        "flex flex-col justify-center items-center w-6 h-6 space-y-1 group",
        className
      )}
      onClick={onClick}
      aria-label="Toggle menu"
      {...props}
    >
      <span
        className={cn(
          "block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out",
          isOpen && "rotate-45 translate-y-1.5"
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 bg-white transition-all duration-300 ease-in-out",
          isOpen && "-rotate-45 -translate-y-1.5"
        )}
      />
    </button>
  )
}

export { HamburgerMenu }
