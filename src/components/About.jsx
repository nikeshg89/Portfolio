import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from './Section';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Code2, BrainCircuit, Database, LineChart, Network, Cpu } from 'lucide-react';

// Static particles at module level — never re-created on renders
const ABOUT_PARTICLES = Array.from({ length: 15 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
}));

const HighlightText = ({ text }) => {
    const keywords = [
        "Data Science", "Artificial Intelligence", "Software Development",
        "Machine Learning", "Python", "Java", "C\\+\\+",
        "Power BI", "intelligent systems", "modern software solutions"
    ];
    let formattedText = text;
    keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        formattedText = formattedText.replace(
            regex,
            '<span class="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent font-bold">$1</span>'
        );
    });
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

// Replaced per-character animation with a single fade-in — massive performance gain
const FadeInText = memo(({ text }) => (
    <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="tracking-wide"
    >
        {text}
    </motion.p>
));
FadeInText.displayName = 'FadeInText';

// Simplified floating icon — fewer keyframes, slower animation
const FloatingIcon = memo(({ icon: Icon, delay, xOffset, yOffset, scale = 1, colorClass }) => (
    <motion.div
        className={`absolute hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-slate-200/40 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 text-slate-500 dark:text-gray-400 transition-colors duration-500 ${colorClass}`}
        style={{ left: xOffset, top: yOffset, scale }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay }}
    >
        <Icon className="w-7 h-7 opacity-60" />
    </motion.div>
));
FloatingIcon.displayName = 'FloatingIcon';

// About's mouse-tracking glow — replaced useState with a ref-updated div
const MouseGlow = () => {
    const glowRef = useRef(null);
    const onMove = (e) => {
        if (!glowRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        glowRef.current.style.background = `radial-gradient(350px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(56,189,248,0.12), transparent 40%)`;
    };
    return { glowRef, onMove };
};

const About = () => {
    const sectionRef = useRef(null);
    const { glowRef, onMove } = MouseGlow();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacityParallax = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const paragraphs = portfolioData.about.split('\n').filter(p => p.trim());
    const firstParagraph = paragraphs[0];
    const remainingParagraphs = paragraphs.slice(1);

    return (
        <section ref={sectionRef} id="about" className="relative py-28 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 transition-colors duration-500" />
                
                {/* Single parallax glow — reduced blur */}
                <motion.div
                    style={{ y: yParallax, opacity: opacityParallax, willChange: 'transform, opacity' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#38bdf8]/8 rounded-full blur-[100px]"
                />

                {/* Static particles — module level, no Math.random on render */}
                {ABOUT_PARTICLES.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-slate-400 dark:bg-white rounded-full"
                        style={{ top: p.top, left: p.left, willChange: 'opacity' }}
                        animate={{ opacity: [0.1, 0.7, 0.1] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 relative"
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-widest font-orbitron uppercase drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                        <span className="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>
                    <div className="relative h-[2px] w-44 mx-auto mt-5 bg-slate-300 dark:bg-white/10 overflow-hidden transition-colors duration-500">
                        <motion.div
                            initial={{ left: '-100%' }}
                            whileInView={{ left: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent"
                        />
                    </div>
                </motion.div>

                {/* Floating Tech Icons — only 4 instead of 7, simpler animation */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <FloatingIcon icon={Terminal} delay={0} xOffset="5%" yOffset="25%" scale={1.1} colorClass="text-yellow-400" />
                    <FloatingIcon icon={Cpu} delay={0.5} xOffset="85%" yOffset="30%" scale={1} colorClass="text-green-400" />
                    <FloatingIcon icon={BrainCircuit} delay={2} xOffset="90%" yOffset="70%" scale={1.2} colorClass="text-cyan-400" />
                    <FloatingIcon icon={Database} delay={1} xOffset="45%" yOffset="8%" scale={0.8} colorClass="text-blue-400" />
                </div>

                {/* Main Card */}
                <motion.div
                    style={{ y: y2, willChange: 'transform' }}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative max-w-4xl mx-auto group z-30"
                >
                    {/* Outer aura — reduced opacity, no animate-pulse-slow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#22c55e] rounded-[2rem] blur-lg opacity-10 group-hover:opacity-25 dark:opacity-20 dark:group-hover:opacity-45 transition-opacity duration-700" />

                    <div
                        onMouseMove={onMove}
                        className="relative bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-500"
                    >
                        {/* Mouse glow spotlight — ref-based, zero re-renders */}
                        <div
                            ref={glowRef}
                            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/25 to-transparent" />

                        <div className="relative z-10 text-xl md:text-2xl text-slate-700 dark:text-gray-300 font-light leading-relaxed font-sans text-center space-y-7 transition-colors duration-500">
                            <div className="flex justify-center gap-2 mb-6 opacity-40">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>

                            {/* Single fade-in instead of per-character animation */}
                            <div className="text-slate-800 dark:text-cyan-50 transition-colors duration-500">
                                <FadeInText text={firstParagraph} />
                            </div>

                            {remainingParagraphs.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (index * 0.15), duration: 0.5 }}
                                    className="tracking-wide text-[1.05rem] md:text-xl text-slate-600 dark:text-gray-400 transition-colors duration-500"
                                >
                                    <HighlightText text={paragraph} />
                                </motion.p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
