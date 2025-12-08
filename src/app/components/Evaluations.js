"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../../LanguageContext"; // make sure this path is correct
import { StarIcon } from "@heroicons/react/24/solid";

export default function Evaluations() {
  const { language, t } = useLanguage(); // get current language and translations
  const evaluationsText = t.Evaluations[language]; // get current language Evaluations translations
  const evaluations = evaluationsText.reviews; // array of reviews
  const header = evaluationsText.header;
  const subheader = evaluationsText.subheader;

  const cardsRef = useRef([]);
  const titleRef = useRef([]);
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [titlesVisible, setTitlesVisible] = useState([]);

  useEffect(() => {
    // Observer for cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!visibleIndexes.includes(index)) {
              setVisibleIndexes((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    // Observer for titles
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting && !titlesVisible.includes(index)) {
            setTitlesVisible((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    titleRef.current.forEach((el) => {
      if (el) titleObserver.observe(el);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
      titleRef.current.forEach((el) => {
        if (el) titleObserver.unobserve(el);
      });
    };
  }, [visibleIndexes, titlesVisible]);

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2
          ref={(el) => (titleRef.current[0] = el)}
          data-index={0}
          className={`text-sm md:text-2xl font-thin tracking-widest mb-2 uppercase text-left text-gray-600 transform transition-all duration-700 ${
            titlesVisible.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {header}
        </h2>
        <h2
          ref={(el) => (titleRef.current[1] = el)}
          data-index={1}
          className={`text-3xl md:text-4xl font-bold text-left mb-16 transform transition-all duration-700 delay-150 ${
            titlesVisible.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {subheader}
        </h2>

        {/* Grid of evaluations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {evaluations.map((evalItem, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`bg-white p-8 rounded-3xl shadow-xl flex flex-col h-full transform transition-all duration-700 hover:scale-105 hover:shadow-2xl
                ${visibleIndexes.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
              `}
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${i < 5 ? "text-yellow-400" : "text-gray-300"} mr-1`}
                    />
                  ))}
              </div>

              {/* Review text */}
              <p className="text-gray-700 text-sm flex-grow leading-relaxed">{evalItem.text}</p>

              {/* Author */}
              <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-end gap-2">
                <span className="text-gray-900 font-semibold italic">{evalItem.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
