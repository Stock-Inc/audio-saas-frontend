import { RiArrowRightSLine } from "@remixicon/react"
import { Link } from "react-router"

import { CreateFolderDialog } from "@/components/file-browser/create-folder-dialog"
import type { FolderPathItem } from "@/components/file-browser/file-browser"

export function FileBrowserToolbar({
    path,
    folderId,
    onCreated,
}: {
    path: FolderPathItem[]
    folderId: string | null
    onCreated: () => void
}) {
    return (
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <nav
                aria-label="Путь"
                className="flex flex-wrap items-center gap-1 font-mono text-sm"
            >
                <Link
                    to="/recordings"
                    className={
                        path.length === 0
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                    }
                    aria-current={path.length === 0 ? "page" : undefined}
                >
                    Записи
                </Link>
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
                            <Link
                                to={`/recordings/folders/${folder.id}`}
                                state={{ folderPath: path.slice(0, index + 1) }}
                                className="truncate text-muted-foreground hover:text-foreground"
                            >
                                {folder.name}
                            </Link>
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
