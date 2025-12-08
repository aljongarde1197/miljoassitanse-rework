"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function QualityCraftsmanship() {
  const slides = [
    "/images/project1.jpg",
    "/images/project2.jpg",
    "/images/project3.jpg",
    "/images/project4.jpg",
  ];

  return (
    <section id="quality" className="bg-gray-50 py-20 px-4">
      {/* Text */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Quality Craftsmanship for Every Project
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Painting • Gypsum Installation • Carpentry • Prefabricated Gypsum Systems (FlexGips)
        </p>
        <a
          href="#contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Project ${idx + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
