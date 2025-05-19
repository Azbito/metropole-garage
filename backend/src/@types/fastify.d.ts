import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
    interface FastifyRequest {
        cookies: { [key: string]: string };
    }

    interface FastifyInstance {
        prisma: PrismaClient;
        authenticate: (
            request: FastifyRequest,
            reply: FastifyReply
        ) => Promise<void>;
    }
}
