import { RiAddLine } from "@remixicon/react"
import { useState, type SubmitEvent } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAudioFolder } from "@/lib/audio-files"

export function CreateFolderDialog({
    parentId,
    onCreated,
}: {
    parentId: string | null
    onCreated: () => void
}) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    function handleOpenChange(nextOpen: boolean) {
        if (pending) return
        setOpen(nextOpen)
        if (!nextOpen) {
            setName("")
            setError(null)
        }
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmedName = name.trim()
        if (!trimmedName || pending) return

        setPending(true)
        setError(null)
        try {
            await createAudioFolder(trimmedName, parentId)
            setPending(false)
            setOpen(false)
            setName("")
            onCreated()
        } catch (cause) {
            setError(
                cause instanceof Error
                    ? cause.message
                    : "Не удалось создать папку"
            )
            setPending(false)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}
        >
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="gap-2 tracking-normal normal-case"
                    />
                }
            >
                <RiAddLine className="size-4" />
                Создать папку
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Новая папка</DialogTitle>
                    <DialogDescription>
                        Папка появится в текущем разделе записей.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(event) => void handleSubmit(event)}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label htmlFor="new-folder-name">Название папки</Label>
                        <Input
                            id="new-folder-name"
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
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            disabled={pending}
                            onClick={() => handleOpenChange(false)}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!name.trim() || pending}
                        >
                            {pending ? "Создаём..." : "Создать"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
