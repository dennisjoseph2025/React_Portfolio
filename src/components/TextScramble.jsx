import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../utils/motionConfig';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

const TextScramble = ({
  children,
  as: Tag = 'span',
  className = '',
  duration = 1200,
  delay = 0,
  once = true,
}) => {
  const text = typeof children === 'string' ? children : '';
  const [displayed, setDisplayed] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-40px' });
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || reduced) return;
    hasAnimated.current = true;

    const chars = text.split('');
    const steps = Math.min(chars.length * 3, 20);
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const progress = step / steps;
        const result = chars.map((char, i) => {
          if (char === ' ') return ' ';
          if (i / chars.length < progress) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');

        setDisplayed(result);
        step++;

        if (step > steps) {
          clearInterval(interval);
          setDisplayed(text);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, text, duration, delay, reduced]);

  return <Tag ref={ref} className={className}>{displayed}</Tag>;
};

export default TextScramble;
