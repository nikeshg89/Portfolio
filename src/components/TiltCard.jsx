import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className, style }) => {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Reduced stiffness/damping for smoother, lighter springs
    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
            className={className}
        >
            <div style={{ transform: 'translateZ(20px)' }} className="w-full h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
