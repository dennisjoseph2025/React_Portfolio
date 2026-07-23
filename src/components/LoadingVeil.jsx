import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingVeil = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    const safety = setTimeout(() => setVisible(false), 5000);
    return () => { clearTimeout(timer); clearTimeout(safety); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Diamond seal */}
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border border-[var(--color-accent)] rotate-45"
            />
            <span className="font-display text-lg tracking-[0.3em] uppercase text-[var(--color-text-secondary)]">
              DENNIS JOSEPH
            </span>
          </motion.div>

          {/* Loading bar */}
          <motion.div className="mt-8 w-32 h-px bg-[var(--color-border)] overflow-hidden rounded-full">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-1/2 bg-[var(--color-accent)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingVeil;
