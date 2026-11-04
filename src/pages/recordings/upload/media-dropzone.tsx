import { useRef, useState, type ChangeEvent, type DragEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useUploadStore } from "@/lib/stores/upload-store"

const maxInputSize = 2 * 1024 * 1024 * 1024

function isMediaFile(file: File) {
    return (
        file.type.startsWith("audio/") ||
        file.type.startsWith("video/") ||
        /\.(aac|avi|flac|m4a|m4v|mkv|mov|mp3|mp4|mpeg|mpg|ogg|opus|wav|webm|wma|wmv)$/i.test(
            file.name
        )
    )
}

export function MediaDropzone() {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const dragDepth = useRef(0)
    const addFiles = useUploadStore((state) => state.addFiles)

    function addMediaFiles(files: File[]) {
        const mediaFiles = files.filter(
            (file) => isMediaFile(file) && file.size < maxInputSize
        )
        const rejectedCount = files.length - mediaFiles.length

        if (mediaFiles.length > 0) {
            addFiles(mediaFiles)
        }

        setError(
            rejectedCount > 0
                ? `Не добавлено файлов: ${rejectedCount}. Выберите аудио или видео размером до 2 ГБ.`
                : null
        )
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        addMediaFiles(Array.from(event.target.files ?? []))
        event.target.value = ""
    }

    function handleDragEnter(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        dragDepth.current += 1
        setIsDragging(true)
    }

    function handleDragLeave(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        dragDepth.current -= 1

        if (dragDepth.current <= 0) {
            dragDepth.current = 0
            setIsDragging(false)
        }
    }

    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault()
        dragDepth.current = 0
        setIsDragging(false)
        addMediaFiles(Array.from(event.dataTransfer.files))
    }

    return (
        <div className="space-y-2">
            <Card
                onDragEnter={handleDragEnter}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex min-h-32 items-center justify-center gap-0 border bg-card px-4 py-5 text-center shadow-none ring-0 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border/60"}`}
            >
                <h2 className="text-base">Выберите аудио или видео</h2>
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                    Перетащите файлы сюда или выберите их на устройстве.
                </p>
                <Label
                    htmlFor="media-file"
                    className={`${buttonVariants({ size: "xs" })} mt-3 tracking-normal normal-case`}
                >
                    Выбрать файлы
                </Label>
                <input
                    id="media-file"
                    type="file"
                    accept="audio/*,video/*,.aac,.avi,.flac,.m4a,.m4v,.mkv,.mov,.mp3,.mp4,.mpeg,.mpg,.ogg,.opus,.wav,.webm,.wma,.wmv"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                />
            </Card>
            {error && (
                <p
                    role="alert"
                    className="font-mono text-xs text-destructive"
                >
                    {error}
                </p>
            )}
            <Card className="gap-1 border border-border/60 bg-card p-3 shadow-none ring-0">
                <p className="font-mono text-xs">Обработка идёт в браузере</p>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                    Исходные файлы конвертируются в необходимый формат и отправляются на сервер для дальнейшей обработки.
                </p>
            </Card>
        </div>
    )
}
