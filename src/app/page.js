"use client";

import { useState, useEffect } from "react";
import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import Map from "./components/Map";
import Contact from "./components/Contact";
import Evaluations from "./components/Evaluations";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      if (!homeSection) return;
      const homeBottom = homeSection.getBoundingClientRect().bottom;
      setShowArrow(homeBottom < 0); // show arrow once we scroll past home
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="map"><Map /></section>
      <section id="services" className="bg-gray-100"><Services /></section>
      <section id="evaluations"><Evaluations /></section>
      <section id="contact" className="bg-gray-100"><Contact /></section>
{/* Scroll-to-Top Arrow */}
<button
  onClick={scrollToTop}
  className={`
    fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg z-50
    transform transition-all duration-500
    ${showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
  `}
  aria-label="Scroll to top"
>
  <ChevronUpIcon className="w-6 h-6" />
</button>


    </>
  );
}
