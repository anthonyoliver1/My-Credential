import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { TBadgeStore } from "./badge-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TStateProps = {
    data: TBadgeStore | null;
    save: (data: TBadgeStore) => void;
}

export const useCredentialStore = create(
    persist<TStateProps>((set) => ({
        data: null,
        save: (data: TBadgeStore) => set(() => ({ data })),
     
    }),
        {
            name: "nlw-unite:credential",
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);