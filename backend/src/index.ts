import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import prismaPlugin from '@/plugins/prisma';

import { carRoutes } from '@/routes/cars-route';

dotenv.config();

const app = Fastify();

app.register(cors);
app.register(prismaPlugin);
app.register(carRoutes);

app.listen({ port: 3001 }, (err, address) => {
    if (err) throw err;

    console.log(`🎈 Server running at ${address}`);
});
