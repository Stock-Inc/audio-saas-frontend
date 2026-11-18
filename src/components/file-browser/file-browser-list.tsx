import { RiFileMusicLine } from "@remixicon/react"

import type { FolderPathItem } from "@/components/file-browser/file-browser"
import { FolderRow } from "@/components/file-browser/folder-row"
import { Badge } from "@/components/ui/badge"
import type { AudioFile, Folder } from "@/lib/audio-files"
import { formatFileSize } from "@/lib/format-file-size"

const statusLabels: Record<AudioFile["status"], string> = {
    RECEIVED: "Файл сохранён",
    FORWARDED: "Задание принято",
    PROCESSING: "Идёт обработка",
    COMPLETED: "Готово",
    FAILED: "Ошибка",
}

function AudioRow({ file }: { file: AudioFile }) {
    return (
        <div className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3">
            <RiFileMusicLine
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{file.originalFilename}</p>
                <p className="font-mono text-xs text-muted-foreground">
                    {formatFileSize(file.sizeBytes)}
                </p>
                {file.status === "FAILED" && file.errorMessage && (
                    <p className="font-mono text-xs text-destructive">
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
        </div>
    )
}

export function FileBrowserList({
    folders,
    files,
    path,
    onDeleted,
}: {
    folders: Folder[]
    files: AudioFile[]
    path: FolderPathItem[]
    onDeleted: () => void
}) {
    if (folders.length === 0 && files.length === 0) {
        return (
            <p className="max-w-lg border border-border/60 bg-card p-5 font-mono text-sm text-muted-foreground">
                В этой папке пока ничего нет.
            </p>
        )
    }

    return (
        <div className="max-w-lg space-y-6">
            {folders.length > 0 && (
                <section aria-labelledby="folder-list-title">
                    <h2
                        id="folder-list-title"
                        className="mb-2 font-mono text-xs tracking-wide text-muted-foreground uppercase"
                    >
                        Папки · {folders.length}
                    </h2>
                    <div className="space-y-1.5">
                        {folders.map((folder) => (
                            <FolderRow
                                key={folder.id}
                                folder={folder}
                                path={path}
                                onDeleted={onDeleted}
                            />
                        ))}
                    </div>
                </section>
            )}
            {files.length > 0 && (
                <section aria-labelledby="recording-list-title">
                    <h2
                        id="recording-list-title"
                        className="mb-2 font-mono text-xs tracking-wide text-muted-foreground uppercase"
                    >
                        Записи · {files.length}
                    </h2>
                    <div className="space-y-1.5">
                        {files.map((file) => (
                            <AudioRow
                                key={file.id}
                                file={file}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
