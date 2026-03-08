import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const clients = [
  "PT Cita Entertainment",
  "Universitas Negeri Surabaya",
  "Honda Surabaya",
  "Bank Jatim",
  "Dinas Pariwisata",
  "Telkom Indonesia",
  "Gudang Garam",
  "Sampoerna",
  "Pakuwon Group"
];

const testimonials = [
  {
    quote: "The cinematic quality of their work elevated our brand campaign to a whole new level. Professional, creative, and incredibly easy to work with.",
    name: "Sarah Jenkins",
    company: "Telkom Indonesia",
    role: "Marketing Director"
  },
  {
    quote: "They captured the essence of our corporate event perfectly. The turnaround time was impressive, and the final video exceeded all our expectations.",
    name: "Budi Santoso",
    company: "Bank Jatim",
    role: "Head of Communications"
  },
  {
    quote: "An absolute pleasure to collaborate with. Their attention to detail and ability to tell a compelling visual story is unmatched in the industry.",
    name: "Amanda Wijaya",
    company: "Honda Surabaya",
    role: "Brand Manager"
  }
];

const Clients = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden border-t border-white/5 w-[140%] -ml-[20%]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-blue-500" />
            <span className="uppercase tracking-widest text-sm text-blue-400 font-medium">Trusted By</span>
            <div className="w-12 h-[1px] bg-blue-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] italic font-light text-white">
            Selected <span className="not-italic font-bold font-[family-name:var(--font-sans)] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Clients</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative flex overflow-hidden mb-32">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20" />
        
        <motion.div 
          className="flex gap-16 md:gap-32 pr-16 md:pr-32 items-center"
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="whitespace-nowrap group cursor-default">
              <span className="text-3xl md:text-5xl font-bold text-outline uppercase group-hover:text-white transition-colors duration-500">
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] italic font-light text-white mb-4">
            Client <span className="not-italic font-bold font-[family-name:var(--font-sans)] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Stories</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="glass-card p-8 md:p-10 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={64} className="text-blue-400" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-white/80 font-light leading-relaxed mb-8 italic text-lg">
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/10">
                  <h4 className="text-white font-medium text-lg">{testimonial.name}</h4>
                  <p className="text-blue-400 text-sm">{testimonial.role}</p>
                  <p className="text-white/50 text-sm uppercase tracking-widest mt-1">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
