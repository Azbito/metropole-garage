import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const availableModels = [
        'alpha',
        'banshee',
        'bestiagts',
        'blista2',
        'blista3',
        'buffalo',
        'buffalo2',
        'buffalo3',
        'calico',
    ];

    for (const [index, model] of availableModels.entries()) {
        await prisma.availableUserCars.upsert({
            where: { id: `availablecar-${index}` },
            update: {},
            create: {
                id: `d99e02a2-b283-4732-8b41-7f9b8e47031b$${index}`,
                car_model: model,
                user_id: 'd99e02a2-b283-4732-8b41-7f9b8e47031b',
            },
        });
    }

    console.log('Success!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
