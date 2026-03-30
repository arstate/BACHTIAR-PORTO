import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUserIntent, UserIntent } from '../context/UserIntentContext';
import { Heart, GraduationCap, Briefcase, Music, LayoutGrid, ArrowRight } from 'lucide-react';

const options: { id: UserIntent; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'wedding', label: 'Wedding & Pre-wedding', icon: Heart, color: 'from-pink-500/20 to-rose-500/20' },
  { id: 'graduation', label: 'Graduation / Yearbook', icon: GraduationCap, color: 'from-blue-500/20 to-indigo-500/20' },
  { id: 'corporate', label: 'Corporate & Brands', icon: Briefcase, color: 'from-emerald-500/20 to-teal-500/20' },
  { id: 'event', label: 'Concerts & Events', icon: Music, color: 'from-purple-500/20 to-fuchsia-500/20' },
  { id: 'generalist', label: 'Show Me Everything', icon: LayoutGrid, color: 'from-gray-500/20 to-slate-500/20' },
];

const WelcomeGate = () => {
  const { setIntent, activeIntent } = useUserIntent();
  const [hoveredId, setHoveredId] = useState<UserIntent>(null);

  // If intent is already set (e.g. from session), don't show the gate
  if (activeIntent !== null) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        opacity: 0,
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            key={hoveredId}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${options.find(o => o.id === hoveredId)?.color} blur-[120px] pointer-events-none`}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 font-medium mb-4">Welcome to Aryansyah Portfolio</h2>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-display)] italic font-light text-white leading-tight">
            What brings you <br className="md:hidden" /> here today?
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {options.map((option, idx) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                onMouseEnter={() => setHoveredId(option.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setIntent(option.id)}
                className="group relative flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500 ${hoveredId === option.id ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1 text-left">
                  <span className="text-lg font-medium text-white/90 group-hover:text-white transition-colors tracking-tight">
                    {option.label}
                  </span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
                  <ArrowRight size={20} className="text-white/50" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </motion.button>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 text-white/20 text-sm tracking-widest uppercase font-medium"
        >
          Select an experience to continue
        </motion.p>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none opacity-50" />
    </motion.div>
  );
};

export default WelcomeGate;
