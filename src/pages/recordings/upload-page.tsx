import { RiCloseLine } from "@remixicon/react"
import { useRef, useState, type ChangeEvent, type DragEvent } from "react"

import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useUploadStore } from "@/lib/stores/upload-store"

function isAudioFile(file: File) {
    return (
        file.type.startsWith("audio/") ||
        /\.(aac|flac|m4a|mp3|ogg|opus|wav|wma)$/i.test(file.name)
    )
}

function formatFileSize(bytes: number) {
    const megabyte = 1024 * 1024
    const size = bytes >= megabyte ? bytes / megabyte : bytes / 1024
    const unit = bytes >= megabyte ? "МБ" : "КБ"

    return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(size)} ${unit}`
}

function AudioDropzone() {
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const dragDepth = useRef(0)
    const addFiles = useUploadStore((state) => state.addFiles)

    function addAudioFiles(files: File[]) {
        const audioFiles = files.filter(isAudioFile)
        const rejectedCount = files.length - audioFiles.length

        if (audioFiles.length > 0) {
            addFiles(audioFiles)
        }

        setError(
            rejectedCount > 0
                ? `Не добавлено файлов: ${rejectedCount}. Выберите аудиофайлы.`
                : null
        )
    }

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        addAudioFiles(Array.from(event.target.files ?? []))
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
        addAudioFiles(Array.from(event.dataTransfer.files))
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
                <h2 className="text-base">Загрузите аудиозапись</h2>
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                    Перетащите аудиофайлы сюда или выберите их на устройстве.
                </p>
                <Label
                    htmlFor="audio-file"
                    className={`${buttonVariants({ size: "xs" })} mt-3 tracking-normal normal-case`}
                >
                    Выбрать аудио
                </Label>
                <input
                    id="audio-file"
                    type="file"
                    accept="audio/*,.m4a,.mp3,.wav,.flac,.ogg,.aac,.opus,.wma"
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
                <p className="font-mono text-xs">Файлы ещё не отправлены</p>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                    Выбранные файлы остаются в браузере до обновления страницы.
                    Отправка на сервер пока недоступна.
                </p>
            </Card>
        </div>
    )
}

function SettingSelect({
    label,
    defaultValue,
    options,
}: {
    label: string
    defaultValue: string
    options: { value: string; label: string }[]
}) {
    return (
        <div className="grid items-center gap-2 sm:grid-cols-[1fr_1.05fr]">
            <span className="font-mono text-sm">{label}</span>
            <Select defaultValue={defaultValue}>
                <SelectTrigger className="h-7 w-full border border-border/70 bg-card px-2 font-mono text-sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

function ProcessingSettings() {
    return (
        <Card className="gap-3 border border-border/60 bg-card p-4 shadow-none ring-0">
            <h2 className="text-base">Параметры обработки</h2>
            <SettingSelect
                label="Язык записи"
                defaultValue="auto"
                options={[
                    { value: "auto", label: "Автоопределение" },
                    { value: "ru", label: "Русский" },
                ]}
            />
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-mono text-sm">Разделение спикеров</p>
                </div>
                <Switch
                    defaultChecked
                    aria-label="Разделение спикеров"
                />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-mono text-sm">ИИ-коррекция текста</p>
                </div>
                <Switch
                    defaultChecked
                    aria-label="ИИ-коррекция текста"
                />
            </div>
            <SettingSelect
                label="Краткое содержание"
                defaultValue="decisions"
                options={[
                    { value: "decisions", label: "Решения и задачи" },
                    { value: "summary", label: "Только краткое содержание" },
                ]}
            />
            <div className="flex justify-end gap-1.5">
                <Button
                    type="button"
                    size="xs"
                    disabled
                    className="tracking-normal normal-case"
                >
                    Начать обработку
                </Button>
            </div>
        </Card>
    )
}

function UploadQueue() {
    const files = useUploadStore((state) => state.files)
    const removeFile = useUploadStore((state) => state.removeFile)
    const totalSize = files.reduce((size, item) => size + item.file.size, 0)

    return (
        <section className="mt-12">
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-base">Очередь загрузки</h2>
                <p className="font-mono text-xs text-muted-foreground">
                    Файлов: {files.length} · {formatFileSize(totalSize)}
                </p>
            </div>
            <Card className="gap-0 border border-border/60 bg-card p-2 shadow-none ring-0">
                {files.length === 0 && (
                    <p className="px-1 py-4 font-mono text-xs text-muted-foreground">
                        Файлы пока не выбраны.
                    </p>
                )}
                {files.map(({ id, file }) => (
                    <div
                        key={id}
                        className="flex items-center justify-between gap-4 px-1 py-2"
                    >
                        <div className="min-w-0 font-mono text-xs">
                            <p className="truncate text-sm">{file.name}</p>
                            <p className="mt-0.5 text-muted-foreground">
                                {formatFileSize(file.size)}
                            </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <Badge
                                variant="secondary"
                                className="bg-muted px-2 py-1 font-normal tracking-normal"
                            >
                                Готов к загрузке
                            </Badge>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                aria-label={`Убрать ${file.name} из очереди`}
                                onClick={() => removeFile(id)}
                            >
                                <RiCloseLine className="size-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </Card>
        </section>
    )
}

export function UploadPage() {
    return (
        <>
            <PageHeading title="Загрузите аудиозапись" />
            <div className="grid gap-3 md:grid-cols-2 md:items-start">
                <AudioDropzone />
                <ProcessingSettings />
            </div>
            <UploadQueue />
        </>
    )
}
