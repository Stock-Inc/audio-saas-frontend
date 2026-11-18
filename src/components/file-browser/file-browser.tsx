import { useEffect, useState } from "react"
import { useLocation } from "react-router"

import { FileBrowserList } from "@/components/file-browser/file-browser-list"
import { FileBrowserToolbar } from "@/components/file-browser/file-browser-toolbar"
import { Button } from "@/components/ui/button"
import {
    getAudioFiles,
    getFolderChildren,
    type AudioFile,
    type Folder,
} from "@/lib/audio-files"

export type FolderPathItem = Pick<Folder, "id" | "name">

export function FileBrowser({ folderId = null }: { folderId?: string | null }) {
    const location = useLocation()
    const statePath = (
        location.state as { folderPath?: FolderPathItem[] } | null
    )?.folderPath
    const path = folderId
        ? statePath?.at(-1)?.id === folderId
            ? statePath
            : [{ id: folderId, name: "Папка" }]
        : []
    const [folders, setFolders] = useState<Folder[]>([])
    const [files, setFiles] = useState<AudioFile[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [version, setVersion] = useState(0)

    useEffect(() => {
        const controller = new AbortController()
        void Promise.all([
            getFolderChildren(folderId, controller.signal),
            getAudioFiles(controller.signal, folderId),
        ])
            .then(([childFolders, childFiles]) => {
                if (controller.signal.aborted) return
                setFolders(childFolders)
                setFiles(childFiles)
                setError(null)
                setLoading(false)
            })
            .catch((cause: unknown) => {
                if (controller.signal.aborted) return
                setError(
                    cause instanceof Error
                        ? cause.message
                        : "Не удалось загрузить папку"
                )
                setLoading(false)
            })

        return () => controller.abort()
    }, [folderId, version])

    function retry() {
        setLoading(true)
        setError(null)
        setVersion((current) => current + 1)
    }

    return (
        <>
            <FileBrowserToolbar
                path={path}
                folderId={folderId}
                onCreated={retry}
            />
            {loading ? (
                <p
                    className="font-mono text-sm text-muted-foreground"
                    role="status"
                >
                    Загружаем папку...
                </p>
            ) : error ? (
                <div className="max-w-lg space-y-3 border border-border/60 bg-card p-5">
                    <p
                        className="font-mono text-sm text-destructive"
                        role="alert"
                    >
                        {error}
                    </p>
                    <Button
                        type="button"
                        size="xs"
                        onClick={retry}
                    >
                        Повторить
                    </Button>
                </div>
            ) : (
                <FileBrowserList
                    folders={folders}
                    files={files}
                    path={path}
                    onDeleted={retry}
                />
            )}
        </>
    )
}
