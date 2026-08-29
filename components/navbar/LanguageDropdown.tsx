import { useLanguage, type Language } from "@/context/LanguageContext";

interface LanguageDropdownProps {
  setLangMenuOpen: (open: boolean) => void;
  lang: string;
}

const Languages = {
  es: "Español",
  en: "English",
} as const;

export default function LanguageDropdown({ setLangMenuOpen, lang }: LanguageDropdownProps) {
  const { setLang } = useLanguage();

  return (
    <div className="absolute right-0 bottom-full mb-2 md:bottom-auto md:top-full md:mt-2 md:mb-0 py-1.5 w-24 rounded-xl glass-card shadow-lg z-50 text-xs font-cinzel flex flex-col animate-in fade-in zoom-in-95">
      {Object.entries(Languages).map(([key, value]) => (
        <button
          key={key}
          onClick={() => {
            setLang(key as Language);
            setLangMenuOpen(false);
          }}
          className={`px-3 py-1.5 text-left hover:bg-black/10 transition-opacity duration-300 flex items-center justify-between cursor-pointer ${lang === key ? "font-bold opacity-100" : "opacity-70"
            }`}
        >
          <span>{value}</span>
          {lang === key && <span className="text-[10px]">●</span>}
        </button>
      ))}
    </div>
  );
}