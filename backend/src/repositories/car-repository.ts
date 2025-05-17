import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { ICar } from '@/interfaces/car';

export class CarRepository {
    private prisma = new PrismaClient();

    public async getCarsByUser(userId: string): Promise<ICar[]> {
        return await this.prisma.car.findMany({
            where: { userId },
        });
    }

    public async getCarByPlate(plate: string): Promise<ICar | null> {
        return await this.prisma.car.findUnique({
            where: { plate },
        });
    }

    public async createCar(data: Omit<ICar, 'id'>): Promise<ICar> {
        return await this.prisma.car.create({
            data: {
                ...data,
                id: uuidv4(),
            },
        });
    }
}
