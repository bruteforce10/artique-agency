"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

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
  // Track semua section yang sedang in view dengan posisi mereka
  const activeSectionsRef = useRef(new Map());

  const updateNavbarColor = () => {
    // Cari section yang paling dekat dengan atas viewport
    let topSection = null;
    let topPosition = Infinity;

    activeSectionsRef.current.forEach((data, sectionId) => {
      if (data.inView && data.top < topPosition) {
        topPosition = data.top;
        topSection = data;
      }
    });

    if (topSection) {
      setNavbarColor(topSection.shouldBeWhite ? "white" : "black");
    }
  };

  return (
    <NavbarContext.Provider
      value={{
        navbarColor,
        setNavbarColor,
        activeSectionsRef,
        updateNavbarColor,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

// Hook untuk section menggunakan react-intersection-observer
export const useNavbarSection = (sectionId, shouldBeWhite = false) => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarSection must be used within NavbarProvider");
  }
  const { activeSectionsRef, updateNavbarColor } = context;

  // Menggunakan useInView dengan konfigurasi yang konsisten untuk desktop dan mobile
  const { ref, inView, entry } = useInView({
    // Trigger saat elemen mulai terlihat
    threshold: 0,
    // rootMargin membuat trigger point konsisten di semua ukuran layar
    // Menggunakan nilai yang lebih kecil untuk mobile dan desktop
    // -80px dari atas = trigger setelah melewati navbar
    rootMargin: "-80px 0px -50% 0px",
    // Trigger setiap kali status berubah
    triggerOnce: false,
  });

  useEffect(() => {
    if (!entry) return;

    // Update posisi section saat in view
    if (inView) {
      const rect = entry.boundingClientRect;
      activeSectionsRef.current.set(sectionId, {
        inView: true,
        shouldBeWhite,
        top: rect.top,
        sectionId,
      });
    } else {
      // Hapus dari map jika tidak in view
      activeSectionsRef.current.delete(sectionId);
    }

    // Update navbar color berdasarkan section yang paling atas
    updateNavbarColor();
  }, [
    inView,
    entry,
    shouldBeWhite,
    sectionId,
    activeSectionsRef,
    updateNavbarColor,
  ]);

  return ref;
};
