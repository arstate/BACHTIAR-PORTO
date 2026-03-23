# WEB VERSION - Bachtiar Aryansyah Putra Portfolio

## 🌐 Overview

This document contains the web version documentation for the **Bachtiar Aryansyah Putra Portfolio** - a modern, cinematic portfolio website built with cutting-edge web technologies.

---

## 📋 Project Information

| Field | Details |
|-------|---------|
| **Project Name** | Bachtiar Aryansyah Putra Portfolio |
| **Version** | 1.0.0 |
| **Type** | Personal Portfolio & Creative Showcase |
| **Framework** | React 19 + Vite |
| **Styling** | Tailwind CSS v4 |
| **Deployment** | Vercel |
| **Last Update** | 2026-03-23 |

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.0.0** - UI library
- **React Router DOM 7.13.1** - Client-side routing
- **TypeScript 5.8.2** - Type safety

### Build Tools
- **Vite 6.2.0** - Fast build tool and dev server
- **@vitejs/plugin-react 5.0.4** - React plugin for Vite

### Styling & Animation
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.14** - Tailwind Vite plugin
- **Motion 12.23.24** - Animation library (Framer Motion successor)
- **Lenis 1.3.18** - Smooth scrolling library

### Graphics & Icons
- **Three.js 0.183.2** - 3D graphics library
- **@types/three 0.183.1** - Three.js TypeScript types
- **Lucide React 0.546.0** - Icon library
- **React Icons 5.6.0** - Additional icons

### Backend & Database (Optional)
- **Express 4.21.2** - Node.js web framework
- **Better-SQLite3 12.4.1** - SQLite database
- **Dotenv 17.2.3** - Environment variables

### Development
- **Tsx 4.21.0** - TypeScript execution
- **Autoprefixer 10.4.21** - CSS vendor prefixes
- **Node.js types 22.14.0** - Node.js type definitions

---

## 📁 Project Structure

```
BACHTIAR-PORTO-main/
├── public/
│   ├── preview.html          # Preview page
│   └── sw.js                 # Service Worker
├── src/
│   ├── components/           # React components
│   │   ├── Clients.tsx       # Clients & testimonials section
│   │   └── ...
│   ├── database/             # Database utilities
│   ├── utils/                # Helper functions
│   ├── App.tsx               # Main application component
│   ├── HomePage.tsx          # Home page component
│   ├── index.css             # Global styles
│   └── main.tsx              # Application entry point
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind configuration
├── package.json              # Dependencies & scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ installed
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arstate/BACHTIAR-PORTO.git
   cd BACHTIAR-PORTO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove build directory |
| `npm run lint` | TypeScript type checking |

---

## 🎨 Features

### Visual Features
- ✅ Cinematic video background hero section
- ✅ Glassmorphism UI elements
- ✅ Custom cursor interactions
- ✅ Smooth scrolling with Lenis
- ✅ Scroll-linked animations with Motion
- ✅ Responsive design (mobile & desktop)

### Components
- **Clients Section** - Animated client logos and testimonials
- **Motion Graphics Page** - Loading animations and transitions
- **Testimonial Cards** - Scramble text animation effects
- **Hero Section** - Video background with overlay effects

### Performance
- ⚡ Fast builds with Vite
- ⚡ Optimized asset loading
- ⚡ Lazy loading images
- ⚡ Code splitting ready

---

## 🎯 Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
```

### TypeScript Configuration
- Strict mode enabled
- React 19 JSX transform
- Module resolution: bundler

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 768px | Phones |
| Tablet | 768px - 1024px | Tablets |
| Desktop | > 1024px | Desktops |

---

## 🌍 Deployment

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Production deployment:
   ```bash
   vercel --prod
   ```

### Build Output
- Production files are generated in `dist/` directory
- Optimized and minified assets
- Ready for static hosting

---

## 📞 Contact Information

| Contact | Details |
|---------|---------|
| **Name** | Bachtiar Aryansyah Putra |
| **Email** | aryansyah1509@gmail.com |
| **Phone** | 0896 1732 3344 |
| **Location** | Sidoarjo, Indonesia |
| **Company** | Arstate.Cinema |

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🔗 Repository

- **GitHub**: [github.com/arstate/BACHTIAR-PORTO](https://github.com/arstate/BACHTIAR-PORTO)
- **Branch**: main
- **Latest Commit**: 4022a5c

---

**Release Version:** 1.0.0

*Document generated: 2026-03-23*
