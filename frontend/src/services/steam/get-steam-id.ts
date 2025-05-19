import axios from 'axios';

export async function getMySteamID(): Promise<string | null> {
    try {
        const res = await axios.post('https://garage/me', {});
        const { data } = res;

        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}
