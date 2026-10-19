import { RiAddLine, RiSearchLine } from "@remixicon/react"
import { Link } from "react-router"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { getFileBreadcrumbs } from "@/lib/file-path"

export function FileBrowserToolbar({ folderId }: { folderId: string | null }) {
    return (
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs items={getFileBreadcrumbs(folderId)} />
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="gap-2 normal-case tracking-normal"
                >
                    <RiAddLine className="size-4" />
                    Создать папку
                </Button>
                <Link
                    to="/search"
                    aria-label="Открыть поиск по папкам и записям"
                    className="flex h-9 min-w-0 flex-1 items-center gap-2 border border-border/70 bg-card px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:w-56 sm:flex-none"
                >
                    <RiSearchLine className="size-4 shrink-0" />
                    <span className="truncate">Поиск по записям</span>
                </Link>
            </div>
        </div>
    )
}
