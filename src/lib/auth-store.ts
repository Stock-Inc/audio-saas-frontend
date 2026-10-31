import { create } from "zustand"

type AuthStatus =
    "idle" | "checking" | "authenticated" | "unauthenticated" | "error"

export type AuthProfile = {
    id: string | number
    username: string | null
    email: string
}

type AuthState = {
    status: AuthStatus
    profile: AuthProfile | null
    setChecking: () => void
    setAuthenticated: (profile: AuthProfile) => void
    setUnauthenticated: () => void
    setError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    status: "idle",
    profile: null,
    setChecking: () => set({ status: "checking", profile: null }),
    setAuthenticated: (profile) => set({ status: "authenticated", profile }),
    setUnauthenticated: () => set({ status: "unauthenticated", profile: null }),
    setError: () => set({ status: "error", profile: null }),
}))
