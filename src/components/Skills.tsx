import { motion } from 'motion/react';

const Skills = () => {
  const roles = [
    "Professional Photographer", "Videographer", "Photo & Video Editor", "Camera Operator"
  ];

  const software = [
    {
      name: "Adobe Premiere Pro",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
      rating: "5/5"
    },
    {
      name: "Adobe After Effects",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
      rating: "4/5"
    },
    {
      name: "DaVinci Resolve",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png",
      rating: "4/5"
    },
    {
      name: "Adobe Photoshop",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
      rating: "4.5/5"
    },
    {
      name: "Adobe Lightroom",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Lightroom_CC_2026_icon.svg",
      rating: "5/5"
    },
    {
      name: "Adobe Illustrator",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
      rating: "3.5/5"
    },
    {
      name: "Figma",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      rating: "5/5"
    },
    {
      name: "Capcut",
      icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/capcut-icon.png",
      rating: "4/5"
    }
  ];

  const softSkills = [
    "AI Fluency", "Creative Direction", "Visual Storytelling", "Client Communication", "Team Leadership", "Project Management"
  ];

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden z-10 w-full md:w-[140%] md:-ml-[20%]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0" />
      {/* Static glow blobs - rendered once, no animation = GPU friendly */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full pointer-events-none z-0" />

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Heading - no parallax, simple fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-blue-500" />
            <span className="uppercase tracking-widest text-sm text-blue-400 font-medium">Arsenal</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
            Skills & <span className="font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase">Expertise</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Roles Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 glass-card p-8 md:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 blur-2xl rounded-full" />
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">Primary Roles</h3>
            <div className="flex flex-wrap gap-3 mt-auto">
              {roles.map((role, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 text-lg hover:bg-white/10 transition-colors">
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Years Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 glass-card p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
            <h2 className="text-7xl font-[family-name:var(--font-display)] italic text-white mb-2 relative z-10">5+</h2>
            <p className="relative z-10 text-xl font-medium text-center text-white/80">Years of<br />Experience</p>
          </motion.div>

          {/* Software Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-3 glass-card p-8 md:p-12 overflow-hidden"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">Software Proficiency</h3>
            <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] -mx-8 md:-mx-12 px-8 md:px-12">
              <motion.div
                className="flex gap-8 md:gap-12 pr-8 md:pr-12 items-center will-change-transform"
                animate={{ x: "-50%" }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                {[...software, ...software].map((sw, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors aspect-square w-32 md:w-40 flex-shrink-0 group relative">
                    <div className="absolute top-2 right-2 text-[10px] md:text-xs font-mono text-white/50 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                      {sw.rating}
                    </div>
                    <img
                      src={sw.icon}
                      alt={sw.name}
                      className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-white/80 text-xs md:text-sm font-medium text-center leading-tight">
                      {sw.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Soft Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 glass-card p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/15 blur-2xl rounded-full" />
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8 relative z-10">Soft Skills</h3>
            <div className="flex flex-wrap gap-4 relative z-10">
              {softSkills.map((skill, i) => (
                <span key={i} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 text-sm md:text-base font-medium hover:border-purple-500/50 transition-colors flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

