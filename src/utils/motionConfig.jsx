import { createContext, useContext, useEffect, useState } from 'react';

// ─── Buttery Smooth Spring Presets ───
// Low stiffness + high damping = smooth, no jitter, no bounce.
export const springs = {
  // Cursor: very smooth follow, slight lag feels alive
  cursor: { stiffness: 180, damping: 22, mass: 0.5, restSpeed: 0.1, restDelta: 0.1 },
  // Cursor ring: more lag than dot for layered smoothness
  cursorRing: { stiffness: 120, damping: 18, mass: 0.8, restSpeed: 0.05, restDelta: 0.05 },
  // Magnetic pull: gentle attraction
  magnetic: { stiffness: 120, damping: 14, mass: 0.1, restSpeed: 0.1, restDelta: 0.1 },
  // Reveal: smooth entrance
  reveal: { stiffness: 80, damping: 18, mass: 1, restSpeed: 0.1, restDelta: 0.1 },
  // Hover: snappy but smooth
  hover: { stiffness: 200, damping: 22, mass: 0.4, restSpeed: 0.1, restDelta: 0.1 },
  // Snap: quick settle
  snap: { stiffness: 300, damping: 28, mass: 0.3, restSpeed: 0.1, restDelta: 0.1 },
  // 3D tilt: very smooth, no jitter
  tilt: { stiffness: 150, damping: 20, mass: 0.6, restSpeed: 0.05, restDelta: 0.05 },
  // Scroll follow: gentle lag
  scroll: { stiffness: 60, damping: 15, mass: 1.2, restSpeed: 0.05, restDelta: 0.05 },
};

// ─── Easing Curves ───
export const easing = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutCirc: [0.85, 0, 0.15, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outCubic: [0.33, 1, 0.68, 1],
  inOutSine: [0.37, 0, 0.63, 1],
};

// ─── Duration Tokens ───
export const duration = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  dramatic: 1.2,
};

// ─── Stagger Tokens ───
export const stagger = {
  tight: 0.03,
  normal: 0.06,
  relaxed: 0.1,
  dramatic: 0.15,
};

// ─── Reusable Animation Variants ───
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.slow, ease: easing.outExpo }
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.normal, ease: easing.outExpo }
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: duration.normal, ease: easing.outExpo }
    },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.slow, ease: easing.outExpo }
    },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.slow, ease: easing.outExpo }
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger.normal, delayChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.fast, ease: easing.outExpo }
    },
  },
  letterReveal: {
    hidden: { opacity: 0, y: 50, rotateX: -80 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', ...springs.reveal },
    },
  },
};

// ─── Reduced Motion Context ───
const ReducedMotionContext = createContext(false);

export const ReducedMotionProvider = ({ children }) => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const handler = (e) => setReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
};

export const useReducedMotion = () => useContext(ReducedMotionContext);

// ─── Safe Animation Helper ───
export const safeMotion = (reduced, props) => {
  if (!reduced) return props;
  const safe = { ...props };
  if (safe.transition) {
    safe.transition = { ...safe.transition, duration: 0, type: 'tween' };
  }
  if (safe.whileHover) safe.whileHover = {};
  if (safe.whileTap) safe.whileTap = {};
  return safe;
};

// ─── Legacy Exports ───
export const motionConfig = {
  easing: {
    smooth: easing.outExpo,
    snappy: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  duration: {
    fast: duration.instant,
    normal: duration.fast,
    slow: duration.slow,
    verySlow: duration.dramatic,
  },
  spring: {
    soft: springs.reveal,
    medium: springs.magnetic,
    stiff: springs.snap,
  },
  stagger: {
    fast: stagger.tight,
    normal: stagger.normal,
    slow: stagger.relaxed,
  },
};

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const safeVariants = (variants) => {
  if (prefersReducedMotion()) {
    return {
      initial: variants.initial,
      animate: { ...variants.animate, transition: { duration: 0 } },
    };
  }
  return variants;
};
