import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../utils/motionConfig';

const AutoDemo = () => {
  const reduced = useReducedMotion();
  const [hint, setHint] = useState('');
  const idleTimerRef = useRef(null);
  const hintTimerRef = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const showHint = (text) => {
      setHint(text);
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = setTimeout(() => setHint(''), 4000);
    };

    const resetIdle = () => {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        const hints = [
          'Press 1-6 to navigate sections',
          'Press T to scroll to top',
          'Press Shift+? for performance monitor',
          'Press G to toggle gallery view',
        ];
        showHint(hints[Math.floor(Math.random() * hints.length)]);
      }, 15000);
    };

    const onUserGesture = () => {
      setHint('');
      resetIdle();
    };

    window.addEventListener('mousemove', onUserGesture, { passive: true });
    window.addEventListener('scroll', onUserGesture, { passive: true });
    window.addEventListener('keydown', onUserGesture);
    window.addEventListener('touchstart', onUserGesture, { passive: true });
    resetIdle();

    return () => {
      clearTimeout(idleTimerRef.current);
      clearTimeout(hintTimerRef.current);
      window.removeEventListener('mousemove', onUserGesture);
      window.removeEventListener('scroll', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
    };
  }, [reduced]);

  if (!hint) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998] px-4 py-2 rounded-full backdrop-blur-md border font-mono text-[10px] tracking-wider"
      style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderColor: 'rgba(201,169,110,0.2)',
        color: 'rgba(201,169,110,0.7)',
      }}
    >
      {hint}
    </motion.div>
  );
};

export default AutoDemo;
