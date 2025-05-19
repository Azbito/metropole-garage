import { FastifyInstance } from 'fastify';

import { CarController } from '@/controllers/car-controller';

import { inject, injectable } from 'tsyringe';

@injectable()
export class CarRoutes {
    constructor(
        @inject('FastifyInstance') private fastify: FastifyInstance,
        @inject(CarController) private carController: CarController
    ) {
        this.fastify.get(
            '/cars/:owner',
            { preValidation: [fastify.authenticate] },
            this.carController.getCarsByOwner.bind(this.carController)
        );

        this.fastify.get(
            '/cars/plate/:plate',
            this.carController.getCarByPlate.bind(this.carController)
        );

        this.fastify.get(
            '/cars',
            { preValidation: [fastify.authenticate] },
            this.carController.getMyCars.bind(this.carController)
        );

        this.fastify.post(
            '/cars/spawn',
            { preValidation: [fastify.authenticate] },
            this.carController.spawnCar.bind(this.carController)
        );

        this.fastify.post(
            '/cars',
            { preValidation: [fastify.authenticate] },
            this.carController.createCar.bind(this.carController)
        );
    }
}
