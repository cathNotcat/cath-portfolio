import React, { useState, useEffect } from 'react'
// import { heroData } from '../data/hero'
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa"
import { supabase } from '../lib/supabase'

const Hero = () => {
  const [hero, setHero] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value")
        .like("key", "hero_%")

      if (error) {
        console.error("Error fetching hero:", error);
        return;
      }
      const content = {};
      data.forEach((item) => {
        content[item.key] = item.value;
      });

      setHero(content);
      setLoading(false);
    }
    fetchHero();

  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <section id="about" className="min-h-screen flex items-center justify-center text-center text-white">
      <div className="max-w-[75%]">
        <h2 className="text-xl md:text-2xl mb-2">
          {hero.hero_greeting}
        </h2>

        <h1 className="text-3xl md:text-6xl font-bold">
          {hero.hero_first_name}{" "}
          <span className="text-purple-700">
            {hero.hero_last_name}
          </span>
        </h1>

        <h3 className="text-md md:text-lg mt-4 text-gray-300">
          {hero.hero_title}
        </h3>

        <div className="flex gap-6 justify-center mt-4">
          <a href="https://instagram.com/catherinerosalind" target="_blank">
            <FaInstagram className="w-6 h-6 md:w-8 md:h-8  text-white/50 hover:text-pink-500 text-3xl transition" />
          </a>

          <a href="https://linkedin.com/in/catherinerosalind" target="_blank">
            <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 text-white/50 hover:text-blue-500 text-3xl transition" />
          </a>

          <a href="mailto:your@email.com">
            <FaEnvelope className="w-6 h-6 md:w-8 md:h-8 text-white/50 hover:text-red-400 text-3xl transition" />
          </a>

          <a href="https://github.com/cathNotcat" target="_blank">
            <FaGithub className="w-6 h-6 md:w-8 md:h-8 text-white/50 hover:text-white text-3xl transition" />
          </a>
        </div>

      </div>
    </section>
  )
}

export default Hero