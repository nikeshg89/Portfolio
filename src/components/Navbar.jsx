import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Code2, Briefcase, Mail, FolderGit2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover } from '../utils/sounds';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const rafRef = useRef(null);
    const rafRef2 = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 40);
                rafRef.current = null;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafRef.current); };
    }, []);

    const navLinks = [
        { id: 'home',       icon: Home,       label: 'Home',     href: '#home' },
        { id: 'about',      icon: User,       label: 'About',    href: '#about' },
        { id: 'skills',     icon: Code2,      label: 'Skills',   href: '#skills' },
        { id: 'projects',   icon: FolderGit2, label: 'Projects', href: '#projects' },
        { id: 'experience', icon: Briefcase,  label: 'Exp',      href: '#experience' },
        { id: 'contact',    icon: Mail,       label: 'Contact',  href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef2.current) return;
            rafRef2.current = requestAnimationFrame(() => {
                const sections = navLinks.map(l => document.querySelector(l.href));
                const pos = window.scrollY + 220;
                let current = 'home';
                sections.forEach((sec, i) => {
                    if (sec && sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
                        current = navLinks[i].id;
                    }
                });
                setActiveTab(current);
                rafRef2.current = null;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafRef2.current); };
    }, []);

    const ThemeToggleButton = ({ isMobile }) => (
        <motion.button
            onClick={() => { toggleTheme(); playClick(); }}
            onMouseEnter={() => playHover()}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-500
                ${isMobile 
                    ? 'w-10 h-10 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#020617]/50 text-slate-700 dark:text-yellow-400 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                    : 'w-10 h-10 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-yellow-400 backdrop-blur-md ml-2'
                } hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]`}
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div key="moon" initial={{ y: -20, opacity: 0, rotate: -90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 20, opacity: 0, rotate: 90 }} transition={{ duration: 0.3 }}>
                        <Moon size={isMobile ? 20 : 18} className="text-[#38bdf8]" />
                    </motion.div>
                ) : (
                    <motion.div key="sun" initial={{ y: 20, opacity: 0, rotate: 90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -20, opacity: 0, rotate: -90 }} transition={{ duration: 0.3 }}>
                        <Sun size={isMobile ? 20 : 18} className="text-amber-500" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );

    return (
        <>
            {/* Desktop Navbar */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 p-2 rounded-full transition-all duration-500 ${
                    scrolled
                        ? 'bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_10px_40px_rgba(14,165,233,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
                        : 'bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/5 shadow-lg'
                }`}
            >
                {navLinks.map((link) => {
                    const isActive = activeTab === link.id;
                    return (
                        <motion.a
                            key={link.id}
                            href={link.href}
                            onClick={() => { setActiveTab(link.id); playClick(); }}
                            onMouseEnter={() => playHover()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold tracking-wide transition-colors duration-300 overflow-hidden group ${
                                isActive 
                                    ? 'text-white' 
                                    : 'text-slate-600 dark:text-gray-400 hover:text-[#0ea5e9] dark:hover:text-[#38bdf8]'
                            }`}
                        >
                            {/* Hover Glow Background */}
                            <div className="absolute inset-0 bg-white/20 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
                            
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: theme === 'dark' ? 'linear-gradient(135deg, #0ea5e9, #22c55e)' : 'linear-gradient(135deg, #0284c7, #16a34a)',
                                        boxShadow: theme === 'dark' ? '0 0 20px rgba(14,165,233,0.4), inset 0 0 10px rgba(255,255,255,0.2)' : '0 5px 15px rgba(2,132,199,0.3)',
                                    }}
                                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <link.icon size={16} />
                                <span>{link.label}</span>
                            </span>
                        </motion.a>
                    );
                })}
                
                <div className="w-px h-8 bg-slate-300 dark:bg-white/15 mx-2 rounded-full" />
                <ThemeToggleButton isMobile={false} />
            </motion.div>

            {/* Mobile Top Bar */}
            <div className={`fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-6 py-4 transition-all duration-500 ${
                scrolled ? 'bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 shadow-lg' : 'bg-transparent'
            }`}>
                <span className="font-black text-2xl tracking-tighter text-slate-800 dark:text-white font-orbitron">
                    Nikesh<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#22c55e]">.</span>
                </span>
                <div className="flex items-center gap-4">
                    <ThemeToggleButton isMobile={true} />
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-700 dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[60] bg-white/95 dark:bg-[#020617]/95 flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0ea5e9]/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#22c55e]/20 rounded-full blur-[100px] pointer-events-none" />

                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center gap-6 relative z-10 w-full px-12">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => { setIsMobileMenuOpen(false); playClick(); }}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1, type: 'spring', bounce: 0.4 }}
                                    className="text-2xl font-black tracking-wider text-slate-800 dark:text-white hover:text-[#0ea5e9] dark:hover:text-[#38bdf8] flex items-center justify-center gap-4 transition-colors w-full p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                                >
                                    <link.icon size={28} className={activeTab === link.id ? "text-[#0ea5e9] dark:text-[#22c55e]" : ""} />
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
