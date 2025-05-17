import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { CarService } from '@/services/car-service';

export class CarController {
    constructor(
        private fastify: FastifyInstance,
        private carService: CarService
    ) {}

    public async registerRoutes() {
        this.fastify.get('/cars/:owner', this.getCarsByOwner.bind(this));
        this.fastify.get('/cars/plate/:plate', this.getCarByPlate.bind(this));
        this.fastify.post('/cars/spawn', this.spawnCar.bind(this));
        this.fastify.post('/cars', this.createCar.bind(this));
    }

    private async getCarsByOwner(request: FastifyRequest, reply: FastifyReply) {
        const { owner } = request.params as { owner: string };

        try {
            const cars = await this.carService.getCarsByOwner(owner);
            return reply.send(cars);
        } catch {
            return reply
                .status(500)
                .send({ error: '❌ Failed to retrieve cars' });
        }
    }

    private async spawnCar(request: FastifyRequest, reply: FastifyReply) {
        try {
            const res = await this.carService.spawn(request.body);

            if (!res) {
                return reply
                    .status(500)
                    .send({ error: '❌ Failed to spawn car' });
            }

            await this.carService.createCar(request.body);

            return reply.status(200).send({ message: '🎈 Success!' });
        } catch (e) {
            console.error(e);
        }
    }

    private async getCarByPlate(request: FastifyRequest, reply: FastifyReply) {
        const { plate } = request.params as { plate: string };

        try {
            const car = await this.carService.getCarByPlate(plate);
            if (!car) {
                return reply.status(200).send({ error: '❌ Car not found' });
            }

            return reply.send(car);
        } catch {
            return reply.status(500).send({ error: '❌ Failed to spawn car' });
        }
    }

    private async createCar(request: FastifyRequest, reply: FastifyReply) {
        const { body } = request;

        try {
            const car = await this.carService.createCar(body);

            if (!car) {
                return reply.code(400).send({ error: '❌ Invalid data' });
            }

            return reply.code(201).send(car);
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(400).send({
                    error: '❌ Invalid car data',
                    details: error.message,
                });
            }

            return reply.status(400).send({ error: '❌ Invalid car data' });
        }
    }
}
