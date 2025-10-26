"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenu } from "@/components/ui/hamburger-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Our Services", link: "#projects" },
    { name: "Case Studies", link: "#contact" },
    { name: "About Us", link: "#about" },
    { name: "Blogs", link: "#blogs" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed max-w-5xl mx-auto top-0 left-0 right-0 z-50 w-full">
      {/* animated backdrop when scrolled */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed inset-0 z-40"
          >
            <div className="w-full h-16 lg:h-20 bg-white/10 backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-7xl mx-auto z-50">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-4">
              {/* Logo Icon */}
              <Image
                src="/logo.webp"
                className="w-12 h-auto rounded-sm"
                height={200}
                width={200}
                alt="artique-agency"
              />
              <span className="text-white font-bold text-lg">
                ARTIQUE AGENCY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ">
            <div
              className={cn(
                "px-6 py-3",
                // when scrolled, keep list merged: no bg / no border and no rounded
                isScrolled
                  ? "bg-transparent border-transparent rounded-none"
                  : "bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
              )}
            >
              <div className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="text-white hover:text-white/80 transition-colors duration-200 text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button className="bg-white uppercase text-gray-900 hover:bg-white/90 px-6 py-2 rounded-full font-semibold transition-all tracking-wider duration-200">
              Contact us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2">
                  <HamburgerMenu isOpen={isMobileMenuOpen} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gray-900/95 backdrop-blur-md border-l border-white/20"
              >
                <div className="flex flex-col h-full pt-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div className="relative w-6 h-6">
                        <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full opacity-80"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full opacity-60"></div>
                      </div>
                    </div>
                    <span className="text-white text-xl font-semibold">
                      Elevate
                    </span>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-6">
                    {navItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white hover:text-white/80 transition-colors duration-200 text-lg font-medium py-2"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  {/* Mobile CTA Button */}
                  <div className="mt-auto mb-6">
                    <Button
                      className="w-full bg-white text-gray-900 hover:bg-white/90 py-3 rounded-full font-medium uppercase transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact us
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
