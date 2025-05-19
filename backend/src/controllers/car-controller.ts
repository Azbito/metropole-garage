import { FastifyReply, FastifyRequest } from 'fastify';

import { CarService } from '@/services/car-service';

import { CreateCarInput } from '@/interfaces/car';
import { inject, injectable } from 'tsyringe';
import { UserService } from '@/services/user-service';

@injectable()
export class CarController {
    constructor(
        @inject(CarService) private carService: CarService,
        @inject(UserService) private userService: UserService
    ) {}

    public async getMyCars(request: FastifyRequest, reply: FastifyReply) {
        const { sub } = request.user as {
            sub: string;
        };

        try {
            const res = await this.carService.getCarsByOwner(sub);

            return reply.send(res);
        } catch (e) {
            console.error('Error while getting your cars', e);
            return null;
        }
    }

    public async getCarsByOwner(request: FastifyRequest, reply: FastifyReply) {
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

    public async spawnCar(request: FastifyRequest, reply: FastifyReply) {
        try {
            const body = request.body as CreateCarInput;

            const existentCar = await this.carService.getCarByPlate(body.plate);

            const { steamId } = request.user as {
                steamId: string;
            };

            const car =
                existentCar || (await this.carService.createCar(request.body));

            const user = await this.userService.getById(car?.userId as string);

            if (
                car?.userId &&
                car.userId.trim().length > 0 &&
                user?.steam_id !== steamId
            ) {
                return reply
                    .status(500)
                    .send({ error: "❌ You are not the car's owner" });
            }

            const res = await this.carService.spawn({
                ...body,
                userId: steamId,
            });

            if (!res) {
                return reply
                    .status(500)
                    .send({ error: '❌ Failed to spawn car' });
            }

            return reply.status(200).send({ message: '🎈 Success!', car });
        } catch (e) {
            console.error(e);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    }

    public async getCarByPlate(request: FastifyRequest, reply: FastifyReply) {
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

    public async createCar(request: FastifyRequest, reply: FastifyReply) {
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
