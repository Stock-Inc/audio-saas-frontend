import { useAuthStore, type AuthProfile } from "@/lib/stores/auth-store"

const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim().replace(/\/+$/, "")

export const keycloakLoginUrl = backendUrl
    ? `${backendUrl}/oauth2/authorization/keycloak`
    : null

let pendingAuthCheck: Promise<void> | null = null

export function checkAuth() {
    if (pendingAuthCheck) {
        return pendingAuthCheck
    }

    if (useAuthStore.getState().status === "authenticated") {
        return Promise.resolve()
    }

    if (!backendUrl) {
        useAuthStore.getState().setError()
        return Promise.resolve()
    }

    useAuthStore.getState().setChecking()
    pendingAuthCheck = fetch(`${backendUrl}/api/v1/auth/me`, {
        credentials: "include",
        headers: { Accept: "application/json" },
    })
        .then(async (response) => {
            if (response.status === 200) {
                const profile = (await response.json()) as AuthProfile
                useAuthStore.getState().setAuthenticated(profile)
                return
            }

            if (response.status === 401 || response.status === 403) {
                useAuthStore.getState().setUnauthenticated()
                return
            }

            useAuthStore.getState().setError()
        })
        .catch(() => {
            useAuthStore.getState().setError()
        })
        .finally(() => {
            pendingAuthCheck = null
        })

    return pendingAuthCheck
}
