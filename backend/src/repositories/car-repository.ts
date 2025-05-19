import { v4 as uuidv4 } from 'uuid';

import { ICar } from '@/interfaces/car';
import { inject, injectable } from 'tsyringe';
import { Prisma } from '@/libs/prisma';

@injectable()
export class CarRepository {
    constructor(@inject(Prisma) private prisma: Prisma) {}

    public async getCarsByUser(userId: string): Promise<ICar[]> {
        return await this.prisma.client.car.findMany({
            where: { userId },
        });
    }

    public async getCarByPlate(plate: string): Promise<ICar | null> {
        return await this.prisma.client.car.findUnique({
            where: { plate },
        });
    }

    public async createCar(data: Omit<ICar, 'id'>): Promise<ICar> {
        return await this.prisma.client.car.create({
            data: {
                ...data,
                id: uuidv4(),
            },
        });
    }
}
