import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ORB_CONFIGS = [
  { w: 300, h: 300, color: 'rgba(90,40,160,0.35)', blur: 50, glow: 'rgba(90,40,160,0.18)', restX: 8, restY: 10, driftAmp: 50, driftSpeed: 0.4, repelR: 280, repelStr: 180 },
  { w: 350, h: 350, color: 'rgba(15,110,100,0.3)', blur: 55, glow: 'rgba(15,110,100,0.15)', restX: 75, restY: 68, driftAmp: 60, driftSpeed: 0.3, repelR: 300, repelStr: 200 },
  { w: 240, h: 240, color: 'rgba(30,80,150,0.32)', blur: 45, glow: 'rgba(30,80,150,0.16)', restX: 42, restY: 40, driftAmp: 40, driftSpeed: 0.5, repelR: 240, repelStr: 150 },
  { w: 180, h: 180, color: 'rgba(140,100,30,0.3)', blur: 40, glow: 'rgba(140,100,30,0.15)', restX: 12, restY: 28, driftAmp: 35, driftSpeed: 0.6, repelR: 200, repelStr: 140 },
  { w: 260, h: 260, color: 'rgba(140,35,55,0.28)', blur: 48, glow: 'rgba(140,35,55,0.14)', restX: 70, restY: 35, driftAmp: 45, driftSpeed: 0.35, repelR: 260, repelStr: 160 },
  { w: 160, h: 160, color: 'rgba(180,180,180,0.12)', blur: 35, glow: 'rgba(180,180,180,0.06)', restX: 30, restY: 65, driftAmp: 30, driftSpeed: 0.55, repelR: 180, repelStr: 120 },
  { w: 200, h: 200, color: 'rgba(120,60,160,0.25)', blur: 42, glow: 'rgba(120,60,160,0.12)', restX: 55, restY: 12, driftAmp: 38, driftSpeed: 0.45, repelR: 210, repelStr: 140 },
  { w: 280, h: 280, color: 'rgba(25,130,120,0.22)', blur: 52, glow: 'rgba(25,130,120,0.1)', restX: 85, restY: 52, driftAmp: 55, driftSpeed: 0.25, repelR: 270, repelStr: 170 },
  { w: 150, h: 150, color: 'rgba(150,70,40,0.28)', blur: 38, glow: 'rgba(150,70,40,0.14)', restX: 22, restY: 85, driftAmp: 32, driftSpeed: 0.65, repelR: 190, repelStr: 130 },
  { w: 180, h: 180, color: 'rgba(40,120,150,0.25)', blur: 40, glow: 'rgba(40,120,150,0.12)', restX: 60, restY: 78, driftAmp: 36, driftSpeed: 0.48, repelR: 200, repelStr: 135 },
  { w: 120, h: 120, color: 'rgba(110,45,140,0.28)', blur: 32, glow: 'rgba(110,45,140,0.14)', restX: 48, restY: 55, driftAmp: 28, driftSpeed: 0.7, repelR: 160, repelStr: 115 },
  { w: 220, h: 220, color: 'rgba(140,130,35,0.22)', blur: 45, glow: 'rgba(140,130,35,0.1)', restX: 90, restY: 15, driftAmp: 42, driftSpeed: 0.38, repelR: 230, repelStr: 155 },
];

const PARTICLE_COUNT_DESKTOP = 200;
const PARTICLE_COUNT_MOBILE = 80;

const initParticles = (count) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2.5 + Math.random() * 4,
    speed: 0.15 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.45 + Math.random() * 0.35,
  }));

const initOrbState = (configs) =>
  configs.map(() => ({
    x: 0, y: 0, smoothX: 0, smoothY: 0, phase: Math.random() * Math.PI * 2,
  }));

const getMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;
const getCount = () => getMobile() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

const Background3D = () => {
  const containerRef = useRef(null);
  const orbRefs = useRef([]);
  const particleRefs = useRef([]);
  const orbState = useRef(initOrbState(ORB_CONFIGS));
  const particles = useRef(initParticles(getCount()));
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const mx3 = useSpring(mouseX, { stiffness: 70, damping: 18, mass: 0.8 });
  const my3 = useSpring(mouseY, { stiffness: 70, damping: 18, mass: 0.8 });
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [2, -2]), { stiffness: 20, damping: 18, mass: 3 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-2, 2]), { stiffness: 20, damping: 18, mass: 3 });

  const m = useRef(getMobile());
  const scale = useRef(m.current ? 0.55 : 1);

  useEffect(() => {
    const checkMobile = () => {
      m.current = window.innerWidth < 768;
      scale.current = m.current ? 0.55 : 1;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const h = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = { x: t.clientX, y: t.clientY };
        mouseX.set(t.clientX / window.innerWidth);
        mouseY.set(t.clientY / window.innerHeight);
      }
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', h, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    let lastTime = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeRef.current += dt;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const s = scale.current;

      const oState = orbState.current;
      for (let i = 0; i < ORB_CONFIGS.length; i++) {
        const cfg = ORB_CONFIGS[i];
        const st = oState[i];

        const driftX = Math.sin(t * cfg.driftSpeed + st.phase) * cfg.driftAmp * s;
        const driftY = Math.cos(t * cfg.driftSpeed * 0.7 + st.phase) * cfg.driftAmp * 0.8 * s;

        const orbCx = (cfg.restX / 100) * W;
        const orbCy = (cfg.restY / 100) * H;
        const dx = orbCx - mx;
        const dy = orbCy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repelX = 0;
        let repelY = 0;
        if (dist < cfg.repelR * s && dist > 0) {
          const force = (1 - dist / (cfg.repelR * s)) * cfg.repelStr * s;
          const angle = Math.atan2(dy, dx);
          repelX = Math.cos(angle) * force;
          repelY = Math.sin(angle) * force;
        }

        st.x = driftX + repelX;
        st.y = driftY + repelY;
        st.smoothX += (st.x - st.smoothX) * 0.08;
        st.smoothY += (st.y - st.smoothY) * 0.08;

        if (orbRefs.current[i]) {
          orbRefs.current[i].style.transform = `translate(${st.smoothX}px, ${st.smoothY}px)`;
        }
      }

      const pList = particles.current;
      const pRefs = particleRefs.current;
      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];
        const driftX = Math.sin(t * p.speed + p.phase) * 15;
        const driftY = Math.cos(t * p.speed * 0.6 + p.phase) * 12;

        const px = (p.x / 100) * W;
        const py = (p.y / 100) * H;
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let repelX = 0;
        let repelY = 0;
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 40;
          const angle = Math.atan2(dy, dx);
          repelX = Math.cos(angle) * force;
          repelY = Math.sin(angle) * force;
        }

        if (pRefs[i]) {
          pRefs[i].style.transform = `translate(${driftX + repelX}px, ${driftY + repelY}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', h);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [mouseX, mouseY]);

  const count = m.current ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
  const particlesArr = particles.current;

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />

      <motion.div
        className="absolute inset-0"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d', perspective: '1200px' }}
      >
        {ORB_CONFIGS.map((cfg, i) => {
          const w = cfg.w * scale.current;
          const h = cfg.h * scale.current;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${cfg.restX}%`,
                top: `${cfg.restY}%`,
                width: w,
                height: h,
                marginLeft: -w / 2,
                marginTop: -h / 2,
              }}
            >
              <div
                ref={(el) => { orbRefs.current[i] = el; }}
                style={{ willChange: 'transform' }}
                className="w-full h-full rounded-full pointer-events-none"
              >
                <div
                  className="absolute -inset-16 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${cfg.glow}, transparent 65%)`, opacity: 0.8 }}
                />
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${cfg.color}, transparent 65%)`,
                    filter: `blur(${cfg.blur * scale.current}px)`,
                  }}
                />
              </div>
            </div>
          );
        })}

        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: count }).map((_, i) => {
            const p = particlesArr[i];
            const size = p ? p.size : 3;
            const opacity = p ? p.opacity : 0.5;
            return (
              <div
                key={i}
                ref={(el) => { particleRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  left: `${p ? p.x : 50}%`,
                  top: `${p ? p.y : 50}%`,
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  background: `rgba(255,255,255,${opacity})`,
                  boxShadow: `0 0 ${size * 5}px rgba(255,255,255,${opacity * 0.65})`,
                }}
              />
            );
          })}
        </div>

        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: `${m.current ? '80px 80px' : '120px 120px'}`,
          transformStyle: 'preserve-3d',
          translateZ: '-40px',
          animation: 'grid-shift 40s linear infinite',
        }} />

        <motion.div className="absolute inset-0 pointer-events-none" style={{
          background: useTransform([mx3, my3], ([x, y]) => `radial-gradient(${m.current ? '600px' : '1200px'} circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1), transparent 55%)`),
        }} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(0,0,0,0.25) 100%)',
      }} />

      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }} />
    </div>
  );
};

export default Background3D;
