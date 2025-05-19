import { api } from '@/lib/api';

export async function authenticate(): Promise<{
    user: {
        id: string;
        steam_id: string;
        created_at: Date;
        name: string;
        avatar: string;
    };
    token: string;
} | null> {
    try {
        const res = await api().post('/user/auth');
        return res.data;
    } catch (e) {
        console.error('Error while authenticating:', e);
        return null;
    }
}
