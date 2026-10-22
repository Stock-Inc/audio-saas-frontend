import { RiArrowRightSLine, RiFileMusicLine } from "@remixicon/react"
import { Link } from "react-router"

import { FileContextMenu } from "@/components/file-browser/file-context-menu"
import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { useDemoLibrary } from "@/lib/demo-library-context"

export function HistoryPage() {
    const { recordings } = useDemoLibrary()

    return (
        <>
            <PageHeading
                title="История запросов"
                action={
                    <Link
                        to="/upload"
                        className={buttonVariants({
                            size: "xs",
                            className: "tracking-normal normal-case",
                        })}
                    >
                        Загрузить файл
                    </Link>
                }
            />
            <section aria-labelledby="history-title">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                        id="history-title"
                        className="text-base"
                    >
                        Загруженные файлы
                    </h2>
                    <span className="font-mono text-xs text-muted-foreground">
                        Всего: {recordings.length}
                    </span>
                </div>
                {recordings.length === 0 ? (
                    <div className="border border-border/60 bg-card p-5 font-mono text-sm text-muted-foreground">
                        Вы пока не загрузили ни одного файла.
                    </div>
                ) : (
                    <ul className="space-y-1.5">
                        {recordings.map((recording) => (
                            <li key={recording.id}>
                                <FileContextMenu
                                    recording={recording}
                                    className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3 transition-colors hover:border-primary/50 hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    <RiFileMusicLine
                                        className="size-5 shrink-0 text-primary"
                                        aria-hidden="true"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm">
                                            {recording.fileName}
                                        </p>
                                        <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                                            {recording.name} ·{" "}
                                            {recording.uploadedAt} ·{" "}
                                            {recording.duration}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className="hidden shrink-0 font-normal tracking-normal normal-case sm:inline-flex"
                                    >
                                        {recording.status}
                                    </Badge>
                                    <RiArrowRightSLine
                                        className="size-4 shrink-0 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </FileContextMenu>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </>
    )
}
