"use client";

import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [mv, value, decimals]);

  return (
    <span className="tabular-nums">
      {display}
      {suffix ?? ""}
    </span>
  );
}

