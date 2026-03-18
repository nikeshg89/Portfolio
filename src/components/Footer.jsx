import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 300);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <footer className="relative border-t py-12" style={{ borderColor: 'rgba(129,140,248,0.12)', background: 'rgba(6,8,15,0.95)' }}>
            {/* glow line at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #818cf8, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="font-heading font-bold text-2xl text-gradient mb-3">Nikesh<span className="text-white">.</span></p>
                <p className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    © 2026 Nikesh Kumar • Built with
                    <Heart size={14} className="text-red-400 fill-red-400 animate-pulse-slow" />
                </p>
            </div>

            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={scrollToTop}
                        style={{ background: 'linear-gradient(135deg,#818cf8,#a78bfa)' }}
                        className="animate-glow-pulse fixed bottom-8 right-8 p-3 rounded-full shadow-xl z-40 hover:scale-110 transition-transform"
                    >
                        <ArrowUp size={22} className="text-white" />
                    </motion.button>
                )}
            </AnimatePresence>
        </footer>
    );
};

export default Footer;
