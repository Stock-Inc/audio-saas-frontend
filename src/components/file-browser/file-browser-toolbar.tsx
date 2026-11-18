import { RiArrowRightSLine } from "@remixicon/react"
import { useState, type DragEvent } from "react"
import { Link } from "react-router"

import { CreateFolderDialog } from "@/components/file-browser/create-folder-dialog"
import type { FolderPathItem } from "@/components/file-browser/file-browser"
import {
    fileBrowserDragType,
    readDraggedItem,
    type DraggedItem,
} from "@/lib/file-browser-drag"

function DropLink({
    label,
    to,
    state,
    folderId,
    onMove,
    current,
}: {
    label: string
    to: string
    state?: { folderPath: FolderPathItem[] }
    folderId: string | null
    onMove: (item: DraggedItem, targetFolderId: string | null) => Promise<void>
    current?: boolean
}) {
    const [dragOver, setDragOver] = useState(false)

    function handleDragOver(event: DragEvent<HTMLAnchorElement>) {
        if (!event.dataTransfer.types.includes(fileBrowserDragType)) return
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
        setDragOver(true)
    }

    function handleDrop(event: DragEvent<HTMLAnchorElement>) {
        event.preventDefault()
        setDragOver(false)
        const item = readDraggedItem(event.dataTransfer)
        if (item) void onMove(item, folderId)
    }

    return (
        <Link
            to={to}
            state={state}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`${current ? "text-foreground" : "text-muted-foreground hover:text-foreground"} ${dragOver ? "bg-primary/10 text-primary ring-1 ring-primary" : ""}`}
            aria-current={current ? "page" : undefined}
        >
            {label}
        </Link>
    )
}

export function FileBrowserToolbar({
    path,
    folderId,
    onCreated,
    onMove,
}: {
    path: FolderPathItem[]
    folderId: string | null
    onCreated: () => void
    onMove: (item: DraggedItem, targetFolderId: string | null) => Promise<void>
}) {
    return (
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <nav
                aria-label="Путь"
                className="flex flex-wrap items-center gap-1 font-mono text-sm"
            >
                <DropLink
                    label="Записи"
                    to="/recordings"
                    folderId={null}
                    onMove={onMove}
                    current={path.length === 0}
                />
                {path.map((folder, index) => (
                    <span
                        key={folder.id}
                        className="flex min-w-0 items-center gap-1"
                    >
                        <RiArrowRightSLine className="size-4 shrink-0 text-muted-foreground" />
                        {index === path.length - 1 ? (
                            <span
                                className="truncate text-foreground"
                                aria-current="page"
                            >
                                {folder.name}
                            </span>
                        ) : (
                            <DropLink
                                label={folder.name}
                                to={`/recordings/folders/${folder.id}`}
                                state={{ folderPath: path.slice(0, index + 1) }}
                                folderId={folder.id}
                                onMove={onMove}
                            />
                        )}
                    </span>
                ))}
            </nav>
            <CreateFolderDialog
                parentId={folderId}
                onCreated={onCreated}
            />
        </div>
    )
}
