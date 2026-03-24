import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// MagneticButton — replaced useState position with MotionValues.
// This eliminates React re-renders entirely on mouse move.
const MagneticButton = ({ children, className, href, target, rel, onClick }) => {
    const ref = useRef(null);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        rawX.set((e.clientX - (left + width / 2)) * 0.2);
        rawY.set((e.clientY - (top + height / 2)) * 0.2);
    };

    const reset = () => {
        rawX.set(0);
        rawY.set(0);
    };

    const As = href ? motion.a : motion.button;

    return (
        <As
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x, y, willChange: 'transform' }}
            className={className}
        >
            {children}
        </As>
    );
};

export default MagneticButton;
