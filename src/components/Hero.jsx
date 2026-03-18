import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MessageCircle, Upload } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import defaultProfileImg from '../assets/images/profile.png';

const Hero = () => {
    const { hero, personal } = portfolioData;
    const [textIndex, setTextIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);
    const [profileImg, setProfileImg] = useState(defaultProfileImg);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollY } = useScroll();
    const y1Base = useTransform(scrollY, [0, 500], [0, 200]);
    const y2Base = useTransform(scrollY, [0, 500], [0, -150]);
    const y1 = isMobile ? 0 : y1Base;
    const y2 = isMobile ? 0 : y2Base;

    const longestText = hero.rotatingText.reduce((a, b) => (a.length > b.length ? a : b), '');

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % hero.rotatingText.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [hero.rotatingText.length]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id="home" className="relative min-h-[110vh] flex items-center pt-32 pb-20 overflow-hidden">

            {/* Animated background blobs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="blob-1 absolute top-[8%] left-[5%] w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
                <div className="blob-2 absolute bottom-[10%] right-[5%] w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
                <div className="blob-3 absolute top-[50%] left-[55%] w-72 h-72 bg-accent/8 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* ── Left ── */}
                <motion.div
                    style={{ y: y1 }}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="z-10 relative min-w-0 overflow-hidden"
                >
                    {/* "Open to work" badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-gray-300 font-semibold tracking-widest text-xs">OPEN TO WORK</span>
                    </motion.div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 leading-[1.15] tracking-tight">
                        I am a{' '}
                        {/* Rotating text: fixed height container so text never overflows */}
                        <span className="block mt-1 relative" style={{ minHeight: '1.25em' }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={textIndex}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="absolute left-0 top-0 text-gradient leading-tight"
                                    style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                                >
                                    {hero.rotatingText[textIndex]}
                                </motion.span>
                            </AnimatePresence>
                            {/* invisible spacer — wraps normally to reserve height */}
                            <span
                                className="block opacity-0 select-none pointer-events-none text-gradient leading-tight"
                                style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                                aria-hidden="true"
                            >
                                {longestText}
                            </span>
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">{hero.subtitle}</p>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-4 mb-14">
                        <a href="#projects" className="btn-glow text-white flex items-center gap-2 group">
                            View Projects
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href={personal.resume} target="_blank" rel="noreferrer" className="btn-outline-glow flex items-center gap-2">
                            <Download size={18} />
                            Download CV
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-md">
                        <div>
                            <div className="text-3xl font-bold text-gradient font-heading mb-1">{personal.stats.cgpa}</div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest font-semibold">CGPA</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gradient font-heading mb-1">{personal.stats.projects}</div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Projects</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gradient font-heading mb-1">Active</div>
                            <div className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Status</div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Right: Profile Card ── */}
                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                    className="relative flex justify-center mx-auto mt-8 lg:mt-0 flex-shrink-0"
                >
                    <div className="relative w-full max-w-[380px]">
                        {/* floating card */}
                        <div className="animate-float">
                            {/* glow ring behind card */}
                            <div className="absolute inset-0 rounded-[2rem] blur-2xl opacity-20"
                                style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa, #38bdf8)' }} />

                            <div className="relative neon-border rounded-[2rem] px-6 py-8 flex flex-col items-center overflow-hidden transition-all duration-500"
                                style={{ background: 'linear-gradient(160deg, rgba(13,17,23,0.9), rgba(17,24,39,0.85))' }}>

                                {/* top shimmer */}
                                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                                {/* Avatar */}
                                <div className="relative w-56 h-56 mb-6 cursor-pointer group">
                                    {/* spinning gradient ring */}
                                    <div className="ring-spin absolute inset-0 rounded-full p-[3px]"
                                        style={{ background: 'linear-gradient(135deg, #818cf8, #a78bfa, #38bdf8, #818cf8)' }}>
                                        <div className="w-full h-full rounded-full bg-dark-2" />
                                    </div>
                                    <div className="absolute inset-[3px] rounded-full overflow-hidden bg-dark-2 flex items-center justify-center">
                                        {profileImg ? (
                                            <img src={profileImg} alt={personal.name} className="w-full h-full object-cover object-top" />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-500">
                                                <Upload size={28} className="mb-1" />
                                                <span className="text-xs font-semibold uppercase tracking-wider">Upload Photo</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        title="Upload your photo"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-1 font-heading">{personal.name}</h3>
                                <p className="text-primary text-sm font-medium tracking-wide mb-5">Aspiring Data Scientist</p>

                                {/* tag pills */}
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {['Python', 'Power BI', 'Data Science'].map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg text-xs text-primary/80 border border-primary/20 bg-primary/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Social bar */}
                                <div className="flex justify-around w-full border-t border-white/10 pt-4">
                                    {[
                                        { href: personal.github, icon: Github, label: 'GitHub' },
                                        { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn' },
                                        { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
                                        { href: '#contact', icon: MessageCircle, label: 'Contact' },
                                    ].map(({ href, icon: Icon, label }) => (
                                        <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                                            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors group/icon">
                                            <div className="p-2.5 rounded-full bg-white/5 group-hover/icon:bg-primary/10 group-hover/icon:shadow-[0_0_12px_rgba(129,140,248,0.4)] transition-all">
                                                <Icon size={17} />
                                            </div>
                                            <span className="text-[8px] uppercase tracking-wider font-semibold opacity-70">{label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
