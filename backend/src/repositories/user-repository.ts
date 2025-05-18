import { v4 as uuidv4 } from 'uuid';

import { IUser } from '@/interfaces/user';
import { inject, injectable } from 'tsyringe';
import { Prisma } from '@/libs/prisma';

@injectable()
export class UserRepository {
    constructor(@inject(Prisma) private prisma: Prisma) {}

    public async create(data: IUser): Promise<IUser> {
        return await this.prisma.client.user.create({
            data: {
                id: data.id ?? uuidv4(),
                steam_id: data.steam_id,
                created_at: new Date(),
            },
        });
    }

    public async findBySteamId(steamId: string): Promise<IUser | null> {
        return await this.prisma.client.user.findFirst({
            where: {
                steam_id: steamId,
            },
        });
    }
}
