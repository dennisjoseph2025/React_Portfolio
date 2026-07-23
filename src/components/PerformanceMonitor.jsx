import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef([]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setVisible(v => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (!visible) return;

    let rafId;
    const measure = () => {
      const now = performance.now();
      frameRef.current.push(now);
      frameRef.current = frameRef.current.filter(t => now - t < 1000);
      setFps(frameRef.current.length);
      rafId = requestAnimationFrame(measure);
    };
    rafId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafId);
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed bottom-4 right-4 z-[9998] px-3 py-2 rounded-md backdrop-blur-md border font-mono text-[10px] tracking-wider"
      style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderColor: fps > 50 ? 'rgba(34,197,94,0.3)' : fps > 30 ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)',
        color: fps > 50 ? '#22c55e' : fps > 30 ? '#eab308' : '#ef4444',
      }}
    >
      <span>{fps} FPS</span>
      <span className="text-white/30 ml-2">Shift+? to toggle</span>
    </motion.div>
  );
};

export default PerformanceMonitor;
