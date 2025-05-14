import { PrismaClient } from '@prisma/client';

import { ICar } from '@/interfaces/car';

export class CarRepository {
    private prisma = new PrismaClient();

    public async getCarsByOwner(owner: string): Promise<ICar[]> {
        return await this.prisma.car.findMany({
            where: { owner },
        });
    }

    public async getCarByPlate(plate: string): Promise<ICar | null> {
        return await this.prisma.car.findUnique({
            where: { plate },
        });
    }

    public async createCar(data: ICar): Promise<ICar> {
        return await this.prisma.car.create({ data });
    }
}
