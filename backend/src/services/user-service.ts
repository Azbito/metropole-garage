import type { FastifyInstance } from 'fastify';
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

interface ResolveVanityResponse {
    response: {
        success: number;
        steamid?: string;
        message?: string;
    };
}

export class UserService {
    constructor(
        private userRepository: UserRepository,
        private fastify: FastifyInstance
    ) {}

    public async authenticateWithSteam(
        vanityUrl: string
    ): Promise<{ user: IUser; token: string } | null> {
        const steamId = await this.getSteamUserIdByUsername(vanityUrl);

        if (!steamId) return null;

        const profile = await this.getSteamProfile(steamId);
        if (!profile) return null;

        let user = await this.userRepository.findBySteamId(steamId);

        if (!user) {
            user = await this.userRepository.create({
                id: uuidv4(),
                steam_id: steamId,
                created_at: new Date(),
            });
            if (!user) return null;
        }

        const token = this.fastify.jwt.sign(
            {
                sub: user.id,
                steamId: user.steam_id,
            },
            {
                expiresIn: '7d',
            }
        );

        return { user, token };
    }

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

    private async getSteamUserIdByUsername(
        username: string
    ): Promise<string | null> {
        const apiKey = process.env.STEAM_API_KEY;
        const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${username}`;

        try {
            const response = await fetch(url);
            const data = (await response.json()) as ResolveVanityResponse;

            if (data.response.success !== 1 || !data.response.steamid) {
                return null;
            }

            return data.response.steamid;
        } catch (error) {
            console.error('getSteamUserIdByUsername:', error);
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
