import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface LiveLocationState {
  tracking: boolean;
  lat: number | null;
  lon: number | null;
  setLiveLocation: (latitude: number, longitude: number) => void;
  startTracking: () => void;
  stopTracking: () => void;
}

// Custom storage using js-cookie
const cookieStorage = {
  getItem: (name: string) => {
    const cookie = Cookies.get(name);
    return cookie ? JSON.parse(cookie) : null;
  },
  setItem: (name: string, value: any) => {
    Cookies.set(name, JSON.stringify(value), { expires: 7 }); // Expires in 7 days
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};

export const useLiveLocationStore = create<LiveLocationState>()(
  persist(
    (set) => ({
      tracking: false,
      lat: null,
      lon: null,
      startTracking: () => set({ tracking: true }),
      stopTracking: () => set({ tracking: false }),
      setLiveLocation: (latitude, longitude) =>
        set({ lat: latitude, lon: longitude }),
    }),
    {
      name: "liveLocation",
      storage: cookieStorage,
    }
  )
);
