import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        
        const updateMousePosition = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        
        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('[role="button"]') || target.closest('.glass-hover')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Smooth spring configuration for the flashlight (slow trailing)
    const flashlightX = useSpring(-100, { damping: 40, stiffness: 150, mass: 1 });
    const flashlightY = useSpring(-100, { damping: 40, stiffness: 150, mass: 1 });
    
    // Snappy spring for the ring
    const ringX = useSpring(-100, { damping: 25, stiffness: 400, mass: 0.5 });
    const ringY = useSpring(-100, { damping: 25, stiffness: 400, mass: 0.5 });

    useEffect(() => {
        flashlightX.set(mousePos.x);
        flashlightY.set(mousePos.y);
        ringX.set(mousePos.x);
        ringY.set(mousePos.y);
    }, [mousePos, flashlightX, flashlightY, ringX, ringY]);

    if (isTouchDevice) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
            {/* Massive Ambient Flashlight Aura */}
            <motion.div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full mix-blend-screen opacity-20 dark:opacity-40"
                style={{
                    x: flashlightX,
                    y: flashlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, rgba(34,197,94,0.1) 40%, rgba(0,0,0,0) 70%)'
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_20px_rgba(56,189,248,1)] mix-blend-screen"
                style={{
                    x: mousePos.x,
                    y: mousePos.y,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
            />
            
            {/* Outer Ring & Glow Trail */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border-2 border-[#06b6d4] rounded-full mix-blend-screen flex items-center justify-center"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    boxShadow: '0 0 15px rgba(6,182,212,0.6), inset 0 0 10px rgba(6,182,212,0.4)'
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    backgroundColor: isHovering ? 'rgba(6,182,212,0.15)' : 'rgba(0,0,0,0)',
                    borderColor: isHovering ? '#22c55e' : '#06b6d4',
                    boxShadow: isHovering ? '0 0 30px rgba(34,197,94,0.6), inset 0 0 20px rgba(34,197,94,0.3)' : '0 0 15px rgba(6,182,212,0.6), inset 0 0 10px rgba(6,182,212,0.4)'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                {/* Center pulse when hovering */}
                <motion.div 
                    className="w-full h-full bg-white/20 rounded-full"
                    animate={{ scale: isHovering ? [1, 0.8, 1] : 0, opacity: isHovering ? [0.5, 0, 0.5] : 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.div>
        </div>
    );
};

export default CustomCursor;
