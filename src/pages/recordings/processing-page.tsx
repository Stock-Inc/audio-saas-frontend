import { Link, Navigate, useParams } from "react-router"

import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useDemoLibrary } from "@/lib/demo-library-context"

const stages = [
    { time: "14:32:08", label: "Предварительная обработка аудио", status: "Завершено" },
    { time: "14:32:34", label: "Распознавание речи", status: "Завершено" },
    { time: "14:33:41", label: "Разделение реплик по спикерам", status: "Выполняется" },
    { time: "—", label: "ИИ-коррекция, пунктуация и сводка", status: "В очереди" },
]

function ProcessingOverview() {
    return (
        <Card className="max-w-sm gap-2 border border-border/60 bg-card p-4 shadow-none ring-0 sm:min-h-32">
            <h2 className="font-serif text-base">Обработка записи</h2>
            <ul className="space-y-1 font-mono text-xs text-muted-foreground">
                <li>✓ Предварительная обработка аудио</li>
                <li>✓ Распознавание речи</li>
                <li className="text-primary">◉ Разделение спикеров</li>
                <li>○ ИИ-коррекция и сводка</li>
            </ul>
        </Card>
    )
}

function ProcessingStages() {
    return (
        <Card className="mt-3 gap-2 border border-border/60 bg-card p-3 shadow-none ring-0">
            <h2 className="text-base">Этапы обработки</h2>
            <div className="space-y-1">
                {stages.map((stage) => (
                    <div
                        key={stage.label}
                        className="flex flex-wrap items-center justify-between gap-2 py-1 font-mono text-xs"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <span className="shrink-0 text-muted-foreground">{stage.time}</span>
                            <span>{stage.label}</span>
                        </div>
                        <Badge
                            variant="secondary"
                            className={`px-2 py-1 font-normal tracking-normal ${stage.status === "Выполняется" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                            {stage.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export function ProcessingPage() {
    const { recordingId } = useParams()
    const { recordings } = useDemoLibrary()
    const recording = recordings.find((item) => item.id === recordingId)

    if (!recording) {
        return (
            <Navigate
                to="/recordings"
                replace
            />
        )
    }

    return (
        <>
            <PageHeading
                title={`Разбор ${recording.fileName}`}
                action={
                    <Link
                        to="/recordings"
                        className={buttonVariants({ variant: "secondary", size: "xs", className: "normal-case tracking-normal" })}
                    >
                        Отменить
                    </Link>
                }
            />
            <ProcessingOverview />
            <ProcessingStages />
            <Card className="mt-3 gap-0 border border-border/60 bg-card p-3 font-mono text-xs text-muted-foreground shadow-none ring-0">
                Можно закрыть вкладку — прогресс сохранится, и мы пришлём уведомление.
            </Card>
        </>
    )
}
