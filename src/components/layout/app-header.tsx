import { Link, NavLink } from "react-router"

import { buttonVariants } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth-store"

const navigation = [
    { label: "Обзор", to: "/" },
    { label: "Записи", to: "/recordings" },
    { label: "История", to: "/history" },
]

export function AppHeader({ compact = false }: { compact?: boolean }) {
    const displayName = useAuthStore(
        (state) => state.profile?.username ?? state.profile?.email
    )

    return (
        <header className="border-b border-border/60 bg-card p-2">
            <div className="mx-auto flex min-h-10 w-full max-w-7xl flex-wrap items-center gap-y-2 px-5 sm:px-7">
                <Link
                    to="/"
                    className="shrink-0 font-serif text-lg leading-none text-foreground"
                >
                    <span className="mr-1 text-primary">⌁</span>
                    SaaS
                </Link>
                {!compact && (
                    <>
                        <nav
                            className="order-3 flex w-full items-center gap-3 overflow-x-auto md:order-none md:ml-10 md:w-auto md:gap-6"
                            aria-label="Основная навигация"
                        >
                            <Link
                                to="/upload"
                                className={buttonVariants({
                                    size: "xs",
                                    className:
                                        "font-mono text-sm tracking-normal normal-case",
                                })}
                            >
                                + Загрузить файл
                            </Link>
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({ isActive }) =>
                                        `shrink-0 font-mono text-sm transition-colors hover:text-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                        <span
                            className="order-2 ml-auto max-w-40 truncate font-mono text-sm text-foreground md:order-none md:max-w-56"
                            title={displayName}
                        >
                            {displayName}
                        </span>
                    </>
                )}
            </div>
        </header>
    )
}
