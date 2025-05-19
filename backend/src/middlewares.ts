import fastifyCors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { injectable, inject } from 'tsyringe';

interface JwtPayload {
    userId: string;
    steamId: string;
}

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
                } catch (e) {
                    console.error(e);
                    const authHeader = request.headers.authorization;
                    const steamIdHeader = request.headers['x-steam-id'];

                    if (!authHeader?.startsWith('Bearer ')) {
                        return reply
                            .code(401)
                            .send({ error: 'No token provided' });
                    }

                    const token = authHeader.replace('Bearer ', '');

                    try {
                        const decoded = this.app.jwt.verify<JwtPayload>(token);
                        request.user = decoded;

                        if (
                            steamIdHeader &&
                            decoded.steamId !== steamIdHeader
                        ) {
                            return reply
                                .code(401)
                                .send({ error: 'Steam ID mismatch' });
                        }
                    } catch (e) {
                        console.log(e);
                        return reply.code(401).send({ error: 'Invalid token' });
                    }
                }
            }
        );
    }
}
