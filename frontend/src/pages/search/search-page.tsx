import { RiSearchLine } from "@remixicon/react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Input } from "@/components/ui/input"

export function SearchPage() {
    return (
        <>
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <Breadcrumbs
                    items={[
                        { label: "Записи", to: "/recordings" },
                        { label: "Поиск" },
                    ]}
                />
                <div className="relative w-full sm:w-72">
                    <RiSearchLine className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        aria-label="Поиск по папкам и записям"
                        placeholder="Поиск по папкам и записям"
                        className="h-9 border border-border/70 bg-card pr-3 pl-9 font-mono text-xs"
                    />
                </div>
            </div>
            <section
                aria-labelledby="search-results-title"
                className="max-w-lg"
            >
                <h1
                    id="search-results-title"
                    className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"
                >
                    Результаты поиска
                </h1>
                <div className="flex min-h-32 flex-col items-center justify-center gap-2 border border-border/60 bg-card p-5 text-center">
                    <RiSearchLine className="size-5 text-muted-foreground" />
                    <p className="font-mono text-sm text-muted-foreground">
                        Результатов пока нет
                    </p>
                </div>
            </section>
        </>
    )
}
