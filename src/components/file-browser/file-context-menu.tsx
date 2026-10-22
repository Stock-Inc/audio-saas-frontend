import { useState, type ReactNode } from "react"
import { Link, useNavigate } from "react-router"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import type { DemoFolder, DemoRecording } from "@/data/demo"
import { useDemoLibrary } from "@/lib/demo-library-context"

type FileContextMenuProps = {
    children: ReactNode
    className: string
} & (
    | { recording: DemoRecording; folder?: never }
    | { folder: DemoFolder; recording?: never }
)

export function FileContextMenu({
    children,
    className,
    folder,
    recording,
}: FileContextMenuProps) {
    const navigate = useNavigate()
    const [deleteOpen, setDeleteOpen] = useState(false)
    const { deleteFolder, deleteRecording } = useDemoLibrary()
    const path = recording?.path ?? `/recordings/folders/${folder?.id}`
    const name = recording?.fileName ?? folder?.name

    function handleDelete() {
        if (folder) {
            deleteFolder(folder.id)
        } else if (recording) {
            deleteRecording(recording.id)
        }

        setDeleteOpen(false)
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger
                    render={
                        <Link
                            to={path}
                            aria-label={`Открыть ${name}`}
                        />
                    }
                    className={className}
                >
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={() => navigate(path)}>
                        Открыть
                    </ContextMenuItem>
                    {recording && (
                        <ContextMenuItem
                            onClick={() =>
                                navigate(
                                    `/recordings/${recording.id}/processing`
                                )
                            }
                        >
                            Повторный анализ
                        </ContextMenuItem>
                    )}
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
                onOpenChange={setDeleteOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Удалить {folder ? "папку" : "запись"} «{name}»?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {folder
                                ? "Папка и всё её содержимое исчезнут до обновления страницы."
                                : "Запись исчезнет до обновления страницы."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            size="sm"
                            className="tracking-normal normal-case"
                        >
                            Отмена
                        </AlertDialogCancel>
                        <AlertDialogAction
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="tracking-normal normal-case"
                            onClick={handleDelete}
                        >
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
