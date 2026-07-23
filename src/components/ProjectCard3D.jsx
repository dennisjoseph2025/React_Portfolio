import { useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const ProjectCard3D = ({ children, className = '', color = '#C9A96E' }) => {
  const ref = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(0, { stiffness: 120, damping: 18, mass: 0.8 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 18, mass: 0.8 });
  const scale = useSpring(1, { stiffness: 200, damping: 20, mass: 0.4 });
  const translateZ = useSpring(0, { stiffness: 100, damping: 16, mass: 0.6 });

  const glareX = useTransform(mouseX, [0, 1], [-30, 130]);
  const glareY = useTransform(mouseY, [0, 1], [-30, 130]);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set((y - 0.5) * -25);
    rotateY.set((x - 0.5) * 25);
    translateZ.set(50);
  }, [mouseX, mouseY, rotateX, rotateY, translateZ]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.05);
  }, [scale]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    translateZ.set(0);
  }, [mouseX, mouseY, rotateX, rotateY, scale, translateZ]);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([lx, ly]) => `radial-gradient(ellipse at ${lx}% ${ly}%, rgba(255,255,255,0.2), rgba(255,255,255,0.04) 40%, transparent 70%)`
  );

  const edgeShadow = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const dx = (x - 0.5) * 30;
      const dy = (y - 0.5) * 30;
      return `${-dx}px ${-dy}px 50px -10px ${color}35, ${dx}px ${dy}px 70px -15px ${color}20, 0 0 0 1px rgba(255,255,255,0.04)`;
    }
  );

  return (
    <div className="relative" style={{ perspective: '700px' }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          translateZ,
          boxShadow: edgeShadow,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className={`relative rounded-[inherit] ${className}`}
      >
        {children}
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          style={{ background: glareBackground }}
        />
      </motion.div>
    </div>
  );
};

export default ProjectCard3D;
