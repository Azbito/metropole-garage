import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';

const fastify = Fastify();

fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
});

fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch {
            reply.code(401).send({ error: 'Unauthorized' });
        }
    }
);
