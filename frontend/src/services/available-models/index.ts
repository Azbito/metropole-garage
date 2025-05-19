import { api } from '@/lib/api';

export async function getAvailableUserModels(): Promise<
    { id: string; car_model: string; userId: string }[]
> {
    try {
        const res = await api().get('/available');
        return res.data;
    } catch (e) {
        console.error('Error while getting available models:', e);
        return [];
    }
}
