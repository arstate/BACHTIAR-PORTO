import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Image as ImageIcon, ArrowLeft, Clapperboard, PenTool, MonitorPlay } from 'lucide-react';
import { navigateWithTransition } from './PageTransitionOverlay';

const MotionLink = motion.create(Link);

const PortfolioHub = () => {
    const navigate = useNavigate();
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);

    const categories = [
        { title: "Videography", path: "/videography", icon: Film, color: "blue" },
        { title: "Photography", path: "/gallery", icon: ImageIcon, color: "purple" },
        { title: "Motion Graphics", path: "/motion", icon: MonitorPlay, color: "cyan" },
        { title: "Behind The Scenes", path: "/bts", icon: Clapperboard, color: "amber" },
        { title: "Design", path: "/design", icon: PenTool, color: "emerald" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            scale: 1.1,
            y: 20,
            filter: 'blur(8px)'
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        clicked: {
            scale: [1, 0.85, 1.15],
            opacity: [1, 1, 0],
            filter: ['brightness(1)', 'brightness(1.5)', 'brightness(2)'],
            zIndex: 50,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        },
        fadeOut: {
            opacity: 0,
            scale: 0.9,
            filter: 'blur(10px)',
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const colors: Record<string, string> = {
        blue: "bg-blue-500/10",
        purple: "bg-purple-500/10",
        cyan: "bg-cyan-500/10",
        amber: "bg-amber-500/10",
        emerald: "bg-emerald-500/10"
    };

    const handleCategoryClick = (e: React.MouseEvent, path: string, index: number) => {
        e.preventDefault();
        if (path === "#" || isNavigating) return;

        setClickedIndex(index);
        setIsNavigating(true);

        setTimeout(() => {
            navigateWithTransition(path);
        }, 600); // Wait for animation to finish before showing Page Transition
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:justify-center items-center px-6 pt-32 pb-16 md:pt-0 relative overflow-y-auto">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 md:top-8 md:left-8 py-2 px-4 flex items-center gap-2 hover:bg-white/10 rounded-full transition-colors z-[100] bg-white/5 border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium tracking-widest uppercase">Back</span>
            </motion.button>

            <motion.h1
                initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.05 }}
                className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-10 md:mb-16 text-center z-10"
            >
                Choose Category
            </motion.h1>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 w-full max-w-[95rem] z-10 px-4 md:px-12"
            >
                {categories.map((cat, idx) => (
                    <MotionLink
                        key={cat.title}
                        variants={itemVariants}
                        to={cat.path}
                        onClick={(e) => handleCategoryClick(e, cat.path, idx)}
                        animate={isNavigating ? (clickedIndex === idx ? "clicked" : "fadeOut") : undefined}
                        className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 aspect-[16/10] sm:aspect-square lg:aspect-[4/5] flex flex-col items-center justify-center gap-4 lg:gap-8 p-6"
                    >
                        {/* Glow Background */}
                        <div className={`absolute inset-0 ${colors[cat.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full`} />

                        {/* Shimmer Effect - Starts after entrance */}
                        <motion.div
                            className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                            initial={{ x: '-150%' }}
                            animate={{ x: '150%' }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 6,
                                ease: "easeInOut",
                                delay: 1.2 + (idx * 0.2) // Stagger shimmer after entry
                            }}
                        />

                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                            <cat.icon size={60} className="md:w-[80px] md:h-[80px] text-white/80 group-hover:text-white transition-colors relative z-10" />
                        </motion.div>
                        <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-center px-4 leading-tight relative z-10">
                            {cat.title.split(' ').map((word, i) => (
                                <React.Fragment key={i}>
                                    {word}{i === 1 && cat.title.includes('Scenes') ? <br /> : ' '}
                                    {i === 0 && cat.title.includes('Motion') ? <br /> : ''}
                                </React.Fragment>
                            ))}
                        </h2>
                    </MotionLink>
                ))}
            </motion.div>

            {/* Decorative Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        </div>
    );
};

export default PortfolioHub;
