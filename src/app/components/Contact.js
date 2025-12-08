"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../../LanguageContext"; // adjust path if needed
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const { language, t } = useLanguage(); // get language and translations
  const contactText = t.Contact[language]; // current language texts

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    request: "",
    agree: false,
  });

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert(contactText.agreeAlert);
      return;
    }
    alert(contactText.successAlert);
    setFormData({
      name: "",
      email: "",
      phone: "",
      request: "",
      agree: false,
    });
  };

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto py-20 px-4">
      {/* Headings */}
      <h2
        className={`text-sm md:text-2xl font-thin tracking-widest uppercase text-gray-600 transition-all duration-700 mb-2
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {contactText.header}
      </h2>

      <h2
        className={`text-3xl md:text-4xl font-bold mb-12 transition-all duration-700 delay-200
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {contactText.subheader}
      </h2>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT CARD: Map + Contacts */}
        <div
          className={`lg:w-1/2 bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6 transition-all duration-700 delay-300
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Map */}
          <div className="h-96 rounded-xl overflow-hidden shadow-inner">
            <iframe
              src={contactText.mapSrc}
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0"
            ></iframe>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-4">
            {contactText.contacts.map((person, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-700
                ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${400 + idx * 150}ms` }}
              >
                <EnvelopeIcon className="w-6 h-6 text-primary mr-4" />
                <div>
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-gray-600">{person.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT CARD: Contact Form */}
        <div
          className={`lg:w-1/2 bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 transition-all duration-700 delay-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={contactText.form.name}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={contactText.form.email}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={contactText.form.phone}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            name="request"
            value={formData.request}
            onChange={handleChange}
            placeholder={contactText.form.request}
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none flex-grow"
          ></textarea>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="w-5 h-5 text-primary"
            />
            <span className="text-gray-700 text-sm">{contactText.form.agree}</span>
          </label>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition"
          >
            {contactText.form.submit}
          </button>
        </div>
      </div>
    </div>
  );
}
