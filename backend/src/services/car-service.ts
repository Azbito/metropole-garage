import * as net from 'net';

import { FIVEM_API } from '@/config';

import { CarRepository } from '@/repositories/car-repository';

import { createCarValidator } from '@/validators/car/create-validator';
import { spawnCarValidator } from '@/validators/car/spawn-car-validator';

import { ICar } from '@/interfaces/car';

export class CarService {
    constructor(private carRepository: CarRepository) {}

    public async getCarsByOwner(owner: string): Promise<ICar[]> {
        return await this.carRepository.getCarsByUser(owner);
    }

    public async getCarByPlate(plate: string): Promise<ICar | null> {
        return await this.carRepository.getCarByPlate(plate);
    }

    public async createCar(data: unknown): Promise<ICar | null> {
        const carData = createCarValidator({ data });

        if (!carData) {
            return null;
        }

        return await this.carRepository.createCar(carData);
    }

    public async spawn(data: unknown): Promise<boolean> {
        const payload = spawnCarValidator({ data });
        if (!payload) return false;

        try {
            await fetch(FIVEM_API, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
