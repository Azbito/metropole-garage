import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class Prisma {
    public readonly client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }
}
