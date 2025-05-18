import { Prisma } from '@/libs/prisma';
import { FastifyInstance } from 'fastify';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaPlugin {
    constructor(
        @inject('FastifyInstance') private app: FastifyInstance,
        @inject(Prisma) private prisma: Prisma
    ) {
        this.prisma.client.$connect();

        this.app.decorate('prisma', this.prisma.client);

        this.app.addHook('onClose', async () => {
            await this.prisma.client.$disconnect();
        });
    }
}
