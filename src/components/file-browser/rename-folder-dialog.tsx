import { useState, type SubmitEvent } from "react"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { renameAudioFolder, type Folder } from "@/lib/audio-files"

export function RenameFolderDialog({
    folder,
    onClose,
    onRenamed,
}: {
    folder: Folder
    onClose: () => void
    onRenamed: () => void
}) {
    const [name, setName] = useState(folder.name)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmedName = name.trim()
        if (!trimmedName || pending) return

        if (trimmedName === folder.name) {
            onClose()
            return
        }

        setPending(true)
        setError(null)
        try {
            await renameAudioFolder(folder.id, trimmedName)
            onClose()
            onRenamed()
        } catch (cause) {
            setError(
                cause instanceof Error
                    ? cause.message
                    : "Не удалось переименовать папку"
            )
        } finally {
            setPending(false)
        }
    }

    return (
        <AlertDialog
            open
            onOpenChange={(open) => !open && !pending && onClose()}
        >
            <AlertDialogContent>
                <form
                    onSubmit={(event) => void handleSubmit(event)}
                    className="space-y-5"
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Переименовать папку</AlertDialogTitle>
                        <AlertDialogDescription>
                            Укажите новое название папки "{folder.name}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor={`rename-folder-${folder.id}`}>
                            Название папки
                        </Label>
                        <Input
                            id={`rename-folder-${folder.id}`}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            maxLength={80}
                            required
                            autoFocus
                            disabled={pending}
                            className="border border-border/70 bg-card px-3"
                        />
                    </div>
                    {error && (
                        <p
                            role="alert"
                            className="font-mono text-xs text-destructive"
                        >
                            {error}
                        </p>
                    )}
                    <AlertDialogFooter>
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={pending}
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            disabled={!name.trim() || pending}
                        >
                            {pending ? "Сохраняем..." : "Сохранить"}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
