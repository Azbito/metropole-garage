import { useLoaderStore } from '@/stores/use-preloader';

import { Main } from '@/components/layouts/main';
import { Wrapper } from '@/components/layouts/wrapper';
import { Loader } from '@/components/loader';
import { UserButton } from '@/components/user-button';

import { useSteam } from '@/hooks/use-steam';

import { About } from './components/about';
import { CarList } from './components/car-list';
import { CreateCar } from './components/create-car';
import { Title } from './components/title';

export default function HomePage() {
    const { loader } = useLoaderStore();
    const { isReady } = useSteam();

    if (!isReady) {
        return <Loader />;
    }

    return (
        <>
            <Wrapper>
                <Title />
                <Main>
                    <About />
                    <CreateCar />
                    <CarList />
                </Main>
            </Wrapper>

            {loader && <Loader />}
            <UserButton />
        </>
    );
}
