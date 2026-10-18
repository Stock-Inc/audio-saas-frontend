import { Link, NavLink } from "react-router"

const navigation = [
    { label: "Обзор", to: "/" },
    { label: "Записи", to: "/recordings" },
    { label: "Папки", to: "/folders" },
    { label: "Интеграции", to: "/integrations" },
]

export function AppHeader({ compact = false }: { compact?: boolean }) {
    return (
        <header className="border-b border-border/60 bg-card">
            <div className="mx-auto flex h-10 w-full max-w-7xl items-center px-5 sm:px-7">
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
                            className="ml-4 flex items-center gap-3 sm:ml-20 sm:gap-10"
                            aria-label="Основная навигация"
                        >
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({ isActive }) =>
                                        `font-mono text-[11px] transition-colors hover:text-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                        <Link
                            to="/login"
                            className="ml-auto hidden font-mono text-[11px] text-foreground sm:inline"
                        >
                            alnoer
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}
