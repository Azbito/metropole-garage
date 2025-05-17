import { CarRepository } from '@/repositories/car-repository';

import { createCarValidator } from '@/validators/car/create-validator';

import { ICar } from '@/interfaces/car';

export class CarService {
    constructor(private carRepository: CarRepository) {}

    public async getCarsByOwner(owner: string): Promise<ICar[]> {
        return await this.carRepository.getCarsByUser(owner);
    }

    public async spawnCarByPlate(plate: string): Promise<ICar | null> {
        return await this.carRepository.getCarByPlate(plate);
    }

    public async createCar(data: unknown): Promise<ICar | null> {
        const carData = createCarValidator({ data });

        if (!carData) {
            return null;
        }

        return await this.carRepository.createCar(carData);
    }
}
