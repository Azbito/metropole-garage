import { useTranslation } from '@/hooks/use-translation';

export default function HomePage() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('title')}</h1>
        </div>
    );
}
