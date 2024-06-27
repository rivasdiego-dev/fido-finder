import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
    user: User | undefined;
    token: string | undefined;
    setUser: (user: User | undefined) => void;
    setToken: (token: string | undefined) => void;
    resetData: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: undefined,
            token: undefined,
            setUser: (user: User | undefined) => set({ user }),
            setToken: (token: string | undefined) => set({ token }),
            resetData: () => set({ user: undefined, token: undefined }),
        }),
        {
            name: "userData",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
