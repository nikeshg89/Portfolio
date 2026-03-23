import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ParticlesBackground = () => {
    const { scrollY } = useScroll();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse position from -1 to 1 setup
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth parallax springs
    const mouseX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

    useEffect(() => {
        mouseX.set(mousePos.x);
        mouseY.set(mousePos.y);
    }, [mousePos, mouseX, mouseY]);

    // Parallax scrolling multipliers
    const scrollYLayer1 = useTransform(scrollY, [0, 5000], [0, -200]);
    const scrollYLayer2 = useTransform(scrollY, [0, 5000], [0, -500]);
    const scrollYLayer3 = useTransform(scrollY, [0, 5000], [0, -800]);

    // Generate random static particles
    const [particles] = useState(() => {
        return Array.from({ length: 40 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            layer: Math.floor(Math.random() * 3) + 1, // 1 to 3
            duration: Math.random() * 10 + 5,
        }));
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
            
            {/* Dark gradient base mapping */}
            <div className="absolute inset-0 bg-transparent mix-blend-multiply opacity-50 dark:opacity-100 dark:bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" />

            {/* Layer 1 - Deep Background (Moves slowest vertically, opposite to mouse) */}
            <motion.div 
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ 
                    y: scrollYLayer1,
                    x: useTransform(mouseX, [-1, 1], [30, -30]),
                    translateY: useTransform(mouseY, [-1, 1], [30, -30]),
                }}
            >
                {particles.filter(p => p.layer === 1).map((p, i) => (
                    <motion.div key={`l1-${i}`} className="absolute rounded-full bg-slate-400 dark:bg-[#0ea5e9]"
                        style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
                        animate={{ opacity: [p.opacity, p.opacity * 2, p.opacity], scale: [1, 1.5, 1] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
                    />
                ))}
            </motion.div>

            {/* Layer 2 - Midground (Moves medium vertically, opposite to mouse with more intensity) */}
            <motion.div 
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ 
                    y: scrollYLayer2,
                    x: useTransform(mouseX, [-1, 1], [60, -60]),
                    translateY: useTransform(mouseY, [-1, 1], [60, -60]),
                }}
            >
                {particles.filter(p => p.layer === 2).map((p, i) => (
                    <motion.div key={`l2-${i}`} className="absolute rounded-full bg-slate-500 dark:bg-[#38bdf8] shadow-[0_0_5px_#38bdf8]"
                        style={{ top: p.top, left: p.left, width: p.size * 1.5, height: p.size * 1.5, opacity: p.opacity + 0.2 }}
                        animate={{ opacity: [p.opacity, p.opacity * 1.5, p.opacity] }}
                        transition={{ duration: p.duration * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}
            </motion.div>

            {/* Layer 3 - Foreground Ambient Orbs (Moves fastest vertically, with cursor movement) */}
            <motion.div 
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ 
                    y: scrollYLayer3,
                    x: useTransform(mouseX, [-1, 1], [-100, 100]), // Moves WITH mouse for true 3D
                    translateY: useTransform(mouseY, [-1, 1], [-100, 100]),
                }}
            >
                <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-gradient-to-r from-[#0ea5e9]/10 to-[#38bdf8]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-gradient-to-r from-[#22c55e]/10 to-[#10b981]/10 rounded-full blur-[100px]" />
                
                {particles.filter(p => p.layer === 3).map((p, i) => (
                    <motion.div key={`l3-${i}`} className="absolute rounded-full bg-slate-600 dark:bg-white shadow-[0_0_10px_white]"
                        style={{ top: p.top, left: p.left, width: p.size * 2, height: p.size * 2, opacity: p.opacity + 0.4 }}
                    />
                ))}
            </motion.div>

            {/* Ambient Fixed Foreground Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
        </div>
    );
};

export default ParticlesBackground;
