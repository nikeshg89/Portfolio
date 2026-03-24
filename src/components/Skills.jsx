import React, { memo } from 'react';
import { motion } from 'framer-motion';
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

// Stagger only every other child for speed
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

// Static particles generated once at module level
const SKILL_PARTICLES = Array.from({ length: 12 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 3,
}));

const SkillCard = memo(({ name, iconName, glow, isImage, url }) => {
    const Icon = ICON_MAP[iconName] || Code2;
    const { theme } = useTheme();

    return (
        <motion.div variants={cardVariants} className="h-full">
            <CyberCard className="h-full group" glowColor={glow.replace('0.4', '0.5')}>
                <div className="relative flex flex-col items-center justify-center gap-3 p-5 h-full bg-transparent border-none z-10 pointer-events-auto w-full">
                    <div
                        className="p-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 relative z-10"
                        style={{ background: theme === 'dark' ? glow.replace('0.4', '0.08') : glow.replace('0.4', '0.05') }}
                    >
                        {isImage ? (
                            <img
                                src={url}
                                alt={name}
                                className="w-8 h-8 object-contain"
                                style={{ filter: `drop-shadow(0 0 6px ${glow.replace('0.4', '0.5')})` }}
                            />
                        ) : (
                            <Icon
                                className="w-8 h-8"
                                style={{ color: theme === 'dark' ? '#f8fafc' : '#334155', filter: `drop-shadow(0 0 6px ${glow.replace('0.4', '0.5')})` }}
                            />
                        )}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200 text-center tracking-wide group-hover:text-[#0ea5e9] dark:group-hover:text-white transition-colors duration-200 relative z-10 font-heading">
                        {name}
                    </span>
                </div>
            </CyberCard>
        </motion.div>
    );
});
SkillCard.displayName = 'SkillCard';

// Lightweight static radar — no spinning elements, just decorative lines
const RadarDecoration = memo(() => (
    <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-20 dark:opacity-30 overflow-hidden -z-10 translate-x-1/2 -translate-y-1/3">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#06b6d4] rounded-full shadow-[0_0_20px_#06b6d4]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-[#06b6d4]/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-[#0ea5e9]/25 border-dashed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#22c55e]/15" />
    </div>
));
RadarDecoration.displayName = 'RadarDecoration';

const CategorySection = memo(({ category, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: 'easeOut' }}
        className="mb-14 relative"
    >
        <div className="flex items-center gap-5 mb-7 mt-3 relative z-10 w-full overflow-hidden">
            <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`h-px w-full bg-gradient-to-r ${category.color} opacity-35`}
            />
            <h3 className={`text-xl md:text-2xl font-black uppercase tracking-[0.25em] font-orbitron bg-gradient-to-r ${category.color} bg-clip-text text-transparent whitespace-nowrap px-3`}>
                {category.name}
            </h3>
            <motion.div
                initial={{ x: '100%' }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`h-px w-full bg-gradient-to-l ${category.color} opacity-35`}
            />
        </div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
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
));
CategorySection.displayName = 'CategorySection';

const Skills = () => {
    const { categories } = portfolioData.skills;

    return (
        <section id="skills" className="relative py-28 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <RadarDecoration />
                {/* Subtle grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(56,189,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)] transition-colors duration-500" />
                
                {/* Static ambient glows — no animation */}
                <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#06b6d4]/8 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#22c55e]/8 rounded-full blur-[110px] mix-blend-screen" />

                {/* Lightweight static particles — no Math.random() in render */}
                {SKILL_PARTICLES.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#0ea5e9]/40 dark:bg-white/30 rounded-full"
                        style={{ top: p.top, left: p.left, willChange: 'opacity, transform' }}
                        animate={{ opacity: [0, 0.7, 0], y: [0, -30, 0] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20 relative"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-widest font-orbitron uppercase drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                        <span className="bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] to-[#22c55e] bg-clip-text text-transparent">
                            Technical Arsenal
                        </span>
                    </h2>
                    <div className="relative h-[3px] w-64 mx-auto mt-6 bg-slate-300 dark:bg-white/10 overflow-hidden rounded-full transition-colors duration-500">
                        <motion.div
                            initial={{ left: '-100%' }}
                            whileInView={{ left: '100%' }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent"
                        />
                    </div>
                </motion.div>

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
