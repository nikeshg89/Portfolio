import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { portfolioData } from '../data/portfolioData';

const About = () => {
    return (
        <Section id="about" title="About Me" subtitle="My journey and passion for technology">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass card-glow neon-border p-8 md:p-12 rounded-3xl max-w-4xl mx-auto text-center transition-all duration-500"
            >
                <div className="text-lg md:text-xl text-gray-300 leading-relaxed font-light space-y-5">
                    {portfolioData.about.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};

export default About;
