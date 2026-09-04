import { useEffect, useState, useRef } from "react";

interface Props {
    initWord: string;
}

const listArtLanguage = [
    "Art",          // English / French / Catalan
    "Arte",         // Spanish / Italian / Portuguese / Galician
    "Kunst",        // German / Dutch / Danish / Norwegian / Swedish
    "芸術",         // Japanese
    "艺术",         // Chinese
    "예술",         // Korean
    "Ars",          // Latin
    "Sztuka",       // Polish
    "Sanat",        // Turkish
    "Taide",        // Finnish
    "Artea",        // Basque
    "Celf",         // Welsh
    "List",         // Icelandic
    "Seni",         // Indonesian / Malay
    "Sining",       // Tagalog / Filipino
    "Sanaa",        // Swahili
    "Arto",         // Esperanto
    "Umjetnost",    // Croatian / Bosnian
    "Umenie",       // Slovak
    "Menas",        // Lithuanian
    "Arti",         // Maltese
    "Umetnost",     // Slovenian
    "Kuns",         // Afrikaans
    "Toi",          // Maori
    "Farshaxan",    // Somali
    "Ubuciko",      // Zulu
    "Huner",        // Kurdish
];

const AnimationTitleHero = ({ initWord }: Props) => {
    const [artWord, setArtWord] = useState(initWord);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const interval = setInterval(() => {
            isFirstRender.current = false;
            setArtWord((prevWord) => {
                const currentIndex = listArtLanguage.findIndex(
                    (w) => w.toLowerCase() === prevWord.toLowerCase()
                );
                const nextIndex = (currentIndex + 1) % listArtLanguage.length;
                return listArtLanguage[nextIndex];
            });
        }, 2800);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            key={artWord}
            className={`inline-block ${!isFirstRender.current ? "animate-word-change" : ""}`}
        >
            {artWord}
        </span>
    );
};

export default AnimationTitleHero;