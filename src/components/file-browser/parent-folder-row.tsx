import { RiArrowRightSLine, RiFolderLine } from "@remixicon/react"
import { useState, type DragEvent } from "react"
import { Link } from "react-router"

import type { FolderPathItem } from "@/components/file-browser/file-browser"
import {
    fileBrowserDragType,
    readDraggedItem,
    type DraggedItem,
} from "@/lib/file-browser-drag"

export function ParentFolderRow({
    parentFolderId,
    path,
    onMove,
}: {
    parentFolderId: string | null
    path: FolderPathItem[]
    onMove: (item: DraggedItem, targetFolderId: string | null) => Promise<void>
}) {
    const [dragOver, setDragOver] = useState(false)
    const parentPath = path.slice(0, -1)
    const to = parentFolderId
        ? `/recordings/folders/${parentFolderId}`
        : "/recordings"

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
        if (item) void onMove(item, parentFolderId)
    }

    return (
        <Link
            to={to}
            state={parentFolderId ? { folderPath: parentPath } : undefined}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`flex items-center gap-3 border border-border/60 bg-card px-3 py-3 transition-colors hover:border-primary/50 hover:bg-muted/50 ${dragOver ? "border-primary bg-primary/10" : ""}`}
            aria-label="Открыть родительскую папку"
        >
            <RiFolderLine
                className="size-5 shrink-0 text-primary"
                aria-hidden="true"
            />
            <span className="min-w-0 flex-1 text-sm">..</span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                {parentPath.at(-1)?.name ?? "Записи"}
            </span>
            <RiArrowRightSLine
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
            />
        </Link>
    )
}
