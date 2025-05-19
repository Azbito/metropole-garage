import { UserAvailableCarsService } from '@/services/user-available-cars-service';
import { FastifyReply, FastifyRequest } from 'fastify';

import { inject, injectable } from 'tsyringe';

@injectable()
export class UserAvailableCarsController {
    constructor(
        @inject(UserAvailableCarsService)
        private userAvailableCarsService: UserAvailableCarsService
    ) {}

    public async getAvailableCars(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        const { sub } = request.user as {
            sub: string;
        };

        try {
            const res =
                await this.userAvailableCarsService.getAvailableCarsByOwner(
                    sub
                );
            return reply.send(res);
        } catch (e) {
            console.error("Failed while getting user's available cars", e);
            return null;
        }
    }
}
