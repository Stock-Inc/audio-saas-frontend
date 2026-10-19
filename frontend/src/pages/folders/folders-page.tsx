import { Link } from "react-router"

import { Card } from "@/components/ui/card"

const folderRows = [
    { name: "Интервью", path: "/recordings/user-interview" },
    { name: "Другой файл", path: "/recordings/product-meeting" },
    { name: "Папка", path: "/recordings" },
    ...Array.from({ length: 8 }, () => ({ name: "Интервью", path: "/recordings/user-interview" })),
]

export function FoldersPage() {
    return (
        <section
            aria-label="Папки и файлы"
            className="mx-auto mt-0 flex w-full max-w-80 flex-col gap-3"
        >
            {folderRows.map((item, index) => (
                <Link
                    key={`${item.name}-${index}`}
                    to={item.path}
                    className="block"
                >
                    <Card className="flex min-h-7 flex-row items-center justify-between gap-3 border border-border/40 bg-card px-2 py-1.5 font-mono text-xs shadow-none ring-0 transition-colors hover:bg-muted">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">Дата</span>
                    </Card>
                </Link>
            ))}
        </section>
    )
}
