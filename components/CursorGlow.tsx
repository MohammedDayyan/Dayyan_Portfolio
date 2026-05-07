"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const sx = useSpring(x, { stiffness: 360, damping: 42, mass: 0.65 });
  const sy = useSpring(y, { stiffness: 360, damping: 42, mass: 0.65 });
  const tx = useSpring(x, { stiffness: 200, damping: 34, mass: 1.1 });
  const ty = useSpring(y, { stiffness: 200, damping: 34, mass: 1.1 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10">
      <motion.div
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: sx,
          top: sy,
          background:
            "radial-gradient(circle, rgba(224,242,254,0.95) 0%, rgba(56,189,248,0.78) 44%, rgba(56,189,248,0.02) 100%)",
          boxShadow: "0 0 14px rgba(56,189,248,0.9), 0 0 30px rgba(56,189,248,0.55)",
        }}
      />
      <motion.div
        className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          left: tx,
          top: ty,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(56,189,248,0.1) 45%, rgba(56,189,248,0) 100%)",
        }}
      />
    </motion.div>
  );
}

