import { translations, type TranslationKeys } from '@/i18n';
import { create } from 'zustand';

type Language = keyof typeof translations;

interface TranslationStore {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
    language: 'pt',
    setLanguage: (lang) => set({ language: lang }),
    t: (key) => {
        const { language } = get();
        return translations[language][key] ?? key;
    },
}));
