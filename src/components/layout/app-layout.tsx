import { useEffect, useState } from "react"
import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"
import { folders, recordings } from "@/data/demo"
import { DemoLibraryContext } from "@/lib/demo-library-context"

const storageKey = "audio-saas-deleted-demo-items"
let checkPageReload = true

type DeletedItems = {
    folderIds: string[]
    recordingIds: string[]
}

function readDeletedItems(): DeletedItems {
    try {
        if (checkPageReload) {
            checkPageReload = false
            const navigation = performance.getEntriesByType("navigation")[0] as
                PerformanceNavigationTiming | undefined

            if (navigation?.type === "reload") {
                sessionStorage.removeItem(storageKey)
            }
        }

        const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null")

        if (
            Array.isArray(saved?.folderIds) &&
            saved.folderIds.every((id: unknown) => typeof id === "string") &&
            Array.isArray(saved?.recordingIds) &&
            saved.recordingIds.every((id: unknown) => typeof id === "string")
        ) {
            return saved
        }
    } catch {
        return { folderIds: [], recordingIds: [] }
    }

    return { folderIds: [], recordingIds: [] }
}

export function AppLayout() {
    const [deletedItems, setDeletedItems] = useState(readDeletedItems)

    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(deletedItems))
    }, [deletedItems])

    const visibleFolders = folders.filter(
        (folder) => !deletedItems.folderIds.includes(folder.id)
    )
    const visibleRecordings = recordings.filter(
        (recording) =>
            !deletedItems.recordingIds.includes(recording.id) &&
            (!recording.folderId ||
                !deletedItems.folderIds.includes(recording.folderId))
    )

    function deleteFolder(folderId: string) {
        const folderIds = new Set([folderId])
        let previousSize = 0

        while (folderIds.size !== previousSize) {
            previousSize = folderIds.size
            folders.forEach((folder) => {
                if (folder.parentId && folderIds.has(folder.parentId)) {
                    folderIds.add(folder.id)
                }
            })
        }

        setDeletedItems((current) => ({
            ...current,
            folderIds: [...new Set([...current.folderIds, ...folderIds])],
        }))
    }

    function deleteRecording(recordingId: string) {
        setDeletedItems((current) => ({
            ...current,
            recordingIds: [...new Set([...current.recordingIds, recordingId])],
        }))
    }

    return (
        <DemoLibraryContext.Provider
            value={{
                folders: visibleFolders,
                recordings: visibleRecordings,
                deleteFolder,
                deleteRecording,
            }}
        >
            <div className="min-h-screen bg-background text-foreground">
                <AppHeader />
                <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-7">
                    <Outlet />
                </main>
            </div>
        </DemoLibraryContext.Provider>
    )
}
