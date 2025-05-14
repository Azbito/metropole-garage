import { z } from 'zod';

import type { ICar } from '@/interfaces/car';

const carSchema = z.object({
    plate: z.string(),
    model: z.string(),
    color: z.string(),
    owner: z.string(),
    damage: z.number(),
    fuel: z.number(),
    locked: z.boolean(),
    positionX: z.number(),
    positionY: z.number(),
    positionZ: z.number(),
});

export function createCarValidator({ data }: { data: unknown }): ICar | null {
    try {
        const res = carSchema.parse(data);
        return res;
    } catch {
        return null;
    }
}
