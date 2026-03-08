import { motion } from 'motion/react';

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

      <div className="relative flex overflow-hidden">
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
    </section>
  );
};

export default Clients;
