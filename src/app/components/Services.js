"use client";

import { useRef, useEffect, useState } from "react";
import {
  PaintBrushIcon,
  HomeIcon,
  RectangleStackIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "../../../LanguageContext";
import { ServicesTranslations } from "../../../translations.js";

const iconsMap = {
  "Innvendig maling": PaintBrushIcon,
  "Utvendig maling": HomeIcon,
  "Montering av gips": RectangleStackIcon,
  "Sparkling": SparklesIcon,
  "Diverse snekkerarbeid": WrenchScrewdriverIcon,
  "Salg av gipshjørner og profiler": CubeIcon,

  "Interior Painting": PaintBrushIcon,
  "Exterior Painting": HomeIcon,
  "Drywall Installation": RectangleStackIcon,
  "Plastering": SparklesIcon,
  "Various Carpentry Work": WrenchScrewdriverIcon,
  "Sale of Plaster Corners and Profiles": CubeIcon,
};

// Map service titles to navbar anchor IDs
const serviceIdMap = {
  "Innvendig maling": "interior-paint",
  "Utvendig maling": "exterior-paint",
  "Montering av gips": "drywall-installation",
  "Sparkling": "sparkling",
  "Diverse snekkerarbeid": "carpentry",
  "Salg av gipshjørner og profiler": "plaster-profiles",

  "Interior Painting": "interior-paint",
  "Exterior Painting": "exterior-paint",
  "Drywall Installation": "drywall-installation",
  "Plastering": "sparkling",
  "Various Carpentry Work": "carpentry",
  "Sale of Plaster Corners and Profiles": "plaster-profiles",
};

export default function Services() {
  const { language } = useLanguage();
  const lang = language?.toLowerCase() || "no";
  const data = ServicesTranslations[lang];

  // ⭐ Prevent rendering until translations are loaded
  if (!data || !data.list) return null;

  const services = data.list;

  const headingRef = useRef(null);
  const servicesRefs = useRef([]);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [animatedServices, setAnimatedServices] = useState([]);

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true);
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) headingObserver.observe(headingRef.current);

    servicesRefs.current = servicesRefs.current.slice(0, services.length);

    const serviceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting && !animatedServices.includes(index)) {
            setAnimatedServices((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    servicesRefs.current.forEach((ref) => {
      if (ref) serviceObserver.observe(ref);
    });

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      servicesRefs.current.forEach((ref) => {
        if (ref) serviceObserver.unobserve(ref);
      });
    };
  }, [animatedServices, services.length]);

  return (
    <div id="services" className="max-w-7xl mx-auto py-20 px-4">
      {/* Section heading small */}
      <h2
        className={`text-sm md:text-lg font-thin text-left tracking-wider mb-2 transform transition-all duration-700 ${
          headingVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        {data.headingSmall}
      </h2>

      {/* Section heading large */}
      <h2
        ref={headingRef}
        className={`text-3xl font-bold mb-12 text-left transform transition-all duration-700 ${
          headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        {data.headingLarge}
      </h2>

      {/* Services */}
      <div className="flex flex-col gap-16">
        {services.map((s, index) => {
          const Icon = iconsMap[s.title];
          const isAnimated = animatedServices.includes(index);

          return (
            <div
              id={serviceIdMap[s.title]} // needed for navbar scroll
              key={s.title}
              ref={(el) => (servicesRefs.current[index] = el)}
              data-index={index}
              className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 transform ${
                isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              } ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2">
                <img
                  src={s.img}
                  alt={s.title}
                  className="rounded-3xl shadow w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="md:w-1/2 flex flex-col items-start gap-4">
                <div className="mb-4 p-3 rounded-2xl inline-flex items-center justify-center bg-gray-200">
                  {Icon && <Icon className="w-8 h-8 text-primary" />}
                </div>

                <h3 className="text-2xl font-semibold mb-6">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
