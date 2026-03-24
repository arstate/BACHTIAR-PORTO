import { motion, useScroll, useTransform } from 'motion/react';
import { Send, User, MessageSquare } from 'lucide-react';
import React, { useRef, useState } from 'react';

const ContactForm = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format message for WhatsApp
    const whatsappMessage = `Halo, saya ${formData.name}.\n\n${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = '6289617323344'; // 0896 1732 3344 in international format
    
    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', message: '' });
    
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden z-10 w-full md:w-[140%] md:-ml-[20%] bg-[#050505]"
    >
      {/* Doodle Background Pattern (WhatsApp-style) - Restructured for Performance */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/053/159/944/small/social-media-doodle-background-seamless-pattern-repeat-icon-cute-vector.jpg')`,
          backgroundSize: '300px auto',
          // REMOVED 'filter: invert(1)' as it forces massive CPU overhead on scrolling images
        }}
      />

      {/* Animated Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-blue-900/5 pointer-events-none"
      />

      <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-none mb-4 text-white">
            Get in <span className="font-[family-name:var(--font-display)] italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 lowercase">Touch</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name/Company Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-center bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/30 focus-within:bg-white/10 transition-all duration-300">
              <div className="pl-6 pr-4 text-white/40 group-focus-within:text-white/70 transition-colors">
                <User size={24} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name / Company"
                required
                className="w-full py-5 pr-6 bg-transparent text-white placeholder-white/30 focus:outline-none text-lg font-light"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative flex items-start bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-2xl overflow-hidden focus-within:border-white/30 focus-within:bg-white/10 transition-all duration-300">
              <div className="pl-6 pr-4 pt-5 text-white/40 group-focus-within:text-white/70 transition-colors">
                <MessageSquare size={24} />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project / needs..."
                required
                rows={5}
                className="w-full py-5 pr-6 bg-transparent text-white placeholder-white/30 focus:outline-none text-lg font-light resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className={`w-full py-5 px-8 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              submitStatus === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : submitStatus === 'success' ? (
              <span className="flex items-center gap-2">
                ✓ Message Sent!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message
                <Send size={20} />
              </span>
            )}
          </motion.button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm font-light">
            Or reach out directly at{' '}
            <a href="mailto:aryansyah1509@gmail.com" className="text-white/70 hover:text-white transition-colors underline underline-offset-4">
              aryansyah1509@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
