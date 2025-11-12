"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const NavbarContext = createContext(null);

export const useNavbarColor = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarColor must be used within NavbarProvider");
  }
  return context;
};

export const NavbarProvider = ({ children }) => {
  const [navbarColor, setNavbarColor] = useState("white");

  return (
    <NavbarContext.Provider value={{ navbarColor, setNavbarColor }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Hook untuk section
export const useNavbarSection = (sectionId, shouldBeWhite = false) => {
  const { setNavbarColor } = useNavbarColor();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavbarColor(shouldBeWhite ? "white" : "black");
          }
        });
      },
      { threshold: 0.65 }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [shouldBeWhite, setNavbarColor]);

  return ref;
};
