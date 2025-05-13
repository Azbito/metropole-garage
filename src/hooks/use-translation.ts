import { type TranslationKeys, translations } from '@/i18n';

import { useTranslationStore } from '@/stores/use-translation-store';

export function useTranslation() {
    const { language, setLanguage } = useTranslationStore();

    return {
        t: (key: TranslationKeys) => translations[language][key],
        language,
        setLanguage,
    };
}
