import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const CustomScrollbar = () => {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Apply a smooth spring so the scrollbar thumb glides elegantly
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 40,
        stiffness: 300,
        restDelta: 0.001
    });

    // We transform the 0 to 1 progress into moving from 0% from top of container to 100% from top.
    const topPosition = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
    // At the same time, we need to shift the thumb up by its own height when it reaches the bottom, so it doesn't go off-screen.
    const yOffset = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);

    // Handle showing/hiding on scroll
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleScroll = () => {
            setIsVisible(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setIsVisible(false);
            }, 1500); // Hide after 1.5s of no scrolling
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="fixed top-2 bottom-2 right-1 md:right-2 w-1.5 md:w-2 z-[999999] pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0.2 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
            >
                <motion.div
                    style={{
                        top: topPosition,
                        y: yOffset
                    }}
                    className="absolute left-0 right-0 h-16 md:h-24 bg-white/40 backdrop-blur-md rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                />
            </motion.div>
        </div>
    );
};

export default CustomScrollbar;
