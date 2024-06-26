import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
    resetData: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: undefined,
            setUser: (user: User | undefined) => set({ user }),
            resetData: () => set({ user: undefined }),
        }),
        {
            name: "userData",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
