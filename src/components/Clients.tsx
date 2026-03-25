import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    let frameId: number;
    let iteration = 0;
    const maxIterations = 15;

    setIsScrambling(true);

    const scramble = () => {
      if (iteration >= maxIterations) {
        setDisplayText(text);
        setIsScrambling(false);
        return;
      }

      const throttledScramble = () => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (iteration > (index / text.length) * maxIterations) return text[index];
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        iteration++;
        frameId = requestAnimationFrame(scramble);
      };

      // Speed control
      setTimeout(throttledScramble, 30);
    };

    scramble();
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const clients = [
  "https://github.com/user-attachments/assets/d30a2caf-0baa-46d6-b78d-1a44eaba079f",
  "https://github.com/user-attachments/assets/2c855d15-c32a-4973-b727-e4450caad66a",
  "https://github.com/user-attachments/assets/76526fc6-9513-4fe2-8a52-8fd739f43040",
  "https://github.com/user-attachments/assets/473537ec-3fc7-43d7-9ba9-c20786a83427",
  "https://github.com/user-attachments/assets/85aeacd8-c642-4ab0-9793-f9e528caa61c",
  "https://github.com/user-attachments/assets/d37dedb2-87d3-4af8-bc0e-2493858e21b0",
  "https://github.com/user-attachments/assets/4bf7768a-33b3-4384-b806-2db38c2fc37f",
  "https://github.com/user-attachments/assets/1e9cec02-1680-4e80-85ef-94484886b389",
  "https://github.com/user-attachments/assets/e4a7c73d-a152-44c4-8cbf-34c597f83450",
  "https://github.com/user-attachments/assets/f027068f-5946-4e4c-9650-e1faea96b400",
  "https://github.com/user-attachments/assets/a91edfad-3c2b-475b-bbde-61dd8b9dd3a3",
  "https://github.com/user-attachments/assets/fb5a5a60-a591-43d3-be83-9678e1303500",
  "https://github.com/user-attachments/assets/035941cd-1eda-4664-834f-d9b911fbc539",
  "https://github.com/user-attachments/assets/327c5931-58ee-494c-a38c-f33b477278d1",
  "https://github.com/user-attachments/assets/f5e455b6-bf60-480d-befd-5baab82792c4",
  "https://github.com/user-attachments/assets/2e99e801-5169-4385-b5b9-77c5dd46d2cc",
  "https://github.com/user-attachments/assets/7dc47d97-0529-4bed-b01d-af587e176249",
  "https://github.com/user-attachments/assets/c55ef686-c3c1-427a-8e17-42586c6e0347",
  "https://github.com/user-attachments/assets/24929e7c-088f-4918-a693-f5189c8f3dd7",
  "https://github.com/user-attachments/assets/5dfdeba9-e893-4f5b-a7cd-d0863b73d6e6"
];

const testimonials = [
  {
    quote: "The service was incredibly friendly and the wedding photos were absolutely outstanding!!!",
    name: "Arista D.",
    company: "Client",
    role: "Wedding Client"
  },
  {
    quote: "Highly recommended for photography and videography. The team is genuinely professional.",
    name: "Fariz R.",
    company: "Partner",
    role: "Event Organizer"
  },
  {
    quote: "I am extremely satisfied with the cinematic video results from my wedding day.",
    name: "Nadia S.",
    company: "Client",
    role: "Wedding Client"
  },
  {
    quote: "The photo and video results far exceeded my expectations — truly outstanding work!!",
    name: "Bima W.",
    company: "Client",
    role: "Corporate Client"
  },
  {
    quote: "The team is so professional — our event was at 9 AM but they were already on-site by 8 AM.",
    name: "Reza P.",
    company: "Partner",
    role: "Event Manager"
  },
  {
    quote: "Every concert photo captured the raw energy of the show perfectly. I was blown away by the results.",
    name: "Dika M.",
    company: "Client",
    role: "Concert Organizer"
  },
  {
    quote: "Our pre-wedding shoot felt so natural and comfortable. The photos look like they belong in a magazine.",
    name: "Sari & Aldi",
    company: "Client",
    role: "Pre-Wedding Client"
  },
  {
    quote: "The team documented our corporate summit with incredible precision. Every key moment was captured.",
    name: "Hendra K.",
    company: "Partner",
    role: "Corporate Affairs"
  },
  {
    quote: "We hired them for our annual company event and the results were stunning. Very detail-oriented team.",
    name: "Putri L.",
    company: "Partner",
    role: "Brand Manager"
  },
  {
    quote: "The lighting and composition in every shot showed a real mastery of the craft. Exceptional work.",
    name: "Andre T.",
    company: "Client",
    role: "Music Artist"
  },
  {
    quote: "From the first meeting to the final delivery, everything was smooth and well-communicated. 10/10.",
    name: "Mira F.",
    company: "Client",
    role: "Wedding Client"
  },
  {
    quote: "The cinematic wedding film made my parents cry. It captured every emotion of our special day.",
    name: "Yoga & Rina",
    company: "Client",
    role: "Wedding Client"
  },
  {
    quote: "Our product launch event photos were sharp, vibrant, and exactly what our brand needed.",
    name: "Wisnu A.",
    company: "Partner",
    role: "Marketing Director"
  },
  {
    quote: "The yearbook photos brought our students' faces to life. Every personality shone through beautifully.",
    name: "Pak Agus",
    company: "Partner",
    role: "School Coordinator"
  },
  {
    quote: "They delivered 500+ concert shots overnight. Every single one of them was gallery-worthy quality.",
    name: "Tia R.",
    company: "Partner",
    role: "Concert Production"
  }
];

const Clients = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = [
    testimonials[startIndex % testimonials.length],
    testimonials[(startIndex + 1) % testimonials.length],
    testimonials[(startIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden border-t border-white/5 w-full md:w-[140%] md:-ml-[20%] bg-[#050505]">
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

      <div
        className="relative flex py-8 mb-32"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
      >
        <motion.div
          className="flex gap-8 md:gap-12 pr-8 md:pr-12 items-center"
          animate={{ x: "-50%" }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...clients, ...clients].map((logo, i) => (
            <div key={i} className="flex-shrink-0 group">
              <div
                className="w-28 h-28 md:w-40 md:h-40 rounded-2xl bg-[#151515]/90 md:bg-white/10 md:backdrop-blur-md border border-white/10 flex items-center justify-center p-2 md:p-4 group-hover:scale-105 group-hover:bg-white group-hover:border-transparent shadow-xl group-hover:shadow-[0_0_0_1px_rgba(99,102,241,0.5),0_0_30px_8px_rgba(59,130,246,0.45),0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-500"
              >
                <img
                  src={logo}
                  alt="Client Logo"
                  className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
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
          {visibleTestimonials.map((testimonial, i) => (
            <motion.div
              key={`${startIndex}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 relative overflow-hidden group hover:border-white/20 transition-colors h-[320px] md:h-[350px]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={64} className="text-blue-400" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-white/80 font-light leading-relaxed mb-8 italic text-lg line-clamp-4">
                  "<ScrambleText text={testimonial.quote} />"
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <h4 className="text-white font-medium text-lg">
                    <ScrambleText text={testimonial.name} />
                  </h4>
                  <div className="text-blue-400 text-sm">
                    <ScrambleText text={testimonial.role} />
                  </div>
                  <div className="text-white/50 text-sm uppercase tracking-widest mt-1">
                    <ScrambleText text={testimonial.company} />
                  </div>
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
