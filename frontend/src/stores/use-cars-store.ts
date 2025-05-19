import { Car } from '@/interfaces/car-interface';
import { create } from 'zustand';

interface CarStore {
    cars: Car[];
    addCar: (car: Car) => void;
    removeCar: (id: string) => void;
    updateCar: (id: string, updatedCar: Partial<Car>) => void;
    getCarById: (id: string) => Car | undefined;
}

export const useCarStore = create<CarStore>((set, get) => ({
    cars: [],

    addCar: (car) =>
        set((state) => {
            const exists = state.cars.some((c) => c.id === car.id);

            if (exists) {
                return {};
            }
            const updatedCars = [...state.cars, car].sort(
                (a, b) =>
                    new Date(b.purchaseDate).getTime() -
                    new Date(a.purchaseDate).getTime()
            );

            return { cars: updatedCars };
        }),
    removeCar: (id) =>
        set((state) => ({ cars: state.cars.filter((car) => car.id !== id) })),

    updateCar: (id, updatedCar) =>
        set((state) => ({
            cars: state.cars.map((car) =>
                car.id === id ? { ...car, ...updatedCar } : car
            ),
        })),

    getCarById: (id) => get().cars.find((car) => car.id === id),
}));
