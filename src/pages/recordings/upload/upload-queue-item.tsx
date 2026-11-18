import { RiCloseLine } from "@remixicon/react"
import { useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAudioStatus } from "@/lib/upload-audio"
import { useUploadStore, type QueuedAudioFile } from "@/lib/stores/upload-store"
import { formatFileSize } from "@/pages/recordings/upload/format-file-size"

export function UploadQueueItem({ item }: { item: QueuedAudioFile }) {
    const {
        id,
        file,
        wavFile,
        status,
        error,
        serverId,
        serverStatus,
        pollError,
    } = item
    const removeFile = useUploadStore((state) => state.removeFile)

    useEffect(() => {
        if (
            !serverId ||
            serverStatus === "COMPLETED" ||
            serverStatus === "FAILED"
        ) {
            return
        }

        let inFlight = false
        let controller: AbortController | null = null
        const interval = window.setInterval(async () => {
            if (inFlight) return
            inFlight = true
            controller = new AbortController()
            try {
                const job = await getAudioStatus(serverId, controller.signal)
                if (!controller.signal.aborted) {
                    useUploadStore.getState().setServerStatus(id, job)
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    useUploadStore
                        .getState()
                        .setPollError(
                            id,
                            error instanceof Error
                                ? error.message
                                : "Не удалось проверить статус"
                        )
                }
            } finally {
                inFlight = false
            }
        }, 5_000)

        return () => {
            window.clearInterval(interval)
            controller?.abort()
        }
    }, [id, serverId, serverStatus])

    const statusMessage = {
        RECEIVED: "Файл сохранён на сервере",
        FORWARDED: "ML-сервис принял задание",
        PROCESSING: "Транскрипция и анализ выполняются",
        COMPLETED: "Результат готов к скачиванию",
        FAILED: "Обработка завершилась ошибкой",
    }[serverStatus ?? "RECEIVED"]

    return (
        <div className="flex items-center justify-between gap-4 px-1 py-2">
            <div className="min-w-0 font-mono text-xs">
                <p className="truncate text-sm">{file.name}</p>
                <p className="mt-0.5 text-muted-foreground">
                    {formatFileSize(file.size)}
                    {wavFile &&
                        ` → ${wavFile.name} · ${formatFileSize(wavFile.size)}`}
                </p>
                {serverStatus && (
                    <p
                        className="mt-1 text-muted-foreground"
                        role="status"
                    >
                        {statusMessage}
                    </p>
                )}
                {error && (
                    <p
                        className="mt-1 text-destructive"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
                {pollError && (
                    <p
                        className="mt-1 text-destructive"
                        role="alert"
                    >
                        {pollError}. Повторяем запрос статуса.
                    </p>
                )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <Badge
                    variant={
                        status === "error" || serverStatus === "FAILED"
                            ? "destructive"
                            : "secondary"
                    }
                    className="px-2 py-1 font-normal tracking-normal"
                >
                    {status === "queued" && "В очереди"}
                    {status === "converting" && "Конвертация"}
                    {status === "ready" && "Готов к отправке"}
                    {status === "uploading" && "Отправка"}
                    {status === "uploaded" &&
                        (serverStatus === "COMPLETED"
                            ? "Готово"
                            : serverStatus === "FAILED"
                              ? "Ошибка"
                              : "Отправлен")}
                    {status === "error" && "Ошибка"}
                </Badge>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Убрать ${file.name} из очереди`}
                    disabled={status === "converting" || status === "uploading"}
                    onClick={() => removeFile(id)}
                >
                    <RiCloseLine className="size-4" />
                </Button>
            </div>
        </div>
    )
}
