import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
    Calendar, Award, BookOpen, ExternalLink,
    Code2, BrainCircuit, BarChart, GraduationCap,
    Building2, Star, X, ZoomIn, Heart, Shield, Trophy
} from 'lucide-react';
import Section from './Section';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import CyberCard from './CyberCard';

const ICON_MAP = { Code2, BrainCircuit, BarChart };

/* ─────────────── Premium Standalone Training Card ─────────────── */
const TrainingModernDisplay = ({ items }) => {
    const { theme } = useTheme();

    return (
        <div className="relative max-w-4xl mx-auto flex flex-col gap-16">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
                <div className="w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[150px]" />
                <div className="absolute w-[300px] h-[300px] bg-[#a855f7]/15 rounded-full blur-[100px] translate-x-32" />
            </div>

            {items.map((item, idx) => {
                const Icon = ICON_MAP[item.icon] || Code2;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                        className="relative w-full z-10"
                    >
                        <CyberCard glowColor={item.glow} colorFrom={item.color.split(' ')[1]?.replace('from-', '') || '#0ea5e9'} className="group w-full">
                            <div className="relative w-full p-8 md:p-14 transition-all duration-500 overflow-hidden border-none pointer-events-auto z-10 flex flex-col items-center text-center h-full bg-slate-50/50 dark:bg-[#020617]/40 backdrop-blur-3xl rounded-[1.5rem]">
                                {/* Top neon line */}
                                <div className={`absolute top-0 inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-[${item.color.split(' ')[1]?.replace('from-', '') || '#0ea5e9'}] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Floating Icon */}
                                <div className="mb-8 relative group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse" style={{ background: item.glow }} />
                                    <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center bg-white border border-slate-200 dark:border-white/10 dark:bg-[#0f172a] shadow-2xl" style={{ boxShadow: `0 0 30px ${item.glow.replace('0.5', '0.2')}` }}>
                                        <Icon className="w-10 h-10 drop-shadow-lg" style={{ color: theme === 'dark' ? 'white' : item.glow.replace('rgba', 'rgb').replace(', 0.5)', ')') }} />
                                    </div>
                                    <div className="absolute -right-3 -top-3">
                                        <div className="relative flex h-8 w-8">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-8 w-8 bg-gradient-to-tr from-rose-500 to-pink-500 items-center justify-center border-2 border-white dark:border-[#0f172a] shadow-lg">
                                                <Star className="w-4 h-4 text-white" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Title & Company */}
                                <h3 className={`text-3xl md:text-5xl font-black font-heading mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500`}>
                                    {item.title}
                                </h3>
                                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                                    <span className="flex items-center gap-2 text-lg font-bold text-slate-700 dark:text-gray-200">
                                        <Building2 className="w-5 h-5" style={{ color: item.glow.replace('rgba', 'rgb').replace(', 0.5)', ')') }} /> {item.company}
                                    </span>
                                    {item.duration && (
                                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-gray-400">
                                            <Calendar className="w-4 h-4" /> {item.duration}
                                        </span>
                                    )}
                                </div>

                                {/* Sexy Badge */}
                                <div className="mb-8 pointer-events-none">
                                    <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-black/60" style={{ borderColor: item.glow.replace('0.5', '0.4'), boxShadow: `inset 0 0 20px ${item.glow.replace('0.5', '0.1')}, 0 0 20px ${item.glow.replace('0.5', '0.2')}` }}>
                                        <Trophy className="w-4 h-4 text-yellow-500 animate-[bounce_2s_infinite]" />
                                        <span className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-rose-500 transition-colors">
                                            Training Completed
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl text-center">
                                    {item.desc}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-3xl">
                                    {item.skills.map(skill => (
                                        <span key={skill} className="px-4 py-2 text-sm font-bold rounded-xl border bg-white/60 dark:bg-[#020617]/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-1" style={{ borderColor: item.glow.replace('0.5', '0.3'), color: theme === 'dark' ? '#f1f5f9' : '#334155', boxShadow: `0 5px 15px ${item.glow.replace('0.5', '0.1')}` }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Big Sexy Button */}
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noreferrer" className="relative group/btn inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden border border-white/20" style={{ background: `linear-gradient(135deg, ${item.glow.replace('rgba', 'rgb').replace(', 0.5)', ')')}, #a855f7)`, boxShadow: `0 10px 40px ${item.glow.replace('0.5', '0.6')}` }}>
                                        <div className="absolute inset-0 bg-white/20 group-hover/btn:opacity-100 opacity-0 transition-opacity duration-300" />
                                        
                                        {/* Sweeping Light Effect */}
                                        <div className="absolute inset-0 w-full h-full opacity-50 pointer-events-none skew-x-[-25deg] translate-x-[-150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }} />
                                        
                                        <Award className="w-5 h-5 relative z-10" />
                                        <span className="relative z-10">Access Dashboard</span>
                                        <ExternalLink className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                )}

                            </div>
                        </CyberCard>
                    </motion.div>
                );
            })}
        </div>
    );
};

/* ─────────────── Cert Cards — Orbital Layout ─────────────── */
const CertSection = () => {
    const [popup, setPopup] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const { certifications } = portfolioData;
    const { theme } = useTheme();

    const radiusDesktop = 300;
    const radiusMobile = 160;

    return (
        <>
            <section className="relative py-32 min-h-[110vh] overflow-hidden bg-slate-50 dark:bg-[#020617] flex justify-center items-center transition-colors duration-500">
                {/* Extreme Futuristic Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_65%,transparent_100%)] transition-colors duration-500" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: 'linear' }} className="absolute top-[10%] left-[10%] w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-[140px] mix-blend-screen" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: 'linear' }} className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[140px] mix-blend-screen" />
                    {[...Array(25)].map((_, i) => (
                        <motion.div key={i} className="absolute w-1 h-1 bg-[#38bdf8]/50 dark:bg-white/40 rounded-full shadow-[0_0_10px_#38bdf8]" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} animate={{ opacity: [0, 1, 0], scale: [0, 2, 0], y: [0, -40, 0] }} transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }} />
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
                    {/* Big Glowing Heading */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, type: 'spring' }} className="text-center absolute top-10 w-full z-20 pointer-events-none">
                        <h2 className="text-5xl md:text-7xl font-black tracking-widest font-orbitron uppercase drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                            <span className="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">
                                Credentials
                            </span>
                        </h2>
                        <div className="relative h-[2px] w-56 mx-auto mt-4 bg-white/10 overflow-hidden rounded-full">
                            <motion.div initial={{ left: '-100%' }} animate={{ left: '100%' }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent shadow-[0_0_20px_#22c55e]" />
                        </div>
                    </motion.div>

                    {/* Highly Animated 3D Orbital Carousel */}
                    <div className="relative w-full h-[600px] md:h-[800px] flex justify-center items-center mt-32 md:mt-24 perspective-[1500px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        
                        {/* Central Glowing Core / Icon */}
                        <motion.div className="absolute z-10 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-[#020617] border-2 border-[#0ea5e9] shadow-[0_0_50px_#0ea5e9,inset_0_0_30px_#0ea5e9] pulse-glow">
                            <Award className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-[0_0_15px_white]" />
                            <div className="absolute inset-0 rounded-full border border-dashed border-white/30 animate-[spin_10s_linear_infinite]" />
                        </motion.div>

                        {/* Orbit Circles behind core */}
                        <div className="absolute w-[320px] h-[320px] md:w-[600px] md:h-[600px] border border-[#0ea5e9]/20 rounded-full" />
                        <div className="absolute w-[400px] h-[400px] md:w-[750px] md:h-[750px] border border-dashed border-[#22c55e]/15 rounded-full animate-[spin_60s_linear_infinite]" />
                        
                        {/* Sweeping Radar Arm */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute w-[160px] md:w-[300px] h-1 bg-gradient-to-r from-transparent via-[#06b6d4]/50 to-[#06b6d4] origin-left blur-sm opacity-50 shadow-[0_0_20px_#06b6d4]" style={{ animationPlayState: isHovered ? 'paused' : 'running' }} />

                        {/* Spinning Carrier Container */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ animationPlayState: isHovered ? 'paused' : 'running', transformStyle: 'preserve-3d' }} className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none">
                            {certifications.map((cert, i) => {
                                const angle = (i * 360) / certifications.length;
                                // Need to use inline styles for dynamic transform based on screen size approximations
                                // To make it purely responsive, we rely on CSS var or window sizes, but here we just use % offsets 
                                // Actually, absolute positioning with rotate and translate is perfectly responsive if we translate in em/px.
                                // We'll just define a generic container structure and position using math within the mapping:
                                const desktopTransform = `rotate(${angle}deg) translate(300px) rotate(-${angle}deg)`;
                                const mobileTransform = `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`;
                                
                                return (
                                    <div key={i} className="absolute w-44 md:w-64 flex justify-center items-center sm:hidden md:flex pointer-events-none" style={{ transform: desktopTransform, isolation: 'isolate' }}>
                                        {/* Individual Counter-Rotating Card Container */}
                                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ animationPlayState: isHovered ? 'paused' : 'running', transformStyle: 'preserve-3d' }} className="pointer-events-auto">
                                            
                                            <motion.div whileHover={{ scale: 1.25, zIndex: 50 }} className="relative glass glass-hover rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:shadow-[0_0_50px_rgba(34,197,94,0.4)] border border-slate-200 dark:border-white/10" style={{ transform: 'translateZ(30px)' }} onClick={(e) => { setPopup(cert); e.stopPropagation(); }}>
                                                {/* Top Glow Border Drop */}
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_#22c55e]" />
                                                
                                                {/* Card Image */}
                                                <div className="relative h-28 md:h-36 overflow-hidden bg-white/5 dark:bg-black/50">
                                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#020617] via-slate-50/20 dark:via-[#020617]/40 to-transparent transition-colors duration-500" />
                                                    
                                                    {/* Blur Overlay & Eye Button */}
                                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                                                        <div className="bg-[#0ea5e9] text-white p-3 rounded-full shadow-[0_0_20px_#0ea5e9] transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                            <ZoomIn size={20} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="p-4 md:p-5 relative z-10 bg-white/40 dark:bg-transparent">
                                                    <h3 className="font-bold text-slate-800 dark:text-white font-heading text-xs md:text-sm leading-snug mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#06b6d4] group-hover:to-[#22c55e] transition-colors">{cert.title}</h3>
                                                    <div className="flex items-center gap-1.5 text-[0.65rem] md:text-xs text-[#0ea5e9] font-bold uppercase tracking-wider"><Star size={10} /> {cert.issuer}</div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                );
                            })}

                            {/* Mobile specific layout rendering because inline transform media queries do not exist easily */}
                            {certifications.map((cert, i) => {
                                const angle = (i * 360) / certifications.length;
                                const mobileTransform = `rotate(${angle}deg) translate(160px) rotate(-${angle}deg)`;
                                return (
                                    <div key={i + 'mobile'} className="absolute w-36 flex justify-center items-center md:hidden pointer-events-none" style={{ transform: mobileTransform, isolation: 'isolate' }}>
                                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ animationPlayState: isHovered ? 'paused' : 'running', transformStyle: 'preserve-3d' }} className="pointer-events-auto w-full">
                                            
                                            <motion.div whileTap={{ scale: 1.1 }} className="relative glass rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(14,165,233,0.15)] border border-slate-200 dark:border-white/10" onClick={(e) => { setPopup(cert); e.stopPropagation(); }}>
                                                <div className="relative h-20 overflow-hidden bg-black/50">
                                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-90" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40"><ZoomIn size={16} className="text-white" /></div>
                                                </div>
                                                <div className="p-3 bg-white/40 dark:bg-transparent">
                                                    <h3 className="font-bold text-slate-800 dark:text-white text-[0.65rem] truncate">{cert.title}</h3>
                                                    <div className="text-[0.55rem] text-[#0ea5e9] truncate font-bold">{cert.issuer}</div>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Ultimate 3D Popup Preview */}
            <AnimatePresence>
                {popup && (
                    <motion.div initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(15px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80" onClick={() => setPopup(null)}>
                        <motion.div initial={{ scale: 0.8, opacity: 0, rotateX: 20 }} animate={{ scale: 1, opacity: 1, rotateX: 0 }} exit={{ scale: 0.8, opacity: 0, rotateX: -20 }} transition={{ type: 'spring', bounce: 0.3 }} style={{ transformStyle: 'preserve-3d', perspective: '1000px' }} onClick={e => e.stopPropagation()} className="relative max-w-2xl w-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#0ea5e9] via-[#22c55e] to-[#0ea5e9] rounded-[2rem] blur-xl opacity-40 animate-pulse" />
                            <div className="relative bg-white/95 dark:bg-[#020617]/95 border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col">
                                {/* Header Controls */}
                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <button onClick={() => setPopup(null)} className="p-2 rounded-full bg-black/50 hover:bg-black border border-white/10 text-white transition-all shadow-lg hover:rotate-90"><X size={20} /></button>
                                </div>
                                
                                {/* Certificate Image Hero */}
                                <div className="relative w-full aspect-[4/3] max-h-[50vh] flex items-center justify-center bg-black">
                                    <div className="absolute inset-0 bg-[#0ea5e9]/10 rounded-full blur-[100px]" />
                                    <img src={popup.image} alt={popup.title} className="w-full h-full object-contain relative z-10 p-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                                </div>

                                {/* Rich Data Footer */}
                                <div className="p-6 md:p-8 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-full text-[#0ea5e9] text-[0.65rem] font-bold tracking-widest uppercase mb-3 shadow-[0_0_10px_rgba(14,165,233,0.2)]">Verified Credential</span>
                                            <h3 className="font-black text-slate-800 dark:text-white font-heading text-2xl md:text-3xl mb-1">{popup.title}</h3>
                                            <div className="flex items-center gap-3">
                                                <p className="text-[#22c55e] text-sm md:text-base font-bold flex items-center gap-1.5"><Award size={16} /> {popup.issuer}</p>
                                                {popup.year && <span className="text-slate-500 text-sm font-semibold border-l border-slate-500 pl-3">{popup.year}</span>}
                                            </div>
                                        </div>
                                        <a href={popup.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all hover:scale-105 group border border-transparent hover:border-white/20 w-full md:w-auto overflow-hidden relative shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]" style={{ background: 'linear-gradient(135deg,#0ea5e9,#22c55e)' }}>
                                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" /> Access Digital Copy
                                        </a>
                                    </div>
                                    {popup.desc && <p className="mt-6 text-sm text-slate-500 dark:text-gray-400 leading-relaxed max-w-2xl">{popup.desc}</p>}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

/* ─────────────── Education Card ─────────────── */
const EduCard = ({ edu, idx }) => {
    const { theme } = useTheme();
    return (
    <motion.div
        initial={{ opacity: 0, x: idx % 2 === 0 ? 60 : -60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: idx * 0.1, type: 'spring', bounce: 0.3 }}
        className="relative w-full"
    >
        <CyberCard glowColor={edu.glow} className="h-full group">
            <div className="relative w-full p-7 transition-all duration-500 overflow-hidden border-none pointer-events-auto z-10 flex flex-col h-full">
        {/* Top neon border */}
        <div
            className="absolute top-0 left-8 right-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${edu.glow.replace('0.5', '0.8')}, transparent)` }}
        />

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
            <div
                className={`flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-sm dark:shadow-none overflow-hidden ${edu.image ? 'w-14 h-14 rounded-full border-2' : 'p-3 rounded-2xl'}`}
                style={{
                    background: edu.image ? 'white' : (theme === 'dark' ? edu.glow.replace('0.5', '0.12') : edu.glow.replace('0.5', '0.08')),
                    boxShadow: theme === 'dark' ? `0 0 16px ${edu.glow.replace('0.5', '0.3')}` : 'none',
                    borderColor: edu.image ? edu.glow.replace('rgba', 'rgb').replace(', 0.5)', ')') : 'transparent'
                }}
            >
                {edu.image ? (
                    <img src={edu.image} alt={edu.school} className="w-full h-full object-cover" />
                ) : (
                    <GraduationCap
                        className="w-7 h-7"
                        style={{ color: theme === 'dark' ? 'white' : edu.glow.replace('rgba', 'rgb').replace(', 0.5)', ')'), filter: `drop-shadow(0 0 6px ${edu.glow.replace('0.5', theme === 'dark' ? '0.5' : '0.2')})` }}
                    />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white font-heading leading-snug mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 dark:group-hover:from-white group-hover:to-teal-500 dark:group-hover:to-gray-300 transition-all duration-500">
                    {edu.school}
                </h3>
                <div
                    className="text-sm font-semibold transition-colors duration-500 relative"
                    style={{ color: edu.glow.replace('rgba', 'rgb').replace(', 0.5)', ')') }}
                >
                    <div>{edu.degree}</div>
                    <div className="text-xs mt-1 opacity-80 font-medium tracking-wide">
                        {edu.year}
                    </div>
                </div>
            </div>
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
            {/* Grade badge */}
            <span
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm dark:shadow-none transition-colors duration-500"
                style={{
                    background: theme === 'dark' ? edu.glow.replace('0.5', '0.1') : edu.glow.replace('0.5', '0.04'),
                    borderColor: theme === 'dark' ? edu.glow.replace('0.5', '0.3') : edu.glow.replace('0.5', '0.15'),
                    color: theme === 'dark' ? '#e2e8f0' : '#475569'
                }}
            >
                📊 {edu.grade}
            </span>
            {/* Status badge */}
            <span
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm dark:shadow-none transition-colors duration-500 ${
                    edu.status === 'current'
                        ? 'bg-green-100 dark:bg-green-500/10 border-green-300 dark:border-green-500/30 text-green-700 dark:text-green-400'
                        : 'bg-slate-100 dark:bg-gray-500/10 border-slate-300 dark:border-gray-500/30 text-slate-600 dark:text-gray-400'
                }`}
            >
                {edu.status === 'current' ? (
                    <><span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" /> Current</>
                ) : (
                    <><span className="w-1.5 h-1.5 rounded-full bg-slate-500 dark:bg-gray-500" /> Completed</>
                )}
            </span>
        </div>

        {/* Bottom gradient accent line */}
        <div
            className={`mt-5 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${edu.color} opacity-40 transition-all duration-700 rounded-full pointer-events-none`}
        />
            </div>
        </CyberCard>
    </motion.div>
    );
};

/* ─────────────── Main Component ─────────────── */
const Experience = () => {
    const { training, certifications, extracurricular, education } = portfolioData;
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const { theme } = useTheme();

    return (
        <div id="experience" ref={sectionRef}>
            {/* ── Training & Internships ── */}
            <section className="relative py-32 overflow-hidden bg-slate-100 dark:bg-[#020617] transition-colors duration-500">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] transition-colors duration-500" />
                    <motion.div style={{ y: yParallax }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#06b6d4]/10 rounded-full blur-[150px]" />
                    <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[130px]" />
                    {[...Array(22)].map((_, i) => (
                        <motion.div key={i}
                            className="absolute w-0.5 h-0.5 bg-slate-500 dark:bg-white/30 rounded-full transition-colors duration-500"
                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                            animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 2, 1] }}
                            transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 3 }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black tracking-widest font-orbitron uppercase mb-4 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                            <span className="bg-gradient-to-r from-[#06b6d4] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent">
                                Training
                            </span>
                        </h2>
                        <div className="relative h-[2px] w-64 mx-auto bg-slate-300 dark:bg-white/10 overflow-hidden rounded-full transition-colors duration-500">
                            <motion.div initial={{ left: '-100%' }} whileInView={{ left: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent shadow-[0_0_15px_rgba(56,189,248,1)]" />
                        </div>
                        <p className="mt-6 text-slate-600 dark:text-gray-400 text-lg font-heading font-light transition-colors duration-500">
                            Professional development and skill-building programs
                        </p>
                    </motion.div>

                    <TrainingModernDisplay items={training} />
                </div>
            </section>

            {/* ── Certifications ── */}
            <CertSection />

            {/* ── Extracurricular ── */}
            <section className="relative py-32 overflow-hidden bg-slate-50 dark:bg-[#0b0f19] transition-colors duration-500">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)] transition-colors duration-500" />
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#06b6d4]/10 rounded-full blur-[130px]" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-[130px]" />
                    {[...Array(20)].map((_, i) => (
                        <motion.div key={i}
                            className="absolute w-0.5 h-0.5 bg-slate-400 dark:bg-white/25 rounded-full transition-colors duration-500"
                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 2, 1] }}
                            transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 3 }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-widest font-orbitron uppercase mb-4 drop-shadow-[0_0_20px_rgba(251,113,133,0.4)]">
                            <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                Extracurricular
                            </span>
                        </h2>
                        <div className="relative h-[2px] w-56 mx-auto bg-slate-300 dark:bg-white/10 overflow-hidden rounded-full transition-colors duration-500">
                            <motion.div initial={{ left: '-100%' }} whileInView={{ left: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-rose-500 dark:via-rose-400 to-transparent shadow-[0_0_15px_rgba(251,113,133,1)]" />
                        </div>
                        <p className="mt-5 text-slate-600 dark:text-gray-400 text-base font-heading font-light transition-colors duration-500">Beyond the classroom — activities and achievements</p>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                        {extracurricular.map((item, idx) => {
                            const EXTRA_ICONS = { Heart, Shield, Trophy, Award };
                            const Icon = EXTRA_ICONS[item.icon] || Award;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40, scale: 0.93 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ delay: idx * 0.12, type: 'spring', bounce: 0.3 }}
                                    whileHover={{ y: -8, boxShadow: theme === 'dark' ? `0 0 40px ${item.glow}` : `0 15px 40px ${item.glow.replace('0.5', '0.2')}` }}
                                    className="relative glass glass-hover rounded-3xl p-7 flex flex-col gap-5 group overflow-hidden transition-all duration-500 shadow-xl dark:shadow-none border-none"
                                >
                                    {/* Shine sweep */}
                                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-3xl">
                                        <motion.div
                                            initial={{ x: '-150%' }}
                                            whileHover={{ x: '250%' }}
                                            transition={{ duration: 0.7, ease: 'easeInOut' }}
                                            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                        />
                                    </div>
                                    {/* Top neon line */}
                                    <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                        style={{ background: `linear-gradient(90deg, transparent, ${item.glow.replace('0.5','0.7')}, transparent)` }} />
                                    {/* Light reflection overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 dark:from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

                                    {/* Icon */}
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-sm dark:shadow-none"
                                        style={{
                                            background: theme === 'dark' ? item.glow.replace('0.5', '0.12') : item.glow.replace('0.5', '0.08'),
                                            boxShadow: theme === 'dark' ? `0 0 20px ${item.glow.replace('0.5', '0.3')}` : 'none'
                                        }}
                                    >
                                        <Icon
                                            className="w-7 h-7"
                                            style={{ color: theme === 'dark' ? 'white' : item.glow.replace('rgba', 'rgb').replace(', 0.5)', ')'), filter: `drop-shadow(0 0 8px ${item.glow.replace('0.5', theme === 'dark' ? '0.5' : '0.2')})` }}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className={`text-lg font-bold text-slate-800 dark:text-white font-heading mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${item.color} transition-all duration-500`}>
                                            {item.role}
                                        </h3>
                                        <div
                                            className="text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-500"
                                            style={{ color: item.glow.replace('rgba', 'rgb').replace(', 0.5)', ')') }}
                                        >
                                            {item.org}
                                        </div>
                                        <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-500">{item.desc}</p>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div
                                        className={`mt-auto h-px w-0 group-hover:w-full bg-gradient-to-r ${item.color} opacity-40 transition-all duration-700 rounded-full`}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Education ── */}
            <section className="relative py-32 overflow-hidden bg-slate-100 dark:bg-[#0f172a] transition-colors duration-500">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_50%,transparent_100%)] transition-colors duration-500" />
                    <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-[#06b6d4]/10 rounded-full blur-[140px]" />
                    <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[#22c55e]/10 rounded-full blur-[140px]" />
                    {[...Array(20)].map((_, i) => (
                        <motion.div key={i}
                            className="absolute w-0.5 h-0.5 bg-slate-400 dark:bg-white/25 rounded-full transition-colors duration-500"
                            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                            animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 2, 1] }}
                            transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 3 }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-widest font-orbitron uppercase mb-4 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                            <span className="bg-gradient-to-r from-[#06b6d4] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent">
                                Education
                            </span>
                        </h2>
                        <div className="relative h-[2px] w-40 mx-auto bg-slate-300 dark:bg-white/10 overflow-hidden rounded-full transition-colors duration-500">
                            <motion.div initial={{ left: '-100%' }} whileInView={{ left: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#38bdf8] dark:via-[#38bdf8] to-transparent shadow-[0_0_15px_rgba(56,189,248,1)]" />
                        </div>
                        <p className="mt-5 text-slate-600 dark:text-gray-400 text-base font-heading font-light transition-colors duration-500">Academic journey and qualifications</p>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative max-w-5xl mx-auto">
                        {/* Glowing center line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
                            <motion.div
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                                style={{ originY: 0 }}
                                className="w-full h-full bg-gradient-to-b from-cyan-400/50 via-teal-500/50 to-emerald-400/50 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                            />
                        </div>

                        <div className="space-y-16 md:space-y-20">
                            {education.map((edu, idx) => {
                                const isRight = idx % 2 === 0;
                                return (
                                    <div key={idx} className="relative flex items-center">
                                        {/* Left panel */}
                                        <div className="hidden md:flex flex-1 justify-end pr-12">
                                            {isRight && <EduCard edu={edu} idx={idx} />}
                                        </div>

                                        {/* Center glowing dot */}
                                        <div className="hidden md:flex flex-shrink-0 z-10">
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.15, type: 'spring', bounce: 0.5 }}
                                                className="relative w-12 h-12 rounded-full flex items-center justify-center font-black font-orbitron text-xs bg-white dark:bg-black border-2 shadow-lg dark:shadow-none transition-colors duration-500"
                                                style={{
                                                    borderColor: theme === 'dark' ? edu.glow.replace('0.5', '0.8') : edu.glow.replace('0.5', '0.4'),
                                                    boxShadow: theme === 'dark' ? `0 0 18px ${edu.glow}, 0 0 35px ${edu.glow.replace('0.5', '0.15')}` : `0 5px 15px ${edu.glow.replace('0.5', '0.1')}`
                                                }}
                                            >
                                                <span className={`bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                                                    {edu.number}
                                                </span>
                                                <div className="absolute inset-0 rounded-full animate-ping opacity-15"
                                                    style={{ background: edu.glow }} />
                                            </motion.div>
                                        </div>

                                        {/* Right panel */}
                                        <div className="hidden md:flex flex-1 pl-12">
                                            {!isRight && <EduCard edu={edu} idx={idx} />}
                                        </div>

                                        {/* Mobile — full width */}
                                        <div className="md:hidden w-full">
                                            <EduCard edu={edu} idx={idx} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Experience;
