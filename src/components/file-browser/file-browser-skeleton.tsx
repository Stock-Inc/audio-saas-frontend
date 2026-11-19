import { Skeleton } from "@/components/ui/skeleton"

function SectionTitleSkeleton({ title }: { title: string }) {
    return (
        <h2 className="mb-2 flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {title} · <Skeleton className="h-3 w-5 rounded-sm" />
        </h2>
    )
}

function FolderRowSkeleton({ index }: { index: number }) {
    return (
        <div className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3">
            <Skeleton className="size-5 shrink-0 rounded-sm" />
            <Skeleton
                className={`h-5 flex-1 rounded-sm ${index === 1 ? "max-w-[35%]" : "max-w-[55%]"}`}
            />
            <Skeleton className="hidden h-4 w-10 rounded-sm sm:block" />
            <Skeleton className="size-4 shrink-0 rounded-sm" />
        </div>
    )
}

function AudioRowSkeleton({ index }: { index: number }) {
    return (
        <div className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3">
            <Skeleton className="size-5 shrink-0 rounded-sm" />
            <div className="min-w-0 flex-1 space-y-0">
                <Skeleton
                    className={`h-5 rounded-sm ${index === 1 ? "w-2/3" : "w-4/5"}`}
                />
                <Skeleton className="h-4 w-12 rounded-sm" />
            </div>
            <Skeleton className="h-5 w-20 shrink-0 rounded-sm" />
        </div>
    )
}

export function FileBrowserSkeleton({
    hasParentFolder,
}: {
    hasParentFolder: boolean
}) {
    return (
        <div
            className="max-w-lg space-y-6"
            role="status"
            aria-label="Загружаем папку"
        >
            <div
                className="space-y-6"
                aria-hidden="true"
            >
                <section>
                    <SectionTitleSkeleton title="Папки" />
                    <div className="space-y-1.5">
                        {hasParentFolder && <FolderRowSkeleton index={0} />}
                        <FolderRowSkeleton index={0} />
                        <FolderRowSkeleton index={1} />
                    </div>
                </section>
                <section>
                    <SectionTitleSkeleton title="Записи" />
                    <div className="space-y-1.5">
                        <AudioRowSkeleton index={0} />
                        <AudioRowSkeleton index={1} />
                    </div>
                </section>
            </div>
        </div>
    )
}
