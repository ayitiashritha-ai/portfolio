import { useEffect, useRef } from "react";

const CircuitBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return undefined;

    let animationId;
    let time = 0;

    const C = {
      bg: "#030912",
      grid: "#0a1a2e",
      cyan: "#00f5ff",
      green: "#00ff9d",
      purple: "#a855f7",
      white: "#e0f0ff",
    };

    let nodes = [];
    let traces = [];
    let particles = [];
    let chips = [];

    const init = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.max(1, Math.floor(W / 80));
      const rows = Math.max(1, Math.floor(H / 70));

      nodes = Array.from({ length: 55 }, () => ({
        x: (Math.floor(Math.random() * cols) + 0.5) * (W / cols),
        y: (Math.floor(Math.random() * rows) + 0.5) * (H / rows),
        r: Math.random() * 3 + 2,
        color: [C.cyan, C.green, C.purple][Math.floor(Math.random() * 3)],
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
        ring: Math.random() > 0.6,
      }));

      traces = [];
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          if (Math.sqrt(dx * dx + dy * dy) < 200 && traces.length < 120) {
            const mid =
              Math.random() > 0.5
                ? [{ x: nodes[j].x, y: nodes[i].y }]
                : [{ x: nodes[i].x, y: nodes[j].y }];
            traces.push({
              pts: [nodes[i], ...mid, nodes[j]],
              color: Math.random() > 0.5 ? C.cyan : C.green,
              dash: Math.random() > 0.4,
              alpha: 0.25 + Math.random() * 0.3,
              width: Math.random() > 0.7 ? 1.8 : 1,
              offset: Math.random() * 40,
              speed: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.5),
            });
          }
        }
      }

      particles = traces
        .filter(() => Math.random() > 0.45)
        .map((trace) => ({
          trace,
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          size: 2.5 + Math.random() * 2,
          color: Math.random() > 0.5 ? C.cyan : C.green,
          tail: [],
        }));

      const chipDefs = [
        { rx: 0.08, ry: 0.12, label: "MCU-X1", sub: "RISC-V 32bit", led: C.green, pins: 4 },
        { rx: 0.72, ry: 0.15, label: "FPGA-7", sub: "Logic Array", led: C.cyan, pins: 4 },
        { rx: 0.4, ry: 0.55, label: "DSP-3A", sub: "512KB Flash", led: C.purple, pins: 5 },
        { rx: 0.78, ry: 0.65, label: "MEM-16", sub: "DDR4 16GB", led: C.green, pins: 4 },
        { rx: 0.06, ry: 0.7, label: "PWR-IC", sub: "5V / 3.3V", led: C.cyan, pins: 3 },
        { rx: 0.55, ry: 0.08, label: "RF-BLE", sub: "2.4GHz", led: C.purple, pins: 3 },
        { rx: 0.3, ry: 0.82, label: "USB-C", sub: "PD 100W", led: C.green, pins: 3 },
      ];

      chips = chipDefs.map((chip) => ({
        ...chip,
        x: chip.rx * W,
        y: chip.ry * H,
        w: 90,
        h: 52,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    resize();
    window.addEventListener("resize", resize);

    const glow = (color, blur = 12) => {
      ctx.shadowColor = color;
      ctx.shadowBlur = blur;
    };

    const noGlow = () => {
      ctx.shadowBlur = 0;
    };

    const ptOnTrace = (pts, t) => {
      const total = pts.length - 1;
      const seg = Math.min(Math.floor(t * total), total - 1);
      const local = t * total - seg;
      const a = pts[seg];
      const b = pts[seg + 1];
      return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
    };

    const drawGrid = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.strokeStyle = C.grid;
      ctx.lineWidth = 0.5;

      for (let x = 0; x < W; x += 55) {
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      for (let y = 0; y < H; y += 55) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const drawTraces = () => {
      traces.forEach((trace) => {
        ctx.save();
        ctx.strokeStyle = trace.color;
        ctx.lineWidth = trace.width;
        ctx.globalAlpha = trace.alpha;
        if (trace.dash) {
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -((trace.offset + time * trace.speed * 30) % 40);
        }
        glow(trace.color, 6);
        ctx.beginPath();
        ctx.moveTo(trace.pts[0].x, trace.pts[0].y);
        trace.pts.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.stroke();
        ctx.setLineDash([]);
        noGlow();
        ctx.restore();
      });
    };

    const drawNodes = () => {
      nodes.forEach((node) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * node.speed + node.phase);
        const r = node.r + pulse * 2.5;
        ctx.save();
        if (node.ring) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 5 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = 0.2 * pulse;
          glow(node.color, 8);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.5 + pulse * 0.5;
        glow(node.color, 14);
        ctx.fill();
        noGlow();
        ctx.restore();
      });
    };

    const drawParticles = () => {
      particles.forEach((particle) => {
        particle.t += particle.speed;
        if (particle.t > 1) particle.t = 0;
        const pos = ptOnTrace(particle.trace.pts, particle.t);
        particle.tail.unshift({ x: pos.x, y: pos.y });
        if (particle.tail.length > 14) particle.tail.pop();

        particle.tail.forEach((tailPoint, index) => {
          ctx.save();
          ctx.globalAlpha = (1 - index / particle.tail.length) * 0.6;
          ctx.fillStyle = particle.color;
          glow(particle.color, 8);
          ctx.beginPath();
          ctx.arc(
            tailPoint.x,
            tailPoint.y,
            particle.size * (1 - index / particle.tail.length),
            0,
            Math.PI * 2
          );
          ctx.fill();
          noGlow();
          ctx.restore();
        });

        ctx.save();
        ctx.fillStyle = C.white;
        ctx.globalAlpha = 0.95;
        glow(particle.color, 18);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        noGlow();
        ctx.restore();
      });
    };

    const drawChips = () => {
      chips.forEach((chip) => {
        const { x, y, w, h } = chip;
        const blink = Math.sin(time * 1.8 + chip.phase) > 0.2;
        ctx.save();
        ctx.fillStyle = "#050f1f";
        ctx.strokeStyle = C.cyan;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.95;
        glow(C.cyan, 10);
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 5);
        ctx.fill();
        ctx.stroke();
        noGlow();

        ctx.strokeStyle = "rgba(0,245,255,0.15)";
        ctx.beginPath();
        ctx.roundRect(x + 3, y + 3, w - 6, h - 6, 3);
        ctx.stroke();

        ctx.fillStyle = C.cyan;
        ctx.font = "bold 11px 'Courier New', monospace";
        ctx.globalAlpha = 0.9;
        ctx.fillText(chip.label, x + 8, y + 18);

        ctx.fillStyle = C.green;
        ctx.font = "9px 'Courier New', monospace";
        ctx.globalAlpha = 0.6;
        ctx.fillText(chip.sub, x + 8, y + 32);

        ctx.globalAlpha = blink ? 1 : 0.15;
        ctx.fillStyle = chip.led;
        glow(chip.led, blink ? 12 : 0);
        ctx.beginPath();
        ctx.arc(x + w - 10, y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
        noGlow();

        ctx.strokeStyle = C.cyan;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.6;
        for (let pin = 0; pin < chip.pins; pin += 1) {
          const px = x + 14 + pin * ((w - 28) / Math.max(chip.pins - 1, 1));
          ctx.beginPath();
          ctx.moveTo(px, y - 8);
          ctx.lineTo(px, y);
          ctx.stroke();
          ctx.fillStyle = C.cyan;
          ctx.beginPath();
          ctx.arc(px, y - 8, 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(px, y + h);
          ctx.lineTo(px, y + h + 8);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, y + h + 8, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    };

    const drawScanlines = () => {
      const H = canvas.height;
      const W = canvas.width;
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 3) {
        ctx.fillRect(0, y, W, 1);
      }
      ctx.restore();
    };

    const drawVignette = () => {
      const W = canvas.width;
      const H = canvas.height;
      const gradient = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    };

    const drawBrackets = () => {
      const W = canvas.width;
      const H = canvas.height;
      const sz = 28;
      ctx.save();
      ctx.strokeStyle = C.cyan;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      glow(C.cyan, 12);
      [
        [8, 8, 1, 1],
        [W - 8, 8, -1, 1],
        [8, H - 8, 1, -1],
        [W - 8, H - 8, -1, -1],
      ].forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + dy * sz);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + dx * sz, cy);
        ctx.stroke();
      });
      noGlow();
      ctx.restore();
    };

    const draw = () => {
      time += 0.016;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);
      drawGrid();
      drawTraces();
      drawNodes();
      drawParticles();
      drawChips();
      drawScanlines();
      drawVignette();
      drawBrackets();
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
};

export default CircuitBackground;
