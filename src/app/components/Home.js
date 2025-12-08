"use client";

import { useState, useEffect, useRef } from "react";
import { HomeIcon, ClipboardDocumentIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "../../../LanguageContext";

const backgroundImages = [
  "https://www.miljoassistanse.no/uploads/eFjHagGR/767x0_2560x0/k6ta9ks4fkem6ih5t__w1440__msi___jpg.webp",
  "https://www.miljoassistanse.no/uploads/Gpkgx5Dm/767x0_2560x0/fnedtzbxxcu8e25z8__w1440__msi___jpg.webp",
];

export default function Home() {
  const { language, t } = useLanguage();
  const homeText = t.Home?.[language];

  // If translations are not ready, don't render
  if (!homeText) return null;

  const cards = homeText.cards.map((c, i) => ({
    ...c,
    icon: [HomeIcon, ClipboardDocumentIcon, HandThumbUpIcon][i],
    color: "bg-primary/20 text-primary",
  }));

  const [mounted, setMounted] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setCurrentBg((prev) => (prev + 1) % backgroundImages.length), 5000);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    setShowTitle(true);
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(contentTimer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => (!prev.includes(index) ? [...prev, index] : prev));
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => cardRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Smooth zoom container */}
            <div
              className={`h-full w-full bg-cover bg-center transition-transform duration-[8000ms] ease-out ${
                index === currentBg ? "scale-110" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <img
            src="/logo.png"
            className={`w-28 h-28 rounded-md mb-2 transition-opacity duration-1000 ${
              showTitle ? "opacity-100" : "opacity-0"
            }`}
          />
          <h1
            className={`text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg transition-opacity duration-1000 uppercase tracking-wider ${
              showTitle ? "opacity-100" : "opacity-0"
            }`}
          >
            Miljøassistanse
          </h1>

          <div className={`transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-200 tracking-wider">{homeText.heroSubtitle}</p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <a
                href="#about"
                className="px-10 py-3 rounded-full border border-white/30 bg-primary/40 backdrop-blur-md text-white font-thin shadow-lg hover:bg-primary/50 hover:border-primary/50 hover:backdrop-blur-xs transition-all duration-300 tracking-wider"
              >
                {homeText.ctaStart}
              </a>
              <a
                href="#services"
                className="px-10 py-3 rounded-full border border-white/30 bg-white/20 backdrop-blur-md text-white font-thin shadow-lg hover:bg-white/20 hover:border-primary/50 hover:backdrop-blur-xs transition-all duration-300 tracking-wider"
              >
                {homeText.ctaServices}
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* Cards Section */}
      <div className="w-full bg-primary">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`flex flex-col items-start p-6 bg-white rounded-2xl shadow-lg transform transition-all duration-700 h-full ${
                  visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                } hover:scale-105`}
              >
                <div className={`p-4 rounded-full mb-4 inline-flex items-center justify-center ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm flex-grow">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
