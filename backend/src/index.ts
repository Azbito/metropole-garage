import 'reflect-metadata';

import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import { registerDependencies } from './container';

async function bootstrap() {
    dotenv.config();

    const app = Fastify();

    app.register(fastifyCookie);

    registerDependencies(app);

    app.listen({ port: 3001 }, (err, address) => {
        if (err) throw err;
        console.log(`🎈 Server running at ${address}`);
    });
}

bootstrap();
