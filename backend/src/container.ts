import { Prisma } from '@/libs/prisma';
import { AuthPlugin } from '@/middlewares';
import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';

import { PrismaPlugin } from '@/plugins/prisma';

import { CarRoutes } from '@/routes/car-routes';
import { UserAvailableCarsRoutes } from '@/routes/user-available-cars-routes';
import { UserRoutes } from '@/routes/user-routes';

import { CarController } from '@/controllers/car-controller';
import { UserAvailableCarsController } from '@/controllers/user-available-cars-controller';
import { UserController } from '@/controllers/user-controller';

import { CarService } from '@/services/car-service';
import { UserAvailableCarsService } from '@/services/user-available-cars-service';
import { UserService } from '@/services/user-service';

import { CarRepository } from '@/repositories/car-repository';
import { UserAvailableCarsRepository } from '@/repositories/user-available-cars-repository';
import { UserRepository } from '@/repositories/user-repository';

export function registerDependencies(fastify: FastifyInstance) {
    container.registerInstance<FastifyInstance>('FastifyInstance', fastify);

    container.register(Prisma, { useClass: Prisma });

    //* Repositories
    container.register(UserRepository, { useClass: UserRepository });
    container.register(CarRepository, { useClass: CarRepository });
    container.register(UserAvailableCarsRepository, {
        useClass: UserAvailableCarsRepository,
    });

    //* Services
    container.register(UserService, { useClass: UserService });
    container.register(CarService, { useClass: CarService });
    container.register(UserAvailableCarsService, {
        useClass: UserAvailableCarsService,
    });

    //* Controllers
    container.register(UserController, { useClass: UserController });
    container.register(CarController, { useClass: CarController });
    container.register(UserAvailableCarsController, {
        useClass: UserAvailableCarsController,
    });

    //* Plugins
    container.resolve(PrismaPlugin);
    container.resolve(AuthPlugin);

    //* Routes
    container.resolve(CarRoutes);
    container.resolve(UserRoutes);
    container.resolve(UserAvailableCarsRoutes);
}
