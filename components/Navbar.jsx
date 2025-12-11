"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IoMdMenu } from "react-icons/io";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbarColor } from "./NavbarContext";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { navbarColor } = useNavbarColor();

  const navItems = [
    { name: "Our Services", link: "/services" },
    { name: "Case Studies", link: "/projects" },
    { name: "About Us", link: "/about-us" },
    { name: "Blogs", link: "/blog" },
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
    <nav className="fixed max-w-5xl max-lg:px-8 max-lg:pt-2 mx-auto top-0 left-0 right-0 z-10 w-full">
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
            <div className="w-full h-20 lg:h-20 bg-white/10 backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-full max-w-7xl mx-auto z-50">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}

          <Link href="/">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.webp"
                className="w-12 h-auto rounded-sm"
                alt="artique-agency"
              />
              <span
                className={cn(
                  "font-bold text-lg transition-colors",
                  navbarColor === "black" ? "text-black" : "text-white"
                )}
              >
                ARTIQUE AGENCY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
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
                  <Link
                    key={index}
                    href={item.link}
                    className={cn(
                      "hover:opacity-80 transition-colors duration-200 text-sm font-medium",
                      navbarColor === "black" ? "text-black" : "text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <LanguageSwitcher isDesktop={true} navbarColor={navbarColor} />
              </div>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <Button className="bg-white uppercase text-gray-900 hover:bg-white/90 px-6 py-2 rounded-full font-semibold transition-all tracking-wider duration-200">
                Contact us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    navbarColor === "black"
                      ? "text-black hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  )}
                  aria-label="Toggle menu"
                >
                  <IoMdMenu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gray-200 border-l border-gray-700"
              >
                <div className="flex flex-col h-full">
                  <SheetHeader className="border-b border-gray-300 pb-4">
                    <SheetTitle className="text-lg font-semibold text-gray-900">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col pt-8 space-y-1 flex-1">
                    {navItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-800 hover:bg-gray-300/50 transition-colors duration-200 text-base font-medium py-3 px-4"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Language Switcher */}
                  <div className="px-4 py-4 border-t border-gray-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Language
                      </span>
                    </div>
                    <LanguageSwitcher isDesktop={false} />
                  </div>

                  {/* Mobile CTA Button */}
                  <div className="px-4 pb-8">
                    <Link href="/contact">
                      <Button className="bg-white uppercase text-gray-900 hover:bg-white/90 px-6 py-2 rounded-full font-semibold transition-all tracking-wider duration-200 w-full">
                        Contact us
                      </Button>
                    </Link>
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
