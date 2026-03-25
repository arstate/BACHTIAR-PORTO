import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, MessageCircle, Share2, Music } from 'lucide-react';
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
    description: "Bosen movement kamera gitu-gitu aja pas wisuda? Cobain trik transisi mulus ini 🎓🎥 #wisuda #videography #cinematic",
    song: "Hype Graduation - Vlog Music",
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
  }
];

const BTSPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [feedVideos, setFeedVideos] = useState<TikTokVideo[]>(initialVideos);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Infinite Scroll Handler (Loops the videos infinitely)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // When within 1.5 screen lengths of the bottom, duplicate the array to loop
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setFeedVideos(prev => [
        ...prev, 
        ...initialVideos.map(v => ({ ...v, id: `${v.id}-${Math.random()}` }))
      ]);
    }
  };

  return (
    <div className="bg-black/95 text-white h-[100dvh] w-full relative overflow-hidden">
      
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
          {feedVideos.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

// Individual Video Component
const VideoItem: React.FC<{ video: TikTokVideo }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);

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
      }
    }
  };

  return (
    <div className="h-[100dvh] w-full snap-start relative bg-black flex justify-center items-center overflow-hidden">
      
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
            <div className="relative cursor-pointer mb-2 hover:scale-105 transition-transform">
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
          
          <div className="relative cursor-pointer mb-2 hover:scale-105 transition-transform">
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
