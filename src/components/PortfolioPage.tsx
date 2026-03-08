import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const categories = ["Wedding", "Prewedding", "Ads", "Konser", "Corporate"];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 z-50 glass-card px-6 py-3 rounded-full flex items-center gap-8 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20"
      >
        <Link to="/" className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest">Home</Link>
        {categories.map((cat) => (
          <a key={cat} href={`#${cat.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-white uppercase tracking-widest">
            {cat}
          </a>
        ))}
      </motion.nav>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-display italic font-light mb-12">Portfolio</h1>
        {categories.map((cat) => (
          <section key={cat} id={cat.toLowerCase()} className="py-16">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">{cat}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholder for projects */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                  <span className="text-white/30">{cat} Project {i}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
