import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"

export function AuthLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <AppHeader compact />
            <main className="flex flex-1 items-center justify-center px-5 py-12">
                <Outlet />
            </main>
        </div>
    )
}
