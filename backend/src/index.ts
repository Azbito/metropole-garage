import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import prismaPlugin from '@/plugins/prisma';

import { carRoutes } from '@/routes/cars-routes';
import { userRoutes } from '@/routes/users-routes';

dotenv.config();

const app = Fastify();

app.register(cors);
app.register(prismaPlugin);
app.register(carRoutes);
app.register(userRoutes);

app.listen({ port: 3001 }, (err, address) => {
    if (err) throw err;

    console.log(`🎈 Server running at ${address}`);
});
