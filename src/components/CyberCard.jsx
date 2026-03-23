import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import TiltCard from './TiltCard';

const CyberCard = ({ children, className = '', colorFrom = '#06b6d4', colorTo = '#0ea5e9', glowColor = 'rgba(6,182,212,0.4)', disableFloat = false, ...props }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div 
            animate={disableFloat ? {} : { y: [-6, 6, -6] }} 
            transition={{ duration: Math.random() * 2 + 3.5, repeat: Infinity, ease: 'easeInOut' }} 
            className={`w-full h-full ${className}`}
        >
            <TiltCard className="h-full group relative cursor-pointer" style={{ transformStyle: 'preserve-3d' }}>
                <motion.div
                    onMouseMove={handleMouseMove}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative flex flex-col h-full w-full transition-all duration-300 rounded-[1.6rem]"
                    style={{ transform: "translateZ(20px)" }}
                    {...props}
                >
                    {/* Spinning Electric Neon Laser Border */}
                    <div className="pointer-events-none absolute inset-[-3px] rounded-[1.6rem] z-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                        <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] origin-center -translate-x-1/2 -translate-y-1/2 animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_50%,#06b6d4_65%,#a855f7_80%,#22c55e_90%,#0ea5e9_100%)] blur-[2px]" />
                    </div>

                    {/* Massive Energy Glow Pulse Behind the Card */}
                    <div className="pointer-events-none absolute inset-0 bg-[#06b6d4]/0 group-hover:bg-[#06b6d4]/20 blur-[60px] z-[-1] transition-colors duration-500" />

                    {/* The Inner Card Structure */}
                    <div className="relative z-10 flex flex-col h-full w-full bg-slate-50/80 dark:bg-[#0f172a]/80 backdrop-blur-3xl rounded-[1.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] transition-colors duration-500">
                        
                        {/* Dynamic Mouse Spotlight Volumetric Glare */}
                        <motion.div
                            className="pointer-events-none absolute -inset-[1px] rounded-[1.5rem] opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-screen z-[25]"
                            style={{
                                background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.2), transparent 40%), radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 70%)`
                            }}
                        />

                        {/* Glass Reflections Sweep Layer */}
                        <div className="pointer-events-none absolute inset-0 z-[30] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-[1.5rem]">
                            <motion.div
                                animate={{ x: ['-250%', '250%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                                className="w-[150%] h-[150%] absolute top-[-25%] left-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent skew-x-[-25deg]"
                            />
                        </div>

                        {/* AI Sci-Fi Grid Overlay */}
                        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-30 transition duration-700 bg-[linear-gradient(rgba(6,182,212,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.4)_1px,transparent_1px)] bg-[size:15px_15px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_30%,transparent_100%)] mix-blend-screen" />

                        {/* Hologram Reflection Layer */}
                        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#06b6d4]/10 via-transparent to-[#22c55e]/10 mix-blend-screen" />

                        {/* Inner 3D Content Wrapper for the actual child content */}
                        <div className="relative z-[35] flex flex-col h-full w-full pointer-events-auto" style={{ transform: "translateZ(35px)" }}>
                            {children}
                        </div>
                    </div>
                </motion.div>
            </TiltCard>
        </motion.div>
    );
};

export default CyberCard;
