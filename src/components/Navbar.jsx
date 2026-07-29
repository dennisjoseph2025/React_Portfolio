import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { getLenis } from '../utils/lenisStore';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

const MagneticLink = ({ target, children, onHoverStart, onHoverEnd }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < 30) {
        const strength = 1 - distance / 30;
        x.set(distanceX * strength * 0.15);
        y.set(distanceY * strength * 0.15);
        if (!isHovered) { setIsHovered(true); onHoverStart?.(); }
      } else {
        x.set(0);
        y.set(0);
        if (isHovered) { setIsHovered(false); onHoverEnd?.(); }
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, isHovered, onHoverStart, onHoverEnd]);

  return (
    <motion.button
      ref={ref}
      onClick={() => scrollTo(target)}
      style={{ x: xSpring, y: ySpring }}
      onMouseEnter={() => { setIsHovered(true); onHoverStart?.(); }}
      onMouseLeave={() => { setIsHovered(false); onHoverEnd?.(); }}
      className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group inline-block"
    >
      {children}
      <motion.span
        animate={{ width: isHovered ? '100%' : '0%' }}
        className="absolute left-0 bottom-0 h-0.5"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />
    </motion.button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setHeroVisible(rect.bottom > 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', target: 'home' },
    {
      name: 'Details',
      dropdown: [
        { name: 'About', target: 'about' },
        { name: 'Skills', target: 'skills' },
        { name: 'Experience', target: 'experience' },
        { name: 'Certifications', target: 'certifications' },
      ]
    },
    { name: 'Projects', target: 'projects' },
    { name: 'Contact', target: 'contact' },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDetailsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDetailsOpen(false), 300);
  };

  const textColor = 'text-white';
  const subtextColor = 'text-gray-300';
  const hoverColor = 'hover:text-white';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        heroVisible ? 'bg-transparent' : 'bg-black/80 backdrop-blur-lg border-b border-neutral-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <span
              className={`text-2xl font-bold tracking-tighter transition-all duration-500 ${textColor} ${
                heroVisible ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              DENNIS JOSEPH
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className={`${subtextColor} ${hoverColor} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 group`}>
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-300 ${detailsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {detailsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 mt-2 w-48 rounded-xl overflow-hidden shadow-2xl z-50 bg-neutral-900 border border-neutral-800"
                        >
                          <div className="py-2">
                            {link.dropdown.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={() => scrollTo(sub.target)}
                                className={`block w-full text-left px-4 py-3 text-sm transition-colors text-gray-400 hover:text-white hover:bg-white/5`}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <MagneticLink key={link.name} target={link.target}>
                    <span className={`transition-colors duration-500 ${subtextColor} ${hoverColor}`}>
                      {link.name}
                    </span>
                  </MagneticLink>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${subtextColor} ${hoverColor} focus:outline-none p-2 transition-colors duration-500`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-lg border-b overflow-hidden transition-colors duration-500 bg-black/90 border-neutral-800`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-1">
                      <div className={`text-xs uppercase tracking-widest px-3 py-4 pb-2 transition-colors duration-500 text-white/40`}>
                        {link.name}
                      </div>
                      {link.dropdown.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => { scrollTo(sub.target); setIsOpen(false); }}
                          className={`block w-full text-left px-6 py-3 rounded-md text-base font-medium border-l-2 border-transparent hover:border-current transition-all text-gray-300 hover:text-white hover:bg-white/5`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => { scrollTo(link.target); setIsOpen(false); }}
                      className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium border-l-2 border-transparent hover:border-current transition-all text-gray-300 hover:text-white hover:bg-white/5`}
                    >
                      {link.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
