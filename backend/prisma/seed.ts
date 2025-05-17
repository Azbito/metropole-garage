import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const cars = [
        {
            id: 'car3211321421123',
            plate: 'VITU',
            model: 'schafter2',
            primaryColor: '#FFFFFF',
            secondaryColor: '#FF0000',
            damage: 0,
            fuel: 100,
            locked: true,
        },
        {
            id: 'car4213212',
            plate: 'XYZ9312312876',
            model: 'dukes',
            primaryColor: '#0000FF',
            secondaryColor: '#FFFFFF',
            damage: 10,
            fuel: 80,
            locked: false,
        },
        {
            id: 'car3213',
            plate: 'JKL4521367',
            model: 'gauntlet',
            primaryColor: '#00FF00',
            secondaryColor: '#FFFF00',
            damage: 5,
            fuel: 50,
            locked: true,
        },
    ];

    for (const car of cars) {
        await prisma.car.upsert({
            where: { id: car.id },
            update: {},
            create: car,
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
