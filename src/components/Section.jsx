import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, title, subtitle, children, className = '' }) => {
    return (
        <section id={id} className={`py-24 lg:py-32 relative overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.65 }}
                        className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
                    >
                        {title && (
                            <h2 className="text-3xl md:text-5xl font-bold mb-5 font-heading tracking-tight text-gradient">
                                {title}
                            </h2>
                        )}
                        {/* gradient underline */}
                        <div className="w-20 h-1 mx-auto rounded-full mb-6"
                            style={{ background: 'linear-gradient(90deg,#818cf8,#a78bfa,#38bdf8)' }} />
                        {subtitle && (
                            <p className="text-gray-400 text-lg leading-relaxed">{subtitle}</p>
                        )}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
