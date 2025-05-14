import { FastifyInstance } from 'fastify';

import { CarController } from '@/controllers/cars-controller';

import { CarService } from '@/services/car-service';

import { CarRepository } from '@/repositories/car-repository';

export async function carRoutes(fastify: FastifyInstance) {
    const carRepository = new CarRepository();
    const carService = new CarService(carRepository);
    const controller = new CarController(fastify, carService);
    await controller.registerRoutes();
}
