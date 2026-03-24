import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const isTouchDevice = useRef(
        typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    );

    // MotionValues — no re-renders, updated directly in event handler
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);
    const isHoveringMv = useMotionValue(0); // 0 = false, 1 = true, tracked via ref

    // Smooth spring for the large flashlight aura (slow trailing)
    const flashlightX = useSpring(rawX, { damping: 40, stiffness: 150, mass: 1 });
    const flashlightY = useSpring(rawY, { damping: 40, stiffness: 150, mass: 1 });

    // Snappy spring for the ring
    const ringX = useSpring(rawX, { damping: 25, stiffness: 400, mass: 0.5 });
    const ringY = useSpring(rawY, { damping: 25, stiffness: 400, mass: 0.5 });

    // Refs for ring animation state (no re-renders needed)
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const isHovering = useRef(false);

    useEffect(() => {
        if (isTouchDevice.current) return;

        const onMove = (e) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
        };

        const onOver = (e) => {
            const t = e.target;
            const hovering = !!(
                t.closest('a') ||
                t.closest('button') ||
                t.closest('input') ||
                t.closest('textarea') ||
                t.closest('[role="button"]') ||
                t.closest('.glass-hover')
            );
            if (hovering === isHovering.current) return; // no change
            isHovering.current = hovering;
            // Apply styles directly on the DOM nodes — zero re-renders
            if (ringRef.current) {
                ringRef.current.style.transform = hovering
                    ? 'translate(-50%, -50%) scale(1.8)'
                    : 'translate(-50%, -50%) scale(1)';
                ringRef.current.style.borderColor = hovering ? '#22c55e' : '#06b6d4';
                ringRef.current.style.boxShadow = hovering
                    ? '0 0 30px rgba(34,197,94,0.6), inset 0 0 20px rgba(34,197,94,0.3)'
                    : '0 0 15px rgba(6,182,212,0.6), inset 0 0 10px rgba(6,182,212,0.4)';
                ringRef.current.style.backgroundColor = hovering
                    ? 'rgba(6,182,212,0.15)'
                    : 'rgba(0,0,0,0)';
            }
            if (dotRef.current) {
                dotRef.current.style.opacity = hovering ? '0' : '1';
                dotRef.current.style.transform = `translate(-50%, -50%) scale(${hovering ? 0 : 1})`;
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
        };
    }, [rawX, rawY]);

    if (isTouchDevice.current) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
            {/* Large ambient flashlight aura */}
            <motion.div
                className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full mix-blend-screen opacity-20 dark:opacity-40"
                style={{
                    x: flashlightX,
                    y: flashlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, rgba(34,197,94,0.1) 40%, rgba(0,0,0,0) 70%)',
                    willChange: 'transform',
                }}
            />

            {/* Inner dot — follows cursor exactly */}
            <motion.div
                ref={dotRef}
                className="fixed top-0 left-0 w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_20px_rgba(56,189,248,1)] mix-blend-screen"
                style={{
                    x: rawX,
                    y: rawY,
                    translateX: '-50%',
                    translateY: '-50%',
                    transition: 'opacity 0.15s, transform 0.15s',
                    willChange: 'transform',
                }}
            />

            {/* Outer ring — spring-lagged */}
            <motion.div
                ref={ringRef}
                className="fixed top-0 left-0 w-12 h-12 border-2 border-[#06b6d4] rounded-full mix-blend-screen"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    boxShadow: '0 0 15px rgba(6,182,212,0.6), inset 0 0 10px rgba(6,182,212,0.4)',
                    transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
                    willChange: 'transform',
                }}
            />
        </div>
    );
};

export default CustomCursor;
