import React, { useState } from 'react'
import { experienceData } from '../data/experience'
import { div, li } from 'framer-motion/client'
import { FiChevronDown } from "react-icons/fi";

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    return (
        <section id="experience" className="min-h-screen py-24 px-6 text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-10 text-center">
                {experienceData.heading}
            </h2>

            <div className="max-w-xl md:max-w-4xl mx-auto relative">
                <div className="absolute left-4 top-0 h-full w-[2px] bg-white/20"></div>

                {experienceData.experiences.map((item, index) => {
                    const isOpen = activeIndex === index;
                    return (
                        <div key={index} className="relative pl-12 mb-10">
                            {/* Bullet */}
                            <div 
                                className={`
                                    absolute left-0 top-5 w-8 h-8 rounded-full backdrop-blur-md border transition
                                    ${isOpen 
                                    ? "bg-blue-500/30 border-blue-400 shadow-[0_0_25px_rgba(78,153,207,0.6)]" 
                                    : "bg-white/20 border-white/30"}
                                `}></div>

                            {/* Card */}
                            <div 
                            onClick={() => setActiveIndex(isOpen ? null : index)}
                            className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 hover:bg-white/20 transition cursor-pointer">
                                <p className=" text-[12px] text-gray-400">
                                    {item.period}
                                </p>
                                <h3 className="font-semibold">
                                    {item.role}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {item.company} 
                                </p>
                                

                                {/* EXPANDABLE CONTENT */}
                                <div
                                    className={`grid transition-all duration-300 ${
                                        isOpen ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                    >
                                    <div className="overflow-hidden">
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {item.description.short}
                                        </p>
                                        <ul className="mt-3 space-y-2">
                                        {item.description.long?.map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                            
                                            {/* custom bullet */}
                                            <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                                            
                                            {desc}
                                            </li>
                                        ))}
                                        </ul>

                                        <div className="flex gap-2 mt-3 flex-wrap">
                                            {item.tech?.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 bg-white/10 rounded-md border border-white/20"
                                            >
                                                {tech}
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Hint */}
                                <FiChevronDown
                                    className={`ml-auto transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                    />
                            </div>
                        </div>
                    )
                })}

            </div>

        </section>
  )
}

export default Experience