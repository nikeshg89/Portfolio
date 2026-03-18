import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ChevronRight } from 'lucide-react';
import Section from './Section';
import TiltCard from './TiltCard';
import { portfolioData } from '../data/portfolioData';
import { playClick, playSuccess } from '../utils/sounds';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const filters = ['All', 'Data Analysis', 'AI/Web', 'Dashboards'];

    const filteredProjects = portfolioData.projects.filter(p =>
        filter === 'All' ? true : p.category === filter
    );

    return (
        <Section id="projects" title="Featured Projects" subtitle="A collection of my best work in AI, Data, and Web Dev">

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => { setFilter(f); playClick(); }}
                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                            filter === f
                                ? 'text-white shadow-[0_0_20px_rgba(129,140,248,0.5)]'
                                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                        style={filter === f ? { background: 'linear-gradient(135deg,#818cf8,#a78bfa)' } : {}}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <TiltCard
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={project.id}
                            className="glass card-glow neon-border rounded-2xl p-6 md:p-8 flex flex-col h-full cursor-pointer group transition-all duration-500"
                            onClick={() => { setSelectedProject(project); playSuccess(); }}
                        >
                            <div className="flex flex-col h-full">
                                {/* category badge */}
                                <span className="self-start text-xs font-bold px-3 py-1 rounded-full mb-4 border"
                                    style={{
                                        background: 'rgba(129,140,248,0.1)',
                                        borderColor: 'rgba(129,140,248,0.25)',
                                        color: '#818cf8',
                                    }}>
                                    {project.category}
                                </span>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors line-clamp-2 font-heading">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed flex-1">
                                    {project.summary}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.map(t => (
                                        <span key={t}
                                            className="text-xs text-gray-500 bg-black/30 px-2.5 py-1 rounded-lg border border-white/8">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto w-full flex justify-end items-center border-t border-white/10 pt-4">
                                    <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Details <ChevronRight size={15} />
                                    </span>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ y: 60, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 60, opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="neon-border glass p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
                            >
                                <X size={22} />
                            </button>

                            <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{selectedProject.category}</span>
                            <h2 className="text-3xl font-bold text-white mb-2 font-heading">{selectedProject.title}</h2>
                            <div className="text-gray-500 text-sm mb-6">{selectedProject.date}</div>

                            <p className="text-gray-300 leading-relaxed mb-8">{selectedProject.details}</p>

                            <div className="mb-8">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="px-3 py-1.5 rounded-lg text-sm text-gray-300"
                                            style={{ background: 'rgba(129,140,248,0.08)', border: '1px solid rgba(129,140,248,0.2)' }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {selectedProject.links.live && (
                                    <a href={selectedProject.links.live} target="_blank" rel="noreferrer"
                                        className="btn-glow text-white text-sm flex items-center gap-2">
                                        <ExternalLink size={16} />
                                        {selectedProject.links.liveLabel || 'View Live'}
                                    </a>
                                )}
                                {selectedProject.links.github && (
                                    <a href={selectedProject.links.github} target="_blank" rel="noreferrer"
                                        className="btn-outline-glow text-sm flex items-center gap-2">
                                        <Github size={16} /> GitHub Repo
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Projects;
