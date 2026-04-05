import React from 'react'
import { educationData } from '../data/education'

const Education = () => {
  return (
    <section id="education" className="min-h-screen py-24 px-6 text-white">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        {educationData.heading}
      </h2>
      <p className="text-gray-300 text-sm md:text-base text-center mb-10 max-w-md mx-auto">
        {educationData.subtitle}
      </p>

      <div className="max-w-xl md:max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-white/20"></div>

        {educationData.educations.map((item, index) => (
          <div key={index} className="relative pl-12 mb-10">
            
            {/* Bullet */}
            {/* <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30"></div> */}
            <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>

            {/* Card */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20">
            {/* <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 hover:bg-white/20 transition"> */}
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="text-sm text-gray-400">
                {item.educator} · {item.duration}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
export default Education