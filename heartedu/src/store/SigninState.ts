import { create } from 'zustand';

interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
    accountLevel: number;
    setLogin: (username: string) => void;
    setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: true,
    username: null,
    accountLevel: 3,
    setLogin: (username: string) =>
        set({
            isLoggedIn: true,
            username: username,
            accountLevel: 3,
        }),
    setAccountLevel: (level: number) => set({ accountLevel: level }),
    setLogout: () =>
        set({
            isLoggedIn: false,
            username: null,
            accountLevel: 0,
        }),
}));
