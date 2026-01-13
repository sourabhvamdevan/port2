
import { Sun, Moon } from "lucide-react";

interface Props {
  dark: boolean;
  setDark: (v: boolean) => void;
}

export default function ThemeToggle({ dark, setDark }: Props) {
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
      className="
        flex items-center justify-center
        w-10 h-10 rounded-full

        bg-gray-50 dark:bg-gray-900
        border border-gray-300 dark:border-white/10

        text-gray-900 dark:text-gray-200

        shadow-sm
        hover:bg-gray-100 dark:hover:bg-gray-800
        hover:shadow

        transition-all duration-300
      "
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}




