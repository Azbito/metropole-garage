import { z } from 'zod';

import type { ICar } from '@/interfaces/car';

const carSchema = z.object({
    plate: z.string(),
    model: z.string(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    userId: z.string().nullable(),
    damage: z.number(),
    fuel: z.number(),
});

export function createCarValidator({ data }: { data: unknown }): ICar | null {
    try {
        const res = carSchema.parse(data);
        return res;
    } catch {
        return null;
    }
}
