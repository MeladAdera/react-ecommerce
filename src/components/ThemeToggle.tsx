"use client"
import { useTheme } from "../context/ThemeContext"

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <span className="flex items-center gap-1">☀️ Light</span>
      ) : (
        <span className="flex items-center gap-1">🌙 Dark</span>
      )}
    </button>
  )
}