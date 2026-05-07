"use client";

import { useMemo, useState } from "react";
import { resumeHighlights } from "@/data/resume";

function scoreLine(line: string, role: string) {
  const tokens = role
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
  const text = line.toLowerCase();
  let score = 0;
  for (const t of tokens) {
    if (t.length <= 2) continue;
    if (text.includes(t)) score += 1;
  }
  return score;
}

export function ResumeExplainer() {
  const [role, setRole] = useState("AI Engineer / ML Engineer");
  const summary = useMemo(() => {
    const wins = [...resumeHighlights.topWins].sort(
      (a, b) => scoreLine(b, role) - scoreLine(a, role),
    );
    const focus = [...resumeHighlights.focusAreas].sort(
      (a, b) => scoreLine(b, role) - scoreLine(a, role),
    );

    return {
      headline: resumeHighlights.headline,
      wins: wins.slice(0, 3),
      focus: focus.slice(0, 4),
      stack: resumeHighlights.stack,
    };
  }, [role]);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-950">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            AI Resume Explainer
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Tailors key highlights for a target role (no LLM needed).
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Role</span>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 w-full max-w-xs rounded-2xl border border-black/10 bg-white px-3 text-sm outline-none focus:border-black/25 dark:border-white/10 dark:bg-zinc-950 dark:focus:border-white/25"
            placeholder="e.g. AI Engineer"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Summary
          </div>
          <p className="mt-2 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
            {summary.headline}
          </p>

          <div className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Top wins
          </div>
          <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {summary.wins.map((w) => (
              <li key={w} className="leading-7">
                - {w}
              </li>
            ))}
          </ul>

          <div className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Focus areas
          </div>
          <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {summary.focus.map((f) => (
              <li key={f} className="leading-7">
                - {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Core stack
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {summary.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

