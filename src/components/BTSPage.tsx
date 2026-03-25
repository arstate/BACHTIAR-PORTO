import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, MessageCircle, Share2, Music, ChevronUp, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TikTokVideo {
  id: string | number;
  url: string;
  author: string;
  description: string;
  song: string;
  likes: string;
  comments: string;
  shares: string;
}

const initialVideos: TikTokVideo[] = [
  {
    id: 0,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/davinci_era_davinci_colorgrade_sony_wisuda_videowisuda_fotowisu..._toybhk.mp4",
    author: "@tiar.arstate.cinema",
    description: "DaVinci Resolve Color Grade Breakdown 🎨🔥",
    song: "Original Audio - Arstate",
    likes: "45.2K",
    comments: "2.1K",
    shares: "8.4K"
  },
  {
    id: 0.5,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/prewedding_preweddingshoot_cinematic_cinematicprewedding_fyp_ko..._srxy3n.mp4",
    author: "@tiar.arstate.cinema",
    description: "Cinematic Prewedding Shoot Behind the Scenes! Membangun vibe senja yang romantis 🎬💍✨ #prewedding #cinematic",
    song: "Romantic Cinematic Theme - Arstate",
    likes: "89.3K",
    comments: "4.5K",
    shares: "12.8K"
  },
  {
    id: 0.7,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/cinematic_fyp_videography_event_hnyk3h.mp4",
    author: "@tiar.arstate.cinema",
    description: "Event Videography Highlights! Menangkap momen epik dari festival ini 🎥🔥 #cinematic #event #fyp",
    song: "Epic Event Anthem - Cinematic Mix",
    likes: "56.1K",
    comments: "1.8K",
    shares: "7.2K"
  },
  {
    id: 0.9,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/xyzbca_event_fyp%E3%82%B7%E3%82%9Aviral_dfrm6z.mp4",
    author: "@tiar.arstate.cinema",
    description: "Unforgettable Event Vibes! Pecah banget crowd hari ini! 🎉✨ Let the music take control. #event #xyzbca #fypシ #viral",
    song: "Viral Festival Sound - Bachtiar",
    likes: "124.5K",
    comments: "6.2K",
    shares: "15.4K"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/foryou_4upage_weddingday_engagement_ouucuf.mp4",
    author: "@tiar.arstate.cinema",
    description: "Vibe lamaran yang selalu bikin merinding ✨💍 Lancar-lancar sampai hari H ya! #engagement #weddingday #fyp",
    song: "Romantic Vibes - Arstate",
    likes: "45.2K",
    comments: "2.1K",
    shares: "8.4K"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/wedding_cinematic_prewedding_fotografer_keretaapi_dtvekj.mp4",
    author: "@tiar.arstate.cinema",
    description: "Prewed tema stasiun kereta api emang nggak pernah gagal bikin kesan cinematic classic 🚂🎬 #prewedding #fotografer #cinematic",
    song: "Classic Love - Cinematic",
    likes: "89.3K",
    comments: "4.5K",
    shares: "12.8K"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/ACC_KLIEN_KUU_ai_adobephotoshop_firefly_foryou_prewedding_wed..._fbi5js.mp4",
    author: "@tiar.arstate.cinema",
    description: "Akhirnya di-acc klien juga 😭🔥 Momen nyelamatin detail foto pakai AI Adobe Firefly. #photoshop #firefly #prewedding",
    song: "Editing Grind - Creator Sound",
    likes: "56.1K",
    comments: "1.8K",
    shares: "7.2K"
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/bosen_sama_foto_yearbook_yang_template_n2aped.mp4",
    author: "@tiar.arstate.cinema",
    description: "Bosen kan lihat foto buku tahunan sekolah yang posenya gitu-gitu aja? Cobain konsep ini deh 📸🎓 #yearbook #fotografi",
    song: "Nostalgia SMA - Indie Track",
    likes: "124.5K",
    comments: "6.2K",
    shares: "15.4K"
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/teaser_wedding_of_Ian_Anggun_wedding_cinema_sonya7sii_sony_wed..._foz4r9.mp4",
    author: "@tiar.arstate.cinema",
    description: "Teaser Wedding: Ian & Anggun 🕊️ Ditembak pakai Sony A7SIII ngasih tone yang dreamy banget. #weddingcinema #sonya7sii",
    song: "A Thousand Years (Instrumental)",
    likes: "12.4K",
    comments: "342",
    shares: "1.2K"
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/bosen_movement_gitu_aja_videography_graduation_wisuda_cinematic..._pebgxu.mp4",
    author: "@tiar.arstate.cinema",
    description: "Bosen movement kamera gitu-gitu aja pas liputan wedding? Cobain trik transisi mulus ini biar makin cinematic 💍🎥 #wedding #videography #cinematic",
    song: "Epic Wedding Transitions - Cinematic",
    likes: "8.1K",
    comments: "156",
    shares: "432"
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/cinematic_colorgrading_weddingcinematography_fyp_videography_we..._v0wlrq.mp4",
    author: "@tiar.arstate.cinema",
    description: "Spill racikan color grading buat dapetin look cinematic wedding kayak gini 🎨🔥 #colorgrading #weddingcinematography",
    song: "Colorist Focus - Lofi",
    likes: "24.5K",
    comments: "892",
    shares: "3.4K"
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/weddingtiktok_wedding_weddingcinematography_colorgrading_fotogra..._vn0ues.mp4",
    author: "@tiar.arstate.cinema",
    description: "The magic of wedding color grading ✨ Sebelum vs Sesudah diedit berasa beda alam! #weddingtiktok #videography",
    song: "Transformasi Magic - Arstate",
    likes: "15.2K",
    comments: "411",
    shares: "2.1K"
  },
  {
    id: 9,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/lanjut_fullnya_gak_nichh_fyp_yearbook_videoangkatan_videoangkatan..._7406674786107116806_lxi9oh.mp4",
    author: "@tiar.arstate.cinema",
    description: "Lanjut fullnya nggak nihhh? 👀🔥 Behind the scenes video angkatan yang pecah abis! #yearbook #videoangkatan #fyp",
    song: "School Memories - Lofi",
    likes: "45.8K",
    comments: "2.5K",
    shares: "11.2K"
  },
  {
    id: 10,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/jokowi_4upage_fyp_fyp_fyp%E3%82%B7%E3%82%9Aviral_7431610638465518864_rffwg3.mp4",
    author: "@tiar.arstate.cinema",
    description: "Momen langka bisa dapet angle ini pas liputan Pak Jokowi 🇮🇩🎥 Merinding sih dapet momen beginian. #jokowi #fypシ #viral",
    song: "National Pride - Epic Cinematic",
    likes: "210.5K",
    comments: "15.2K",
    shares: "34.8K"
  },
  {
    id: 11,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/wisuda_fotografer_graduation_fotowisuda_ffh1ul.mp4",
    author: "@tiar.arstate.cinema",
    description: "Nemenin momen wisuda kalian sampai dapet candid paling magical 🎓✨ Congraduation! #wisuda #fotografer #graduation",
    song: "Happy Graduation Day - Arstate",
    likes: "18.3K",
    comments: "542",
    shares: "3.1K"
  },
  {
    id: 12,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/Teaser_Wedding_of_Rudi_Rida_jasavideoediting_editing_weddingsura..._7431003795087314182_qlzdez.mp4",
    author: "@tiar.arstate.cinema",
    description: "Teaser Wedding: Rudi & Rida 💍 Intip dikit proses editing buat klien wedding Surabaya kita. #wedding #jasavideoediting #surabaya",
    song: "Wedding Teaser Vibes - Bachtiar",
    likes: "11.5K",
    comments: "389",
    shares: "1.5K"
  },
  {
    id: 13,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/spill_fullnya_ga_nih_upacara_cinematic_fyp_q9tchq.mp4",
    author: "@tiar.arstate.cinema",
    description: "Spill fullnya ga nih? Upacara bendera tapi dibikin se-cinematic ini 🇮🇩🔥 Cek part 2 buat hasil akhirnya! #upacara #cinematic #fyp",
    song: "Cinematic March - Creator Base",
    likes: "67.2K",
    comments: "3.4K",
    shares: "12.1K"
  },
  {
    id: 14,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/fyp_followdong_lywsza.mp4",
    author: "@tiar.arstate.cinema",
    description: "Udah effort shoot and edit berjam-jam, masih sepi aja nih? Follow dong guys biar makin semangat nyiptain karya! 🙌🔥 #fyp #videography",
    song: "Support Local Creator - Lofi",
    likes: "9.2K",
    comments: "812",
    shares: "1.1K"
  },
  {
    id: 15,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/spill_fullnya_gak_nih_yearbook_videoangkatan_videoangakatansekolah..._7373654131283709190_dsheq9.mp4",
    author: "@tiar.arstate.cinema",
    description: "Spill fullnya nggak nih? Konsep video angkatan sekolah kali ini vibes-nya nostalgia banget 🏫✨ #yearbook #videoangkatan",
    song: "Masa SMA Termanis - Indie",
    likes: "85.6K",
    comments: "4.1K",
    shares: "18.3K"
  },
  {
    id: 16,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/TikTok_video_7368627645531147526_jhevae.mp4",
    author: "@tiar.arstate.cinema",
    description: "Random aesthetic dump dari hardisk. Sayang kalau footage-nya nganggur terus, post aja lah 🎬✨ #aesthetic #cinematic #videography",
    song: "Aesthetic Dump - Chill Sound",
    likes: "22.4K",
    comments: "614",
    shares: "4.2K"
  }
];

// Shuffle utility right outside component to randomize feed
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const BTSPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [feedVideos, setFeedVideos] = useState<TikTokVideo[]>(() => shuffleArray(initialVideos));
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollHintShownRef = useRef(false);
  const isFetchingRef = useRef(false);

  const handleVideoLoop = (index: number) => {
    // Only show scroll helper when the very first video finishes its first loop
    if (index === 0 && !scrollHintShownRef.current) {
      setShowScrollHint(true);
      scrollHintShownRef.current = true;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Infinite Scroll Handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (showScrollHint) setShowScrollHint(false);
    
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    // When within 2 screen lengths of the bottom, fetch next batch
    if (scrollHeight - scrollTop <= clientHeight * 2 && !isFetchingRef.current) {
      isFetchingRef.current = true; // Lock to prevent explosion of duplicates
      
      setFeedVideos(prev => {
        const lastVideo = prev[prev.length - 1];
        const newBatch = shuffleArray(initialVideos);
        
        // Prevent back-to-back duplicate if the new batch starts with the exact same video
        // We compare URLs since the ID gets a random string appended
        if (newBatch[0].url === lastVideo.url) {
          const temp = newBatch[0];
          newBatch[0] = newBatch[newBatch.length - 1];
          newBatch[newBatch.length - 1] = temp;
        }

        return [
          ...prev, 
          ...newBatch.map(v => ({ ...v, id: `${v.id}-${Math.random()}` }))
        ];
      });

      // Release lock safely after DOM has time to paint the new scrollHeight
      setTimeout(() => {
        isFetchingRef.current = false;
      }, 500);
    }
  };

  return (
    <div className="bg-black/95 text-white h-[100dvh] w-full relative overflow-hidden">
      
      {/* Scroll Up Hint Overlay */}
      {showScrollHint && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-[calc(50%+32px)] z-[150] flex flex-col items-center pointer-events-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <ChevronUp size={48} className="text-white drop-shadow-xl" />
            <ChevronUp size={48} className="text-white/60 -mt-8 drop-shadow-xl" />
          </motion.div>
          <span className="text-white font-bold tracking-widest uppercase text-xs md:text-sm mt-3 drop-shadow-xl bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20">
            Scroll For Next
          </span>
        </motion.div>
      )}
      
      {/* 1 Floating Centered Pill Header */}
      {/* 
        On Desktop, the video wrapper is centered but accompanied by a 64px width right sidebar.
        This shifts the true center of the video 32px to the left of the screen center.
        We adjust X translation to md:-translate-x-[calc(50%+32px)] to perfectly align with the video.
      */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 md:-translate-x-[calc(50%+32px)] z-[100] flex items-center p-1.5 pr-6 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] pointer-events-auto transition-all duration-300 hover:bg-black/60 group/nav">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/portfolio')}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors shadow-inner shrink-0"
        >
          <ArrowLeft size={16} className="group-hover/nav:-translate-x-1 transition-transform" />
        </button>

        {/* Divider */}
        <div className="w-[1px] h-3 md:h-4 bg-white/20 mx-3 shrink-0" />

        {/* Improvised Clean Mixed Fonts Title */}
        <div className="flex items-center gap-2 mt-[1px] whitespace-nowrap shrink-0">
          <span className="font-[family-name:var(--font-display)] italic tracking-widest font-normal text-white text-sm md:text-base">
            BTS
          </span>
          <span className="font-sans font-bold tracking-[0.15em] uppercase text-[10px] md:text-xs text-white/90">
            Shorts Video
          </span>
        </div>
        
      </div>

      {isLoading ? (
        <div className="h-full w-full flex flex-col items-center justify-center bg-[#050505]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white"
          />
          <p className="mt-4 text-white/50 animate-pulse font-medium tracking-widest uppercase">Loading feeds...</p>
        </div>
      ) : (
        // TikTok Swipe Container
        // data-lenis-prevent allows native mouse wheel / trackpad scrolling without Lenis hijacking it!
        <div 
          onScroll={handleScroll}
          data-lenis-prevent="true"
          className="h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar"
        >
          {feedVideos.map((video, index) => (
            <VideoItem key={video.id} video={video} onVideoLoop={() => handleVideoLoop(index)} />
          ))}
        </div>
      )}
    </div>
  );
};

// Individual Video Component
const VideoItem: React.FC<{ video: TikTokVideo; onVideoLoop?: () => void }> = ({ video, onVideoLoop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFollowPopup, setShowFollowPopup] = useState(false);

  // Auto-Play/Pause when scrolled into view
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.6 };
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Attempt to play unmuted. Browsers may block this if user hasn't clicked on the overall SPA yet
        videoRef.current?.play().catch((err) => {
           console.warn("Autoplay blocked. User must interact first.", err);
           // Optional: Fallback to muted autoplay
           if (videoRef.current) {
             videoRef.current.muted = true;
             videoRef.current.play().catch(() => {});
           }
        });
        setIsPlaying(true);
      } else {
        videoRef.current?.pause();
        setIsPlaying(false);
      }
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
        
        // Trigger loop callback right before the video restarts
        if (duration - currentTime < 0.2) {
          if (onVideoLoop) onVideoLoop();
        }
      }
    }
  };

  return (
    <div className="h-[100dvh] w-full snap-start relative bg-black flex justify-center items-center overflow-hidden">
      
      {/* Follow Popup Modal */}
      <AnimatePresence>
        {showFollowPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setShowFollowPopup(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[320px] bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[2rem] flex flex-col items-center gap-4 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowFollowPopup(false)}
                className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors"
              >
                 <X size={16} />
              </button>

              <div className="w-24 h-24 rounded-full overflow-hidden border border-white/30 shadow-xl pointer-events-none mt-2 shrink-0">
                <img 
                  src="https://lh3.googleusercontent.com/pw/AP1GczOY6eh8jD-AhYTN36AAloPj19xxOD1ZU-GJcdT814YnnlKqTIXtX7GLjBfoMrpOTG-eFw9enBnBbRQbgBqTzLnoZbtoYyG0_mRFfnfBJLefqLl-n6I=w2400" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              
              <div className="text-center flex flex-col gap-1.5">
                <h3 className="font-[family-name:var(--font-display)] italic text-2xl md:text-3xl text-white font-light leading-none">
                  @tiar.arstate.cinema
                </h3>
                <p className="text-white/60 text-[10px] md:text-ws tracking-[0.2em] font-bold">
                  CREATOR & VIDEOGRAPHER
                </p>
              </div>

              <a 
                href="https://www.tiktok.com/@tiar.arstate.cinema" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowFollowPopup(false)}
                className="w-full py-3.5 bg-[#ff0050] hover:bg-[#ff0050]/90 text-white font-bold tracking-widest text-sm rounded-full transition-all mt-2 active:scale-95 flex justify-center items-center shadow-[0_0_20px_rgba(255,0,80,0.4)]"
              >
                FOLLOW ON TIKTOK
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout Wrapper: Centers video and side panel */}
      <div className="w-full h-full md:h-[calc(100dvh-40px)] md:w-auto md:max-w-[70vw] relative flex items-end md:items-end justify-center">
        
        {/* Main Video Container (Rounded on Desktop) */}
        <div className="w-[100vw] h-[100dvh] md:w-[calc((100vh-40px)*9/16)] md:h-[calc(100vh-40px)] relative bg-[#111] md:rounded-xl overflow-hidden shadow-2xl shrink-0 group">
          
          <video
            ref={videoRef}
            src={video.url}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            loop
            playsInline
          />

          {/* Shadow Overlay for bottom Text Readability */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />

          {/* Bottom Text Info (Inside Video for both Mobile and Desktop) */}
          <div className="absolute bottom-4 left-4 right-16 z-30 flex flex-col gap-1.5 pb-2 md:pb-4">
            <h3 className="font-bold text-base md:text-lg drop-shadow-md text-white hover:underline cursor-pointer">{video.author}</h3>
            
            <p className="text-[14px] md:text-[15px] text-white/95 drop-shadow-md leading-snug max-h-24 overflow-y-auto no-scrollbar font-normal">
              {video.description}
            </p>
            
            <div className="flex items-center gap-2 mt-1">
              <Music size={14} className="text-white drop-shadow-md" />
              <motion.div className="overflow-hidden w-48 relative whitespace-nowrap">
                <motion.div 
                  animate={{ x: [0, -150] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="text-white text-xs md:text-sm font-semibold drop-shadow-md inline-block"
                >
                   {video.song}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{video.song}
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Progress Bar (TikTok style bottom red line) */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-40">
             <div className="h-full bg-[#ff0050] transition-all duration-75" style={{ width: `${progress}%` }} />
          </div>

          {/* Mobile-Only Action Sidebar (Hidden on MD screens) */}
          <div className="md:hidden absolute right-2 bottom-20 z-30 flex flex-col items-center gap-5 pb-4">
            <div onClick={() => setShowFollowPopup(true)} className="relative cursor-pointer mb-2 hover:scale-105 transition-transform group/prof">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-white bg-[#222]">
                <img 
                  src="https://lh3.googleusercontent.com/pw/AP1GczOY6eh8jD-AhYTN36AAloPj19xxOD1ZU-GJcdT814YnnlKqTIXtX7GLjBfoMrpOTG-eFw9enBnBbRQbgBqTzLnoZbtoYyG0_mRFfnfBJLefqLl-n6I=w2400" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ff0050] rounded-full p-0.5 border border-black">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
            </div>

            <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-0.5 group/btn">
              <Heart size={30} className={`drop-shadow-md ${isLiked ? 'fill-[#ff0050] text-[#ff0050]' : 'text-white fill-black/20'}`} />
              <span className="text-xs font-semibold drop-shadow-md text-white">{isLiked ? '12.5K' : video.likes}</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 group/btn">
              <MessageCircle size={30} className="text-white fill-black/20 drop-shadow-md" />
              <span className="text-xs font-semibold drop-shadow-md text-white">{video.comments}</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 group/btn">
              <Share2 size={28} className="text-white fill-black/20 drop-shadow-md" />
              <span className="text-xs font-semibold drop-shadow-md text-white">{video.shares}</span>
            </button>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-10 h-10 rounded-full border-[8px] border-[#222] bg-[#111] mt-4 flex items-center justify-center relative overflow-hidden">
              <Music size={10} className="text-white/50 absolute" />
            </motion.div>
          </div>
        </div>

        {/* Desktop-Only Action Sidebar (Right side, OUTSIDE video) */}
        <div className="hidden md:flex flex-col items-center justify-end h-full pb-8 pl-4 gap-4 w-16 shrink-0 z-20">
          
          <div onClick={() => setShowFollowPopup(true)} className="relative cursor-pointer mb-2 hover:scale-105 transition-transform group/prof">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#222]">
              <img 
                src="https://lh3.googleusercontent.com/pw/AP1GczOY6eh8jD-AhYTN36AAloPj19xxOD1ZU-GJcdT814YnnlKqTIXtX7GLjBfoMrpOTG-eFw9enBnBbRQbgBqTzLnoZbtoYyG0_mRFfnfBJLefqLl-n6I=w2400" 
                alt="Profile" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ff0050] rounded-full p-0.5 border-2 border-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>

          <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1 hover:scale-105 transition-transform mt-2">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <Heart size={24} className={`${isLiked ? 'fill-[#ff0050] text-[#ff0050]' : 'text-white fill-black/20'}`} />
            </div>
            <span className="text-xs font-bold text-white/80">{isLiked ? '12.5K' : video.likes}</span>
          </button>

          <button className="flex flex-col items-center gap-1 hover:scale-105 transition-transform">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <MessageCircle size={24} className="text-white fill-black/20" />
            </div>
            <span className="text-xs font-bold text-white/80">{video.comments}</span>
          </button>

          <button className="flex flex-col items-center gap-1 hover:scale-105 transition-transform">
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white"><path d="M18.8 13.9l-5.6-5.6a1.5 1.5 0 00-2.6 1v4H10C6.5 13.3 4 16.5 4 20.3c0 .5.5.8.9.5 2.1-1.8 4.7-2.6 7.4-2.6h3.3v4a1.5 1.5 0 002.6 1l5.6-5.6a1.5 1.5 0 000-2.1z"/></svg>
            </div>
            <span className="text-xs font-bold text-white/80">{video.shares}</span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default BTSPage;
