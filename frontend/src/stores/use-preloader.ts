import { create } from 'zustand';

interface LoaderStore {
    loader: boolean;
    setLoader: (val: boolean) => void;
}

export const useLoaderStore = create<LoaderStore>((set) => ({
    loader: false,
    setLoader: (val: boolean) => set({ loader: val }),
}));
