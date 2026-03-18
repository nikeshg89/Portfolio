import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award, BookOpen, ExternalLink } from 'lucide-react';
import Section from './Section';
import { portfolioData } from '../data/portfolioData';

const TimelineItem = ({ title, subtitle, date, description, icon: Icon, delay, link }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, ease: 'easeOut' }}
        className="relative pl-8 pb-10 border-l last:pb-0"
        style={{ borderColor: 'rgba(129,140,248,0.2)' }}
    >
        {/* Icon dot */}
        <div className="absolute left-[-20px] top-0 p-2 rounded-full border"
            style={{
                background: 'linear-gradient(135deg,rgba(129,140,248,0.15),rgba(167,139,250,0.15))',
                borderColor: 'rgba(129,140,248,0.3)',
            }}>
            <Icon size={14} className="text-primary" />
        </div>

        <h3 className="text-xl font-bold text-white mb-1 font-heading">{title}</h3>
        <div className="text-sm font-semibold mb-2" style={{ color: '#818cf8' }}>{subtitle}</div>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
            <Calendar size={11} /> {date}
        </div>
        {description && <p className="text-gray-400 text-sm leading-relaxed mb-3">{description}</p>}
        {link && (
            <a href={link} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
                View Certificate <ExternalLink size={11} />
            </a>
        )}
    </motion.div>
);

const CertCard = ({ title, subtitle, date, delay, link }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="glass card-glow neon-border rounded-2xl p-6 flex flex-col justify-between min-h-[160px] transition-all duration-400 cursor-default"
    >
        <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-white font-heading pr-2">{title}</h3>
            <div className="p-2 rounded-lg flex-shrink-0" style={{ background: 'rgba(167,139,250,0.1)' }}>
                <Award size={18} className="text-secondary" />
            </div>
        </div>
        {subtitle && <div className="text-gray-400 text-sm mb-2">{subtitle}</div>}
        {date && <div className="text-xs text-gray-600 mb-3">{date}</div>}
        {link && (
            <a href={link} target="_blank" rel="noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest hover:text-white transition-colors">
                View Certificate <ExternalLink size={11} />
            </a>
        )}
    </motion.div>
);

const Experience = () => {
    const { training, certifications, extracurricular, education } = portfolioData;

    return (
        <div id="experience">
            {/* Training */}
            <Section title="Training & Internships" className="bg-white/[0.015]">
                <div className="max-w-3xl mx-auto ml-4 md:ml-auto">
                    {training.map((item, idx) => (
                        <TimelineItem
                            key={idx}
                            title={item.title}
                            subtitle={item.company}
                            date={item.date}
                            description={item.desc}
                            icon={Briefcase}
                            delay={idx * 0.1}
                            link={item.link}
                        />
                    ))}
                </div>
            </Section>

            {/* Certifications */}
            <Section title="Certifications">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certifications.map((cert, idx) => (
                        <CertCard
                            key={idx}
                            title={cert.title}
                            subtitle={cert.issuer}
                            date={cert.date}
                            delay={idx * 0.1}
                            link={cert.link}
                        />
                    ))}
                </div>
            </Section>

            {/* Extracurricular */}
            <Section title="Extracurricular" className="bg-white/[0.015]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {extracurricular.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -4 }}
                            viewport={{ once: true }}
                            className="glass card-glow neon-border rounded-2xl p-6 flex items-start gap-4 transition-all duration-400"
                        >
                            <div className="p-3 rounded-xl flex-shrink-0"
                                style={{ background: 'rgba(129,140,248,0.1)' }}>
                                <Award className="text-primary" size={22} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 font-heading">{item.role}</h3>
                                <div className="text-sm mb-2" style={{ color: '#818cf8' }}>{item.org}</div>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Education */}
            <Section title="Education">
                <div className="max-w-3xl mx-auto ml-4 md:ml-auto">
                    {education.map((edu, idx) => (
                        <TimelineItem
                            key={idx}
                            title={edu.school}
                            subtitle={`${edu.degree} • ${edu.grade}`}
                            date={edu.year}
                            icon={BookOpen}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default Experience;
