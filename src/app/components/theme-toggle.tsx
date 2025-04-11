"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() { 
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-20 h-10 flex items-center rounded-full p-1 cursor-pointer bg-gray-200 dark:bg-gray-800">
        <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700"></div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-all duration-500 shadow-inner
        dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-600
        bg-gradient-to-r from-purple-800 to-purple-700
      `}
    >
      <div
        className={`w-8 h-8 rounded-full shadow-lg transform transition-all duration-500 flex items-center justify-center text-white text-sm
          ${theme === "dark" ? "translate-x-10 bg-gray-900" : "translate-x-0 bg-white text-purple-900"}
        `}
      >
        {theme === "dark" ? (
          <FaMoon className="text-lg text-yellow-500" />
        ) : (
          <FaSun className="text-lg text-yellow-500" />
        )}
      </div>
    </div>
  );
}