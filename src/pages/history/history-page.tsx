import { RiFileMusicLine } from "@remixicon/react"
import { useEffect, useState } from "react"
import { Link } from "react-router"

import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { getAudioFiles, type AudioFile } from "@/lib/audio-files"
import { formatFileSize } from "@/lib/format-file-size"
import type { AudioStatus } from "@/lib/upload-audio"

const statusLabels: Record<AudioStatus, string> = {
    RECEIVED: "Файл сохранён",
    FORWARDED: "Задание принято",
    PROCESSING: "Идёт обработка",
    COMPLETED: "Готово",
    FAILED: "Ошибка обработки",
}

function formatDate(value: string) {
    const date = new Date(value)
    return Number.isNaN(date.getTime())
        ? value
        : new Intl.DateTimeFormat("ru-RU", {
              dateStyle: "medium",
              timeStyle: "short",
          }).format(date)
}

function HistoryItem({ file }: { file: AudioFile }) {
    return (
        <li className="flex items-start gap-3 border border-border/60 bg-card px-3 py-3">
            <RiFileMusicLine
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{file.originalFilename}</p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {formatDate(file.createdAt)} ·{" "}
                    {formatFileSize(file.sizeBytes)}
                    {file.folder && ` · ${file.folder.name}`}
                </p>
                {file.tags.length > 0 && (
                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                        {file.tags.map((tag) => tag.name).join(", ")}
                    </p>
                )}
                {file.resultAvailable && file.resultFilename && (
                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                        Результат: {file.resultFilename}
                        {file.resultSizeBytes !== null &&
                            ` · ${formatFileSize(file.resultSizeBytes)}`}
                    </p>
                )}
                {file.status === "FAILED" && file.errorMessage && (
                    <p className="mt-1 font-mono text-xs text-destructive">
                        {file.errorMessage}
                    </p>
                )}
            </div>
            <Badge
                variant={file.status === "FAILED" ? "destructive" : "secondary"}
                className="shrink-0 font-normal tracking-normal normal-case"
            >
                {statusLabels[file.status] ?? file.status}
            </Badge>
        </li>
    )
}

export function HistoryPage() {
    const [version, setVersion] = useState(0)
    const [files, setFiles] = useState<AudioFile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        void getAudioFiles(controller.signal)
            .then((result) => {
                if (controller.signal.aborted) return
                setFiles(
                    [...result].sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                )
                setError(null)
                setLoading(false)
            })
            .catch((cause: unknown) => {
                if (controller.signal.aborted) return
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Не удалось загрузить историю"
                )
                setLoading(false)
            })

        return () => controller.abort()
    }, [version])

    function retry() {
        setLoading(true)
        setError(null)
        setVersion((current) => current + 1)
    }

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
                    {!loading && !error && (
                        <span className="font-mono text-xs text-muted-foreground">
                            Всего: {files.length}
                        </span>
                    )}
                </div>
                {loading ? (
                    <p
                        className="font-mono text-sm text-muted-foreground"
                        role="status"
                    >
                        Загружаем историю...
                    </p>
                ) : error ? (
                    <div className="space-y-3 border border-border/60 bg-card p-5">
                        <p
                            className="font-mono text-sm text-destructive"
                            role="alert"
                        >
                            {error}
                        </p>
                        <Button
                            type="button"
                            size="xs"
                            onClick={retry}
                        >
                            Повторить
                        </Button>
                    </div>
                ) : files.length === 0 ? (
                    <div className="border border-border/60 bg-card p-5 font-mono text-sm text-muted-foreground">
                        Вы пока не загрузили ни одного файла.
                    </div>
                ) : (
                    <ul className="space-y-1.5">
                        {files.map((file) => (
                            <HistoryItem
                                key={file.id}
                                file={file}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </>
    )
}
