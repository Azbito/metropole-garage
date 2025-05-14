import { Main } from '@/components/layouts/main';
import { Wrapper } from '@/components/layouts/wrapper';

import { About } from './components/about';
import { CarList } from './components/car-list';
import { CreateCar } from './components/create-car';
import { Title } from './components/title';

export default function HomePage() {
    return (
        <Wrapper>
            <Title />
            <Main>
                <About />
                <CreateCar />
                <CarList />
            </Main>
        </Wrapper>
    );
}
