"use client";

import { useEffect, useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../../../LanguageContext";

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, switchLanguage, translations } = useLanguage();

  // Safely access translations
  const contact = translations?.[language]?.Contact || {};
  const footer = translations?.[language]?.Footer || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconColor = "text-white";

  return (
    <div
      className={`w-full transition-all duration-300 fixed top-0 z-50 ${
        scrolled ? "bg-primary text-white shadow-lg" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className={`h-4 w-4 ${iconColor}`} />
            <span>{contact.email || "post@miljoassistanse.no"}</span>
          </div>

          <div className="flex items-center space-x-2">
            <PhoneIcon className={`h-4 w-4 ${iconColor}`} />
            <span>{contact.phone || "35 91 40 60 | 982 05 542"}</span>
          </div>

          <div className="flex items-center space-x-2">
            <GlobeAltIcon className={`h-4 w-4 ${iconColor}`} />
            <span>{footer.orgNumber || "Orgnr 990 881 979 MVA"}</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 font-medium">
            <button
              onClick={() => switchLanguage("no")}
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                language === "no"
                  ? "bg-white text-primary font-bold"
                  : "text-white hover:underline"
              }`}
            >
              <img src="/no-flag.png" alt="Norwegian" className="w-5 h-3 mr-1" />
              NO
            </button>

            <span>|</span>

            <button
              onClick={() => switchLanguage("en")}
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                language === "en"
                  ? "bg-white text-primary font-bold"
                  : "text-white hover:underline"
              }`}
            >
              <img src="/en-flag.png" alt="English" className="w-5 h-3 mr-1" />
              EN
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <MapPinIcon className={`h-4 w-4 ${iconColor}`} />
            <span>{contact.address || "Herreveien 57, 3962 Stathelle"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
