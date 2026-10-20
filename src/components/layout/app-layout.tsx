import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"

export function AppLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-7">
                <Outlet />
            </main>
        </div>
    )
}
