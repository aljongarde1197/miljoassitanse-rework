"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "../../../LanguageContext";

export default function About() {
  const { language, t } = useLanguage(); // useLanguage returns translations and current language
  const aboutText = t.About[language]; // get current language About translations

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imagesRef = useRef([]);

  const [headingVisible, setHeadingVisible] = useState(false);
  const [paragraphVisible, setParagraphVisible] = useState(false);
  const [imagesVisible, setImagesVisible] = useState([]);

  useEffect(() => {
    // Heading observer
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeadingVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headingRef.current) headingObserver.observe(headingRef.current);

    // Paragraph observer
    const paragraphObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setParagraphVisible(true);
      },
      { threshold: 0.2 }
    );
    if (paragraphRef.current) paragraphObserver.observe(paragraphRef.current);

    // Images observer
    imagesRef.current = imagesRef.current.slice(0, 2);
    const imagesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting && !imagesVisible.includes(index)) {
            setImagesVisible((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );
    imagesRef.current.forEach((el) => {
      if (el) imagesObserver.observe(el);
    });

    return () => {
      if (headingRef.current) headingObserver.unobserve(headingRef.current);
      if (paragraphRef.current) paragraphObserver.unobserve(paragraphRef.current);
      imagesRef.current.forEach((el) => {
        if (el) imagesObserver.unobserve(el);
      });
    };
  }, [imagesVisible]);

  return (
    <div className="bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Animated heading */}
        <h2
          ref={headingRef}
          className={`text-lg font-thin mb-1 text-center transform transition-all duration-700 ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {aboutText.heading}
        </h2>
        <h2
          className={`text-3xl font-bold mb-6 text-center transform transition-all duration-700 uppercase ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {/* {aboutText.companyName} */}
          Miljøassistanse
        </h2>

        {/* Animated paragraph */}
        <p
          ref={paragraphRef}
          className={`text-gray-600 text-lg leading-relaxed mb-10 text-justify transform transition-all duration-700 ${
            paragraphVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {aboutText.description}
        </p>

        {/* Animated images row */}
        <div className="flex items-center gap-4">
          {/* Left image */}
          <div
            ref={(el) => (imagesRef.current[0] = el)}
            data-index={0}
            className={`flex-none transform transition-all duration-700 ${
              imagesVisible.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <a href="https://flexgips.no/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://www.miljoassistanse.no/uploads/MaUiW5P2/300x0_300x0/flexgips-1__msi___png.webp"
                alt={aboutText.flexgipsAlt}
                className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          <div className="flex-auto"></div>

          {/* Right image */}
          <div
            ref={(el) => (imagesRef.current[1] = el)}
            data-index={1}
            className={`flex-none transform transition-all duration-700 ${
              imagesVisible.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <a href="https://contexexperts.eu/en/about-us/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://www.miljoassistanse.no/uploads/ypi6lbZz/168x0_168x0/contex-experts-logo__msi___png.webp"
                alt={aboutText.contexAlt}
                className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
