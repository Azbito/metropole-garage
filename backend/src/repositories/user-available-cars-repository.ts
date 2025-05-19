import { inject, injectable } from 'tsyringe';
import { Prisma } from '@/libs/prisma';

@injectable()
export class UserAvailableCarsRepository {
    constructor(@inject(Prisma) private prisma: Prisma) {}

    public async getAllByOwnerId(
        id: string
    ): Promise<{ id: string; car_model: string; user_id: string }[]> {
        return await this.prisma.client.availableUserCars.findMany({
            where: { user_id: id },
        });
    }
}
