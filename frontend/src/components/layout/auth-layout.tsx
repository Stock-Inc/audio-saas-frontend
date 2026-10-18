import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"

export function AuthLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AppHeader compact />
            <main className="flex min-h-[calc(100vh-2.5rem)] items-center justify-center px-5 py-12">
                <Outlet />
            </main>
        </div>
    )
}
