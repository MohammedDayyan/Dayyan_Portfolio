"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProjectMetric } from "@/data/projects";

export function MetricsChart({ metrics }: { metrics: ProjectMetric[] }) {
  const data = metrics
    .filter((m) => typeof m.before === "number" && typeof m.after === "number")
    .map((m) => ({
      name: m.label,
      before: m.before,
      after: m.after,
      unit: m.unit ?? "",
    }));

  return (
    <div className="h-64 w-full rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-zinc-950">
      <div className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Before vs After
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 8, right: 16, top: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            height={55}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(v, name, item) => {
              const unit = (item?.payload?.unit as string) ?? "";
              const val = typeof v === "number" ? v : Number(v);
              return [`${Number.isFinite(val) ? val : v}${unit ? ` ${unit}` : ""}`, name];
            }}
          />
          <Bar dataKey="before" fill="#64748b" radius={[8, 8, 0, 0]} />
          <Bar dataKey="after" fill="#06b6d4" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

