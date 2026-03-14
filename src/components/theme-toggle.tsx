"use client";
import { useTheme } from "next-themes";
import { Moon, SunDim } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed top-4 right-4 z-50">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
        />

        <div
          className="w-12 h-6 md:w-14 md:h-7 bg-surface border border-border rounded-full peer
          peer-focus:ring-2 peer-focus:ring-ring transition-all duration-300
          flex items-center px-1"
        >
          <div
            className={`absolute w-4 h-4 md:w-5 md:h-5 bg-foreground rounded-full transition-all duration-300 flex items-center justify-center
            ${isDark ? "translate-x-6 md:translate-x-7" : "translate-x-0"}`}
          >
            {isDark ? (
              <Moon size={10} className="text-background md:size-3" />
            ) : (
              <SunDim size={10} className="text-background md:size-3" />
            )}
          </div>

          <div className="w-full flex justify-between px-1 opacity-20">
            <SunDim size={10} />
            <Moon size={10} />
          </div>
        </div>
      </label>
    </div>
  );
}
