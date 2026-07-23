import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');

  // Raw mouse position — updated every frame
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot: follows mouse instantly via RAF (no spring)
  const dotRef = useRef(null);
  const dotPos = useRef({ x: -100, y: -100 });

  // Ring: very slight spring lag
  const ringX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.4 });

  // Halo: slightly more lag
  const haloX = useSpring(mouseX, { stiffness: 250, damping: 28, mass: 0.6 });
  const haloY = useSpring(mouseY, { stiffness: 250, damping: 28, mass: 0.6 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // RAF loop for instant dot tracking
    let raf;
    const trackDot = () => {
      const tx = mouseX.get();
      const ty = mouseY.get();
      // Lerp toward target — smooth but near-instant
      dotPos.current.x += (tx - dotPos.current.x) * 0.45;
      dotPos.current.y += (ty - dotPos.current.y) * 0.45;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(trackDot);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLButtonElement ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isInteractive);

      const cursorEl = target.closest('[data-cursor]');
      setCursorText(cursorEl ? cursorEl.getAttribute('data-cursor') : '');
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleBlur = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('pointermove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('blur', handleBlur, { passive: true });
    raf = requestAnimationFrame(trackDot);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('pointermove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleBlur);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Halo — outermost, subtle lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995]"
        style={{ x: haloX, y: haloY, translateX: '-50%', translateY: '-50%', mixBlendMode: 'difference' }}
      >
        <motion.div
          animate={{
            width: isPointer ? 100 : 0,
            height: isPointer ? 100 : 0,
            opacity: isPointer ? 0.08 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="rounded-full border border-white/10"
        />
      </motion.div>

      {/* Ring — slight lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', mixBlendMode: 'difference' }}
      >
        <motion.div
          animate={{
            width: isPointer ? 52 : 30,
            height: isPointer ? 52 : 30,
            opacity: isPointer ? 0.25 : 0.45,
            scale: isPressed ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full border-[1.5px] border-white"
        />
      </motion.div>

      {/* Dot — instant follow via RAF */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: 'transform', mixBlendMode: 'difference' }}
      >
        <motion.div
          animate={{
            width: isPointer ? 44 : 8,
            height: isPointer ? 44 : 8,
            opacity: isPointer ? 0.3 : 1,
            scale: isPressed ? 0.6 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-white flex items-center justify-center"
        >
          {cursorText && isPointer && (
            <span className="text-[7px] font-mono uppercase tracking-widest text-black whitespace-nowrap pointer-events-none">
              {cursorText}
            </span>
          )}
        </motion.div>
      </div>
    </>
  );
};
