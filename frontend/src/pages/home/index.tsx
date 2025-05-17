import { useLoaderStore } from '@/stores/use-preloader';

import { Main } from '@/components/layouts/main';
import { Wrapper } from '@/components/layouts/wrapper';
import { Loader } from '@/components/loader';

import { About } from './components/about';
import { CarList } from './components/car-list';
import { CreateCar } from './components/create-car';
import { Title } from './components/title';

export default function HomePage() {
    const { loader } = useLoaderStore();

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
        </>
    );
}
