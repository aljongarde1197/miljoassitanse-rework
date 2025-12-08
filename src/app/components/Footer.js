"use client";

import {
  EnvelopeIcon,
  PhoneIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { useLanguage } from "../../../LanguageContext"; // adjust path

// Map icon names to REAL icon components
const iconMap = {
  email: EnvelopeIcon,
  phone: PhoneIcon,
  mobile: DevicePhoneMobileIcon,
  location: MapPinIcon,
};

export default function Footer() {
  const { language, t } = useLanguage();
  const footerText = t.Footer[language];

  const [year, setYear] = useState(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-light text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/logo.png" className="w-12 h-12 rounded-md mb-4" />
          {/* <p className="uppercase font-semibold mb-2">{footerText.companyName}</p> */}
          <p className="uppercase font-semibold mb-2">Miljøassistanse</p>
          
          <p className="text-sm opacity-80 mb-2">{footerText.description}</p>
          <p className="text-sm opacity-80">{footerText.orgnr}</p>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="flex flex-col gap-3 text-center md:text-left md:border-l md:pl-8 border-white/20">
          <h3 className="font-semibold text-lg mb-2">{footerText.navigationTitle}</h3>
          {footerText.navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="opacity-90 hover:opacity-100">
              {link.label}
            </a>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-3 text-center md:text-left md:border-l md:pl-8 border-white/20">
          <h3 className="font-semibold text-lg mb-2">{footerText.contactTitle}</h3>

          {footerText.contacts.map((contact, idx) => {
            const IconComponent = iconMap[contact.icon];

            return (
              <div
                key={idx}
                className="flex items-center gap-2 justify-center md:justify-start"
              >
                <IconComponent className="w-5 h-5" />
                <span>{contact.value}</span>
              </div>
            );
          })}
        </div>
        
      </div>

      <div className="border-t border-white/20 py-6 text-center text-sm opacity-90">
        <p>
          {/* © {year ?? "..."} {footerText.companyName}. {footerText.rights} */}
          © {year ?? "..."} MILJØASSISTANSE. {footerText.rights}
        </p>
      </div>
    </footer>
  );
}
