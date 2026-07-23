import { useRef, useEffect } from 'react';

const NODE_COUNT_DESKTOP = 100;
const NODE_COUNT_MOBILE = 50;
const CONNECTION_DIST_DESKTOP = 380;
const CONNECTION_DIST_MOBILE = 200;
const MAX_CONNECTIONS = 250;

const JEWEL = [
  [201, 169, 110],
  [110, 160, 220],
  [120, 200, 170],
  [200, 100, 120],
  [170, 130, 220],
  [220, 180, 80],
  [255, 255, 255],
  [180, 140, 200],
];

function createNodes(W, H, count) {
  return Array.from({ length: count }, (_, i) => {
    const c = JEWEL[i % JEWEL.length];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: c[0], g: c[1], b: c[2],
      size: 1.5 + Math.random() * 2.5,
      orbitR: 15 + Math.random() * 40,
      orbitSpeed: 0.1 + Math.random() * 0.25,
      orbitPhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.15,
      driftY: (Math.random() - 0.5) * 0.15,
      repelR: 130 + Math.random() * 60,
      repelStr: 50 + Math.random() * 30,
    };
  });
}

const HeroStarfield = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMob = window.innerWidth < 768;
    const NODE_COUNT = isMob ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    const CONNECTION_DIST = isMob ? CONNECTION_DIST_MOBILE : CONNECTION_DIST_DESKTOP;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!nodesRef.current) nodesRef.current = createNodes(W, H, NODE_COUNT);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = { x: t.clientX, y: t.clientY };
      }
    };
    const onTouchEnd = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseleave', onLeave);
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

      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        n.x += n.driftX;
        n.y += n.driftY;

        const orbitX = Math.sin(t * n.orbitSpeed + n.orbitPhase) * n.orbitR * dt;
        const orbitY = Math.cos(t * n.orbitSpeed * 0.7 + n.orbitPhase) * n.orbitR * 0.6 * dt;
        n.x += orbitX;
        n.y += orbitY;

        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < n.repelR && dist > 0) {
          const force = (1 - dist / n.repelR) * n.repelStr * dt * 3;
          const angle = Math.atan2(dy, dx);
          n.vx += Math.cos(angle) * force;
          n.vy += Math.sin(angle) * force;
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const cdx = n.x - o.x;
          const cdy = n.y - o.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const minDist = n.size + o.size + 8;
          if (cdist < minDist && cdist > 0) {
            const overlap = minDist - cdist;
            const nx = cdx / cdist;
            const ny = cdy / cdist;
            const push = overlap * 0.5;
            n.x += nx * push;
            n.y += ny * push;
            o.x -= nx * push;
            o.y -= ny * push;
            const relVx = n.vx - o.vx;
            const relVy = n.vy - o.vy;
            const relDot = relVx * nx + relVy * ny;
            if (relDot > 0) {
              const bounce = relDot * 0.98;
              n.vx -= nx * bounce;
              n.vy -= ny * bounce;
              o.vx += nx * bounce;
              o.vy += ny * bounce;
            }
          }
        }

        n.vx *= 0.96;
        n.vy *= 0.96;
        n.x += n.vx;
        n.y += n.vy;

        const pad = 1;
        if (n.x < pad) { n.x = pad; n.vx = Math.abs(n.vx) * 0.995; }
        if (n.x > W - pad) { n.x = W - pad; n.vx = -Math.abs(n.vx) * 0.995; }
        if (n.y < pad) { n.y = pad; n.vy = Math.abs(n.vy) * 0.995; }
        if (n.y > H - pad) { n.y = H - pad; n.vy = -Math.abs(n.vy) * 0.995; }
      }

      ctx.clearRect(0, 0, W, H);

      let lineCount = 0;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length && lineCount < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < nodes.length && lineCount < MAX_CONNECTIONS; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,169,110,${alpha})`;
            ctx.stroke();
            lineCount++;
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const glowR = n.size * 5;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grad.addColorStop(0, `rgba(${n.r},${n.g},${n.b},0.6)`);
        grad.addColorStop(0.25, `rgba(${n.r},${n.g},${n.b},0.25)`);
        grad.addColorStop(1, `rgba(${n.r},${n.g},${n.b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.r},${n.g},${n.b},0.85)`;
        ctx.fill();
      }

      if (mx > 0 && mx < W && my > 0 && my < H) {
        const cursorGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        cursorGrad.addColorStop(0, 'rgba(201,169,110,0.06)');
        cursorGrad.addColorStop(1, 'rgba(201,169,110,0)');
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.fillStyle = cursorGrad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ background: '#000' }}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default HeroStarfield;
