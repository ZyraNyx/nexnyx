"use client";  // Zorg ervoor dat de component alleen op de client wordt uitgevoerd

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const router = useRouter();

    const handleChangeLanguage = (lang: string) => {
        if (i18n.language !== lang) {
            i18n.changeLanguage(lang); // Verander de taal alleen als deze anders is
            router.push(router.pathname, router.asPath, { locale: lang });
        }
    };

    useEffect(() => {
        const storedLang = i18n.language;
        if (!storedLang || storedLang === "en") {
            i18n.changeLanguage("en");  // Zet Engels als default als er geen taal is ingesteld
        }
    }, [i18n]);

    return (
        <div className="language-switcher">
            <select
                onChange={(e) => handleChangeLanguage(e.target.value)}
                value={i18n.language}
                className="text-white bg-black p-2 rounded-md"
            >
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
