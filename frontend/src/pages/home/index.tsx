import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import axios from 'axios';

import { useLoaderStore } from '@/stores/use-preloader';

import { Main } from '@/components/layouts/main';
import { Wrapper } from '@/components/layouts/wrapper';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { UserButton } from '@/components/user-button';

import { useSteam } from '@/hooks/use-steam';
import { useTranslation } from '@/hooks/use-translation';

import { About } from './components/about';
import { CarList } from './components/car-list';
import { CreateCar } from './components/create-car';
import { Title } from './components/title';

export default function HomePage() {
    const { loader } = useLoaderStore();
    const { t } = useTranslation();

    const isFiveM: boolean =
        typeof window !== 'undefined' &&
        (typeof window.GetParentResourceName === 'function' ||
            typeof window.resourceName === 'string');

    const { useAuthFiveM, useAuthWeb } = useSteam(isFiveM);

    const [visible, setVisible] = useState<boolean>(false);

    useAuthWeb();
    useAuthFiveM();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.action === 'show') {
                setVisible(true);
            } else if (event.data.action === 'hide') {
                setVisible(false);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const closeUI = () => {
        axios.post(`https://garage/close`, {}).catch((error) => {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error(
                    'Error response headers:',
                    error.response.headers
                );
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        });
    };

    useEffect(() => {
        if (!isFiveM) {
            setVisible(true);
        }
    }, [isFiveM]);

    if (!visible) return null;

    return (
        <>
            <Wrapper
                className={cn(
                    isFiveM ? 'blur' : 'bg-background',
                    'min-h-screen'
                )}
            >
                <Title />
                <Main>
                    <About />
                    <CreateCar />
                    <CarList isFiveM={isFiveM} />
                </Main>
            </Wrapper>

            {loader && <Loader />}
            <UserButton isFiveM={isFiveM} />

            {isFiveM && (
                <Button
                    onClick={closeUI}
                    className="flex items-center gap-2 px-3 fixed top-14 right-4"
                >
                    {t('close')}
                </Button>
            )}
        </>
    );
}
