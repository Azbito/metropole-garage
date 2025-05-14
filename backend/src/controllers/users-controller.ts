import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { UserService } from '@/services/user-service';

export class UserController {
    constructor(
        private fastify: FastifyInstance,
        private userService: UserService
    ) {}

    public async userRoutes() {
        this.fastify.post('/user/register', this.registerUser.bind(this));
        this.fastify.post('/user/auth', this.authenticate.bind(this));
    }

    private async registerUser(request: FastifyRequest, reply: FastifyReply) {
        const { body } = request;

        try {
            const res = await this.userService.createUser(body);

            if (!res) {
                return reply.status(400).send({
                    error: '❌ Invalid user data',
                });
            }

            return reply.send(res);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({
                    error: '❌ Invalid user data',
                    details: error.message,
                });
            }

            return reply.status(400).send({ error: '❌ Invalid user data' });
        }
    }

    private async authenticate(request: FastifyRequest, reply: FastifyReply) {
        const { vanityUrl } = request.body as { vanityUrl: string };

        const result = await this.userService.authenticateWithSteam(vanityUrl);

        if (!result) {
            return reply.status(401).send({ error: 'Authentication failed' });
        }

        return reply.send(result);
    }
}
