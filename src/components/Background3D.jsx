import { useEffect, useRef } from 'react';

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

const Background3D = () => {
  const orbRefs = useRef([]);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef(null);

  const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
  const scale = isMob ? 0.55 : 1;

  const orbPositions = useRef(
    ORB_CONFIGS.map(() => ({
      x: 0, y: 0, smoothX: 0, smoothY: 0, phase: Math.random() * Math.PI * 2,
    }))
  );

  useEffect(() => {
    const pCount = isMob ? 60 : 120;
    const particles = Array.from({ length: pCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2,
      speed: 0.15 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.3 + Math.random() * 0.3,
    }));
    particlesRef.current = particles;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resize);
    const h = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = { x: t.clientX, y: t.clientY };
      }
    };
    window.addEventListener('mousemove', h, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });

    let pageVisible = true;
    const onVis = () => { pageVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    let lastTime = performance.now();

    const tick = (now) => {
      if (!pageVisible) {
        lastTime = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      timeRef.current += dt;
      const t = timeRef.current;
      const s = isMob ? 0.55 : 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const oState = orbPositions.current;
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
        st.smoothX += (st.x - st.smoothX) * 0.2;
        st.smoothY += (st.y - st.smoothY) * 0.2;

        if (orbRefs.current[i]) {
          orbRefs.current[i].style.transform = `translate(${st.smoothX.toFixed(1)}px,${st.smoothY.toFixed(1)}px)`;
        }
      }

      ctx.clearRect(0, 0, W, H);
      const pList = particlesRef.current;
      if (pList) {
        for (let i = 0; i < pList.length; i++) {
          const p = pList[i];
          const driftX = Math.sin(t * p.speed + p.phase) * 12;
          const driftY = Math.cos(t * p.speed * 0.6 + p.phase) * 10;
          const px = (p.x / 100) * W + driftX;
          const py = (p.y / 100) * H + driftY;
          const dx = px - mx;
          const dy = py - my;
          const d = Math.sqrt(dx * dx + dy * dy);
          let ox = 0, oy = 0;
          if (d < 100 && d > 0) {
            const f = (1 - d / 100) * 30;
            const a = Math.atan2(dy, dx);
            ox = Math.cos(a) * f;
            oy = Math.sin(a) * f;
          }
          ctx.beginPath();
          ctx.arc(px + ox, py + oy, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', h);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchstart', onTouch);
    };
  }, [isMob, scale]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="absolute inset-0">
        {ORB_CONFIGS.map((cfg, i) => {
          const w = cfg.w * scale;
          const h = cfg.h * scale;
          return (
            <div key={i} style={{
              position: 'absolute', left: `${cfg.restX}%`, top: `${cfg.restY}%`,
              width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2,
            }}>
              <div ref={(el) => { orbRefs.current[i] = el; }} style={{ willChange: 'transform' }}
                className="w-full h-full rounded-full pointer-events-none">
                <div className="absolute -inset-16 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${cfg.glow}, transparent 65%)`, opacity: 0.8 }} />
                <div className="w-full h-full rounded-full" style={{
                  background: `radial-gradient(circle at 35% 35%, ${cfg.color}, transparent 65%)`,
                  filter: `blur(${cfg.blur * scale}px)`,
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, rgba(255,255,255,0.03) 100%)',
      }} />
    </div>
  );
};

export default Background3D;
