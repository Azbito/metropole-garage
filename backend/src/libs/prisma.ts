import { injectable } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

@injectable()
export class Prisma {
    public readonly client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }
}
