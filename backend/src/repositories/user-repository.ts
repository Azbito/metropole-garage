import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from '@/interfaces/user';

export class UserRepository {
    private prisma = new PrismaClient();

    public async create(data: IUser): Promise<IUser> {
        return await this.prisma.user.create({
            data: {
                id: data.id ?? uuidv4(),
                steam_id: data.steam_id,
                created_at: new Date(),
            },
        });
    }

    public async findBySteamId(steamId: string): Promise<IUser | null> {
        return await this.prisma.user.findFirst({
            where: {
                steam_id: steamId,
            },
        });
    }
}
