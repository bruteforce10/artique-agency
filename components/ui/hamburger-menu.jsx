"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function HamburgerMenu({ isOpen, className, color = "white", ...props }) {
  // Render a non-interactive container so the component can be used inside
  // another interactive element (e.g. a button) without creating nested
  // <button> elements which are invalid HTML and break hydration.
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-6 h-6 space-y-1 group",
        className
      )}
      // don't forward interactive handlers to avoid nested interactive controls
      {...props}
    >
      <span
        className={cn(
          "block w-5 h-0.5 transition-all duration-300 ease-in-out",
          color === "black" ? "bg-black" : "bg-white",
          isOpen && "rotate-45 translate-y-1.5"
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 transition-all duration-300 ease-in-out",
          color === "black" ? "bg-black" : "bg-white",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "block w-5 h-0.5 transition-all duration-300 ease-in-out",
          color === "black" ? "bg-black" : "bg-white",
          isOpen && "-rotate-45 -translate-y-1.5"
        )}
      />
    </div>
  );
}

export { HamburgerMenu };
