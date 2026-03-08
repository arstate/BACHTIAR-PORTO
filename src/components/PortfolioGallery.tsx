import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Video, X } from 'lucide-react';
import { createPortal } from 'react-dom';

const categories = ['All', 'Wedding', 'Prewedding', 'Ads', 'Konser', 'Corporate'];

const konserUrls = [
  "https://lh3.googleusercontent.com/pw/AP1GczN7G7axgZ0v28RcGhnN3PNLyNJcKXtOxJWnm2KAz7pDO1AlOyZ_jFEH3cXwHbNDxk8DL_83duEV90wIHJ3Ny7tzCzzXpLhJbuDULZyLxn4VzRgwvbk=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMhhlgTZstaYvsBfBHLWnovG1MmgnaUbkF6Qgz-E7zaVsj31_4RCSDWInzMhcamNwOag4F845K_LLll5tfE9lQ_f-ReHkL0I6iGcvPCiZP5Jfhg_fY=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMQ_lC5FtjHp7wTUGfmNNJRQhqb7c-hEFYwis3k1R_sE6D0kKh9bf2DTMktk7lWFkZG8l4-UDPmQpx1FOTcybY-PHhvMocKEOajP48f0nahyUPmET0=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczOE6IT0ha02QHyL9pwQORzmOMfRJIVpdIGi2qMfn_7WLU8jG7QWa1xMDUM4-uJfRchJgIX8BBs57pPSzfAvbTbB20buLs5JZcYbfnquMYRl2fL0lWI=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPiWaHK4WlFa3CrJGSaVHUKynTwxsszdeunwNhvBnunirN98wVw8otvbprSGFB3KDDwvq20j_HU0CMBEVe_8agEjxi89sQsEEpD2w6szi6-sMQUbPw=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczO1eFTOeWMJJLLqzjIbolU46g1E2gAImBxDLc6Lu7MWcStU2JuRiwsGO8lmA0kuE_vfDhL4fCQpMMv3I9EiGnec4jctwPxneltN27aXTFsfz1foQVY=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPj8YrBFL2hBfLvbyGqloaRtYjLFqH7lZt_c7vM07wWJAneB8g3ebZjbbRxaydoaIiJ9gbLbYrTfk84XdX_7we58c8I-x70YNnyXe92iJf_qzG7R5w=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPPBb9DGTrs8KVdX97jFAicTMzUPm89S0-yvXPQjew7Xs86Vow-h8JNGYTj065ZOr9HCzIoPHIZsJVfTM8NgsmyYVFTAejRi8_AMYNM5wn3CyzbCrQ=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPJB2SS1ecInDpw2mLd1XPp6C-dvQlDUK6FfAPm4zcT_0pnAYlS4jOytiT0Oy0iVizSp9pwIlXPYORtSl9ADlobAM4hJVi52u2jmtgZLoZ4dAJT4eE=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPYYOEAi3B19xS6qI00KfPTjT8acGakUlUbavS9MKLZAC9526Wd7OGdtDH0yGfcLmkA5ybn1gdN7zOU2I8qYaNfkQEH6Nt6cYw8e3qwJ5xyju6HLlQ=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczOUKfzlEZK0yIZgr25JmFNnZgs7iENks9zWmKQP0vMXWrnk5ch2gc6EeSfr7SHzKGdzGNAc_gXo9ogLSSXjjjdh807oGGa4qAkm7nAcOVvKqID4BOs=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMShUC-99dqLPcLLvKCOkAepHte6uAL0HPWCXmJB4U8UrKl_LiN5z6siFaVYwkXCr6zD6oPp9yHgYjiz77cGZmS6KtWecI1jZ2Yi-gP-hUd-CuOsWw=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczOsnqh2sKh23HvrtmL9Mb0iZArAPPvI4VfHtASUB6zru0B6eBpYCTNjd7EYmCX4FkZxFcJ63A6hSG9C9v9vQHyuUNPRV_WJprn9OAoo0bWBDGGQ8SY=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMiQD2P932NyeY3lylzG6tN_qiriW0PMiJUb0rNKuILxCjqKAKrAFeq5MJdJJpRnoQAb0B98JMS3eDgIfhL5gTH6aeESTLH2FqxQmOlOkugwThW3CI=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczNdtL1k8XLHOLsG_hCUSogn2u1Lgbo4TEbrbc1TpOYCTU0e01QnpP4OmTy5i26hBIAik6skCfWHD5vTMXEKAffJb8ZMnV3UWfjGdG3kq_XuN3p81W4=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPSsAPlkt1ho8ktXGl79ZtN5kUYCxXpOrC7kHrGlMFXotwXLX1kWyQ9JBvkGC3dJn4F_Qtug9RkejW9DrSebu00LFuexWIOeUXuI2x9BUgq74p0_Ls=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMKuQ9-vJMLIVpJNW37cPEuA2RPoscyjqVpLxzcN18HdZRVPHKm3gLzso35EQ3CTzagqzr2Zi-TEQymYsqiecdU42w9C3ebEI8clGJXZ2vqnTExOCM=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczOEUnz_NzTD0EXdEwz-q1PeLYyWtA6AAgB97fQeyYJ65MSjew5AwtxlIjQhDoZ5_Y45cl0YOBMfUGIWa8dnJW8CTAvuokfqJmaz8AgpVSQXiZlzX-4=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczN-7eP8496FFF7n7r0EZ_lwCEQjPeHyZ0bwG4vyZ4kyW1xlhcIDSY9wUBaaOZHt7RDTHA8Ee9N-coB_FEj-5MmxlgXz-STpb4N_kD_X_zFc7Ym_Igc=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMrapngAtwUtXzt_yA7QYpn0bV7sQoQv_9NSlWjOOnJaVFUSW9vvGCOkAq8BV0rqEXu_Zd02FuGYQtmodrjN38LovBWPWv8nUQj2fD8lXVFcxlDLeA=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczNqVRAH54jllNY6TLUUJgVj4r4I1cGspN9uhW8BfGBn06bAG-bIpWrFE0bbqFAO26VWrHDHt1f26tyKZLAxn-hW0WGUb8-Zt0qViIyEadYruyBIhuc=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczO7OG7yNdoF2warPBW4yJB2QRJxLPQ_Lt6a359OYwlbnO2d0VXmPqrDZo9nvcwu-N-ptjQI7mwf8MiJ4FKHJv3sKBEn4o-QX2bmJPILTDwPxelmneA=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczOXfA6CpyOzb8IFlWVeMlaIAvaSQv1wcn366WlTLZ_ow4EKVTRAdLQ2r8M7PlMDO-rRG803F4FeUoHzcH0xl526DlCULD3bi7oP9H5EUtZt7oe80Wc=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczOVMpOFpUwP-Yd10t-32Vf-YBrGqULQJw23ab9ZlMZqPfyjzAJ74zeeTluK6Wna8yd8oupa5vhXJK9SVr3vCT9tlNY013DR1wGTCQGSZIivwtF9deM=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczM8G2II1BwCktyWXD54fHUWWHVy8eCCNF7YEdNMO8dA8KaMDtKa4vE8_foIiVpSDfN4KJ4c6GKxJtUmRTBaMPqL7nsbvSzgG82_2jmmd3-PlhQuMI0=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczMKaIJsaj7soKIvkYe0kP3ADMAIQ7MZgk090jp-G-gRcreXv_cNmdwdPbfoEdhhmnOOt7iBviDC1co7jiCbVkCPnXd3gVNFOnZPHmrj1iFAAc4eXvs=w2400",
  "https://lh3.googleusercontent.com/pw/AP1GczPoVFVhyrbcgm1uXEp0o0O8fdiNptzGXOGgFNQ_vymFvPZvNdpzSY3_g4t52TQ0UFdQT987gX5RRbeL791QnGNIt0MuaD_gcAH29Urk0AG1FCWYIhA=w2400"
];

const otherCats = ['Wedding', 'Prewedding', 'Ads', 'Corporate'];

const galleryItems = [
  ...konserUrls.map((url, i) => ({
    id: `konser-${i}`,
    title: `Konser Project ${i + 1}`,
    category: 'Konser',
    img: url,
  })),
  ...Array.from({ length: 16 }).map((_, i) => {
    const category = otherCats[i % otherCats.length];
    return {
      id: `other-${i}`,
      title: `${category} Project ${i + 1}`,
      category: category,
      img: `https://picsum.photos/seed/gallery${i}/800/1200.webp`,
    };
  })
].sort((a, b) => a.id.localeCompare(b.id));

const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const category = hash.charAt(0).toUpperCase() + hash.slice(1);
        if (categories.includes(category)) {
          setActiveCategory(category);
        } else if (hash.toLowerCase() === 'all') {
          setActiveCategory('All');
        }
      } else {
        setActiveCategory('All');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const numCols = isMobile ? 3 : 4;
  const cols = Array.from({ length: numCols }, () => [] as typeof galleryItems);
  
  filteredItems.forEach((item, i) => {
    cols[i % numCols].push(item);
  });

  // Parallax transforms
  // yDown: moves down relative to normal scroll (scrolls up slower)
  const yDown = useTransform(scrollY, value => value * 0.2);
  // yUp: moves up relative to normal scroll (scrolls up faster)
  const yUp = useTransform(scrollY, value => value * -0.2);

  return (
    <div className="bg-[#050505] min-h-screen w-full relative overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-40 pt-32 pb-8 px-6 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] italic font-light mb-6">
            Gallery
          </h1>
          <p className="text-white/50 max-w-2xl font-light text-lg">
            Explore our complete collection of visual stories across various categories.
          </p>
        </div>
      </div>

      {/* Parallax Gallery */}
      <div className="pt-72 pb-32 px-4 md:px-8 max-w-7xl mx-auto min-h-[200vh]">
        <div className="flex gap-4 md:gap-6 items-start">
          {cols.map((colItems, colIndex) => {
            let y;
            let mtClass = "";
            if (isMobile) {
              // Mobile: 3 cols. Col 1 up, Col 2 down, Col 3 up
              y = colIndex === 1 ? yDown : yUp;
              mtClass = colIndex === 1 ? "" : "mt-12";
            } else {
              // Desktop: 4 cols. Col 1 down, Col 2 up, Col 3 down, Col 4 up
              y = colIndex % 2 === 0 ? yDown : yUp;
              mtClass = colIndex % 2 === 0 ? "" : "mt-24";
            }

            return (
              <motion.div 
                key={colIndex}
                style={{ y }}
                className={`flex-1 flex flex-col gap-4 md:gap-6 ${mtClass}`}
              >
                <AnimatePresence mode="popLayout">
                  {colItems.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      key={item.id}
                      onClick={() => setSelectedProject(item)}
                      className="relative rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer group w-full aspect-[3/4]"
                    >
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                        <p className="text-blue-400 text-xs font-medium mb-1 tracking-widest uppercase">{item.category}</p>
                        <h3 className="text-lg md:text-xl font-bold text-white">{item.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[50vh] md:h-[60vh] bg-black">
                  <img 
                    src={selectedProject.img} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Video size={24} className="text-white/80" />
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/20 text-white transition-colors border border-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8">
                  <p className="text-blue-400 text-sm font-medium mb-2 tracking-widest uppercase">{selectedProject.category}</p>
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default PortfolioGallery;
