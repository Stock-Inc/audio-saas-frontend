import { RiArrowRightSLine, RiFileMusicLine, RiFolderLine } from "@remixicon/react"
import { Link } from "react-router"

import { folders, recordings, type DemoFolder, type DemoRecording } from "@/data/demo"

function FolderRow({ folder }: { folder: DemoFolder }) {
    return (
        <Link
            to={`/recordings/folders/${folder.id}`}
            className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3 transition-colors hover:border-primary/50 hover:bg-muted/50"
        >
            <RiFolderLine className="size-5 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-sm">{folder.name}</span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">Папка</span>
            <RiArrowRightSLine className="size-4 shrink-0 text-muted-foreground" />
        </Link>
    )
}

function RecordingRow({ recording }: { recording: DemoRecording }) {
    return (
        <Link
            to={recording.path}
            className="flex items-center gap-3 border border-border/60 bg-card px-3 py-3 transition-colors hover:border-primary/50 hover:bg-muted/50"
        >
            <RiFileMusicLine className="size-5 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-sm">{recording.name}</span>
            <span className="font-mono text-xs text-muted-foreground">{recording.duration}</span>
            <RiArrowRightSLine className="size-4 shrink-0 text-muted-foreground" />
        </Link>
    )
}

export function FileBrowserList({ folderId }: { folderId: string | null }) {
    const childFolders = folders.filter((folder) => folder.parentId === folderId)
    const childRecordings = recordings.filter((recording) => recording.folderId === folderId)

    if (childFolders.length === 0 && childRecordings.length === 0) {
        return (
            <p className="max-w-lg border border-border/60 bg-card p-5 font-mono text-sm text-muted-foreground">
                В этой папке пока ничего нет.
            </p>
        )
    }

    return (
        <div className="max-w-lg space-y-6">
            {childFolders.length > 0 && (
                <section aria-labelledby="folder-list-title">
                    <h2
                        id="folder-list-title"
                        className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"
                    >
                        Папки · {childFolders.length}
                    </h2>
                    <div className="space-y-1.5">
                        {childFolders.map((folder) => (
                            <FolderRow
                                key={folder.id}
                                folder={folder}
                            />
                        ))}
                    </div>
                </section>
            )}
            {childRecordings.length > 0 && (
                <section aria-labelledby="recording-list-title">
                    <h2
                        id="recording-list-title"
                        className="mb-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"
                    >
                        Записи · {childRecordings.length}
                    </h2>
                    <div className="space-y-1.5">
                        {childRecordings.map((recording) => (
                            <RecordingRow
                                key={recording.id}
                                recording={recording}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
