import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useRef } from 'react';

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer id="contact" ref={footerRef} className="pt-32 pb-12 px-6 relative overflow-hidden z-10 w-full md:w-[140%] md:-ml-[20%] bg-[#050505]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
      
      {/* Expanding Glow Animation */}
      <motion.div 
        style={{ scale, opacity }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[50vw] md:h-[50vw] bg-gradient-to-t from-blue-900/20 to-purple-900/20 rounded-full blur-[80px] pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-[15vw] md:text-[12vw] font-bold tracking-tighter uppercase leading-none mb-8 text-white">
            Let's <span className="font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase">Work</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white/70 mt-12">
            <a href="mailto:aryansyah1509@gmail.com" className="flex items-center gap-4 hover:text-white transition-colors group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Mail size={24} />
              </div>
              <span className="text-xl font-light">aryansyah1509@gmail.com</span>
            </a>
            
            <a href="tel:089617323344" className="flex items-center gap-4 hover:text-white transition-colors group">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Phone size={24} />
              </div>
              <span className="text-xl font-light">0896 1732 3344</span>
            </a>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <MapPin size={24} />
              </div>
              <span className="text-xl font-light">Sidoarjo, Indonesia</span>
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-sm font-light gap-6 md:gap-0">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <p>© {new Date().getFullYear()} Bachtiar Aryansyah Putra.</p>
            <div className="hidden md:block w-1 h-1 rounded-full bg-white/20"></div>
            <p>Designed with passion & precision.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white hover:underline transition-all">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white hover:underline transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
