import { RiAddLine, RiSearchLine } from "@remixicon/react"
import { useState, type SubmitEvent } from "react"
import { Link } from "react-router"

import { Breadcrumbs } from "@/components/breadcrumbs"
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
import { useDemoLibrary } from "@/lib/demo-library-context"
import { getFileBreadcrumbs } from "@/lib/file-path"

export function FileBrowserToolbar({ folderId }: { folderId: string | null }) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [folderName, setFolderName] = useState("")
    const { createFolder, folders } = useDemoLibrary()

    function handleOpenChange(open: boolean) {
        setDialogOpen(open)

        if (!open) {
            setFolderName("")
        }
    }

    function handleCreateFolder(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const name = folderName.trim()

        if (!name) {
            return
        }

        createFolder(name, folderId)
        handleOpenChange(false)
    }

    return (
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs
                items={getFileBreadcrumbs(folderId, undefined, folders)}
            />
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <Dialog
                    open={dialogOpen}
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
                            onSubmit={handleCreateFolder}
                            className="space-y-5"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="new-folder-name">
                                    Название папки
                                </Label>
                                <Input
                                    id="new-folder-name"
                                    value={folderName}
                                    onChange={(event) =>
                                        setFolderName(event.target.value)
                                    }
                                    maxLength={80}
                                    required
                                    autoFocus
                                    className="border border-border/70 bg-card px-3"
                                />
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="tracking-normal normal-case"
                                    onClick={() => handleOpenChange(false)}
                                >
                                    Отмена
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={!folderName.trim()}
                                    className="tracking-normal normal-case"
                                >
                                    Создать
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                <Link
                    to="/search"
                    aria-label="Открыть поиск по папкам и записям"
                    className="flex h-9 min-w-0 flex-1 items-center gap-2 border border-border/70 bg-card px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground sm:w-56 sm:flex-none"
                >
                    <RiSearchLine className="size-4 shrink-0" />
                    <span className="truncate">Поиск по записям</span>
                </Link>
            </div>
        </div>
    )
}
