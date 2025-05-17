import { Car } from '@/interfaces/car-interface';
import { api } from '@/lib/api';

type DataProps = {
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    userId: string;
    damage: number;
    fuel: number;
    purchaseDate: string;
};

export async function spawnCar({
    data,
}: {
    data: DataProps;
}): Promise<Car | null> {
    try {
        const res = await api().post('/cars/spawn', data);
        return res.data.car as Car;
    } catch (e) {
        console.error(e);
        return null;
    }
}
