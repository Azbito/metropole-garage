import { pt } from './pt';

export const translations = {
    pt,
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)['pt'];
