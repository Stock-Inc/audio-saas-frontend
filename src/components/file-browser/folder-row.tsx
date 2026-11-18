import { RiArrowRightSLine, RiFolderLine } from "@remixicon/react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"

import type { FolderPathItem } from "@/components/file-browser/file-browser"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { deleteAudioFolder, type Folder } from "@/lib/audio-files"

export function FolderRow({
    folder,
    path,
    onDeleted,
}: {
    folder: Folder
    path: FolderPathItem[]
    onDeleted: () => void
}) {
    const navigate = useNavigate()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const to = `/recordings/folders/${folder.id}`
    const state = {
        folderPath: [...path, { id: folder.id, name: folder.name }],
    }

    async function handleDelete() {
        if (deleting) return
        setDeleting(true)
        setError(null)
        try {
            await deleteAudioFolder(folder.id)
            setDeleteOpen(false)
            onDeleted()
        } catch (cause) {
            setError(
                cause instanceof Error
                    ? cause.message
                    : "Не удалось удалить папку"
            )
        } finally {
            setDeleting(false)
        }
    }

    function handleDeleteOpenChange(open: boolean) {
        if (deleting) return
        setDeleteOpen(open)
        if (!open) setError(null)
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger
                    render={
                        <Link
                            to={to}
                            state={state}
                            aria-label={`Открыть ${folder.name}`}
                        />
                    }
                    className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                    <RiFolderLine
                        className="size-5 shrink-0 text-primary"
                        aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">
                        {folder.name}
                    </span>
                    <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                        Папка
                    </span>
                    <RiArrowRightSLine
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                    />
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => navigate(to, { state })}>
                        Открыть
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                        variant="destructive"
                        onClick={() => setDeleteOpen(true)}
                    >
                        Удалить
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <AlertDialog
                open={deleteOpen}
                onOpenChange={handleDeleteOpenChange}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Удалить папку "{folder.name}"?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Папка будет удалена из списка записей.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && (
                        <p
                            role="alert"
                            className="font-mono text-xs text-destructive"
                        >
                            {error}
                        </p>
                    )}
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>
                            Отмена
                        </AlertDialogCancel>
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={deleting}
                            onClick={() => void handleDelete()}
                        >
                            {deleting ? "Удаляем..." : "Удалить"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
