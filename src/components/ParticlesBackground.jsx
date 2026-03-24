import React, { useEffect, memo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

// Particles generated once at module level — never re-created
const PARTICLES = Array.from({ length: 20 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    layer: Math.floor(Math.random() * 3) + 1,
    duration: Math.random() * 10 + 5,
}));

const layer1 = PARTICLES.filter(p => p.layer === 1);
const layer2 = PARTICLES.filter(p => p.layer === 2);
const layer3 = PARTICLES.filter(p => p.layer === 3);

const ParticlesBackground = memo(() => {
    const { scrollY } = useScroll();

    // Use MotionValues for mouse — zero re-renders
    const rawMouseX = useMotionValue(0);
    const rawMouseY = useMotionValue(0);
    const mouseX = useSpring(rawMouseX, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(rawMouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const onMove = (e) => {
            rawMouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawMouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, [rawMouseX, rawMouseY]);

    // Parallax scrolling
    const scrollYLayer1 = useTransform(scrollY, [0, 5000], [0, -200]);
    const scrollYLayer2 = useTransform(scrollY, [0, 5000], [0, -500]);
    const scrollYLayer3 = useTransform(scrollY, [0, 5000], [0, -800]);

    const l1x = useTransform(mouseX, [-1, 1], [30, -30]);
    const l1y = useTransform(mouseY, [-1, 1], [30, -30]);
    const l2x = useTransform(mouseX, [-1, 1], [60, -60]);
    const l2y = useTransform(mouseY, [-1, 1], [60, -60]);
    const l3x = useTransform(mouseX, [-1, 1], [-100, 100]);
    const l3y = useTransform(mouseY, [-1, 1], [-100, 100]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
            {/* Layer 1 — Deep Background */}
            <motion.div
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ y: scrollYLayer1, x: l1x, translateY: l1y, willChange: 'transform' }}
            >
                {layer1.map((p, i) => (
                    <motion.div
                        key={`l1-${i}`}
                        className="absolute rounded-full bg-slate-400 dark:bg-[#0ea5e9]"
                        style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: p.opacity, willChange: 'transform, opacity' }}
                        animate={{ opacity: [p.opacity, p.opacity * 2, p.opacity], scale: [1, 1.5, 1] }}
                        transition={{ duration: p.duration, repeat: Infinity, ease: 'linear' }}
                    />
                ))}
            </motion.div>

            {/* Layer 2 — Midground */}
            <motion.div
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ y: scrollYLayer2, x: l2x, translateY: l2y, willChange: 'transform' }}
            >
                {layer2.map((p, i) => (
                    <motion.div
                        key={`l2-${i}`}
                        className="absolute rounded-full bg-slate-500 dark:bg-[#38bdf8]"
                        style={{ top: p.top, left: p.left, width: p.size * 1.5, height: p.size * 1.5, opacity: p.opacity + 0.2, willChange: 'opacity' }}
                        animate={{ opacity: [p.opacity, p.opacity * 1.5, p.opacity] }}
                        transition={{ duration: p.duration * 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                ))}
            </motion.div>

            {/* Layer 3 — Foreground Ambient Orbs */}
            <motion.div
                className="absolute inset-[-10%] w-[120%] h-[120%]"
                style={{ y: scrollYLayer3, x: l3x, translateY: l3y, willChange: 'transform' }}
            >
                <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-gradient-to-r from-[#0ea5e9]/10 to-[#38bdf8]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-gradient-to-r from-[#22c55e]/10 to-[#10b981]/10 rounded-full blur-[100px]" />
                {layer3.map((p, i) => (
                    <div
                        key={`l3-${i}`}
                        className="absolute rounded-full bg-slate-600 dark:bg-white"
                        style={{ top: p.top, left: p.left, width: p.size * 2, height: p.size * 2, opacity: p.opacity + 0.4 }}
                    />
                ))}
            </motion.div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.02)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
        </div>
    );
});

ParticlesBackground.displayName = 'ParticlesBackground';

export default ParticlesBackground;
