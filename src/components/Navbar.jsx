import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code2, Briefcase, Mail, FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClick, playHover } from '../utils/sounds';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
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
            const sections = navLinks.map(l => document.querySelector(l.href));
            const pos = window.scrollY + 220;
            sections.forEach((sec, i) => {
                if (sec && sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
                    setActiveTab(navLinks[i].id);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Desktop pill nav */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 p-2 rounded-full transition-all duration-500 ${
                    scrolled
                        ? 'bg-dark/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-primary/10'
                        : 'bg-white/5 backdrop-blur-md border border-white/5'
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
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 text-sm font-medium ${
                                isActive ? 'text-dark' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa)' }}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.55 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <link.icon size={15} />
                                <span className="hidden md:inline-block">{link.label}</span>
                            </span>
                        </motion.a>
                    );
                })}
            </motion.div>

            {/* Mobile top bar */}
            <div className="fixed top-0 left-0 w-full z-50 md:hidden flex justify-between items-center px-5 py-4 bg-dark/80 backdrop-blur-2xl border-b border-white/10">
                <span className="font-bold text-xl tracking-tight text-white font-heading">
                    Nikesh<span className="text-gradient">.</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-300 hover:text-primary transition-colors">
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors p-2"
                        >
                            <X size={30} />
                        </button>

                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={link.id}
                                href={link.href}
                                onClick={() => { setIsMobileMenuOpen(false); playClick(); }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                className="text-2xl font-bold text-gray-300 hover:text-gradient flex items-center gap-4 transition-colors"
                            >
                                <link.icon size={26} />
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
