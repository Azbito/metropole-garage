import { api } from '@/lib/api';

export async function getAvailableUserModels() {
    try {
        const res = await api().get('/available');
        return res.data;
    } catch (e) {
        console.error('Error while getting available models:', e);
        return null;
    }
}
