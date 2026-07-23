import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactLenis from '@studio-freight/react-lenis';
import { setLenis } from './utils/lenisStore';
import Navbar from './components/Navbar';
import Background3D from './components/Background3D';
import HeroStarfield from './components/HeroStarfield';
import { CustomCursor } from './components/CustomCursor';
import { ReducedMotionProvider } from './utils/motionConfig';
import { useIsMobile } from './utils/useIsMobile';
import LoadingVeil from './components/LoadingVeil';
import ScrollProgress from './components/ScrollProgress';
import SectionIndicator from './components/SectionIndicator';
import PerformanceMonitor from './components/PerformanceMonitor';
import AutoDemo from './components/AutoDemo';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './pages/ProjectDetail';

const MainPage = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <ReactLenis root ref={(r) => { if (r?.lenis) setLenis(r.lenis); }}>
      <Helmet>
        <title>Dennis Joseph (Denjo) — Full-Stack Software Developer Portfolio | Python, Django, React</title>
        <meta name="description" content="Dennis Joseph (Denjo, dennisjoseph2025) — Full-Stack Software Developer from Kozhikode, Kerala. Specializing in Python, Django, React, PostgreSQL, AWS, and Docker. View projects, skills, and experience." />
        <meta name="keywords" content="Dennis Joseph, Dennis, Denjo, denjo, dennisjoseph2025, denjo dennis, dennis denjo, software developer, portfolio, full-stack developer, Python, Django, React, Kozhikode, Kerala, backend developer, web developer India" />
        <meta property="og:title" content="Dennis Joseph (Denjo) — Full-Stack Software Developer Portfolio" />
        <meta property="og:description" content="Full-Stack Software Developer specializing in Python, Django, React, and cloud infrastructure. View projects, skills, and experience." />
        <meta property="og:url" content="https://dennis-r.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Dennis Joseph Portfolio" />
        <meta property="og:image" content="https://dennis-r.vercel.app/android-chrome-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dennis Joseph (Denjo) — Full-Stack Software Developer Portfolio" />
        <meta name="twitter:description" content="Full-Stack Software Developer specializing in Python, Django, React, and cloud infrastructure." />
        <meta name="twitter:image" content="https://dennis-r.vercel.app/android-chrome-512x512.png" />
        <link rel="canonical" href="https://dennis-r.vercel.app/" />
      </Helmet>
      <div className="min-h-screen text-secondary overflow-x-hidden relative w-full bg-black">
        <Background3D />
        <div className="absolute top-0 left-0 w-full h-screen z-[2] pointer-events-none">
          <HeroStarfield />
        </div>
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">
          <Hero3D />
          <About />
          <Skills />
          <Experience />
          <Certifications />
          <Projects />
          <Contact />
          <Footer />
        </main>
        {!isMobile && <SectionIndicator />}
        {!isMobile && <PerformanceMonitor />}
        {!isMobile && <AutoDemo />}
      </div>
    </ReactLenis>
  );
};

function App() {
  const isMobile = useIsMobile();

  return (
    <ReducedMotionProvider>
      <LoadingVeil />
      {!isMobile && <CustomCursor />}
      <Routes>
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </ReducedMotionProvider>
  );
}

export default App;
