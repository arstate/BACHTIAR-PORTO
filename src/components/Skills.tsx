import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { FiFilm, FiVideo, FiMonitor, FiImage, FiSliders, FiPenTool, FiLayout, FiScissors } from 'react-icons/fi';

const Skills = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0]);
  
  const headingY = useTransform(scrollYProgress, [0, 1], ["-150px", "150px"]);

  const roles = [
    "Professional Photographer", "Videographer", "Photo & Video Editor", "Camera Operator"
  ];
  
  const software = [
    { name: "Premiere Pro", icon: <FiFilm size={32} className="text-[#9999FF]" /> },
    { name: "After Effects", icon: <FiVideo size={32} className="text-[#9999FF]" /> },
    { name: "DaVinci Resolve", icon: <FiMonitor size={32} className="text-[#52B5F7]" /> },
    { name: "Photoshop", icon: <FiImage size={32} className="text-[#31A8FF]" /> },
    { name: "Lightroom", icon: <FiSliders size={32} className="text-[#31A8FF]" /> },
    { name: "Illustrator", icon: <FiPenTool size={32} className="text-[#FF9A00]" /> },
    { name: "Figma", icon: <FiLayout size={32} className="text-[#F24E1E]" /> },
    { name: "Capcut", icon: <FiScissors size={32} className="text-[#FFFFFF]" /> }
  ];

  return (
    <section id="skills" ref={ref} className="py-32 px-6 relative overflow-hidden z-10">
      {/* Moving Light Ray */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-blue-500/10 to-transparent skew-y-12 pointer-events-none z-0"
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.div
          style={{ y: headingY }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
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
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]"
        >
          {/* Roles Card - Spans 2 columns */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="md:col-span-2 glass-card p-8 md:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">Primary Roles</h3>
            <div className="flex flex-wrap gap-3 mt-auto">
              {roles.map((role, i) => (
                <span key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 text-lg hover:bg-white/10 transition-colors">
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Decorative Card */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            className="md:col-span-1 glass-card p-8 relative overflow-hidden flex items-center justify-center min-h-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
            <h2 className="text-8xl font-[family-name:var(--font-display)] italic text-white/20 absolute">4+</h2>
            <p className="relative z-10 text-xl font-medium text-center">Years of<br/>Experience</p>
          </motion.div>

          {/* Software Card - Spans full width */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="md:col-span-3 glass-card p-8 md:p-12"
          >
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-8">Software Proficiency</h3>
            <div className="flex flex-wrap gap-4">
              {software.map((sw, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-3 px-6 py-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-colors shadow-lg min-w-[120px]">
                  {sw.icon}
                  <span className="text-white/80 text-sm font-medium text-center">
                    {sw.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
