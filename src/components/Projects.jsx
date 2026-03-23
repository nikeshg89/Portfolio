import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Eye, ExternalLink, Github, Code2, Link, Play, BarChart, BrainCircuit, LayoutDashboard } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import CyberCard from './CyberCard';

const filters = [
    { label: 'All', icon: null },
    { label: 'Data Analysis', icon: BarChart },
    { label: 'AI/Web', icon: BrainCircuit },
    { label: 'ML', icon: BrainCircuit },
    { label: 'Dashboards', icon: LayoutDashboard },
];

const CATEGORY_COLORS = {
    'Data Analysis': { glow: 'rgba(34,197,94,0.4)', base: 'rgba(34,197,94,0.1)', from: '#22c55e', to: '#38bdf8', badge: 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30' },
    'AI/Web': { glow: 'rgba(56,189,248,0.4)', base: 'rgba(56,189,248,0.1)', from: '#38bdf8', to: '#06b6d4', badge: 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30' },
    'AI': { glow: 'rgba(14,165,233,0.4)', base: 'rgba(14,165,233,0.1)', from: '#0ea5e9', to: '#06b6d4', badge: 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/30' },
    'Dashboards': { glow: 'rgba(6,182,212,0.4)', base: 'rgba(6,182,212,0.1)', from: '#06b6d4', to: '#0ea5e9', badge: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30' },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.3, duration: 0.6 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const ProjectCard = ({ project, onClick }) => {
    const colors = CATEGORY_COLORS[project.category] || CATEGORY_COLORS['AI'];
    const { theme } = useTheme();

    return (
        <motion.div layout variants={cardVariants} initial="hidden" animate="show" exit="exit" className="h-full">
            <CyberCard className="h-full" glowColor={colors.glow} colorFrom={colors.from} colorTo={colors.to}>

                        {/* Project Image with Zoom Hover */}
                        <div className="relative h-48 overflow-hidden bg-[#020617] pointer-events-auto rounded-t-[1.5rem]" onClick={() => { onClick(project); playClick?.(); }}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            {/* Gradient overlay on image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0f] via-white/50 dark:via-[#0a0a0f]/30 to-transparent transition-colors duration-500 pointer-events-none" />
                            
                            {/* Category Badge */}
                            <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-md ${colors.badge} shadow-[0_0_15px_${colors.glow}] pointer-events-none z-10`}>
                                {project.category}
                            </span>
                            
                            {/* View Preview Button overlay that appears on hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Eye size={16} /> View Details
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex flex-col flex-1 p-6 relative pointer-events-auto" onClick={() => { onClick(project); playClick?.(); }}>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 font-heading transition-colors duration-300">
                            {project.title}
                        </h3>

                        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3 flex-1 transition-colors duration-300">
                            {project.summary}
                        </p>

                        {/* Tech Badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map(t => (
                                <span key={t} className="flex items-center gap-1.5 text-[0.7rem] uppercase tracking-wider font-bold text-slate-700 dark:text-gray-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm dark:shadow-none transition-colors duration-300">
                                    <Code2 className="w-3 h-3 text-[#0ea5e9]" />
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action buttons (Absolute at bottom to avoid triggering modal when clicked) */}
                    <div className="px-6 pb-6 pt-2 flex gap-3 mt-auto relative pointer-events-auto transition-colors duration-500">
                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-gray-200 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9] hover:border-[#0ea5e9]/50 transition-all duration-300 shadow-sm dark:shadow-none"
                            >
                                <Github className="w-4 h-4" /> Code
                            </a>
                        )}
                        {project.links.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl text-white transition-all duration-300 overflow-hidden relative group/btn"
                                style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`, boxShadow: `0 5px 15px ${colors.glow}` }}
                            >
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                        {!project.links.github && !project.links.live && (
                            <span className="flex-1 flex justify-center items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 dark:text-gray-500 bg-black/5 dark:bg-white/5 cursor-not-allowed">
                                Coming Soon
                            </span>
                            )}
                        </div>
            </CyberCard>
        </motion.div>
);
};

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const { theme } = useTheme();

    const filteredProjects = portfolioData.projects.filter(p =>
        activeFilter === 'All' ? true : p.category === activeFilter
    );

    return (
        <section id="projects" className="relative py-32 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Background effects */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] transition-colors duration-500" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-[150px] mix-blend-screen" />
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#38bdf8]/50 dark:bg-white/50 rounded-full transition-colors duration-500"
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, filter: 'blur(1px)' }}
                        animate={{ opacity: [0.1, 0.8, 0.1], y: [0, -30, 0], scale: [1, 2, 1] }}
                        transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-black tracking-widest font-orbitron uppercase drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] mb-4">
                        <span className="bg-gradient-to-r from-[#0ea5e9] via-[#06b6d4] to-[#22c55e] bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </h2>
                    <div className="relative h-[2px] w-64 mx-auto bg-slate-300 dark:bg-white/10 overflow-hidden rounded-full transition-colors duration-500">
                        <motion.div
                            initial={{ left: '-100%' }}
                            whileInView={{ left: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent shadow-[0_0_15px_rgba(14,165,233,1)]"
                        />
                    </div>
                    <p className="mt-6 text-slate-600 dark:text-gray-400 text-lg font-heading font-light transition-colors duration-500">
                        A showcase of intelligent solutions and interactive experiences
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-14"
                >
                    {filters.map(({ label, icon: Icon }) => {
                        const isActive = activeFilter === label;
                        return (
                            <motion.button
                                key={label}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setActiveFilter(label); playClick?.(); }}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${isActive
                                        ? 'text-white border-[#0ea5e9]/50 shadow-[0_4px_15px_rgba(14,165,233,0.3)] dark:shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                                        : 'text-slate-600 dark:text-gray-400 border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:text-[#0ea5e9] dark:hover:text-white hover:border-[#0ea5e9]/30 hover:shadow-[0_4px_12px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] shadow-sm dark:shadow-none'
                                    }`}
                                style={isActive ? { background: 'linear-gradient(135deg, rgba(6,182,212,0.8), rgba(14,165,233,0.8))' } : {}}
                            >
                                {Icon && <Icon className="w-4 h-4" />}
                                {label}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ y: 60, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 60, opacity: 0, scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white/95 dark:bg-[#020617]/95 border border-slate-200 dark:border-white/10 backdrop-blur-2xl p-0 rounded-3xl max-w-2xl w-full relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto transition-colors duration-500"
                            style={{ boxShadow: theme === 'dark' ? `0 0 50px ${(CATEGORY_COLORS[selectedProject.category] || CATEGORY_COLORS['AI']).glow}` : `0 20px 50px ${(CATEGORY_COLORS[selectedProject.category] || CATEGORY_COLORS['AI']).glow.replace('0.4', '0.2')}` }}
                        >
                            {/* Modal image */}
                            <div className="relative h-64 overflow-hidden">
                                <img src={selectedProject.image} alt={selectedProject.title}
                                    className="w-full h-full object-cover opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#020617] via-white/80 dark:via-[#020617]/40 to-transparent transition-colors duration-500" />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white p-2 bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/70 rounded-full backdrop-blur-sm transition-all border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none hover:rotate-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8">
                                <span className={`text-xs font-bold tracking-widest uppercase mb-4 inline-block ${(CATEGORY_COLORS[selectedProject.category] || CATEGORY_COLORS['AI']).badge.split(' ').slice(1).join(' ')}`}>
                                    {selectedProject.category}
                                </span>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading transition-colors duration-500">{selectedProject.title}</h2>
                                <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-8 transition-colors duration-500 text-base">{selectedProject.details}</p>

                                <div className="mb-10">
                                    <h4 className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-3 transition-colors duration-500">Technology Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm dark:shadow-none transition-colors duration-500">
                                                <Code2 className="w-3.5 h-3.5 text-[#0ea5e9]" /> {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-wrap">
                                    {selectedProject.links.live && (
                                        <a href={selectedProject.links.live} target="_blank" rel="noreferrer"
                                            className="flex-1 flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all transform hover:scale-105"
                                            style={{ background: `linear-gradient(135deg, ${(CATEGORY_COLORS[selectedProject.category] || CATEGORY_COLORS['AI']).from}, ${(CATEGORY_COLORS[selectedProject.category] || CATEGORY_COLORS['AI']).to})`, boxShadow: `0 0 20px ${(CATEGORY_COLORS[selectedProject.category] || CATEGORY_COLORS['AI']).glow}` }}>
                                            <ExternalLink size={18} /> View Live App
                                        </a>
                                    )}
                                    {selectedProject.links.github && (
                                        <a href={selectedProject.links.github} target="_blank" rel="noreferrer"
                                            className="flex-1 flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-slate-700 dark:text-gray-200 border-2 border-slate-300 dark:border-white/15 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-[#0ea5e9] dark:hover:border-[#0ea5e9] shadow-sm dark:shadow-none transition-all duration-300 transform hover:scale-105 hover:text-[#0ea5e9] dark:hover:text-[#0ea5e9]">
                                            <Github size={18} /> Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
