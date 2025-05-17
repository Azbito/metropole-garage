import { FastifyInstance } from 'fastify';

import { CarController } from '@/controllers/cars-controller';

import { CarService } from '@/services/car-service';

import { CarRepository } from '@/repositories/car-repository';
import { UserRepository } from '@/repositories/user-repository';

export async function carRoutes(fastify: FastifyInstance) {
    const carRepository = new CarRepository();
    const userRepository = new UserRepository();

    const carService = new CarService(carRepository, userRepository);
    const controller = new CarController(fastify, carService);
    await controller.registerRoutes();
}
