import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const transitionEvents = new EventTarget();

export const navigateWithTransition = (path: string) => {
    transitionEvents.dispatchEvent(new CustomEvent('startTransition', { detail: path }));
};

const PageTransitionOverlay = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<'idle' | 'enter' | 'loading' | 'exit'>('idle');
    const navigate = useNavigate();

    const MIN_DURATION = 1500; // Guarantee 1.5s loading
    const cinematicEasing = [0.76, 0, 0.24, 1];

    useEffect(() => {
        const handleStart = (e: Event) => {
            const customEvent = e as CustomEvent;
            const targetPath = customEvent.detail;

            setIsActive(true);
            setPhase('enter');

            // Phase 1: Enter Mask completes
            setTimeout(() => {
                navigate(targetPath);
                setPhase('loading');

                // Simulate robust Promise synchronization where we wait for MIN_DURATION
                // In reality, Promise.all([dataFetch(), minDuration()]) goes here
                setTimeout(() => {
                    setPhase('exit');

                    // Cleanup exactly when exit finishes
                    setTimeout(() => {
                        setIsActive(false);
                        setPhase('idle');
                    }, 1200);

                }, MIN_DURATION);

            }, 1200); // Wait for enter animation (1.2s)
        };

        transitionEvents.addEventListener('startTransition', handleStart);
        return () => transitionEvents.removeEventListener('startTransition', handleStart);
    }, [navigate]);

    return (
        <AnimatePresence>
            {isActive && (
                <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden">

                    {/* ENTRANCE STROKES */}
                    <AnimatePresence>
                        {phase === 'enter' && (
                            <>
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: [0, 10, 20], opacity: [1, 0.5, 0] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: cinematicEasing }}
                                    className="absolute w-[15vw] h-[15vw] aspect-square rounded-full border-[2px] border-white/40 pointer-events-none"
                                />
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: [0, 10, 20], opacity: [1, 0.4, 0] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: cinematicEasing, delay: 0.15 }}
                                    className="absolute w-[15vw] h-[15vw] aspect-square rounded-full border border-white/20 pointer-events-none"
                                />
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: [0, 10, 20], opacity: [1, 0.2, 0] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: cinematicEasing, delay: 0.3 }}
                                    className="absolute w-[15vw] h-[15vw] aspect-square rounded-full border border-white/10 pointer-events-none"
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* EXIT STROKES (Sync with expanding hole outward) */}
                    <AnimatePresence>
                        {phase === 'exit' && (
                            <>
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: [0, 10, 20], opacity: [1, 0.5, 0] }}
                                    transition={{ duration: 1.2, ease: cinematicEasing }}
                                    className="absolute w-[15vw] h-[15vw] aspect-square rounded-full border-[2px] border-white/40 pointer-events-none z-50"
                                />
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: [0, 10, 20], opacity: [1, 0.4, 0] }}
                                    transition={{ duration: 1.2, ease: cinematicEasing, delay: 0.1 }}
                                    className="absolute w-[15vw] h-[15vw] aspect-square rounded-full border border-white/20 pointer-events-none z-50"
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* LOADING PULSING STROKES */}
                    <AnimatePresence>
                        {phase === 'loading' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute w-[20vw] h-[20vw] aspect-square rounded-full border border-white/20 pointer-events-none"
                                />
                                <motion.div
                                    animate={{ scale: [1, 2, 1], opacity: [0.1, 0, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute w-[20vw] h-[20vw] aspect-square rounded-full border border-white/10 pointer-events-none"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* SOLID MASK OVERLAY */}
                    <motion.div
                        initial={{
                            clipPath: "circle(0vw at 50% 50%)",
                            WebkitMaskImage: "radial-gradient(circle at center, transparent 0vw, black 0vw)",
                            maskImage: "radial-gradient(circle at center, transparent 0vw, black 0vw)"
                        }}
                        animate={
                            phase === 'enter'
                                ? { clipPath: "circle(150vw at 50% 50%)" }
                                : phase === 'loading'
                                    ? { clipPath: "circle(150vw at 50% 50%)" }
                                    : phase === 'exit'
                                        ? {
                                            clipPath: "circle(150vw at 50% 50%)",
                                            WebkitMaskImage: "radial-gradient(circle at center, transparent 150vw, black 150vw)",
                                            maskImage: "radial-gradient(circle at center, transparent 150vw, black 150vw)"
                                        }
                                        : {}
                        }
                        transition={{ duration: 1.2, ease: cinematicEasing }}
                        className="absolute inset-0 bg-[#050505] flex items-center justify-center pointer-events-auto z-30"
                    >
                        {/* Loading Text */}
                        <AnimatePresence>
                            {(phase === 'loading' || phase === 'enter') && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.4 } }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: phase === 'enter' ? 0.4 : 0 }}
                                >
                                    <motion.h2
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="text-3xl md:text-5xl font-[family-name:var(--font-display)] italic text-white tracking-widest text-center"
                                    >
                                        Loading
                                    </motion.h2>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );
};

export default PageTransitionOverlay;
