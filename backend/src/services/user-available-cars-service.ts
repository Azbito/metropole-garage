import type { FastifyInstance } from 'fastify';

import { inject, injectable } from 'tsyringe';
import { UserAvailableCarsRepository } from '@/repositories/user-available-cars-repository';

@injectable()
export class UserAvailableCarsService {
    constructor(
        @inject(UserAvailableCarsRepository)
        private userAvailableCarsRepository: UserAvailableCarsRepository,
        @inject('FastifyInstance') private fastify: FastifyInstance
    ) {}

    public async getAvailableCarsByOwner(
        owner: string
    ): Promise<{ id: string; car_model: string; user_id: string }[]> {
        if (!owner) return [];

        try {
            const data =
                await this.userAvailableCarsRepository.getAllByOwnerId(owner);

            return data;
        } catch (e) {
            console.error('Error while getting available cars by owner', e);
            return [];
        }
    }
}
