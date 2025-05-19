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
                id: `4e7c0a2c-a2ff-4a76-98e3-d87036320b59$${index}`,
                car_model: model,
                user_id: '4e7c0a2c-a2ff-4a76-98e3-d87036320b59',
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
