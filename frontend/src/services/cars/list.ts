import { api } from '@/lib/api';

export async function listCars() {
    try {
        const response = await api().get('/cars');

        if (!response?.data) return [];

        return response.data;
    } catch (e) {
        console.error(e);
    }
}
