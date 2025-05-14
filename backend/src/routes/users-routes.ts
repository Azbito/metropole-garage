import { UserController } from '@/controllers/users-controller';
import { UserRepository } from '@/repositories/user-repository';
import { UserService } from '@/services/user-service';
import { FastifyInstance } from 'fastify';

export async function userRoutes(fastify: FastifyInstance) {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const controller = new UserController(fastify, userService);
    await controller.registerRoutes();
}
