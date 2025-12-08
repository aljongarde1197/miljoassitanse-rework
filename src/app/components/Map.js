"use client";

import { useRef, useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "../../../LanguageContext";

export default function Map() {
  const { language, t } = useLanguage(); // get current language & translations
  const mapText = t.Map[language];

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto px-4 py-20">
      {/* Animated heading */}
      <h2
        className={`text-3xl font-bold text-center mb-6 transform transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        {mapText.heading}
      </h2>

      {/* Animated description */}
      <p
        className={`text-gray-600 text-center mb-10 leading-relaxed transform transition-all duration-700 delay-150 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        {mapText.description}
      </p>

      {/* Map container */}
      <div
        className={`relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 delay-300 hover:scale-105 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none rounded-3xl" />

        {/* Floating info card */}
        <div
          className={`absolute top-6 left-6 bg-white rounded-xl p-4 shadow-lg z-20 max-w-xs transform transition-all duration-700 delay-450 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary uppercase" /> Miljøassistanse
          </h3>
          <p className="text-gray-600 text-sm mt-1">{mapText.addressLine}</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Miljøassistanse,+Herreveien+57,+3962+Stathelle"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-primary font-semibold text-sm hover:underline"
          >
            {mapText.openMap}
          </a>
        </div>

        {/* Google Map iframe */}
        <iframe
          title="Miljøassistanse Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2003.2791582238265!2d9.658654!3d59.204328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46411a47a54ef877%3A0x7b1c8d0c0559b1e1!2sMilj%C3%B8assistanse!5e0!3m2!1sen!2sno!4v1702345678901!5m2!1sen!2sno&zoom=15"
          width="100%"
          height="100%"
          className="border-0 w-full h-full rounded-3xl"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
