import { Moon, Sun } from "lucide-react";

interface ThemeToggleButtonProps {
    toggleTheme: () => void;
    theme: string;
}


export default function ThemeToggleButton({ toggleTheme, theme }: ThemeToggleButtonProps) {
    return (
        <button>
            {/* Theme Toggle Button (Moon for Cream mode, Sun for Crimson mode) */}
            <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-full hover:bg-black/10 transition-all opacity-85 hover:opacity-100 hover:rotate-12 cursor-pointer"
                aria-label="Toggle theme mode"
                title={theme === "cream" ? "Modo Carmesí" : "Modo Crema"}
            >
                {theme === "cream" ? (
                    <Moon size={18} strokeWidth={1.8} className="fill-current" />
                ) : (
                    <Sun size={18} strokeWidth={1.8} className="text-current" />
                )}
            </button>

        </button>
    );
}