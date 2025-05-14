import { Wrapper } from '@/components/layouts/wrapper';
import { Title } from './components/title';
import { Main } from '@/components/layouts/main';
import { About } from './components/about';
import { CarList } from './components/car-list';
import { CreateCar } from './components/create-car';

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
