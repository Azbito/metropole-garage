import { useEffect, useState } from 'react';

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
        axios.post(`https://mymode/close`, {}).catch((error) => {
            console.error('Error while closing the UI:', error);
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
            <Wrapper>
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
