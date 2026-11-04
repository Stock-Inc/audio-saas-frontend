import { RiCloseLine } from "@remixicon/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUploadStore, type QueuedAudioFile } from "@/lib/stores/upload-store"
import { formatFileSize } from "@/pages/recordings/upload/format-file-size"

export function UploadQueueItem({ item }: { item: QueuedAudioFile }) {
    const { id, file, wavFile, status, error } = item
    const removeFile = useUploadStore((state) => state.removeFile)

    return (
        <div className="flex items-center justify-between gap-4 px-1 py-2">
            <div className="min-w-0 font-mono text-xs">
                <p className="truncate text-sm">{file.name}</p>
                <p className="mt-0.5 text-muted-foreground">
                    {formatFileSize(file.size)}
                    {wavFile &&
                        ` → ${wavFile.name} · ${formatFileSize(wavFile.size)}`}
                </p>
                {error && (
                    <p
                        className="mt-1 text-destructive"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <Badge
                    variant={status === "error" ? "destructive" : "secondary"}
                    className="px-2 py-1 font-normal tracking-normal"
                >
                    {status === "queued" && "В очереди"}
                    {status === "converting" && "Конвертация"}
                    {status === "ready" && "Готов к отправке"}
                    {status === "error" && "Ошибка"}
                </Badge>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Убрать ${file.name} из очереди`}
                    disabled={status === "converting"}
                    onClick={() => removeFile(id)}
                >
                    <RiCloseLine className="size-4" />
                </Button>
            </div>
        </div>
    )
}
