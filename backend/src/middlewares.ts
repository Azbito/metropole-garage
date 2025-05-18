import fastifyCors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { injectable, inject } from 'tsyringe';

@injectable()
export class AuthPlugin {
    constructor(@inject('FastifyInstance') private app: FastifyInstance) {
        this.app.register(jwt, {
            secret: process.env.JWT_SECRET!,
            cookie: {
                cookieName: 'token',
                signed: false,
            },
        });

        this.app.register(fastifyCors, {
            origin: (origin, cb) => {
                if (!origin || typeof origin !== 'string') {
                    return cb(null, true);
                }
                cb(null, true);
            },
            credentials: true,
        });

        this.app.decorate(
            'authenticate',
            async (request: FastifyRequest, reply: FastifyReply) => {
                try {
                    await request.jwtVerify();
                } catch {
                    return reply.code(401).send({ error: 'Unauthorized' });
                }
            }
        );
    }
}
