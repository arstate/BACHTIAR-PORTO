import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start center", "end center"] 
  });

  const experiences = [
    {
      company: "PT Cita Entertainment",
      period: "2023 - Present",
      role: "Divisi Multimedia",
      description: "Videographer, Photographer, Camera Operator for major events and highlight editing.",
      bullets: [
        "Managed post-production workflows"
      ]
    },
    {
      company: "Arstate.Cinema",
      period: "2020 - Present",
      role: "Founder & Creative Director",
      description: "Managing photo/video documentation services for weddings, corporate, commercials, and leading the creative post-production process.",
      bullets: [
        "Developed client acquisition strategies"
      ]
    }
  ];

  return (
    <section id="experience" ref={containerRef} className="py-32 px-6 relative z-10 overflow-hidden w-[140%] -ml-[20%]">
      {/* Scroll-linked glowing orb */}
      <motion.div 
        style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        className="absolute left-0 md:left-1/2 w-full h-[500px] bg-purple-900/10 blur-[120px] -translate-y-1/2 pointer-events-none z-0"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-purple-500" />
                  <span className="uppercase tracking-widest text-sm text-purple-400 font-medium">Journey</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-display)] italic font-light mb-6">
                  Experience
                </h2>
                <p className="text-white/50 font-light max-w-sm">
                  A timeline of my professional journey in the creative industry, building brands and capturing memories.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Background Track Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5 hidden md:block rounded-full" />
            
            {/* Animated Progress Line */}
            <motion.div 
              style={{ scaleY: scrollYProgress }} 
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 hidden md:block origin-top rounded-full z-10" 
            />

            <div className="space-y-8 md:pl-12">
              {experiences.map((exp, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.3, type: "spring", stiffness: 50 }}
                className="glass-card p-8 md:p-10 group hover:bg-white/[0.05] transition-colors relative"
              >
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.3 + 0.4, type: "spring" }}
                  className="absolute -left-[57px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/20 hidden md:block z-20 group-hover:border-purple-500 group-hover:bg-purple-500 transition-all duration-300 shadow-[0_0_0_4px_rgba(5,5,5,1)]" 
                />
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{exp.company}</h3>
                    <p className="text-purple-400 font-[family-name:var(--font-display)] italic text-xl">{exp.role}</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 whitespace-nowrap h-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-white/70 font-light leading-relaxed text-lg mb-4">
                  {exp.description}
                </p>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside text-white/60 font-light space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
