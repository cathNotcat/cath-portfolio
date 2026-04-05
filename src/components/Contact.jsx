import React from 'react'
import { contactData } from '../data/contact'
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'

const iconMap = {
  email: <FaEnvelope className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />,
  github: <FaGithub className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
}

const hoverMap = {
  email: "hover:border-red-400/50 hover:text-red-400",
  linkedin: "hover:border-blue-400/50 hover:text-blue-400",
  github: "hover:border-white/50 hover:text-white",
  instagram: "hover:border-pink-400/50 hover:text-pink-400",
}

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen py-24 px-6 text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        {contactData.heading}
      </h2>
      <p className="text-gray-300 text-sm md:text-base text-center mb-12 max-w-md">
        {contactData.subtitle}
      </p>

      <div className="w-full max-w-xl md:max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactData.socials.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.icon !== 'email' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={`flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 text-white/70 transition-all duration-300 ${hoverMap[item.icon]}`}
          >
            <div className="p-3 bg-white/10 rounded-lg">
              {iconMap[item.icon]}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
