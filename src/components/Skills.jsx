import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
    Terminal, Code2, Cpu, Coffee,
    Table, Calculator, BarChart, Network,
    BrainCircuit, LineChart, PieChart, Sigma,
    GitBranch, Github, Database, Code, BookOpen,
    Lightbulb, Users, MessageSquare, Shuffle, Zap
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import CyberCard from './CyberCard';

const ICON_MAP = {
    Terminal, Code2, Cpu, Coffee,
    Table, Calculator, BarChart, Network,
    BrainCircuit, LineChart, PieChart, Sigma,
    GitBranch, Github, Database, Code, BookOpen,
    Lightbulb, Users, MessageSquare, Shuffle, Zap
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const SkillCard = ({ name, iconName, glow, isImage, url }) => {
    const Icon = ICON_MAP[iconName] || Code2;
    const { theme } = useTheme();

    return (
        <motion.div variants={cardVariants} className="h-full">
            <CyberCard className="h-full group" glowColor={glow.replace('0.4', '0.6')}>
                <div className="relative flex flex-col items-center justify-center gap-4 p-6 transition-all duration-500 shadow-md dark:shadow-none h-full bg-transparent border-none z-10 pointer-events-auto w-full">

                    {/* Icon Container with internal hover flip/scale */}
                    <div
                        className="p-4 rounded-xl flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-110 relative z-10"
                        style={{ background: theme === 'dark' ? glow.replace('0.4', '0.1') : glow.replace('0.4', '0.05') }}
                    >
                        {isImage ? (
                            <img
                                src={url}
                                alt={name}
                                className="w-8 h-8 object-contain transition-all duration-500"
                                style={{ filter: `drop-shadow(0 0 8px ${glow.replace('0.4', '0.6')})` }}
                            />
                        ) : (
                            <Icon
                                className="w-8 h-8 transition-all duration-500"
                                style={{ color: theme === 'dark' ? '#f8fafc' : '#334155', filter: `drop-shadow(0 0 8px ${glow.replace('0.4', '0.6')})` }}
                            />
                        )}
                        {/* Hidden rotation element for ultra futuristic feel */}
                        <div className="absolute inset-0 rounded-xl border border-dashed border-white/20 opacity-0 group-hover:opacity-100 animate-[spin_4s_linear_infinite]" />
                    </div>

                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200 text-center tracking-wide group-hover:text-[#0ea5e9] dark:group-hover:text-white transition-colors duration-300 relative z-10 font-heading">
                        {name}
                    </span>
                    
                    {/* Floating animated ambient light */}
                    <div className="absolute bottom-[-10px] w-full h-[20px] bg-white dark:bg-transparent blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-0" />
                </div>
            </CyberCard>
        </motion.div>
    );
};

const RadarAnimation = () => (
    <div className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none opacity-30 dark:opacity-[0.45] overflow-hidden mix-blend-screen -z-10 translate-x-1/2 -translate-y-1/3">
        {/* Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#06b6d4] rounded-full shadow-[0_0_30px_#06b6d4,0_0_80px_#06b6d4]" />
        
        {/* Radar Orbits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-[#06b6d4]/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-[#0ea5e9]/30 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-[#22c55e]/20" />

        {/* Sweeping Radar Scanner */}
        <div className="absolute top-1/2 left-1/2 w-[350px] h-1 origin-left animate-[spin_3s_linear_infinite] opacity-80">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#06b6d4] to-[#06b6d4]" />
            <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-t from-[#06b6d4]/10 to-transparent origin-bottom-left -rotate-12 blur-md" />
        </div>

        {/* Floating Icons on Orbits */}
        <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 bg-white dark:bg-[#020617] rounded-full border-2 border-[#0ea5e9] shadow-[0_0_20px_#0ea5e9] animate-[spin_25s_linear_infinite_reverse]">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-8 h-8 drop-shadow-md" alt="Python" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 p-3 bg-white dark:bg-[#020617] rounded-full border-2 border-[#22c55e] shadow-[0_0_20px_#22c55e] animate-[spin_25s_linear_infinite_reverse]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" className="w-8 h-8 drop-shadow-md" alt="Power BI" />
            </div>
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 p-3 bg-white dark:bg-[#020617] rounded-full border-2 border-[#06b6d4] shadow-[0_0_20px_#06b6d4] animate-[spin_25s_linear_infinite_reverse]">
                <BrainCircuit className="w-8 h-8 text-[#06b6d4]" />
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 p-3 bg-white dark:bg-[#020617] rounded-full border-2 border-[#38bdf8] shadow-[0_0_20px_#38bdf8] animate-[spin_25s_linear_infinite_reverse]">
                <Code2 className="w-8 h-8 text-[#38bdf8]" />
            </div>
        </div>
    </div>
);

const CategorySection = ({ category, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.3 }}
        className="mb-16 relative"
    >
        {/* Ambient Category Glow Behind the Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-10 blur-[40px] opacity-20 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${category.glow.replace('rgba(','').replace('0.4)', '1)')}, transparent)` }} />

        {/* Category Heading with Floating Line Effect */}
        <div className="flex items-center gap-6 mb-8 mt-4 relative z-10 w-full overflow-hidden">
            <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-px w-full bg-gradient-to-r ${category.color} opacity-40`} 
            />
            <h3 className={`text-xl md:text-2xl font-black uppercase tracking-[0.3em] font-orbitron bg-gradient-to-r ${category.color} bg-clip-text text-transparent whitespace-nowrap drop-shadow-[0_0_15px_${category.glow.replace('0.4', '0.8')}] px-4`}>
                {category.name}
            </h3>
            <motion.div 
                initial={{ x: "100%" }}
                whileInView={{ x: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-px w-full bg-gradient-to-l ${category.color} opacity-40`} 
            />
        </div>

        {/* Skill Cards Grid */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
            {category.skills.map((skill) => (
                <SkillCard
                    key={skill.name}
                    name={skill.name}
                    iconName={skill.icon}
                    isImage={skill.isImage}
                    url={skill.url}
                    glow={category.glow}
                    colorGradient={category.color}
                />
            ))}
        </motion.div>
    </motion.div>
);

const Skills = () => {
    const { categories } = portfolioData.skills;

    return (
        <section id="skills" className="relative py-32 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            {/* Extreme Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <RadarAnimation />
                {/* Neon Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)] transition-colors duration-500" />
                
                {/* Moving Lights */}
                <motion.div
                    animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#06b6d4]/10 rounded-full blur-[140px] mix-blend-screen" 
                />
                <motion.div
                    animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-[150px] mix-blend-screen" 
                />

                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-[#0ea5e9]/50 dark:bg-white/40 rounded-full transition-colors duration-500 shadow-[0_0_10px_#0ea5e9]"
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -40, 0] }}
                        transition={{
                            duration: Math.random() * 4 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Cinematic Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24 relative"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-widest font-orbitron uppercase drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                        <span className="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#22c55e] bg-clip-text text-transparent">
                            Technical Arsenal
                        </span>
                    </h2>
                    {/* Animated scanning underline */}
                    <div className="relative h-[3px] w-72 mx-auto mt-8 bg-slate-300 dark:bg-white/10 overflow-hidden rounded-full transition-colors duration-500">
                        <motion.div
                            initial={{ left: "-100%" }}
                            whileInView={{ left: "100%" }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent shadow-[0_0_20px_#06b6d4]"
                        />
                    </div>
                </motion.div>

                {/* Categories */}
                <div className="space-y-4">
                    {categories.map((category, index) => (
                        <CategorySection key={category.name} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
