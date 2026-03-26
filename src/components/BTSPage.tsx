import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, MessageCircle, Share2, Music, ChevronUp, ChevronDown, X, Play, VolumeX, Volume2, Link as LinkIcon, Check, MoreVertical, Maximize, Settings, Sparkles, IterationCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

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
  },
  {
    id: 17,
    url: "https://res.cloudinary.com/dqwnhqjsq/video/upload/v1774460888/FLASH_WARNING_videoangkatansekolah_farewellparty_farewell_video..._7516811035978796344_gz6y17.mp4",
    author: "@tiar.arstate.cinema",
    description: "FLASH WARNING ⚡️ Farewell Party vibes! 🎓✨ Ambil momen seru ini buat video angkatan yang ga akan terlupakan. Vibe lulusan 2024 emang beda! #farewell #graduation #flashwarning #videoangkatan",
    song: "Intense Remix - Graduation Base",
    likes: "158.4K",
    comments: "8.2K",
    shares: "24.1K"
  },
  {
    id: 18,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534104/a329b48666dd474d8c6813c4424ea290_nn2nmd.mp4",
    author: "@tiar.arstate.cinema",
    description: "Syahdu pol! 💚 Wedding adat emang gak ada obat. #WeddingCinema #BTS #PernikahanAdat",
    song: "Love Story Cinematic - Arstate",
    likes: "45.2K",
    comments: "1.2K",
    shares: "3.4K"
  },
  {
    id: 19,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534101/51ec075208704a148cd0e8d1300eb17c_lqfzjq.mov",
    author: "@tiar.arstate.cinema",
    description: "Sat set maszeh! 🎬 Estetik itu perlu effort rek. #BehindTheScenes #Filmmaker",
    song: "Cinematic Beats - Arstate",
    likes: "12.8K",
    comments: "432",
    shares: "1.1K"
  },
  {
    id: 20,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534100/f981f1d8a40c49ef8338e70ab4e84d22_diglis.mp4",
    author: "@tiar.arstate.cinema",
    description: "Vibes kelas lagi asik-asiknya 🎓🎥 Dokumentasi tipis-tipis. #SchoolProject #DokumenterSekolah",
    song: "School Memories - Nostalgia Base",
    likes: "76.4K",
    comments: "3.2K",
    shares: "12.1K"
  },
  {
    id: 21,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534100/c055345017604561b3fdcf9a7c5b465c_honagh.mp4",
    author: "@tiar.arstate.cinema",
    description: "Grahadi pecah! 🏛️🇮🇩 Gak nyangka ramenya gini rek. #Grahadi #Surabaya #EventDocumentation",
    song: "Grand Opening - Majestic",
    likes: "31.5K",
    comments: "892",
    shares: "5.6K"
  },
  {
    id: 22,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534100/90f6193a5cd44258989fbb611f74c714_whronm.mp4",
    author: "@tiar.arstate.cinema",
    description: "Klasik tapi asik rek 🚗💨 VW Beetle emang juaranya buat wedding film. Hasilnya jadul tapi berkelas! #VWClassic #WeddingFilm #JustMarried",
    song: "Vintage Soul - Jazz Original",
    likes: "54.2K",
    comments: "1.1K",
    shares: "8.4K"
  },
  {
    id: 23,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534099/124115be7de644d195aa9564ab15e8f3_fnynff.mp4",
    author: "@tiar.arstate.cinema",
    description: "Masa SMA gak bakal balik rek! ✨ Squad goals pol. #MasaSekolah #FotoGrup #Yearbook",
    song: "Focus - Productivity Beats",
    likes: "18.9K",
    comments: "541",
    shares: "2.1K"
  },
  {
    id: 24,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534098/87ea38b2e0bb4c65b1ec00d34837bec7_l7orxd.mp4",
    author: "@tiar.arstate.cinema",
    description: "Khidmat pol 🏛️💼 Liputan resmi tetep harus sinematik. #ProtokolJatim #EventVideography",
    song: "Storyteller - Ambient Flow",
    likes: "22.5K",
    comments: "612",
    shares: "3.4K"
  },
  {
    id: 25,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534098/0a142aed8eda4e58bb06d1f710763a62_jre3dm.mp4",
    author: "@tiar.arstate.cinema",
    description: "Slow motion-nya ngeri! 📹✨ Sony emang gak pernah gagal rek. #SonyAlpha #SlowMotion #Filmmaking",
    song: "The Angle - Modern Base",
    likes: "14.3K",
    comments: "321",
    shares: "1.2K"
  },
  {
    id: 26,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534097/d2f177b91e354b8187a3d6cf7f71e6ac_pimj9e.mp4",
    author: "@tiar.arstate.cinema",
    description: "Lagi serius diskusi rek 👩‍🏫💻 Candid tipis-tipis biar natural. #KegiatanSekolah #Candid #LearningProcess",
    song: "Golden Hour Vibes - Arstate",
    likes: "95.6K",
    comments: "4.5K",
    shares: "21.3K"
  },
  {
    id: 27,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534097/805d0c1a6c1441eda8333edcf8c5f5c7_gsjzli.mp4",
    author: "@tiar.arstate.cinema",
    description: "Spill tipis wedding cinematic hari ini 💍✨ Cantik pol! #WeddingPreparation #KebayaModern #BTS",
    song: "Tech Flow - Electronic Beats",
    likes: "8.4K",
    comments: "542",
    shares: "912"
  },
  {
    id: 28,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534094/e91a25392bd74bcf8a3315aa7a9cd4ac_szryxi.mp4",
    author: "@tiar.arstate.cinema",
    description: "Panas-panas tetep gas pol 🔥📸 Demi hasil yang estetik rek! #OutdoorPhotography #FlashSetup",
    song: "Magic Touch - Dreamy Sound",
    likes: "44.2K",
    comments: "1.8K",
    shares: "6.3K"
  },
  {
    id: 29,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534094/11eeeb89eeed463ba239e6f987e0ece4_ud9zjr.mp4",
    author: "@tiar.arstate.cinema",
    description: "Creative mode: ON! 🎥🔥 Nongkrong produktif bareng tim. #GenZCreator #CreativeProject #TeamWork",
    song: "Team Spirit - Upbeat Mix",
    likes: "12.5K",
    comments: "341",
    shares: "1.5K"
  },
  {
    id: 30,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534091/4c0c23f6f6d94180a4440c03a2b42cf8_qhkxmc.mp4",
    author: "@tiar.arstate.cinema",
    description: "Momen video angkatan Class of 2024! 🎓📸 Bakal kangen pol sama masa-masa ini rek. #ClassOf2024 #VideoAngkatan #SchoolMemories #BachtiarCinema",
    song: "Micro World - Minimalist Base",
    likes: "7.2K",
    comments: "214",
    shares: "542"
  },
  {
    id: 31,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534088/61f56dff202b408b97a879b6e981703b_a7t98d.mp4",
    author: "@tiar.arstate.cinema",
    description: "Tim solid, karya apik! 👋🎬 Sapa dulu mas-mas videonya. #ProductionTeam #WorkMode #FilmmakerLife",
    song: "The Journey - Epic Cinematic",
    likes: "112.4K",
    comments: "6.3K",
    shares: "32.1K"
  },
  {
    id: 32,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534088/2d4187d9a442477b887264a9d9c48aae_bc32ay.mp4",
    author: "@tiar.arstate.cinema",
    description: "REC on! 💍📹 Momen krusial jangan sampe lolos rek. #SonyA7II #WeddingVideography #RealTime",
    song: "Colors of Life - Vibrant Sound",
    likes: "19.5K",
    comments: "432",
    shares: "1.8K"
  },
  {
    id: 33,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534086/79494cf45ff24f1586e8399fe24609bf_nqtc94.mp4",
    author: "@tiar.arstate.cinema",
    description: "Setup kamera buat shoot dekorasi pinky-pinky ginii 🎥🌸 Vibes-nya dapet banget kan rek? #BTSWedding #Cinematography #DekorasiSurabaya",
    song: "Rainy Day Rhythm - Ambient",
    likes: "42.1K",
    comments: "1.5K",
    shares: "8.2K"
  },
  {
    id: 34,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534086/1df1908b9d8f492f8c247eb22725f7ec_k0kdu6.mp4",
    author: "@tiar.arstate.cinema",
    description: "Liputan seminar medis hari ini 🩺🥤 Serius tapi tetep sinematik rek. #MedicalSeminar #PocariSweat #EventSurabaya",
    song: "Moody Interview - Deep Sound",
    likes: "15.7K",
    comments: "541",
    shares: "2.3K"
  },
  {
    id: 35,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534084/297336e7c76d46b48e45c196bd842b30_lsa5fa.mp4",
    author: "@tiar.arstate.cinema",
    description: "Editing gas pol! 💻🚀 AMD Ryzen AI emang kenceng rek. #AdobePremiere #EditingVideo #AMDRyzen",
    song: "Celebration - Pop Vibes",
    likes: "33.8K",
    comments: "912",
    shares: "4.5K"
  },
  {
    id: 36,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534082/f594cbb1a7584140aefd747cb2b4a7ca_luhwut.mp4",
    author: "@tiar.arstate.cinema",
    description: "Lagi ngulik desain maszeh! 🎨💻 Sat set biar cepet kelar. #UIUX #Design #BachtiarPorto",
    song: "Creative Bits - Lofi Hip Hop",
    likes: "12.4K",
    comments: "214",
    shares: "342"
  },
  {
    id: 37,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534081/193aa09d0dc04cc0ba719719319d3d81_lstrrj.mp4",
    author: "@tiar.arstate.cinema",
    description: "Persiapan live stream religi 🙏✨ Team solid, lancar jaya rek! #LiveStreaming #Surabaya #ReligiousEvent",
    song: "Spiritual Peace - Ambient",
    likes: "45.8K",
    comments: "1.5K",
    shares: "3.2K"
  },
  {
    id: 38,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534080/b9ccc12db65949a28be803a282616d4f_ed9lsp.mp4",
    author: "@tiar.arstate.cinema",
    description: "Cantik pol dari balik lensa! 📸💍 Wedding vibes-nya dapet banget hari ini. #WeddingCinema #Viewfinder",
    song: "Wedding Dream - Arstate",
    likes: "67.2K",
    comments: "2.1K",
    shares: "5.4K"
  },
  {
    id: 39,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534080/123cbdc9783549a195531901cd0c15bb_mmnent.mp4",
    author: "@tiar.arstate.cinema",
    description: "Cek tone warna baru rek 🌳✨ Syahdu gak sih buat video cinematic? #ColorGrading #Cinematic #Nature",
    song: "Nature Walk - Chill Sound",
    likes: "18.3K",
    comments: "542",
    shares: "1.1K"
  },
  {
    id: 40,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534079/8b79a40d12924f93b6447f196ab32e8a_hooq2x.mp4",
    author: "@tiar.arstate.cinema",
    description: "Mode serius operet vMix! 💻🔥 Jangan sampe salah pencet rek pas live. #vMix #LiveEvent #Technical",
    song: "Control Room - Electronic",
    likes: "9.5K",
    comments: "231",
    shares: "542"
  },
  {
    id: 41,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534077/dc80cd14f17b4cfe84ce445925542f75_snfna6.mp4",
    author: "@tiar.arstate.cinema",
    description: "Muter-muter di pameran wedding rek! 👰✨ Banyak booth keren, makin gak sabar berkarya di sini. #WeddingExpo #Surabaya #Inspirasi",
    song: "Elegant Walk - Piano Base",
    likes: "112.4K",
    comments: "5.4K",
    shares: "22.1K"
  },
  {
    id: 42,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534075/63d32173736a4d6eb6b2be08f0366094_xwyu5y.mp4",
    author: "@tiar.arstate.cinema",
    description: "Momen sakral wedding rek! 👰✨ Suasananya dapet banget, elegan pol. #WeddingCinema #WeddingDay #Surabaya",
    song: "Wedding Bliss - Strings Instrumental",
    likes: "25.6K",
    comments: "812",
    shares: "3.4K"
  },
  {
    id: 43,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534074/d855fde3a96e4f48b97e18f4a109611a_f64kys.mp4",
    author: "@tiar.arstate.cinema",
    description: "Detail eye makeup-nya ngeri! 👁️✨ Kualitas 4K Sony emang gak ada lawan. #MacroPhotography #DetailCheck",
    song: "Macro Vision - Minimalist",
    likes: "8.9K",
    comments: "142",
    shares: "211"
  },
  {
    id: 44,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534072/4947ee8a79bd40eab7656072b7a1ea52_nts1zj.mp4",
    author: "@tiar.arstate.cinema",
    description: "Tes photobooth dulu rek 📸🖤 Vibes hitam putih emang gak bosenin blas. #Photobooth #Classic #BandW",
    song: "Classic Snap - Vintage Mix",
    likes: "15.2K",
    comments: "321",
    shares: "812"
  },
  {
    id: 45,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534068/e434a7f96e964b03944919b2e5ea3624_w5wzui.mp4",
    author: "@tiar.arstate.cinema",
    description: "Vibes konser paling asik dari tengah crowd rek! 🎸🔥 Hype pol! #ConcertPhotography #LiveMusic",
    song: "Rock Crowd - High Energy",
    likes: "158.3K",
    comments: "10.4K",
    shares: "45.1K"
  },
  {
    id: 46,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534058/38ea3d1b36654c03ae751518fd3f08e4_orizmf.mp4",
    author: "@tiar.arstate.cinema",
    description: "Gimbal workout hari ini! 🎥🔥 Stage outdoor-nya cakep pol rek. #GimbalLife #EventBTS #Workout",
    song: "Steady Hands - Drum & Bass",
    likes: "22.5K",
    comments: "614",
    shares: "3.2K"
  },
  {
    id: 47,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534066/b7e34913ca5f4c16ad0dfca13d22d4ea_fnlzbc.mp4",
    author: "@tiar.arstate.cinema",
    description: "Playback hasil manggung barusan 🎸✨ Energinya dapet pol rek! #RockStar #LiveMusic #Madiun",
    song: "Stage Fever - Rock Mix",
    likes: "44.2K",
    comments: "1.2K",
    shares: "5.3K"
  },
  {
    id: 48,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534065/e50fe5cadf4743a59e8460cc11ea3ecd_dpcq6m.mp4",
    author: "@tiar.arstate.cinema",
    description: "SID di Madiun pecah parah! 🎸🔥🔥 Stadion Wilis banjir Outsiders. #SupermanIsDead #Madiun #Concert",
    song: "SID Madiun - Hype Energy",
    likes: "210.5K",
    comments: "15.2K",
    shares: "58.4K"
  },
  {
    id: 49,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534061/e75331909aa04f3aaa158dcc6b09cd01_rxjtw4.mp4",
    author: "@tiar.arstate.cinema",
    description: "Moshpit energy! 🤘🔥 Rockamination emang gak ada obatnya rek. #Moshpit #RocknRoll #ConcertLife",
    song: "Moshpit Anthem - Intense",
    likes: "85.4K",
    comments: "4.3K",
    shares: "22.1K"
  },
  {
    id: 50,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534061/9f6ba64627554eccbd0b1f63f6b4901f_qnxxsd.mp4",
    author: "@tiar.arstate.cinema",
    description: "Rig siap tempur di bawah terik matahari ☀️🎥 Semangat maszeh! #Videography #RigBuild #Outdoor",
    song: "Sun Chaser - Upbeat",
    likes: "12.8K",
    comments: "341",
    shares: "512"
  },
  {
    id: 51,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534057/efc222c672a6447bbcded51406431470_mgyjbu.mp4",
    author: "@tiar.arstate.cinema",
    description: "Betotan bass-nya ngeri! 🎸🔴 Vibes panggungnya gila banget rek. #Bassist #StageLife #Concert",
    song: "Bass Line - Deep Bass",
    likes: "33.2K",
    comments: "812",
    shares: "4.1K"
  },
  {
    id: 52,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534055/19ae66daa5004841a9ac80f0e74c0036_hxiypg.mov",
    author: "@tiar.arstate.cinema",
    description: "Lagi ngulik tone warna wedding rek! 🎨💍 Momen editing yang bener-bener kudu teliti maszeh. #AdobePremiere #WeddingEdit #BachtiarPorto",
    song: "Shadow Play - Mysterious",
    likes: "11.5K",
    comments: "432",
    shares: "812"
  },
  {
    id: 53,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534055/5a50e9c80e234d32a3971f307e95f01d_yfdxij.mp4",
    author: "@tiar.arstate.cinema",
    description: "Khidmat pol di Masjid Al-Akbar 🙏✨ Momen Dzikir & Doa bersama. #MasjidAlAkbar #Surabaya #Spiritual",
    song: "Holy Night - Peaceful",
    likes: "258.4K",
    comments: "22.1K",
    shares: "85.3K"
  },
  {
    id: 54,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534055/dd0c39a7283246c3b9155df9f7a92a3b_wh4lq7.mp4",
    author: "@tiar.arstate.cinema",
    description: "Moshpit malem-malem emang beda energinya! 🤘🔥 Gas pol rek! #NightConcert #HighEnergy",
    song: "Night Rave - Hardstyle",
    likes: "124.6K",
    comments: "8.2K",
    shares: "34.1K"
  },
  {
    id: 55,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534053/0a198d96e0b44c49bbebe5160d86ed12_zr7ueu.mp4",
    author: "@tiar.arstate.cinema",
    description: "Vlogging tipis-tipis di jalanan kota 🏙️🎥 Estetik gak harus mahal rek. #StreetVlog #CityLife",
    song: "City Lights - LoFi",
    likes: "19.2K",
    comments: "612",
    shares: "2.4K"
  },
  {
    id: 56,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534050/e243a3ea4e00453ea77a96f20d4dda6f_zyczau.mov",
    author: "@tiar.arstate.cinema",
    description: "Coming soon rek! 🎬✨ Frame demi frame kita jaga kualitasnya. #BTSCinema #Filmmaker",
    song: "Frames - Dramatic",
    likes: "14.8K",
    comments: "321",
    shares: "912"
  },
  {
    id: 57,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534045/3a05fa1393cd4bf591e2ccf17485334e_gre4bx.mov",
    author: "@tiar.arstate.cinema",
    description: "Proses gak pernah bohong maszeh 🎬💸 Sat set hasil maksimal! #WorkHard #CinemaProduction",
    song: "Grind - Phonk Base",
    likes: "17.4K",
    comments: "542",
    shares: "1.2K"
  },
  {
    id: 58,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534043/738ec32d27aa4b878da832f1cd7b84db_ms5uwp.mp4",
    author: "@tiar.arstate.cinema",
    description: "Mudik bareng seru banget rek! 🚌🚌 Macet dikit tetep happy maszeh. #MudikBareng #Mudik2024 #PulangKampung",
    song: "Journey Home - Folk",
    likes: "82.5K",
    comments: "4.1K",
    shares: "15.4K"
  },
  {
    id: 59,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534039/eaae9b92e74d4e16b351df0d34634c86_mbe6w6.mp4",
    author: "@tiar.arstate.cinema",
    description: "Sumpah rame banget rek! 🙏✨ Acara kumpul-kumpul hari ini khidmat pol, barakallah. #MassiveGathering #ReligiousEvent #Surabaya",
    song: "Together - Uplifting",
    likes: "12.4K",
    comments: "321",
    shares: "1.1K"
  },
  {
    id: 60,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534037/1728d0f2973d44d98237cef8d99c6e12_mgwnky.mp4",
    author: "@tiar.arstate.cinema",
    description: "Cek sound dulu biar nanti malam pecah rek! 🎸☀️ Semangat maszeh! #Soundcheck #OutdoorStage",
    song: "Soundcheck - Blues Rock",
    likes: "15.8K",
    comments: "432",
    shares: "912"
  },
  {
    id: 61,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534037/8d2df624cf014777b4ac3d1932333666_l8ax6q.mp4",
    author: "@tiar.arstate.cinema",
    description: "Lembur tipis-tipis bareng Premiere Pro 💻🎞️ Sat set editnya! #EditorLife #Adobe #Work",
    song: "Render Time - Lofi",
    likes: "20.4K",
    comments: "612",
    shares: "2.5K"
  },
  {
    id: 62,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534033/795beb063fd0460faaf8a5e0ba94d03c_n0diui.mp4",
    author: "@tiar.arstate.cinema",
    description: "Liputan forum resmi hari ini 🏛️💼 Serius tapi tetep sinematik rek. #EventVideography #Formal",
    song: "Official - Orchestral",
    likes: "11.2K",
    comments: "214",
    shares: "542"
  },
  {
    id: 63,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534033/650c2a85894246509872e87f2d109840_s2fia4.mp4",
    author: "@tiar.arstate.cinema",
    description: "Sinematik pol di Ibis Hotel 🏨✨ Cahayanya dapet banget rek! #CinematicVideo #IbisHotel #Surabaya",
    song: "Hotel Vibes - Chill Noir",
    likes: "45.1K",
    comments: "1.5K",
    shares: "6.2K"
  },
  {
    id: 64,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534026/78660716da9a42a1aa00d6ea4e91dd24_w8hzo1.mp4",
    author: "@tiar.arstate.cinema",
    description: "Cek alat dulu bareng tim angkatan sekolah 🎒🎥 Siap berkarya rek! #SchoolProject #GearCheck",
    song: "Ready Set Go - Upbeat",
    likes: "33.8K",
    comments: "912",
    shares: "4.5K"
  },
  {
    id: 65,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534032/3267fe1443a24745bf876baf97e529e4_cko1ae.mp4",
    author: "@tiar.arstate.cinema",
    description: "Lagi di tengah keramaian acara wedding rek! 👰✨ Seru pol suasananya. #WeddingDay #BTS #Surabaya",
    song: "Wedding Crowd - Celebration",
    likes: "45.2K",
    comments: "1.2K",
    shares: "3.4K"
  },
  {
    id: 66,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534031/a131e36227c547bbab1d59a3c93c3ad5_wpfbfz.mp4",
    author: "@tiar.arstate.cinema",
    description: "Tim handheld beraksi rek! 🎥📸 Nge-shoot momen sakral biar estetik maksimal. #WeddingCinema #BTS #TimHandheld",
    song: "Handheld Motion - Arstate",
    likes: "28.5K",
    comments: "642",
    shares: "1.8K"
  },
  {
    id: 67,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534029/f25be45af1024fd08ecf2b870ff27048_hl3tuo.mp4",
    author: "@tiar.arstate.cinema",
    description: "Detail makeup itu penting banget rek! 💄👰 Lagi proses editing biar makin flawless. #WeddingEditor #BTS #PremierePro",
    song: "Beauty Focus - Soft Lofi",
    likes: "19.3K",
    comments: "432",
    shares: "2.1K"
  },
  {
    id: 68,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534030/081ed9fc75b64bb09d4f40430864c1e3_ujqf36.mp4",
    author: "@tiar.arstate.cinema",
    description: "Momen manis jangan sampai lewat rek! 💍✨ Ngedit bts engagement biar makin baper. #EngagementVideo #BTS #Surabaya",
    song: "Sweet Moments - Love Base",
    likes: "56.4K",
    comments: "2.1K",
    shares: "8.2K"
  },
  {
    id: 69,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534029/df1a55fa2d494cd984140103ceb690c4_lhpfem.mp4",
    author: "@tiar.arstate.cinema",
    description: "Detail wedding ring emang gak pernah gagal rek! 💍✨ Cakep pol maszeh. #WeddingDetails #MacroShot #BTS",
    song: "Diamond Shine - Cinematic",
    likes: "12.8K",
    comments: "311",
    shares: "1.1K"
  },
  {
    id: 70,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534028/bfd26cea395b4b40a7f0f55b842dd608_xbknaf.mov",
    author: "@tiar.arstate.cinema",
    description: "Setup dulu biar paten rek! 🎥☕ Venue-nya udah siap, tinggal gaskeun shot. #VenueSetup #ProductionLife #Surabaya",
    song: "Morning Coffee - Production Mix",
    likes: "8.5K",
    comments: "214",
    shares: "432"
  },
  {
    id: 71,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534027/e8cce3d0d5004bbe827a2bb08ab0fb7e_pnizgy.mp4",
    author: "@tiar.arstate.cinema",
    description: "Alhamdulillah sah! 💍✨ Wedding day Yuli & Hafid 22 Juni 2024. Momen paling ditunggu rek. #WeddingStory #Sah #BachtiarCinema",
    song: "The Vow - Pure Piano",
    likes: "124.2K",
    comments: "8.5K",
    shares: "32.1K"
  },
  {
    id: 72,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534027/58d41ca6ea4b41da90bdafa391d6f93c_g6ouot.mp4",
    author: "@tiar.arstate.cinema",
    description: "Vibe test dulu rek! 🌊🎥 Gimbal emang andalan buat shoot cinematic begini. #VibeTest #Cinematic #Surabaya",
    song: "Ocean Breeze - Vibe Base",
    likes: "45.1K",
    comments: "1.5K",
    shares: "5.4K"
  },
  {
    id: 73,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534026/55d8b88959a74896a76765cca9d61def_jg4jcu.mp4",
    author: "@tiar.arstate.cinema",
    description: "Day 1 gaskeun rek! 🎥📸 Persiapan kudu mateng biar hasil maksimal. #Day1 #ShootLife #FilmProduction",
    song: "Day 1 - Action Ready",
    likes: "33.2K",
    comments: "812",
    shares: "2.1K"
  },
  {
    id: 74,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534025/15feb29f94d6464db95f3ab2c2f9d3c4_mbs5do.mp4",
    author: "@tiar.arstate.cinema",
    description: "Lagi ngekor pengantin rek! 👰🤵‍♂️ Shoot cinematic di kampung juga oke pol hasilnya. #WeddingShoot #BTS #BachtiarCinema",
    song: "Rural Charm - Acoustic",
    likes: "44.1K",
    comments: "1.2K",
    shares: "6.3K"
  },
  {
    id: 75,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534019/c05819e5ea85420ca1247a63cbc6d41f_fvdsja.mp4",
    author: "@tiar.arstate.cinema",
    description: "Kudu pinter cari angle rek! 🎥✨ Biar momen sakralnya dapet banget vibesnya. #WeddingCinema #BTS #Surabaya",
    song: "Perfect Angle - Cinematic Flow",
    likes: "19.5K",
    comments: "432",
    shares: "1.2K"
  },
  {
    id: 76,
    url: "https://res.cloudinary.com/dxghgdt9t/video/upload/v1774534014/ee26ee9a73e6494b9c2dff171b03c036_ylleei.mp4",
    author: "@tiar.arstate.cinema",
    description: "Kerja tim itu kunci rek! 🎥📸 Dua kamera biar dapet banyak angle estetik. #WeddingDay #BTS #BachtiarCinema",
    song: "Team Sync - Professional",
    likes: "37.4K",
    comments: "912",
    shares: "4.1K"
  }
];

const shuffleArray = <T,>(array: T[], fixedFirstId?: string | number): T[] => {
  let toShuffle = [...array];
  let fixedItem: T | null = null;

  if (fixedFirstId) {
    const fixedIndex = toShuffle.findIndex((v: any) => String(v.id) === String(fixedFirstId));
    if (fixedIndex > -1) {
      fixedItem = toShuffle.splice(fixedIndex, 1)[0];
    }
  }

  for (let i = toShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
  }

  if (fixedItem) {
    toShuffle.unshift(fixedItem);
  }

  return toShuffle;
};

const BTSPage = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showGlobalSettings, setShowGlobalSettings] = useState(false);
  const [feedVideos, setFeedVideos] = useState<TikTokVideo[]>(() => {
    return shuffleArray(initialVideos, videoId);
  });
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isAmbienceOn, setIsAmbienceOn] = useState(true);
  const [isAutoScrollOn, setIsAutoScrollOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollHintShownRef = useRef(false);
  const isFetchingRef = useRef(false);

  const handleVideoEnd = (index: number) => {
    if (isAutoScrollOn && scrollContainerRef.current) {
      const nextIndex = index + 1;
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: nextIndex * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

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
      
      {/* 
        Floating Centered Pill Header
        Now that we have balanced sidebars (left and right), 
        the player's center is the same as the screen's center.
      */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-[100] flex items-center p-1.5 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] pointer-events-auto transition-all duration-300 hover:bg-black/60 group/nav">
        
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

        {/* Divider - Right Side (Mobile Only) */}
        <div className="md:hidden w-[1px] h-3 bg-white/20 mx-3 shrink-0" />

        {/* Settings Dots - Mobile Only (Integrated in Pill) */}
        <button 
          onClick={() => setShowGlobalSettings(!showGlobalSettings)}
          className="md:hidden w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors shrink-0 active:scale-90"
        >
          <MoreVertical size={16} />
        </button>

        {/* Global Settings Menu - Mobile Only */}
        <AnimatePresence>
          {showGlobalSettings && (
            <>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="md:hidden absolute top-16 right-0 w-52 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-[150]"
              >
                <div className="p-2 flex flex-col gap-1">
                  <button 
                    onClick={() => { setIsAmbienceOn(!isAmbienceOn); setShowGlobalSettings(false); }}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/10 text-white/90 transition-colors rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles size={18} className={isAmbienceOn ? 'text-[#ff0050]' : 'text-white/40'} />
                      <span className="text-sm font-medium">Ambience</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isAmbienceOn ? 'bg-[#ff0050]' : 'bg-white/20'}`}>
                      <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isAmbienceOn ? 'right-1' : 'left-1'}`} />
                    </div>
                  </button>

                  <button 
                    onClick={() => { setIsAutoScrollOn(!isAutoScrollOn); setShowGlobalSettings(false); }}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/10 text-white/90 transition-colors rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <IterationCcw size={18} className={isAutoScrollOn ? 'text-[#ff0050]' : 'text-white/40'} />
                      <span className="text-sm font-medium">Auto Scroll</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isAutoScrollOn ? 'bg-[#ff0050]' : 'bg-white/20'}`}>
                      <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isAutoScrollOn ? 'right-1' : 'left-1'}`} />
                    </div>
                  </button>

                  <button 
                    onClick={() => { setIsMusicOn(!isMusicOn); setShowGlobalSettings(false); }}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/10 text-white/90 transition-colors rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      {isMusicOn ? <Volume2 size={18} className="text-[#ff0050]" /> : <VolumeX size={18} className="text-white/40" />}
                      <span className="text-sm font-medium">Music</span>
                    </div>
                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isMusicOn ? 'bg-[#ff0050]' : 'bg-white/20'}`}>
                      <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isMusicOn ? 'right-1' : 'left-1'}`} />
                    </div>
                  </button>

                  <div className="px-5 py-4 mt-1 flex items-center gap-3 text-white/40 bg-white/5 rounded-2xl">
                    <Settings size={18} />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-tighter font-bold opacity-50">Kualitas Video</span>
                      <span className="text-[10px] text-white font-bold">1080p (Auto)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
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
          ref={scrollContainerRef}
          onScroll={handleScroll}
          data-lenis-prevent="true"
          className="h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar"
        >
          {feedVideos.map((video, index) => (
            <VideoItem 
              key={video.id} 
              video={video} 
              onVideoEnd={() => handleVideoEnd(index)}
              showGlobalSettings={showGlobalSettings}
              setShowGlobalSettings={setShowGlobalSettings}
              onScrollUp={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
                }
              }}
              onScrollDown={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              isAmbienceOn={isAmbienceOn}
              setIsAmbienceOn={setIsAmbienceOn}
              isAutoScrollOn={isAutoScrollOn}
              setIsAutoScrollOn={setIsAutoScrollOn}
              isMusicOn={isMusicOn}
              setIsMusicOn={setIsMusicOn}
            />
          ))}
        </div>
      )}

      {/* Desktop Scroll Navigation Container (Red Boxes position) */}
      {/* Removed from global - moved inside VideoItem for perfect symmetry */}
    </div>
  );
};

// Individual Video Component
const VideoItem: React.FC<{ 
  video: TikTokVideo; 
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  showGlobalSettings: boolean;
  setShowGlobalSettings: (v: boolean) => void;
  isAmbienceOn: boolean;
  setIsAmbienceOn: (v: boolean) => void;
  isAutoScrollOn: boolean;
  setIsAutoScrollOn: (v: boolean) => void;
  isMusicOn: boolean;
  setIsMusicOn: (v: boolean) => void;
}> = ({ 
  video, 
  onVideoEnd, 
  onScrollUp,
  onScrollDown,
  isAmbienceOn, 
  setIsAmbienceOn, 
  isAutoScrollOn, 
  setIsAutoScrollOn, 
  isMusicOn, 
  setIsMusicOn,
  showGlobalSettings,
  setShowGlobalSettings
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showFollowPopup, setShowFollowPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isFallbackMuted, setIsFallbackMuted] = useState(false);

  // Auto-Play/Pause when scrolled into view
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.6 };
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Update URL to current video ID without reloading
        const cleanId = video.id.toString().split('-')[0];
        window.history.replaceState(null, '', `#/bts/${cleanId}`);

        if (videoRef.current) {
          videoRef.current.play().then(() => {
            videoRef.current!.muted = !isMusicOn;
            setIsFallbackMuted(false);
            setIsPlaying(true);
            ambientRef.current?.play().catch(()=>{});
          }).catch(() => {
            videoRef.current!.muted = true;
            videoRef.current!.play().catch(() => {});
            setIsFallbackMuted(true);
            setIsPlaying(true);
          });
        }
      } else {
        videoRef.current?.pause();
        ambientRef.current?.pause();
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
    if (showGlobalSettings) {
      setShowGlobalSettings(false);
      return;
    }
    
    if (isFallbackMuted) {
      if (videoRef.current) {
        // If system blocked play, and user clicked, we try to unmute IF music is on
        videoRef.current.muted = !isMusicOn;
        videoRef.current.play().catch(()=>{});
        if (isAmbienceOn) ambientRef.current?.play().catch(()=>{});
      }
      setIsFallbackMuted(false);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      videoRef.current?.pause();
      ambientRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current) {
        videoRef.current.muted = !isMusicOn;
        videoRef.current.play().catch(()=>{});
      }
      if (isAmbienceOn) ambientRef.current?.play().catch(()=>{});
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
    setShowGlobalSettings(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      
      // Update ambient video to stay in sync
      if (isAmbienceOn && ambientRef.current && Math.abs(ambientRef.current.currentTime - currentTime) > 0.3) {
        ambientRef.current.currentTime = currentTime;
      }

      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
        
        // Trigger end callback right before the video finishes
        if (duration - currentTime < 0.2) {
          if (onVideoEnd) onVideoEnd();
        }
      }
    }
  };

  // Sync Global Music state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMusicOn;
    }
    if (ambientRef.current) {
      ambientRef.current.muted = true; // ambient is always silent
    }
  }, [isMusicOn]);

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

        {/* Share Popup Modal */}
        {showSharePopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setShowSharePopup(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[320px] bg-[#1a1a1a] border border-white/10 p-6 rounded-3xl flex flex-col gap-6 shadow-2xl relative"
            >
              <h3 className="text-white font-bold text-center text-lg md:text-xl font-[family-name:var(--font-sans)] uppercase tracking-wider">Share Video</h3>
              <button onClick={() => setShowSharePopup(false)} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
                <X size={16} />
              </button>
              
              <div className="flex gap-4 w-full">
                {/* Whatsapp Share */}
                <button 
                  onClick={() => {
                    const cleanId = video.id.toString().split('-')[0];
                    const shareUrl = `${window.location.origin}/#/?bts=${cleanId}`; // fallback syntax wait, User wants /#/bts/vid
                    const actualShareUrl = `${window.location.origin}/#/bts/${cleanId}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Wajib coba videografer yang satu ini hasilnya dijamin ga bosenin! Cek portofolionya: ' + actualShareUrl)}`);
                    setShowSharePopup(false);
                  }}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div className="w-14 h-14 bg-[#25D366] rounded-full flex justify-center items-center group-hover:-translate-y-1 transition-transform shadow-lg">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.333.158 11.892c0 2.098.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.332 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-white/90 text-xs font-semibold tracking-wide">WhatsApp</span>
                </button>

                {/* Copy Link */}
                <button 
                  onClick={() => {
                    const cleanId = video.id.toString().split('-')[0];
                    const actualShareUrl = `${window.location.origin}/#/bts/${cleanId}`;
                    navigator.clipboard.writeText(actualShareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div className={`w-14 h-14 rounded-full flex justify-center items-center transition-all shadow-lg ${copied ? 'bg-[#ff0050]' : 'bg-white/10 group-hover:-translate-y-1'}`}>
                     {copied ? <Check size={26} className="text-white" /> : <LinkIcon size={26} className="text-white" />}
                  </div>
                  <span className="text-white/90 text-xs font-semibold tracking-wide">{copied ? 'Copied URL!' : 'Copy Link'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Layout Wrapper: Centers video and side panel */}
      <div className="w-full h-full md:h-[calc(100dvh-40px)] md:w-auto md:max-w-[75vw] relative flex items-end md:items-end justify-center">
        
        {/* Desktop-Only Navigation Sidebar (Left side, MIRRORED to right sidebar) */}
        <div className="hidden md:flex flex-col items-center justify-end h-full pb-8 pr-4 gap-4 w-16 shrink-0 z-20">
          <button 
            title="Video Sebelumnya"
            onClick={(e) => { e.stopPropagation(); onScrollUp?.(); }}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-90 group shadow-lg"
          >
            <ChevronUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
          
          <button 
            title="Video Selanjutnya"
            onClick={(e) => { e.stopPropagation(); onScrollDown?.(); }}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-3xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-90 group shadow-lg"
          >
            <ChevronDown size={24} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Expanded Portrait Ambient Glow - Desktop Only */}
        {isAmbienceOn && (
          <div className="hidden md:block absolute md:w-[calc((100vh-40px)*9/16)] md:h-[calc(100vh-40px)] left-0 top-0 z-0 pointer-events-none opacity-[0.40] select-none">
            <video
              ref={ambientRef}
              src={video.url}
              muted
              playsInline
              loop
              className="w-full h-full object-cover scale-x-[1.4] scale-y-[1.1] blur-[120px] saturate-[1.5] brightness-[0.9] transition-opacity duration-1000"
            />
          </div>
        )}

        {/* Main Video Container (Rounded on Desktop) */}
        <div ref={containerRef} className="w-[100vw] h-[100dvh] md:w-[calc((100vh-40px)*9/16)] md:h-[calc(100vh-40px)] relative bg-[#111] md:rounded-xl overflow-hidden shadow-2xl shrink-0 group z-10">
          
          <video
            ref={videoRef}
            src={video.url}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 w-full h-full object-contain bg-black cursor-pointer"
            loop
            playsInline
          />

          {/* Video Settings Menu logic moved to Global Header for Mobile */}


          {/* Pause / Play Icon Overlay */}
          <AnimatePresence>
            {!isPlaying && !isFallbackMuted && (
              <motion.div 
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex justify-center items-center pointer-events-none z-[60] shadow-2xl"
              >
                <div className="ml-1.5">
                   <Play size={40} className="text-white/90 drop-shadow-2xl fill-white/90" />
                </div>
              </motion.div>
            )}
            
            {/* Muted Fallback Indicator */}
            {isFallbackMuted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 bg-black/60 backdrop-blur-md rounded-full flex gap-2 items-center pointer-events-none z-[60] shadow-xl border border-white/10"
              >
                <VolumeX size={18} className="text-white drop-shadow-md" />
                <span className="text-white font-bold tracking-widest uppercase text-[10px] md:text-xs drop-shadow-md">Tap To Unmute</span>
              </motion.div>
            )}
          </AnimatePresence>

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
            <button onClick={() => setShowSharePopup(true)} className="flex flex-col items-center gap-0.5 group/btn">
              <Share2 size={28} className="text-white fill-black/20 drop-shadow-md" />
              <span className="text-xs font-semibold drop-shadow-md text-white">{video.shares}</span>
            </button>

          </div>
        </div>

        {/* Desktop-Only Action Sidebar (Right side, OUTSIDE video) */}
        <div className="hidden md:flex flex-col items-center justify-between h-full pt-4 pb-8 pl-4 gap-4 w-16 shrink-0 z-20">
          
          {/* Desktop Settings Button (TOP) */}
          <div className="relative">
            <button 
              onClick={() => setShowGlobalSettings(!showGlobalSettings)}
              className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all active:scale-90 text-white"
            >
              <MoreVertical size={24} />
            </button>

            <AnimatePresence>
              {showGlobalSettings && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setShowGlobalSettings(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: -10, y: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -10, y: -10 }}
                    className="absolute top-14 left-0 w-52 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[100]"
                  >
                    <button 
                      onClick={toggleFullscreen}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 text-white transition-colors border-b border-white/10"
                    >
                      <Maximize size={16} />
                      <span className="text-sm font-medium">Fullscreen</span>
                    </button>

                    <button 
                      onClick={() => { setIsAmbienceOn(!isAmbienceOn); setShowGlobalSettings(false); }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 text-white transition-colors border-b border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles size={16} className={isAmbienceOn ? 'text-[#ff0050]' : 'text-white/60'} />
                        <span className="text-sm font-medium">Ambience</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${isAmbienceOn ? 'bg-[#ff0050]' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isAmbienceOn ? 'right-1' : 'left-1'}`} />
                      </div>
                    </button>

                    <button 
                      onClick={() => { setIsAutoScrollOn(!isAutoScrollOn); setShowGlobalSettings(false); }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 text-white transition-colors border-b border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <IterationCcw size={16} className={isAutoScrollOn ? 'text-[#ff0050]' : 'text-white/60'} />
                        <span className="text-sm font-medium">Auto Scroll</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${isAutoScrollOn ? 'bg-[#ff0050]' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isAutoScrollOn ? 'right-1' : 'left-1'}`} />
                      </div>
                    </button>

                    <button 
                      onClick={() => { setIsMusicOn(!isMusicOn); setShowGlobalSettings(false); }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/10 text-white transition-colors border-b border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        {isMusicOn ? <Volume2 size={16} className="text-[#ff0050]" /> : <VolumeX size={16} className="text-white/60" />}
                        <span className="text-sm font-medium">Music</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${isMusicOn ? 'bg-[#ff0050]' : 'bg-white/20'}`}>
                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isMusicOn ? 'right-1' : 'left-1'}`} />
                      </div>
                    </button>

                    <div className="px-4 py-3 flex items-center gap-3 text-white/50 bg-white/5">
                      <Settings size={16} />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-tighter font-bold opacity-50">Kualitas Video</span>
                        <span className="text-[10px] text-white font-bold">1080p (Auto)</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-4">
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

            <button onClick={() => setShowSharePopup(true)} className="flex flex-col items-center gap-1 hover:scale-105 transition-transform">
              <div className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <Share2 size={24} className="text-white fill-black/20" />
              </div>
              <span className="text-xs font-bold text-white/80">{video.shares}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BTSPage;
