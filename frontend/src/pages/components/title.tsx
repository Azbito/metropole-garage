import { SafeHTML } from '@/components/safe-html';

import { useTranslation } from '@/hooks/use-translation';

export function Title() {
    const { t } = useTranslation();

    return (
        <div className="fade-in">
            <div className="mt-32 flex items-center justify-center gap-2">
                <div className="w-full border" />
                <h1 className="text-5xl font-bold tracking-widest whitespace-nowrap uppercase max-[603px]:text-3xl max-[600px]:text-center max-[600px]:whitespace-normal">
                    {t('title')}
                </h1>
                <div className="w-full border" />
            </div>
            <SafeHTML
                content={t('slogan')}
                className="w-full text-center text-xl italic"
            />
        </div>
    );
}
