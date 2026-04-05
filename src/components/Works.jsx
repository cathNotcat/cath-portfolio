import React from 'react'
import { worksData } from '../data/works'
import { FaGithub, FaRocket } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'

const Works = () => {
  return (
    <section id="works" className="min-h-screen py-24 px-6 text-white">   
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            {worksData.heading}
        </h2>
        <p className="text-gray-300 text-sm md:text-base text-center mb-10 max-w-md mx-auto">
            {worksData.subtitle}
        </p>
        <div className="max-w-xl md:max-w-4xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {worksData.projects.map((project) => (
                    // Cards
                    <div key={project.id} className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 ">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block aspect-video overflow-hidden rounded-lg mb-4 bg-white/5">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                            />
                        </a>
                        <h3 className="font-semibold text-lg mb-2">
                            {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((techItem, i) => (
                                <span 
                                    key={i} 
                                    className="text-xs px-2 py-1 bg-white/10 rounded-md border border-white/20"
                                >
                                    {techItem}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <a 
                                href={project.liveUrl} 
                                className="px-4 py-2 rounded-md hover:bg-white/20 transition"
                            >
                                <FaArrowUpRightFromSquare className="w-4 h-4" />
                            </a>
                            {project.githubUrl && (
                            <a href={project.githubUrl}
                            className="px-4 py-2 rounded-md hover:bg-white/20 transition">
                                <FaGithub />
                            </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </section>
  )
}

export default Works