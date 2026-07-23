import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../utils/motionConfig';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SectionIndicator = () => {
  const [active, setActive] = useState('home');
  const [hovered, setHovered] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActive(sections[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => handleClick(s.id)}
          onMouseEnter={() => setHovered(s.id)}
          onMouseLeave={() => setHovered(null)}
          className="group flex items-center gap-3 py-1"
          aria-label={`Navigate to ${s.label}`}
        >
          <AnimatePresence>
            {hovered === s.id && (
              <motion.span
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-mono uppercase tracking-widest text-white/40"
              >
                {s.label}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            animate={{
              width: active === s.id ? 20 : 6,
              backgroundColor: active === s.id
                ? 'rgba(201,169,110,0.8)'
                : 'rgba(255,255,255,0.15)',
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] rounded-full"
          />
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;
