import { Link } from "react-router"

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
import { uploadQueue } from "@/data/demo"

function AudioDropzone() {
    return (
        <div className="space-y-2">
            <Card className="flex min-h-32 items-center justify-center gap-0 border border-border/60 bg-card px-4 py-5 text-center shadow-none ring-0">
                <h2 className="font-serif text-base">Загрузите аудиозапись</h2>
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                    Перетащите файл сюда или выберите его на устройстве.
                </p>
                <Label
                    htmlFor="audio-file"
                    className={`${buttonVariants({ size: "xs" })} mt-3 normal-case tracking-normal`}
                >
                    Выбрать аудио
                </Label>
                <input
                    id="audio-file"
                    type="file"
                    accept="audio/*"
                    className="sr-only"
                />
            </Card>
            <Card className="gap-1 border border-border/60 bg-card p-3 shadow-none ring-0">
                <p className="font-mono text-xs">Конфиденциальность по умолчанию</p>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                    Файлы доступны только вам. После обработки исходный файл можно удалить автоматически.
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
            <span className="font-mono text-xs">{label}</span>
            <Select defaultValue={defaultValue}>
                <SelectTrigger className="h-7 w-full border border-border/70 bg-card px-2 font-mono text-xs">
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
                    <p className="font-mono text-xs">Разделение спикеров</p>
                    <p className="font-mono text-xs text-muted-foreground">Включено</p>
                </div>
                <Switch
                    defaultChecked
                    aria-label="Разделение спикеров"
                />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-mono text-xs">ИИ-коррекция текста</p>
                    <p className="font-mono text-xs text-muted-foreground">Включена</p>
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
                    variant="secondary"
                    size="xs"
                    className="normal-case tracking-normal"
                >
                    Сохранить пресет
                </Button>
                <Link
                    to="/recordings/weekly-sync/processing"
                    className={buttonVariants({ size: "xs", className: "normal-case tracking-normal" })}
                >
                    Начать обработку
                </Link>
            </div>
        </Card>
    )
}

function UploadQueue() {
    return (
        <section className="mt-12">
            <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-base">Очередь загрузки</h2>
                <p className="font-mono text-xs text-muted-foreground">2 файла · 126 МБ</p>
            </div>
            <Card className="gap-0 border border-border/60 bg-card p-2 shadow-none ring-0">
                {uploadQueue.map((file) => (
                    <div
                        key={file.name}
                        className="flex items-center justify-between gap-4 px-1 py-2"
                    >
                        <div className="min-w-0 font-mono text-xs">
                            <p className="truncate">{file.name}</p>
                            <p className="mt-0.5 text-muted-foreground">
                                {file.duration} · {file.size}
                            </p>
                        </div>
                        <Badge
                            variant="secondary"
                            className="bg-muted px-2 py-1 font-normal tracking-normal"
                        >
                            Готов к загрузке
                        </Badge>
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
