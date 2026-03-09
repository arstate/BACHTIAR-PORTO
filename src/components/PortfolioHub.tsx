import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Image as ImageIcon, ArrowLeft } from 'lucide-react';

const PortfolioHub = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 py-2 px-4 flex items-center gap-2 hover:bg-white/10 rounded-full transition-colors z-10 bg-white/5 border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium tracking-widest uppercase">Back</span>
            </motion.button>

            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-16 text-center z-10"
            >
                Choose Category
            </motion.h1>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl z-10">
                <Link
                    to="/videography"
                    className="flex-1 group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/30 transition-colors aspect-square md:aspect-[4/3] flex flex-col items-center justify-center gap-6"
                >
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <Film size={80} className="text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-widest uppercase">Videography</h2>
                </Link>
                <Link
                    to="/gallery"
                    className="flex-1 group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/30 transition-colors aspect-square md:aspect-[4/3] flex flex-col items-center justify-center gap-6"
                >
                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full" />
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
                        <ImageIcon size={80} className="text-white/80 group-hover:text-white transition-colors" />
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-widest uppercase">Photography</h2>
                </Link>
            </div>

            {/* Decorative Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        </div>
    );
};

export default PortfolioHub;
