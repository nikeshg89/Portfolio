import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from './Section';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Code2, BrainCircuit, Database, LineChart, Network, Cpu } from 'lucide-react';

const HighlightText = ({ text }) => {
    const keywords = [
        "Data Science",
        "Artificial Intelligence",
        "Software Development",
        "Machine Learning",
        "Python",
        "Java",
        "C\\+\\+",
        "Power BI",
        "intelligent systems",
        "modern software solutions"
    ];

    let formattedText = text;
    keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        formattedText = formattedText.replace(
            regex,
            '<span class="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent font-bold drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]">$1</span>'
        );
    });

    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

const TypewriterText = ({ text }) => {
    const characters = text.split('');
    return (
        <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.02, delayChildren: 0.5 }
                }
            }}
            className="tracking-wide"
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, textShadow: "0 0 0px rgba(56,189,248,0)" },
                        visible: { opacity: 1, textShadow: "0 0 10px rgba(56,189,248,0.5)" }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
};

const FloatingIcon = ({ icon: Icon, delay, xOffset, yOffset, scale = 1, colorClass }) => (
    <motion.div
        className={`absolute hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] text-slate-500 dark:text-gray-400 transition-colors duration-500 ${colorClass}`}
        style={{ left: xOffset, top: yOffset, scale }}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
        }}
        transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        <Icon className="w-8 h-8 opacity-70 drop-shadow-[0_0_8px_currentColor]" />
    </motion.div>
);

const About = () => {
    const sectionRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityParallax = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const paragraphs = portfolioData.about.split('\n').filter(p => p.trim());
    const firstParagraph = paragraphs[0];
    const remainingParagraphs = paragraphs.slice(1);

    return (
        <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 transition-colors duration-500" />
                
                {/* Cinematic Core Glow */}
                <motion.div 
                    style={{ y: yParallax, opacity: opacityParallax }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38bdf8]/10 rounded-full blur-[150px]" 
                />
                <motion.div 
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#06b6d4]/15 rounded-full blur-[120px]" 
                />

                {/* Stars / Particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-slate-400 dark:bg-white rounded-full transition-colors duration-500"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            filter: "blur(0.5px)",
                        }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, Math.random() + 1, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Futuristic Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative"
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-widest font-orbitron uppercase drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                        <span className="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>
                    {/* Marvel/Cyberpunk Style Underline */}
                    <div className="relative h-[2px] w-48 mx-auto mt-6 bg-slate-300 dark:bg-white/10 overflow-hidden transition-colors duration-500">
                        <motion.div 
                            initial={{ left: "-100%" }}
                            whileInView={{ left: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent shadow-[0_0_15px_rgba(56,189,248,1)]"
                        />
                    </div>
                </motion.div>

                {/* Floating Tech Icons Around The Card */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <FloatingIcon icon={Terminal} delay={0} xOffset="5%" yOffset="25%" scale={1.2} colorClass="text-yellow-400" />
                    <FloatingIcon icon={Code2} delay={1.5} xOffset="15%" yOffset="75%" scale={0.9} colorClass="text-red-400" />
                    <FloatingIcon icon={Cpu} delay={0.5} xOffset="85%" yOffset="30%" scale={1.1} colorClass="text-green-400" />
                    <FloatingIcon icon={BrainCircuit} delay={2} xOffset="90%" yOffset="70%" scale={1.3} colorClass="text-cyan-400" />
                    <FloatingIcon icon={Database} delay={1} xOffset="45%" yOffset="10%" scale={0.8} colorClass="text-blue-400" />
                    <FloatingIcon icon={Network} delay={2.5} xOffset="75%" yOffset="5%" scale={0.9} colorClass="text-orange-400" />
                    <FloatingIcon icon={LineChart} delay={0.8} xOffset="25%" yOffset="85%" scale={1} colorClass="text-sky-400" />
                </div>

                {/* Ultra-Premium Glass Card */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative max-w-4xl mx-auto group z-30"
                >
                    {/* Glowing outer aura that pulses */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#38bdf8] via-[#06b6d4] to-[#22c55e] rounded-[2rem] blur-xl opacity-15 group-hover:opacity-40 dark:opacity-30 dark:group-hover:opacity-70 transition duration-1000 animate-pulse-slow" />
                    
                    {/* The Card Element */}
                    <div 
                        onMouseMove={handleMouseMove}
                        className="relative bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 md:p-14 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-500"
                    >
                        {/* Mouse Tracking Glow Effect */}
                        <div 
                            className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ 
                                background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 40%)` 
                            }} 
                        />
                        
                        {/* Cinematic Light Reflection Line */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />

                        <div className="relative z-10 text-xl md:text-2xl text-slate-700 dark:text-gray-300 font-light leading-relaxed font-sans text-center space-y-8 transition-colors duration-500">
                            {/* Terminal window style header dots */}
                            <div className="flex justify-center gap-2 mb-8 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                            </div>

                            {/* Typewriter text for first paragraph */}
                            <div className="text-slate-800 dark:text-cyan-50 min-h-[120px] md:min-h-0 transition-colors duration-500">
                                <TypewriterText text={firstParagraph} />
                            </div>

                            {/* Cinematic highlighted text for remaining paragraphs */}
                            {remainingParagraphs.map((paragraph, index) => (
                                <motion.p 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8 + (index * 0.2), duration: 0.8 }}
                                    className="tracking-wide text-[1.1rem] md:text-xl text-slate-600 dark:text-gray-400 transition-colors duration-500"
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
