import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const transcript = [
    {
        time: "00:12",
        speaker: "Спикер 1",
        text: "Сначала запустим загрузку аудио и расшифровку, а экспорт добавим в следующем обновлении.",
    },
    {
        time: "00:28",
        speaker: "Спикер 2",
        text: "Согласен. Подготовлю обработку записей и распознавание спикеров.",
    },
]

const resultCards = [
    { title: "Кратко", text: "Команда согласовала запуск загрузки аудио и базовой расшифровки в первой версии." },
    { title: "Решения", text: "Экспорт перенесли на следующую итерацию. Первая версия выйдет без внешних интеграций.", badge: "2 решения" },
    { title: "Задачи", text: "Подготовить обработку записей и проверить точность разделения спикеров.", badge: "3 задачи" },
]

function TranscriptPanel() {
    return (
        <Card className="min-h-72 gap-2 border border-border/60 bg-card p-4 shadow-none ring-0">
            <h2 className="font-serif text-base">Расшифровка и результаты ИИ</h2>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="space-y-2">
                    {transcript.map((line) => (
                        <div
                            key={line.time}
                            className="font-mono text-xs leading-relaxed"
                        >
                            <p className="text-primary">
                                {line.time} / {line.speaker}
                            </p>
                            <p className="mt-0.5 max-w-xs">{line.text}</p>
                        </div>
                    ))}
                </div>
                <Card className="h-fit gap-1 border-0 bg-muted/70 p-2.5 font-mono text-xs shadow-none ring-0">
                    <h3>Сводка и решения</h3>
                    <p>Сначала запустить загрузку и расшифровку. Экспорт добавим в следующем обновлении.</p>
                    <p className="text-muted-foreground">Задача / подготовить обработку записей</p>
                </Card>
            </div>
        </Card>
    )
}

function ResultCards() {
    return (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {resultCards.map((item) => (
                <Card
                    key={item.title}
                    className="min-h-28 gap-1 border border-border/60 bg-card p-3 shadow-none ring-0"
                >
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-base">{item.title}</h2>
                        {item.badge && (
                            <Badge
                                variant="secondary"
                                className="bg-muted px-1.5 py-1 font-normal tracking-normal"
                            >
                                {item.badge}
                            </Badge>
                        )}
                    </div>
                    <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                        {item.text}
                    </p>
                </Card>
            ))}
        </div>
    )
}

export function RecordingPage() {
    return (
        <>
            <PageHeading
                eyebrow="Записи / Интервью"
                title="Интервью с пользователем"
                action={
                    <div className="flex gap-1.5">
                        <Button
                            variant="secondary"
                            size="xs"
                            className="normal-case tracking-normal"
                        >
                            Экспорт
                        </Button>
                        <Button
                            size="xs"
                            className="normal-case tracking-normal"
                        >
                            Поделиться
                        </Button>
                    </div>
                }
            />
            <TranscriptPanel />
            <ResultCards />
        </>
    )
}
