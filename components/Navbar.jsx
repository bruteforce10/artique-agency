"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenu } from "@/components/ui/hamburger-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Our Services", link: "#projects" },
    { name: "Case Studies", link: "#contact" },
    { name: "About Us", link: "#about" },
    { name: "Blogs", link: "#blogs" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="relative w-full max-w-[1200px] mx-auto">
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
              <span className="text-white text-xl font-semibold">
                ARTIQUE AGENCY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center ">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
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
            <Button className="bg-white text-gray-900 hover:bg-white/90 px-6 py-2 rounded-full font-medium transition-all duration-200">
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
                      className="w-full bg-white text-gray-900 hover:bg-white/90 py-3 rounded-full font-medium transition-all duration-200"
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
