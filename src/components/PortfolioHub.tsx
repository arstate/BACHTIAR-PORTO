import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Image as ImageIcon, ArrowLeft, Clapperboard, PenTool, MonitorPlay } from 'lucide-react';
import { navigateWithTransition } from './PageTransitionOverlay';

const PortfolioHub = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:justify-center items-center px-6 pt-32 pb-16 md:pt-0 relative overflow-y-auto">
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 md:top-8 md:left-8 py-2 px-4 flex items-center gap-2 hover:bg-white/10 rounded-full transition-colors z-10 bg-white/5 border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium tracking-widest uppercase">Back</span>
            </motion.button>

            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-10 md:mb-16 text-center z-10"
            >
                Choose Category
            </motion.h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 w-full max-w-[95rem] z-10 px-4 md:px-12">
                <Link
                    to="/videography"
                    onClick={(e) => { e.preventDefault(); navigateWithTransition('/videography'); }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 aspect-[16/10] sm:aspect-square lg:aspect-[4/5] flex flex-col items-center justify-center gap-4 lg:gap-8 p-6"
                >
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <Film size={60} className="md:w-[80px] md:h-[80px] text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-center px-4 leading-tight">Videography</h2>
                </Link>
                <Link
                    to="/gallery"
                    onClick={(e) => { e.preventDefault(); navigateWithTransition('/gallery'); }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 aspect-[16/10] sm:aspect-square lg:aspect-[4/5] flex flex-col items-center justify-center gap-4 lg:gap-8 p-6"
                >
                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <ImageIcon size={60} className="md:w-[80px] md:h-[80px] text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-center px-4 leading-tight">Photography</h2>
                </Link>
                <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); navigateWithTransition('#'); }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 aspect-[16/10] sm:aspect-square lg:aspect-[4/5] flex flex-col items-center justify-center gap-4 lg:gap-8 p-6"
                >
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <MonitorPlay size={60} className="md:w-[80px] md:h-[80px] text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-center px-4 leading-tight">Motion<br />Graphics</h2>
                </Link>
                <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); navigateWithTransition('#'); }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 aspect-[16/10] sm:aspect-square lg:aspect-[4/5] flex flex-col items-center justify-center gap-4 lg:gap-8 p-6"
                >
                    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <Clapperboard size={60} className="md:w-[80px] md:h-[80px] text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-center px-4 leading-tight">Behind The<br />Scenes</h2>
                </Link>
                <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); navigateWithTransition('#'); }}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 aspect-[16/10] sm:aspect-square lg:aspect-[4/5] flex flex-col items-center justify-center gap-4 lg:gap-8 p-6"
                >
                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <PenTool size={60} className="md:w-[80px] md:h-[80px] text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-[0.2em] uppercase text-center px-4 leading-tight">Design</h2>
                </Link>
            </div>

            {/* Decorative Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        </div>
    );
};

export default PortfolioHub;
