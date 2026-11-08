import React, { useEffect, useState } from 'react'
import { FaGithub, FaRocket } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { supabase } from '../lib/supabase'

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [heading, setHeading] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            const [projectResult, headingResult] = await Promise.all([
                supabase.from("projects")
                    .select("*")
                    .order("sort_order", { ascending: true }),

                supabase.from("site_content")
                    .select("key, value")
                    .in("key", ["project_heading", "project_subtitle"]),
            ]);

            if (projectResult.error) {
                console.error("Error fetching project:", projectResult.error);
            } else {
                setProjects(projectResult.data);
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
        <section id="works" className="min-h-screen py-24 px-6 theme-text">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                {heading.project_heading}
            </h2>
            <p className="theme-muted text-sm md:text-base text-center mb-10 max-w-md mx-auto">
                {heading.project_subtitle}
            </p>
            <div className="max-w-xl md:max-w-4xl mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        // Cards
                        <div key={project.id} className="theme-surface backdrop-blur-md p-5 rounded-xl border flex flex-col h-full">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="block aspect-video overflow-hidden rounded-lg mb-4 theme-chip">
                                <img
                                    src={
                                        project.image_url
                                            ? supabase.storage
                                                .from("portfolio-images")
                                                .getPublicUrl(project.image_url).data.publicUrl
                                            : "/placeholder.png"
                                    }
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
                                />
                            </a>
                            <h3 className="font-semibold text-lg mb-2">
                                {project.title}
                            </h3>
                            <p className="text-sm theme-muted mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((techItem, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-1 theme-chip rounded-md border"
                                    >
                                        {techItem}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto flex items-center gap-2">
                                <a
                                    href={project.live_url}
                                    className="px-4 py-2 rounded-md theme-surface-hover transition"
                                >
                                    <FaArrowUpRightFromSquare className="w-4 h-4" />
                                </a>
                                {project.github_url && (
                                    <a href={project.github_url}
                                        className="px-4 py-2 rounded-md theme-surface-hover transition">
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

export default Projects