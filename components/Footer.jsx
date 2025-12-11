"use client";

import { MapPin } from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-[#363636] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start lg:w-auto">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4">
              <img
                src="/logo.webp"
                alt="Artique Agency Logo"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 flex-1">
            {/* HEAD OFFICE */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide">
                HEAD OFFICE
              </h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base leading-relaxed">
                  Unit 1104A, 11/F, Kai Tak Commercial Building, No. 317-319 Des
                  Voeux Road. Central District, Hong Kong.
                </p>
              </div>
            </div>

            {/* CONTACT */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide">
                CONTACT
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IoLogoWhatsapp className="w-5 h-5 flex-shrink-0" />
                  <a
                    href="https://wa.me/85256199075"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base hover:text-[#FFD800] transition-colors"
                  >
                    +852 5619 9075
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MdEmail className="w-5 h-5 flex-shrink-0" />
                  <a
                    href="mailto:project@artique-agency.com"
                    className="text-sm sm:text-base hover:text-[#FFD800] transition-colors break-all"
                  >
                    project@artique-agency.com
                  </a>
                </div>
              </div>
            </div>

            {/* FOLLOW US */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wide">
                FOLLOW US
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <AiFillInstagram className="w-5 h-5 flex-shrink-0" />
                  <a
                    href="https://instagram.com/artique_agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base hover:text-[#FFD800] transition-colors"
                  >
                    @artique_agency
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaLinkedin className="w-5 h-5 flex-shrink-0" />
                  <a
                    href="https://linkedin.com/company/artique-agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base hover:text-[#FFD800] transition-colors"
                  >
                    Artique Agency
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm sm:text-base">
            © Copyright Artique Agency 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
