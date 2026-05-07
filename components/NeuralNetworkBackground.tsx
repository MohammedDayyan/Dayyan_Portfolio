"use client";

import { useEffect, useRef } from "react";

type LayerNode = {
  x: number;
  y: number;
  baseY: number;
  phase: number;
  r: number;
};

type Edge = {
  from: number;
  to: number;
};

type Pulse = {
  edgeIdx: number;
  dir: 1 | -1;
  t: number;
  speed: number;
};

type ScheduledPulse = Pulse & {
  startAt: number;
};

const LAYERS = [6, 8, 10, 8, 4];

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let lastIdlePulseAt = 0;
    let lastHoverTriggerAt = 0;
    let hoveredNode = -1;
    const mouse = { x: -9999, y: -9999, active: false };
    const nodes: LayerNode[] = [];
    const layerNodeIndexes: number[][] = [];
    const edges: Edge[] = [];
    const nodeLayer: number[] = [];
    const outgoing: number[][] = [];
    const incoming: number[][] = [];
    const pulses: Pulse[] = [];
    const scheduledPulses: ScheduledPulse[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedNodes = () => {
      nodes.length = 0;
      edges.length = 0;
      layerNodeIndexes.length = 0;
      nodeLayer.length = 0;
      outgoing.length = 0;
      incoming.length = 0;

      const xStart = width * 0.12;
      const xEnd = width * 0.88;
      const layerGap = (xEnd - xStart) / (LAYERS.length - 1);

      for (let l = 0; l < LAYERS.length; l += 1) {
        const count = LAYERS[l];
        const indexes: number[] = [];
        const yStart = height * 0.18;
        const yEnd = height * 0.82;
        const yGap = count > 1 ? (yEnd - yStart) / (count - 1) : 0;
        const x = xStart + l * layerGap;

        for (let i = 0; i < count; i += 1) {
          const y = yStart + i * yGap;
          indexes.push(nodes.length);
          nodeLayer.push(l);
          outgoing.push([]);
          incoming.push([]);
          nodes.push({
            x,
            y,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            r: 2 + Math.random() * 1.8,
          });
        }
        layerNodeIndexes.push(indexes);
      }

      for (let l = 0; l < layerNodeIndexes.length - 1; l += 1) {
        for (const from of layerNodeIndexes[l]) {
          for (const to of layerNodeIndexes[l + 1]) {
            const edgeIdx = edges.length;
            edges.push({ from, to });
            outgoing[from].push(edgeIdx);
            incoming[to].push(edgeIdx);
          }
        }
      }
    };

    const enqueuePulse = (edgeIdx: number, dir: 1 | -1, startAt: number) => {
      scheduledPulses.push({
        edgeIdx,
        dir,
        t: 0,
        speed: 0.025 + Math.random() * 0.014,
        startAt,
      });
    };

    const triggerTransmissionForNode = (startNode: number, now: number) => {
      if (startNode < 0 || startNode >= nodes.length) return;
      const startLayer = nodeLayer[startNode] ?? 0;

      // Forward propagation only through nodes reachable from hovered node.
      let forwardFrontier = [startNode];
      let timeOffset = 0;
      for (let l = startLayer; l < LAYERS.length - 1; l += 1) {
        const nextFrontier: number[] = [];
        const seenNext = new Set<number>();
        for (const nodeIdx of forwardFrontier) {
          for (const edgeIdx of outgoing[nodeIdx] ?? []) {
            enqueuePulse(edgeIdx, 1, now + timeOffset);
            const to = edges[edgeIdx]?.to;
            if (to !== undefined && !seenNext.has(to)) {
              seenNext.add(to);
              nextFrontier.push(to);
            }
          }
        }
        if (!nextFrontier.length) break;
        forwardFrontier = nextFrontier;
        timeOffset += 120;
      }

      // Backward propagation only through nodes that connect into hovered node.
      let backwardFrontier = [startNode];
      timeOffset = 0;
      for (let l = startLayer; l > 0; l -= 1) {
        const prevFrontier: number[] = [];
        const seenPrev = new Set<number>();
        for (const nodeIdx of backwardFrontier) {
          for (const edgeIdx of incoming[nodeIdx] ?? []) {
            enqueuePulse(edgeIdx, -1, now + timeOffset);
            const from = edges[edgeIdx]?.from;
            if (from !== undefined && !seenPrev.has(from)) {
              seenPrev.add(from);
              prevFrontier.push(from);
            }
          }
        }
        if (!prevFrontier.length) break;
        backwardFrontier = prevFrontier;
        timeOffset += 120;
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onLeave = () => {
      mouse.active = false;
      hoveredNode = -1;
    };

    const step = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        width * 0.25,
        height * 0.18,
        20,
        width * 0.5,
        height * 0.75,
        Math.max(width, height),
      );
      grad.addColorStop(0, "rgba(15,23,42,0.45)");
      grad.addColorStop(1, "rgba(1,7,21,0.96)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const n of nodes) {
        n.y = n.baseY + Math.sin(now * 0.0012 + n.phase) * 4.5;
      }

      const xStart = width * 0.12;
      const xEnd = width * 0.88;
      const cycleMs = 5200;
      const localTime = now % cycleMs;
      const phase = localTime / cycleMs;

      if (mouse.active) {
        let nextHovered = -1;
        let best = 9999;
        for (let i = 0; i < nodes.length; i += 1) {
          const n = nodes[i];
          const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
          if (d < 16 && d < best) {
            best = d;
            nextHovered = i;
          }
        }
        if (nextHovered !== -1 && (nextHovered !== hoveredNode || now - lastHoverTriggerAt > 420)) {
          hoveredNode = nextHovered;
          lastHoverTriggerAt = now;
          triggerTransmissionForNode(nextHovered, now);
        }
      }

      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const intensity = 0.1 + (Math.sin(now * 0.001 + a.phase + b.phase) + 1) * 0.11;
        ctx.strokeStyle = `rgba(96,165,250,${intensity.toFixed(3)})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = scheduledPulses.length - 1; i >= 0; i -= 1) {
        if (scheduledPulses[i].startAt <= now) {
          const { edgeIdx, dir, speed } = scheduledPulses[i];
          pulses.push({ edgeIdx, dir, t: dir === 1 ? 0 : 1, speed });
          scheduledPulses.splice(i, 1);
        }
      }

      if (edges.length > 0 && now - lastIdlePulseAt > 1200) {
        pulses.push({
          edgeIdx: Math.floor(Math.random() * edges.length),
          dir: 1,
          t: 0,
          speed: 0.028 + Math.random() * 0.014,
        });
        lastIdlePulseAt = now;
      }

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        const edge = edges[p.edgeIdx];
        if (!edge) {
          pulses.splice(i, 1);
          continue;
        }
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        p.t += p.speed * p.dir;
        if (p.t >= 1 || p.t <= 0) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(186,230,253,0.95)";
        ctx.shadowBlur = 16;
        ctx.shadowColor = "rgba(125,211,252,0.85)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (const layer of layerNodeIndexes) {
        if (!layer.length) continue;
        const first = nodes[layer[0]];
        const last = nodes[layer[layer.length - 1]];
        const stripe = ctx.createLinearGradient(first.x, first.y, first.x, last.y);
        stripe.addColorStop(0, "rgba(56,189,248,0.08)");
        stripe.addColorStop(1, "rgba(56,189,248,0.02)");
        ctx.strokeStyle = stripe;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(first.x, first.y - 20);
        ctx.lineTo(last.x, last.y + 20);
        ctx.stroke();
      }

      ctx.font = "600 12px var(--font-geist-sans), sans-serif";
      ctx.fillStyle = "rgba(186,230,253,0.72)";
      ctx.fillText("Input Layer", xStart - 30, height * 0.13);
      ctx.fillText("Hidden Layer(s)", width * 0.5 - 44, height * 0.13);
      ctx.fillText("Output Layer", xEnd - 34, height * 0.13);

      for (const n of nodes) {
        const isHovered = hoveredNode !== -1 && n === nodes[hoveredNode];
        ctx.fillStyle = isHovered ? "rgba(240,249,255,1)" : "rgba(224,242,254,0.9)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = isHovered
          ? "rgba(125,211,252,1)"
          : "rgba(56,189,248,0.6)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? n.r + 1.4 : n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = window.requestAnimationFrame(step);
    };

    resize();
    seedNodes();
    raf = window.requestAnimationFrame(step);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
