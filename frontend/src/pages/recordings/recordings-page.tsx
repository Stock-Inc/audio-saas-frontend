import { Link } from "react-router"

import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { recordings } from "@/data/demo"

const statistics = [
    { label: "Обработано аудио", value: "42,8 часа", note: "+18 записей за месяц" },
    { label: "Всего записей", value: "128", note: "+18 записей за месяц" },
]

function Statistics() {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {statistics.map((item) => (
                <Card
                    key={item.label}
                    className="gap-0 border border-border/60 bg-card p-4 shadow-none ring-0 sm:min-h-24"
                >
                    <p className="font-mono text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-0.5 font-serif text-3xl leading-none">{item.value}</p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">{item.note}</p>
                </Card>
            ))}
        </div>
    )
}

function RecordingsTable() {
    return (
        <Card className="gap-0 border border-border/60 bg-card p-2.5 shadow-none ring-0">
            <Table className="font-mono text-xs">
                <TableHeader className="bg-muted/60 [&_tr]:border-0">
                    <TableRow className="border-0 hover:bg-transparent">
                        <TableHead className="h-7 px-2 text-xs font-normal normal-case">Запись</TableHead>
                        <TableHead className="h-7 px-2 text-xs font-normal normal-case">Длительность</TableHead>
                        <TableHead className="h-7 px-2 text-xs font-normal normal-case">Статус</TableHead>
                        <TableHead className="h-7 px-2 text-xs font-normal normal-case">Спикеры</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recordings.map((recording) => (
                        <TableRow
                            key={recording.name}
                            className="border-0 hover:bg-muted/30"
                        >
                            <TableCell className="px-2 py-2">
                                <Link
                                    to={recording.path}
                                    className="hover:text-primary"
                                >
                                    {recording.name}
                                </Link>
                            </TableCell>
                            <TableCell className="px-2 py-2">{recording.duration}</TableCell>
                            <TableCell className="px-2 py-2">
                                <Badge
                                    variant="secondary"
                                    className="font-normal normal-case tracking-normal"
                                >
                                    {recording.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-2 py-2">{recording.speakers}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}

export function RecordingsPage() {
    return (
        <>
            <PageHeading
                title="Все записи"
                action={
                    <Link
                        to="/upload"
                        className={buttonVariants({ size: "xs", className: "normal-case tracking-normal" })}
                    >
                        Новая запись
                    </Link>
                }
            />
            <Statistics />
            <section className="mt-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-base">Недавние записи</h2>
                    <div className="flex items-center gap-1.5">
                        <Input
                            type="search"
                            aria-label="Поиск по записям"
                            placeholder="Поиск по записям"
                            className="h-8 w-44 border border-border/70 bg-card px-2 font-mono text-xs sm:w-48"
                        />
                        <Button
                            variant="secondary"
                            size="xs"
                            className="normal-case tracking-normal"
                        >
                            Фильтры
                        </Button>
                    </div>
                </div>
                <RecordingsTable />
            </section>
        </>
    )
}
