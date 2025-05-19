import { FastifyInstance } from 'fastify';

import { UserController } from '@/controllers/user-controller';

import { inject, injectable } from 'tsyringe';

@injectable()
export class UserRoutes {
    constructor(
        @inject('FastifyInstance') private fastify: FastifyInstance,
        @inject(UserController) private userController: UserController
    ) {
        this.fastify.post(
            '/user/auth',
            this.userController.authenticate.bind(this.userController)
        );
    }
}
