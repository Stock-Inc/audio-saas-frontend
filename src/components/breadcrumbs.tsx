import { RiArrowRightSLine } from "@remixicon/react"
import { Link } from "react-router"

export type BreadcrumbItem = {
    label: string
    to?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav
            aria-label="Путь"
            className="flex min-w-0 flex-wrap items-center gap-1 font-mono text-sm"
        >
            {items.map((item, index) => (
                <span
                    key={`${item.label}-${index}`}
                    className="flex min-w-0 items-center gap-1"
                >
                    {index > 0 && (
                        <RiArrowRightSLine className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    {item.to ? (
                        <Link
                            to={item.to}
                            className="truncate text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className="truncate text-foreground"
                            aria-current="page"
                        >
                            {item.label}
                        </span>
                    )}
                </span>
            ))}
        </nav>
    )
}
