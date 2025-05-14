import { FastifyInstance } from 'fastify';

import { UserController } from '@/controllers/users-controller';

import { UserService } from '@/services/user-service';

import { UserRepository } from '@/repositories/user-repository';

export async function userRoutes(fastify: FastifyInstance) {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const controller = new UserController(fastify, userService);
    await controller.registerRoutes();
}
