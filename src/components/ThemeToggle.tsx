import { useTheme } from "../lib/theme";
import { cn } from "../utils/cn";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const light = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Dark theme" : "Light theme"}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-colors hover:border-accent/40 hover:text-fg",
        className
      )}
    >
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("absolute h-[18px] w-[18px] transition-all duration-300", light ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={cn("absolute h-[17px] w-[17px] transition-all duration-300", light ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}

