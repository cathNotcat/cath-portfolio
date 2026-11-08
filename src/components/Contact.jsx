import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const iconMap = {
  email: <FaEnvelope className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />,
  github: <FaGithub className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
};

const hoverMap = {
  email: "hover:border-red-400/50 hover:text-red-400",
  linkedin: "hover:border-blue-400/50 hover:text-blue-400",
  github: "social-link-github",
  instagram: "hover:border-pink-400/50 hover:text-pink-400",
};

const Contact = () => {
  const [contact, setContact] = useState([]);
  const [heading, setHeading] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const [contactResult, headingResult] = await Promise.all([
        supabase.from("social_links")
          .select("*")
          .order("sort_order", { ascending: true }),

        supabase.from("site_content")
          .select("key, value")
          .in("key", ["contact_heading", "contact_subtitle"]),
      ]);

      if (contactResult.error) {
        console.error("Error fetching contact:", contactResult.error);
      } else {
        setContact(contactResult.data);
      }

      if (headingResult.error) {
        console.error("Error fetching heading:", headingResult.error);
      } else {
        const headingData = {};

        headingResult.data.forEach((item) => {
          headingData[item.key] = item.value;
        }, []);

        setHeading(headingData);
      }
      setLoading(false);
    }
    fetchContent();
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center theme-text">Loading...</div>
  }

  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6 theme-text flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        {heading.contact_heading}
      </h2>
      <p className="theme-muted text-sm md:text-base text-center mb-12 max-w-md">
        {heading.contact_subtitle}
      </p>

      <div className="w-full max-w-xl md:max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contact.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.icon_key !== "email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`theme-surface theme-link-card flex items-center gap-4 backdrop-blur-md p-5 rounded-xl border transition-all duration-300 ${hoverMap[item.icon_key] || ""}`}
          >
            <div className="p-3 theme-chip rounded-lg">
              {iconMap[item.icon_key]}
            </div>
            <div>
              <p className="text-xs theme-subtle mb-0.5">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
