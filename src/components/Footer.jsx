import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const SOCIALS = [
        { icon: Linkedin, href: 'https://www.linkedin.com/in/menikesh08/', color: 'hover:text-[#0ea5e9]', glow: 'hover:shadow-[0_0_20px_#0ea5e9]' },
        { icon: Github, href: 'https://github.com/nikeshg89', color: 'hover:text-white', glow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]' },
        { icon: Mail, href: 'mailto:nikeshgupta950@gmail.com', color: 'hover:text-[#22c55e]', glow: 'hover:shadow-[0_0_20px_#22c55e]' }
    ];

    return (
        <footer className="relative bg-gradient-to-t from-slate-100 to-slate-50 dark:from-[#020617] dark:to-[#0f172a] pt-20 pb-10 overflow-hidden">
            {/* Extremely Glowy Top Border */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent shadow-[0_0_20px_#0ea5e9]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#22c55e] to-transparent shadow-[0_0_30px_#22c55e]" />

            {/* Ambient Background Glows */}
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                {/* Logo & Name */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#0ea5e9]/20 to-[#22c55e]/20 blur-xl rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-black font-orbitron tracking-tighter relative z-10">
                        <span className="text-slate-800 dark:text-white">Nikesh</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#22c55e]">.</span>
                    </h2>
                </motion.div>

                {/* Social Icons */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 mb-12"
                >
                    {SOCIALS.map((Social, i) => (
                        <motion.a
                            key={i}
                            href={Social.href}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-[#0f172a] text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-white/10 shadow-lg transition-all duration-300 ${Social.color} ${Social.glow}`}
                        >
                            <Social.icon size={24} />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Separator */}
                <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent mb-8" />

                {/* Copyright Text */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-500 dark:text-gray-400 font-medium"
                >
                    <span>© {new Date().getFullYear()} Nikesh Kumar.</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="flex items-center gap-2">
                        Built with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-[pulse_1s_ease-in-out_infinite]" /> & React
                    </span>
                    <Sparkles className="w-4 h-4 text-[#0ea5e9] animate-pulse" />
                </motion.div>
            </div>

            {/* Fixed Scroll To Top Button */}
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -5, boxShadow: '0 0 30px rgba(14,165,233,0.6)' }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#22c55e] flex items-center justify-center text-white shadow-xl z-[60] group border border-white/20"
            >
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowUp size={24} className="group-hover:animate-bounce" />
            </motion.button>
        </footer>
    );
};

export default Footer;
