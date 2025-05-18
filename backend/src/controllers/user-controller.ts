import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { UserService } from '@/services/user-service';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
    constructor(
        @inject('FastifyInstance') private fastify: FastifyInstance,
        @inject(UserService) private userService: UserService
    ) {}

    public async authenticate(request: FastifyRequest, reply: FastifyReply) {
        const steamId = request.cookies['steamId'] as string | undefined;
        if (!steamId) {
            return reply
                .status(401)
                .send({ error: 'Steam ID missing in cookies' });
        }

        const result = await this.userService.authenticateWithSteam(steamId);

        if (!result) {
            return reply.status(401).send({ error: 'Authentication failed' });
        }

        const ONE_WEEK = 60 * 60 * 24 * 7;

        return reply
            .setCookie('token', result.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: ONE_WEEK,
            })
            .send(result.user);
    }
}
