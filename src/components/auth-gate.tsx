import { useEffect } from "react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { checkAuth, keycloakLoginUrl } from "@/lib/auth"
import { useAuthStore } from "@/lib/stores/auth-store"

export function AuthGate({ children }: { children: ReactNode }) {
    const status = useAuthStore((state) => state.status)

    useEffect(() => {
        void checkAuth()
    }, [])

    useEffect(() => {
        if (status === "unauthenticated" && keycloakLoginUrl) {
            window.location.replace(keycloakLoginUrl)
        }
    }, [status])

    if (status === "authenticated") {
        return children
    }

    if (status === "error") {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-5 text-center">
                <p>Не удалось проверить авторизацию. Попробуйте ещё раз.</p>
                <Button onClick={() => void checkAuth()}>Повторить</Button>
            </main>
        )
    }

    return (
        <main
            className="flex min-h-screen items-center justify-center p-5"
            role="status"
        >
            Проверяем авторизацию...
        </main>
    )
}
