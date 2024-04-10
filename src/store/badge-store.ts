import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage"

export type TBadgeStore = {
    id: string;
    name: string;
    email: string;
    eventTitle: string;
    checkInURL: string;
    image?: string;
}

type TStateProps = {
    data: TBadgeStore | null;
    save: (data: TBadgeStore) => void;
    updateAvatar: (uri: string) => void;
    remove: () => void;
}

export const useBadgeStore = create(
    persist<TStateProps>((set) => ({
        data: null,
        save: (data: TBadgeStore) => set(() => ({ data })),
        updateAvatar: (uri) => set((state) => (
            { data: state.data ? { ...state.data, image: uri } : state.data }
        )),
        remove: () => set(() => ({ data: null })),
    }),
        {
            name: "nlw-unite:badge",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);