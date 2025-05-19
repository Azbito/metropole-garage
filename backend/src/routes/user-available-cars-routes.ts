import { FastifyInstance } from 'fastify';

import { inject, injectable } from 'tsyringe';
import { UserAvailableCarsController } from '@/controllers/user-available-cars-controller';

@injectable()
export class UserAvailableCarsRoutes {
    constructor(
        @inject('FastifyInstance') private fastify: FastifyInstance,
        @inject(UserAvailableCarsController)
        private userAvailableCars: UserAvailableCarsController
    ) {
        this.fastify.get(
            '/available',
            { preValidation: [fastify.authenticate] },
            this.userAvailableCars.getAvailableCars.bind(this.userAvailableCars)
        );
    }
}
