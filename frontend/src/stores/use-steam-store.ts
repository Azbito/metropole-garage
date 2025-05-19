import { create } from 'zustand';

export type SteamUser = {
    avatar: string;
    steam_id: string;
    name: string;
};

type SteamStore = {
    user: SteamUser | null;
    setUser: (user: SteamUser) => void;
    clearUser: () => void;
};

export const useSteamStore = create<SteamStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));
