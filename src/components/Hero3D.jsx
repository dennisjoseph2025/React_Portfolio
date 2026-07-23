import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useReducedMotion } from '../utils/motionConfig';

const letters = 'DENNIS JOSEPH'.split('');

const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const spaceVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: (i) => ({
    opacity: 1,
    width: '0.3em',
    transition: {
      duration: 0.4,
      delay: 0.3 + i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Hero3D = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), { stiffness: 50, damping: 14 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -180]), { stiffness: 40, damping: 12 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -350]), { stiffness: 30, damping: 10 });
  const rotateXTitle = useSpring(useTransform(scrollYProgress, [0, 0.6], [8, -15]), { stiffness: 40, damping: 12 });
  const opacityTitle = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleTitle = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.88]), { stiffness: 50, damping: 14 });
  const opacityGhost = useTransform(scrollYProgress, [0, 0.4], [0.06, 0]);

  let charIndex = 0;

  return (
    <section
      id="home"
      ref={ref}
      className="h-screen w-full relative flex flex-col justify-center px-6 overflow-hidden"
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
      >
      <div className="max-w-[90vw] mx-auto z-10 text-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div style={{ y: y3, opacity: opacityGhost }} className="absolute inset-0 flex items-center justify-center">
          <span className="text-[30vw] md:text-[20vw] font-black tracking-tighter text-white select-none">DJ</span>
        </motion.div>

        <motion.div
          style={{ y: y2, rotateX: rotateXTitle, scale: scaleTitle, opacity: opacityTitle, transformStyle: 'preserve-3d' }}
        >
          <h1
            className="text-[11.5vw] sm:text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] flex justify-center whitespace-nowrap"
            style={{ color: 'white', textShadow: '0 4px 30px rgba(0,0,0,0.8)', transformStyle: 'preserve-3d' }}
          >
            {letters.map((letter, i) => {
              if (letter === ' ') {
                const idx = charIndex++;
                return <motion.span key={i} custom={idx} variants={spaceVariants} initial="hidden" animate="visible" className="inline-block" />;
              }
              const idx = charIndex++;
              return (
                <motion.span
                  key={i}
                  custom={idx}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </h1>
        </motion.div>

        <motion.div style={{ y: y1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} className="flex items-center justify-center gap-4 mt-3">
            <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-lg md:text-xl font-light text-white/40 tracking-[0.3em] uppercase">Full-Stack Developer</span>
            <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-gradient-to-l from-transparent to-white/20" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }} className="flex items-center justify-center gap-2 text-white/30 text-sm mt-4">
            <MapPin size={14} />
            <span>Kozhikode, Kerala</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 0.8 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={reduced ? {} : { y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero3D;
