"use client";

import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  PaintBrushIcon,
  HomeIcon,
  RectangleStackIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "../../../LanguageContext";
import { translations } from "../../../translations.js";

export default function Navbar() {
  const { language } = useLanguage();
  const lang = language?.toLowerCase() || "no"; // fallback
  const navLabels = translations.Navbar[lang];

  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sections = [
    { id: "home", label: navLabels.home },
    { id: "about", label: navLabels.about },
    { id: "services", label: navLabels.services },
    { id: "evaluations", label: navLabels.evaluations },
  ];

  const servicesDropdown = [
    { id: "interior-paint", label: navLabels.servicesList.interiorPaint, icon: PaintBrushIcon },
    { id: "exterior-paint", label: navLabels.servicesList.exteriorPaint, icon: HomeIcon },
    { id: "drywall-installation", label: navLabels.servicesList.drywall, icon: RectangleStackIcon },
    { id: "sparkling", label: navLabels.servicesList.sparkling, icon: SparklesIcon },
    { id: "carpentry", label: navLabels.servicesList.carpentry, icon: WrenchScrewdriverIcon },
    { id: "plaster-profiles", label: navLabels.servicesList.plaster, icon: CubeIcon },
  ];

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = "";
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop - 150;
          const bottom = top + el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            current = sec.id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <nav
      className={`fixed top-9 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo + title */}
        <a href="/#home" className="flex items-center space-x-3">
          <img src="/logo.png" className="w-12 h-12 rounded-md" />
          <h1
            className={`text-xl font-bold transition-colors uppercase ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {/* {navLabels.companyName} */}
            Miljøassistanse
          </h1>
        </a>

        {/* Navigation links + Contact button */}
        <div className="flex items-center space-x-6 text-sm">
          {/* Nav links */}
          <div className="flex items-center space-x-6 hidden md:flex">
            {sections.map((sec) => {
              const isActive = active === sec.id;

              if (sec.id === "services") {
                return (
                  <div key={sec.id} className="relative group">
                    {/* Services button */}
                    <button
                      className={`flex items-center gap-1 capitalize transition-colors cursor-pointer duration-300 ${
                        isActive
                          ? scrolled
                            ? "text-primary"
                            : "text-white"
                          : scrolled
                          ? "text-primary"
                          : "text-white"
                      }`}
                    >
                      {sec.label}{" "}
                      <ChevronDownIcon
                        className="w-4 h-4 transform transition-transform duration-300 -rotate-90 group-hover:rotate-0"
                      />
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      ></span>
                    </button>

                    {/* Dropdown menu */}
                    <div
                      className="absolute top-full left-0 -mt-0.5 w-72 bg-white shadow-lg rounded-lg z-50
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-opacity duration-300 ease-in-out"
                    >
                      {servicesDropdown.map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-gray-100 rounded-lg transition-colors tracking-wider"
                          >
                            <Icon className="w-5 h-5" />
                            {item.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`relative capitalize transition-colors duration-300 tracking-wider ${
                    isActive
                      ? scrolled
                        ? "text-primary"
                        : "text-white"
                      : scrolled
                      ? "text-primary"
                      : "text-white"
                  }`}
                >
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 tracking-wider ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  ></span>
                  {sec.label}
                </a>
              );
            })}
          </div>

          {/* Contact Us button */}
          <a
            href="#contact"
            className={`flex items-center px-6 py-2 rounded-full border border-white/30 backdrop-blur-md
              text-white font-thin shadow-lg tracking-wider
              transition-all duration-300
              ${scrolled ? "bg-primary border-primary" : "bg-white/20"}
              hover:bg-primary hover:border-primary hover:text-white`}
          >
            {lang === "no" ? "KONTAKT" : "CONTACT"}
          </a>
        </div>
      </div>
    </nav>
  );
}
