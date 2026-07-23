import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion, easing, duration, stagger } from '../utils/motionConfig';

const SectionReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'left' | 'right' | 'scale'
  staggerChildren = true,
  once = true,
  margin = '-80px',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });
  const reduced = useReducedMotion();

  const baseOffset = reduced ? 0 : 30;

  const directionMap = {
    up: { hidden: { y: baseOffset }, visible: { y: 0 } },
    left: { hidden: { x: -baseOffset }, visible: { x: 0 } },
    right: { hidden: { x: baseOffset }, visible: { x: 0 } },
    scale: { hidden: { scale: 0.95 }, visible: { scale: 1 } },
  };

  const dir = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, ...dir.hidden },
        visible: {
          opacity: 1,
          ...dir.visible,
          transition: {
            duration: duration.slow,
            ease: easing.outExpo,
            delay,
            ...(staggerChildren && {
              staggerChildren: stagger.normal,
              delayChildren: delay + 0.1,
            }),
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
