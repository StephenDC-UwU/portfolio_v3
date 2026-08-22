
interface LanguageDropdownProps {
    setLangMenuOpen: (open: boolean) => void;
    lang: string;
}


const Languages = {
    es: "Español",
    en: "English",
} as const;

type Language = keyof typeof Languages;

const LanguagesList = ({ setLangMenuOpen, lang }: LanguageDropdownProps) => {
    return Object.entries(Languages).map(([key, value]) => {
        return (
            <button
                key={key}
                onClick={() => {
                    setLangMenuOpen(false);
                }}
                className={`px-3 py-1.5 text-left hover:bg-black/10 transition-colors flex items-center justify-between ${lang === key ? "font-bold opacity-100" : "opacity-70"
                    }`}
            >
                <span>{value}</span>
                {lang === key && <span className="text-[10px]">●</span>}
            </button>
        );
    });
};

export default function LanguageDropdown({ setLangMenuOpen, lang }: LanguageDropdownProps) {
    return (
        <div className="absolute right-0 top-full mt-2 py-1.5 w-24 rounded-xl glass-card shadow-lg z-50 text-xs font-cinzel flex flex-col animate-in fade-in zoom-in-95">
            <LanguagesList setLangMenuOpen={setLangMenuOpen} lang={lang} />
        </div>
    )
}