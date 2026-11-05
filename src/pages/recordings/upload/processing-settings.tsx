import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { convertToWav } from "@/lib/convert-to-wav"
import { useUploadStore } from "@/lib/stores/upload-store"
import { uploadAudio, type AudioOptions } from "@/lib/upload-audio"

export function ProcessingSettings() {
    const [options, setOptions] = useState<AudioOptions>({
        diarization: true,
        summary: true,
        tasks: true,
    })
    const files = useUploadStore((state) => state.files)
    const isProcessing = files.some(
        (item) => item.status === "converting" || item.status === "uploading"
    )
    const hasPendingFiles = files.some(
        (item) => item.status === "queued" || item.status === "ready" || item.status === "error"
    )

    async function handleUpload() {
        const store = useUploadStore.getState()
        if (store.files.some((item) => item.status === "converting" || item.status === "uploading")) return

        const pendingIds = store.files
            .filter((item) => item.status === "queued" || item.status === "ready" || item.status === "error")
            .map((item) => item.id)

        for (const id of pendingIds) {
            const item = useUploadStore.getState().files.find((file) => file.id === id)
            if (!item) continue

            let wavFile = item.wavFile
            if (!wavFile) {
                useUploadStore.getState().setConverting(id)
                try {
                    wavFile = await convertToWav(item.file, id)
                    useUploadStore.getState().setConverted(id, wavFile)
                } catch (error) {
                    useUploadStore.getState().setConversionError(
                        id,
                        error instanceof Error ? error.message : "Не удалось конвертировать файл"
                    )
                    continue
                }
            }

            useUploadStore.getState().setUploading(id)
            try {
                await uploadAudio(wavFile, id, options)
                useUploadStore.getState().setUploaded(id)
            } catch (error) {
                useUploadStore.getState().setConversionError(
                    id,
                    error instanceof Error ? error.message : "Не удалось отправить файл"
                )
            }
        }
    }

    function setOption(name: keyof AudioOptions, checked: boolean) {
        setOptions((current) => ({ ...current, [name]: checked }))
    }

    return (
        <Card className="gap-3 border border-border/60 bg-card p-4 shadow-none ring-0">
            <h2 className="text-base">Параметры обработки</h2>
            <div className="flex items-center justify-between">
                <span className="font-mono text-sm">Разделение спикеров</span>
                <Switch
                    checked={options.diarization}
                    onCheckedChange={(checked) => setOption("diarization", checked)}
                    aria-label="Разделение спикеров"
                />
            </div>
            <div className="flex items-center justify-between">
                <span className="font-mono text-sm">Краткое содержание</span>
                <Switch
                    checked={options.summary}
                    onCheckedChange={(checked) => setOption("summary", checked)}
                    aria-label="Краткое содержание"
                />
            </div>
            <div className="flex items-center justify-between">
                <span className="font-mono text-sm">Задачи</span>
                <Switch
                    checked={options.tasks}
                    onCheckedChange={(checked) => setOption("tasks", checked)}
                    aria-label="Задачи"
                />
            </div>
            <div className="flex justify-end gap-1.5">
                <Button
                    type="button"
                    size="xs"
                    disabled={!hasPendingFiles || isProcessing}
                    onClick={() => void handleUpload()}
                    className="tracking-normal normal-case"
                >
                    {isProcessing ? "Загрузка..." : "Загрузить"}
                </Button>
            </div>
        </Card>
    )
}
