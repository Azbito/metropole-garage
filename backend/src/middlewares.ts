import fastifyCors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET!,
        cookie: {
            cookieName: 'token',
            signed: false,
        },
    });

    await fastify.register(fastifyCors, {
        origin: (origin, cb) => {
            if (!origin || typeof origin !== 'string') {
                return cb(null, true);
            }

            cb(null, true);
        },
        credentials: true,
    });

    fastify.decorate(
        'authenticate',
        async function (request: FastifyRequest, reply: FastifyReply) {
            try {
                await request.jwtVerify();
            } catch {
                return reply.code(401).send({ error: 'Unauthorized' });
            }
        }
    );
});
