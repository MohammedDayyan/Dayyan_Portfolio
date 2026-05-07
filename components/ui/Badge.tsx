import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

