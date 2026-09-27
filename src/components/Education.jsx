import React, { useState, useEffect } from 'react'
import { supabase } from "../lib/supabase";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [heading, setHeading] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const [educationResult, headingResult] = await Promise.all([
        supabase.from("education")
          .select("*")
          .order("sort_order", { ascending: true }),

        supabase.from("site_content")
          .select("key, value")
          .in("key", ["education_heading", "education_subtitle"]),
      ]);

      if (educationResult.error) {
        console.error("Error fetching education:", educationResult.error);
      } else {
        setEducation(educationResult.data);
      }

      if (headingResult.error) {
        console.error("Error fetching heading:", headingResult.error);
      } else {
        const headingData = {};

        headingResult.data.forEach((item) => {
          headingData[item.key] = item.value;
        });

        setHeading(headingData);
      }
      setLoading(false);
    }
    fetchContent();
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <section id="education" className="min-h-screen py-24 px-6 text-white">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        {heading.education_heading}
      </h2>
      <p className="text-gray-300 text-sm md:text-base text-center mb-10 max-w-md mx-auto">
        {heading.education_subtitle}
      </p>

      <div className="max-w-xl md:max-w-4xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-[2px] bg-white/20"></div>

        {education.map((item, index) => (
          <div key={index} className="relative pl-12 mb-10">

            {/* Bullet */}
            <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>

            {/* Card */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20">
              <h3 className="font-semibold">{item.degree}</h3>
              <p className="text-sm text-gray-400">
                {item.institution} · {item.duration}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
export default Education