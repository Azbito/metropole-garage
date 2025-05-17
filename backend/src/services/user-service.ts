import type { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';

import type { UserRepository } from '@/repositories/user-repository';

import { fiveMIDToSteamID64 } from '@/utils/steam-id';

interface PlayerSummaryResponse {
    response: {
        players: Array<{
            personaname: string;
            avatarfull: string;
        }>;
    };
}

export class UserService {
    constructor(
        private userRepository: UserRepository,
        private fastify: FastifyInstance
    ) {}

    public async authenticateWithSteam(steamId: string): Promise<{
        user: {
            id: string;
            steam_id: string;
            created_at: Date;
            name: string;
            avatar: string;
        };
        token: string;
    } | null> {
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

        return { user: { ...user, ...profile }, token };
    }

    private async getSteamProfile(
        steamId: string
    ): Promise<{ name: string; avatar: string } | null> {
        if (!steamId) return null;

        const apiKey = process.env.STEAM_KEY;
        const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${fiveMIDToSteamID64(steamId)}`;

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
