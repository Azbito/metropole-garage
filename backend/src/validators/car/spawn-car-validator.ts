import { z } from 'zod';

import type { ICar } from '@/interfaces/car';

const carSchema = z.object({
    plate: z.string(),
    model: z.string(),
    userId: z.string(),
    damage: z.number(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fuel: z.number(),
});

export function spawnCarValidator({ data }: { data: unknown }): ICar | null {
    try {
        const res = carSchema.parse(data);
        return res;
    } catch (e) {
        console.error(e);
        return null;
    }
}
