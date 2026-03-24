import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { ArrowRight, Download, Award, Briefcase, Star, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import defaultProfileImg from '../assets/images/profile.jpg';
import MagneticButton from './MagneticButton';
import CyberCard from './CyberCard';

/* ── Typewriter hook ── */
const useTypewriter = (texts, speed = 80, pause = 1800) => {
    const [display, setDisplay] = useState('');
    const [txtIdx, setTxtIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = texts[txtIdx];
        let timeout;
        if (!deleting && charIdx < current.length) {
            timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
        } else if (!deleting && charIdx === current.length) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && charIdx > 0) {
            timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
        } else {
            setDeleting(false);
            setTxtIdx(i => (i + 1) % texts.length);
        }
        setDisplay(current.slice(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, deleting, txtIdx, texts, speed, pause]);

    return display;
};

/* ── Animated Math Counter ── */
const AnimatedCounter = ({ value, duration = 2.5 }) => {
    const num = parseFloat(value);
    const hasPlus = String(value).includes('+');
    const strVal = String(value).replace('+', '');
    const decimals = strVal.split('.')[1]?.length || 0;
    const count = useMotionValue(0);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(count, num, {
            duration,
            ease: "easeOut",
            onUpdate: (latest) => {
                setDisplay(decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest));
            }
        });
        return controls.stop;
    }, [num, duration, count, decimals]);

    return <span>{display}{hasPlus ? '+' : ''}</span>;
};

/* ── Floating particles — created once at module level ── */
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
    size: Math.random() > 0.6 ? 2 : 1,
    color: ['bg-[#06b6d4]', 'bg-[#0ea5e9]', 'bg-[#22c55e]'][Math.floor(Math.random() * 3)]
}));

const Hero = () => {
    const { personal } = portfolioData;
    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth < 1024);
    const glowRef = useRef(null);
    const sectionRef = useRef(null);
    const { theme } = useTheme();

    const typedText = useTypewriter([
        'Data Scientist',
        'BI Analyst',
        'Software Developer',
        'AI Enthusiast'
    ]);

    useEffect(() => {
        const check = () => { isMobileRef.current = window.innerWidth < 1024; };
        window.addEventListener('resize', check, { passive: true });
        return () => window.removeEventListener('resize', check);
    }, []);

    // Pointer glow — CSS transforms directly on DOM node, zero re-renders
    useEffect(() => {
        const onMove = (e) => {
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX - 192}px`;
                glowRef.current.style.top = `${e.clientY - 192}px`;
            }
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    const { scrollY } = useScroll();
    const y1Base = useTransform(scrollY, [0, 500], [0, 150]);
    const y1 = isMobileRef.current ? 0 : y1Base;

    return (
        <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            
            {/* ── Background Effects ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Dark Navy Base Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-100 to-white dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617] opacity-90 transition-colors duration-500" />
                
                {/* Glowing Orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#06b6d4]/20 rounded-full blur-[160px] animate-pulse-slow mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0ea5e9]/15 rounded-full blur-[150px] mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0f172a]/50 rounded-full blur-[120px]" />
                
                {/* Glassmorphism Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

                {/* Particles */}
                {PARTICLES.map(p => (
                    <motion.div
                        key={p.id}
                        className={`absolute rounded-full ${p.color}`}
                        style={{ top: p.top, left: p.left, width: p.size * 2, height: p.size * 2, filter: 'blur(1px)', willChange: 'transform, opacity' }}
                        animate={{ opacity: [0, 0.8, 0], y: [0, -40, 0], scale: [0.8, 1.5, 0.8] }}
                        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                    />
                ))}
            </div>

            {/* Pointer interactive glow — updated via ref, no re-renders */}
            <div
                ref={glowRef}
                className="fixed z-0 w-96 h-96 pointer-events-none rounded-full mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 60%)',
                    top: -192,
                    left: -192,
                    transition: 'top 0.08s ease-out, left 0.08s ease-out',
                    willChange: 'top, left',
                }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 w-full">
                
                {/* ── TOP: Huge Name ── */}
                <motion.div
                    className="w-full text-center lg:text-left mb-6 lg:mb-12"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black font-orbitron tracking-tight leading-none whitespace-nowrap overflow-visible">
                        <span className="bg-gradient-to-r from-[#22c55e] via-[#86efac] to-[#15803d] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(34,197,94,0.5)]">
                            Nikesh Kumar
                        </span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-8 items-center">
                    
                    {/* ── CENTER LEFT: Text & Buttons & Stats ── */}
                    <motion.div
                        style={{ y: y1 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-slate-800 dark:text-white mb-2 pb-1 flex flex-wrap justify-center lg:justify-start gap-3 items-center transition-colors">
                            <span className="text-slate-600 dark:text-gray-300 font-light transition-colors">I am a</span>
                            <span className="bg-gradient-to-r from-[#0ea5e9] via-[#0ea5e9] to-[#06b6d4] bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(14,165,233,0.6)] font-black">
                                {typedText}
                            </span>
                            <span className="inline-block w-1 h-10 bg-[#22c55e] animate-pulse shadow-[0_0_15px_rgba(34,197,94,1)] ml-1 rounded-full" />
                        </h2>

                        {/* Futuristic Tags / Badges */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 max-w-3xl mx-auto z-10 relative pointer-events-auto">
                            {[
                                { text: 'Data Science', color: 'from-cyan-400 to-blue-500', shadow: 'rgba(6,182,212,0.4)', textGlow: 'text-cyan-400' },
                                { text: 'AI', color: 'from-teal-400 to-emerald-500', shadow: 'rgba(45,212,191,0.4)', textGlow: 'text-teal-400' },
                                { text: 'Developer', color: 'from-blue-400 to-indigo-500', shadow: 'rgba(59,130,246,0.4)', textGlow: 'text-blue-400' }
                            ].map((badge, index) => (
                                <motion.div
                                    key={badge.text}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    className="relative group cursor-pointer"
                                >
                                    {/* Outer Blur Glow on Hover */}
                                    <div 
                                        className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                                        style={{ background: `linear-gradient(to right, ${badge.shadow}, transparent)`, filter: `drop-shadow(0 0 15px ${badge.shadow})` }}
                                    />
                                    
                                    {/* Glass Tag Container */}
                                    <div className="relative px-6 py-2.5 rounded-full bg-white/5 dark:bg-[#020617]/40 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-hidden shadow-lg transition-all duration-300 group-hover:border-white/30 dark:group-hover:border-white/20">
                                        
                                        {/* Sweeping Highlight on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-[-20deg]" />

                                        {/* Gradient Badge Text */}
                                        <span className={`relative z-10 bg-gradient-to-r ${badge.color} bg-clip-text text-transparent font-black tracking-widest uppercase text-sm md:text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] dark:drop-shadow-[0_0_8px_${badge.shadow}]`}>
                                            {badge.text}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 mb-14">
                            <MagneticButton
                                href="#projects"
                                className="relative inline-block group px-8 py-4 rounded-full font-bold text-white overflow-hidden shadow-[0_10px_30px_rgba(6,182,212,0.4)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#0ea5e9] transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                    View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </MagneticButton>

                            <MagneticButton
                                href={personal.resume}
                                target="_blank"
                                rel="noreferrer"
                                className="relative inline-block group px-8 py-4 rounded-full font-bold overflow-hidden glass border border-[#22c55e]/50 shadow-[0_10px_30px_rgba(34,197,94,0.15)] hover:border-[#22c55e]/80 transition-colors"
                            >
                                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 group-hover:bg-[#22c55e]/20 transition-colors duration-300" />
                                <span className="relative z-10 flex items-center gap-2 text-slate-800 dark:text-gray-100 group-hover:text-[#22c55e] dark:group-hover:text-[#22c55e] transition-colors drop-shadow-sm">
                                    <Download size={18} /> Download CV
                                </span>
                            </MagneticButton>
                        </div>

                        {/* Stats Glass Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-2xl">
                            {[
                                { value: personal.stats.cgpa, label: 'CGPA', icon: Star, color: 'text-[#22c55e]', bg: 'bg-[#22c55e]', glow: 'rgba(34,197,94,0.3)' },
                                { value: personal.stats.projects, label: 'Projects', icon: Briefcase, color: 'text-[#0ea5e9]', bg: 'bg-[#0ea5e9]', glow: 'rgba(14,165,233,0.3)' },
                                { value: '4+', label: 'Certificates', icon: Award, color: 'text-[#a855f7]', bg: 'bg-[#a855f7]', glow: 'rgba(168,85,247,0.3)' },
                            ].map((stat, i) => (
                                <CyberCard key={i} className="h-full min-h-[160px]" glowColor={stat.glow.replace('0.3', '0.6')} colorFrom={stat.bg.replace('bg-[', '').replace(']', '')} disableFloat={true}>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                        className="relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white/60 dark:bg-[#0f172a]/60 border border-black/5 dark:border-white/10 backdrop-blur-xl overflow-hidden group hover:border-[#06b6d4]/50 transition-all duration-500 h-full pointer-events-none"
                                        style={{ boxShadow: `0 8px 32px ${stat.glow}` }}
                                    >
                                        <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} mix-blend-screen rounded-full blur-[40px] opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none`} />
                                        <stat.icon className={`w-8 h-8 mb-4 ${stat.color} drop-shadow-[0_0_8px_currentColor] z-10 transform group-hover:scale-110 transition-transform duration-500`} />
                                        <div className={`text-4xl font-black font-orbitron ${stat.color} drop-shadow-[0_0_15px_currentColor] mb-2 z-10 tracking-wider transition-transform duration-500`}>
                                            <AnimatedCounter value={stat.value} />
                                        </div>
                                        <div className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-400 font-bold z-10 drop-shadow-md">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                </CyberCard>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── CENTER RIGHT: Premium Photo ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, delay: 0.4, type: 'spring', bounce: 0.4 }}
                        className="relative flex justify-center lg:justify-end items-center w-full"
                    >
                        <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] xl:w-[480px] xl:h-[480px]">
                            {/* Blur glow behind */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#06b6d4] to-[#0ea5e9] rounded-full blur-[80px] opacity-50 animate-pulse-slow mix-blend-screen" />
                            
                            {/* Floating container */}
                            <motion.div
                                animate={{ y: [-15, 15, -15] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative w-full h-full flex items-center justify-center p-4"
                            >
                                {/* Outer glowing ring (spins) */}
                                <div className="absolute -inset-2 xl:-inset-4 rounded-full border border-[#0ea5e9]/30 border-dashed animate-[spin_15s_linear_infinite]" 
                                     style={{ boxShadow: '0 0 30px rgba(14,165,233,0.3)' }} />
                                     
                                {/* Middle glowing ring (spins reverse) */}
                                <div className="absolute inset-0 rounded-full border-2 border-[transparent] border-t-[#22c55e]/80 border-b-[#06b6d4]/80 animate-[spin_10s_linear_infinite_reverse]"
                                     style={{ filter: 'drop-shadow(0 0 15px rgba(34,197,94,0.6))' }} />

                                {/* Inner picture wrapper */}
                                <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.7)] border-4 border-white dark:border-[#020617] bg-white dark:bg-[#0f172a] transition-colors">
                                    <img 
                                        src={defaultProfileImg} 
                                        alt="Nikesh Kumar" 
                                        className="w-full h-full object-cover object-[center_30%] hover:scale-110 hover:rotate-3 transition-transform duration-700"
                                    />
                                    {/* Glass reflection overlay */}
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-full pointer-events-none" />
                                </div>

                                {/* Floating UI Elements / Sparkles */}
                                <motion.div
                                     className="absolute top-[10%] -right-[5%] text-[#22c55e]"
                                     animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6], rotate: [0, 90, 0] }}
                                     transition={{ duration: 4, repeat: Infinity }}
                                >
                                     <Sparkles size={40} className="drop-shadow-[0_0_15px_rgba(34,197,94,1)]" />
                                </motion.div>
                                <motion.div
                                     className="absolute bottom-[10%] -left-[5%] text-[#0ea5e9]"
                                     animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5], rotate: [0, -90, 0] }}
                                     transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                                >
                                     <Sparkles size={28} className="drop-shadow-[0_0_15px_rgba(14,165,233,1)]" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
