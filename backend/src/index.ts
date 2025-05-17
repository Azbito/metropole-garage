import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import prismaPlugin from '@/plugins/prisma';

import { carRoutes } from '@/routes/cars-routes';
import { userRoutes } from '@/routes/users-routes';

import middlewares from './middlewares';

dotenv.config();

const app = Fastify();

app.register(fastifyCookie);
app.register(prismaPlugin);
app.register(middlewares);
app.register(carRoutes);
app.register(userRoutes);

app.listen({ port: 3001 }, (err, address) => {
    if (err) throw err;

    console.log(`🎈 Server running at ${address}`);
});
