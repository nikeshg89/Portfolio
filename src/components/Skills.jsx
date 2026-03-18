import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import TiltCard from './TiltCard';
import { portfolioData } from '../data/portfolioData';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const Skills = () => {
    const { technical, soft } = portfolioData.skills;

    return (
        <Section id="skills" title="Technical Arsenal" subtitle="Tools and technologies I use to build scalable solutions">

            <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-8 pl-4 border-l-4 font-heading"
                    style={{ borderColor: '#818cf8' }}>
                    Core Tech Stack
                </h3>
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {technical.map((skill, idx) => (
                        <TiltCard
                            key={idx}
                            variants={item}
                            className="glass glass-hover card-glow p-6 rounded-2xl flex flex-col gap-4 group w-full cursor-default"
                        >
                            <div className="flex items-center gap-4 w-full">
                                <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <skill.icon size={22} className="text-primary group-hover:drop-shadow-glow transition-all" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-200 font-semibold group-hover:text-white transition-colors text-sm">
                                            {skill.name}
                                        </span>
                                        <span className="text-xs font-bold text-gradient">{skill.progress}%</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="w-full bg-white/8 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.progress}%` }}
                                            transition={{ duration: 1.6, ease: 'easeOut', delay: idx * 0.05 }}
                                            viewport={{ once: true }}
                                            className="h-2 rounded-full shimmer"
                                            style={{ background: 'linear-gradient(90deg, #818cf8, #a78bfa, #38bdf8)' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </motion.div>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-white mb-8 pl-4 border-l-4 font-heading"
                    style={{ borderColor: '#a78bfa' }}>
                    Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                    {soft.map((skill, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.07 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.07 }}
                            className="px-6 py-3 rounded-full text-sm font-medium text-gray-300 cursor-default transition-all"
                            style={{
                                background: 'rgba(129,140,248,0.07)',
                                border: '1px solid rgba(129,140,248,0.2)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(129,140,248,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Skills;
