import { create } from 'zustand';

interface LiveLocationState {
    tracking: boolean;
    lat: number | null;
    lon: number | null;
    setLiveLocation: (latitude: number, longitude: number) => void;
    startTracking: () => void;
    stopTracking: () => void;
}

export const useLiveLocationStore = create<LiveLocationState>((set) => ({
    tracking: false,
    lat: null,
    lon: null,
    startTracking: () => set({ tracking: true }),
    stopTracking: () => set({ tracking: false }),
    setLiveLocation: (latitude, longitude) => set({ lat: latitude, lon: longitude }),
}));
