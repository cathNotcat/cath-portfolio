import React from 'react'
import { heroData } from '../data/hero'
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa"

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center text-center text-white">
        <div className="max-w-[75%]">
            <h2 className="text-xl md:text-2xl mb-2">
              {heroData.greetings}
            </h2>

            <h1 className="text-3xl md:text-6xl font-bold">
              {heroData.name.first}{" "}
              <span className="text-purple-700">
                {heroData.name.last}
              </span>
            </h1>

            <h3 className="text-md md:text-lg mt-4 text-gray-300">
              {heroData.title}
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