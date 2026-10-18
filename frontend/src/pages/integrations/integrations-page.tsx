import { PageHeading } from "@/components/page-heading"
import { Card } from "@/components/ui/card"

export function IntegrationsPage() {
    return (
        <>
            <PageHeading title="Интеграции" />
            <Card className="gap-1 border border-border/60 bg-card p-4 shadow-none ring-0">
                <h2 className="text-base">Подключения</h2>
                <p className="font-mono text-[11px] text-muted-foreground">
                    Здесь появятся доступные интеграции.
                </p>
            </Card>
        </>
    )
}
