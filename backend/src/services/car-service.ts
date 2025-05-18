import { FIVEM_API } from '@/config';

import { CarRepository } from '@/repositories/car-repository';
import { UserRepository } from '@/repositories/user-repository';

import { createCarValidator } from '@/validators/car/create-validator';
import { spawnCarValidator } from '@/validators/car/spawn-car-validator';

import { CreateCarInput, ICar } from '@/interfaces/car';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CarService {
    constructor(
        @inject(CarRepository) private carRepository: CarRepository,
        @inject(UserRepository) private userRepository: UserRepository
    ) {}

    public async getCarsByOwner(owner: string): Promise<ICar[]> {
        return await this.carRepository.getCarsByUser(owner);
    }

    public async getCarByPlate(plate: string): Promise<ICar | null> {
        return await this.carRepository.getCarByPlate(plate);
    }

    public async createCar(data: unknown): Promise<ICar | null> {
        const input = data as CreateCarInput;

        if (!input.userId) {
            return null;
        }

        const user = await this.userRepository.findBySteamId(input.userId);

        if (!user) {
            return null;
        }

        const carData = createCarValidator({ data: input });

        if (!carData) return null;

        return await this.carRepository.createCar({
            ...carData,
            userId: user.id,
        });
    }

    public async spawn(data: unknown): Promise<boolean> {
        const payload = spawnCarValidator({ data });
        if (!payload) return false;

        try {
            const res = await fetch(FIVEM_API, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res) return false;

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
