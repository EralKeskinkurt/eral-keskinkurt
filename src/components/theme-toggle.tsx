"use client";
import { useTheme } from "next-themes";
import { Moon, SunDim } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes hydration farkını önlemek için ilk client render'da mount işareti
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed top-5.5 right-4 z-60">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
        />
        <div
          className="w-14 h-7 bg-surface border border-border rounded-full peer 
          peer-focus:ring-2 peer-focus:ring-ring transition-all duration-300
          flex items-center px-1"
        >
          <div
            className={`
            absolute w-5 h-5 bg-foreground rounded-full transition-all duration-300 flex items-center justify-center
            ${isDark ? "translate-x-7" : "translate-x-0"}
          `}
          >
            {isDark ? (
              <Moon size={12} className="text-background" />
            ) : (
              <SunDim size={14} className="text-background" />
            )}
          </div>
          <div className="w-full flex justify-between px-1 opacity-20">
            <SunDim size={12} />
            <Moon size={12} />
          </div>
        </div>
      </label>
    </div>
  );
}
