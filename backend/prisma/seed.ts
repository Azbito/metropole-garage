import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const cars = [
        {
            id: 'car321232123',
            plate: 'RQWDSA',
            model: 'schafter2',
            primaryColor: '#FFFFFF',
            secondaryColor: '#FF0000',
            damage: 100,
            fuel: 0,
        },
        {
            id: '132123',
            plate: 'rwqeqwwqr',
            model: 'dukes',
            primaryColor: '#0000FF',
            secondaryColor: '#FFFFFF',
            damage: 10,
            fuel: 80,
        },
        {
            id: 'ewqeqwrfsdf',
            plate: 'rewgdf',
            model: 'gauntlet',
            primaryColor: '#00FF00',
            secondaryColor: '#FFFF00',
            damage: 5,
            fuel: 50,
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
