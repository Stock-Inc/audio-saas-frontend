import { Card } from "@/components/ui/card"
import { useUploadStore } from "@/lib/stores/upload-store"
import { formatFileSize } from "@/pages/recordings/upload/format-file-size"
import { UploadQueueItem } from "@/pages/recordings/upload/upload-queue-item"

export function UploadQueue() {
    const files = useUploadStore((state) => state.files)
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
                {files.map((item) => (
                    <UploadQueueItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </Card>
        </section>
    )
}
