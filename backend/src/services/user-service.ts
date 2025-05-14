import { v4 as uuidv4 } from 'uuid';

import type { UserRepository } from '@/repositories/user-repository';

import type { IUser } from '@/interfaces/user';

interface PlayerSummaryResponse {
    response: {
        players: Array<{
            personaname: string;
            avatarfull: string;
        }>;
    };
}

export class UserService {
    constructor(private userRepository: UserRepository) {}

    public async createUser(data: unknown): Promise<IUser | null> {
        try {
            if (typeof data !== 'object' || data === null || !('id' in data)) {
                return null;
            }

            const { id } = data as { id: string };
            const profile = await this.getSteamProfile(id);

            if (!profile) return null;

            const userToCreate: IUser = {
                id: uuidv4(),
                steam_id: id,
                created_at: new Date(),
            };

            return await this.userRepository.create(userToCreate);
        } catch {
            return null;
        }
    }

    private async getSteamProfile(
        steamId: string
    ): Promise<{ name: string; avatar: string } | null> {
        if (!steamId) return null;

        const apiKey = process.env.STEAM_API_KEY;
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;

        try {
            const response = await fetch(url);
            const data = (await response.json()) as PlayerSummaryResponse;

            if (!data.response?.players || data.response.players.length === 0) {
                return null;
            }

            const player = data.response.players[0];

            return {
                name: player.personaname,
                avatar: player.avatarfull,
            };
        } catch (error) {
            console.error('getSteamProfile:', error);
            return null;
        }
    }
}
