import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { convertToWav } from "@/lib/convert-to-wav"
import { useUploadStore } from "@/lib/stores/upload-store"
import { SettingSelect } from "@/pages/recordings/upload/setting-select"

export function ProcessingSettings() {
    const files = useUploadStore((state) => state.files)
    const isConverting = files.some((item) => item.status === "converting")
    const hasPendingFiles = files.some(
        (item) => item.status === "queued" || item.status === "error"
    )

    async function handleConvert() {
        const store = useUploadStore.getState()
        if (store.files.some((item) => item.status === "converting")) return

        const pendingFiles = store.files.filter(
            (item) => item.status === "queued" || item.status === "error"
        )

        for (const item of pendingFiles) {
            if (
                !useUploadStore
                    .getState()
                    .files.some((file) => file.id === item.id)
            ) {
                continue
            }

            useUploadStore.getState().setConverting(item.id)
            try {
                const wavFile = await convertToWav(item.file, item.id)
                useUploadStore.getState().setConverted(item.id, wavFile)
            } catch (error) {
                useUploadStore
                    .getState()
                    .setConversionError(
                        item.id,
                        error instanceof Error
                            ? error.message
                            : "Не удалось конвертировать файл"
                    )
            }
        }
    }
    
    const languageOptions = [
        { value: "auto", label: "Автоопределение" },
        { value: "ru", label: "Русский" },
    ]
    
    const summaryOptions = [
        { value: "decisions", label: "Решения и задачи" },
        { value: "summary", label: "Только краткое содержание" },
    ]     

    return (
        <Card className="gap-3 border border-border/60 bg-card p-4 shadow-none ring-0">
            <h2 className="text-base">Параметры обработки</h2>
            <SettingSelect
                label="Язык записи"
                defaultValue="auto"
                options={languageOptions}
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
                label="Суммаризация"
                defaultValue="decisions"
                options={summaryOptions}
            />
            <div className="flex justify-end gap-1.5">
                <Button
                    type="button"
                    size="xs"
                    disabled={!hasPendingFiles || isConverting}
                    onClick={() => void handleConvert()}
                    className="tracking-normal normal-case"
                >
                    {isConverting ? "Загрузка..." : "Загрузить"}
                </Button>
            </div>
        </Card>
    )
}
