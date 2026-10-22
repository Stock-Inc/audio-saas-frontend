import { useEffect, useState } from "react"
import { Outlet } from "react-router"

import { AppHeader } from "@/components/layout/app-header"
import { folders, recordings, type DemoFolder } from "@/data/demo"
import { DemoLibraryContext } from "@/lib/demo-library-context"

const storageKey = "audio-saas-deleted-demo-items"
let checkPageReload = true

type DemoLibraryState = {
    folderIds: string[]
    recordingIds: string[]
    createdFolders: DemoFolder[]
}

function emptyDemoLibraryState(): DemoLibraryState {
    return { folderIds: [], recordingIds: [], createdFolders: [] }
}

function readDemoLibraryState(): DemoLibraryState {
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
            const createdFolders = Array.isArray(saved.createdFolders)
                ? saved.createdFolders.filter(
                      (folder: unknown): folder is DemoFolder =>
                          typeof folder === "object" &&
                          folder !== null &&
                          "id" in folder &&
                          typeof folder.id === "string" &&
                          "name" in folder &&
                          typeof folder.name === "string" &&
                          "parentId" in folder &&
                          (folder.parentId === null ||
                              typeof folder.parentId === "string")
                  )
                : []

            return {
                folderIds: saved.folderIds,
                recordingIds: saved.recordingIds,
                createdFolders,
            }
        }
    } catch {
        return emptyDemoLibraryState()
    }

    return emptyDemoLibraryState()
}

export function AppLayout() {
    const [libraryState, setLibraryState] = useState(readDemoLibraryState)

    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(libraryState))
    }, [libraryState])

    const allFolders = [...folders, ...libraryState.createdFolders]
    const visibleFolders = allFolders.filter(
        (folder) => !libraryState.folderIds.includes(folder.id)
    )
    const visibleRecordings = recordings.filter(
        (recording) =>
            !libraryState.recordingIds.includes(recording.id) &&
            (!recording.folderId ||
                !libraryState.folderIds.includes(recording.folderId))
    )

    function createFolder(name: string, parentId: string | null) {
        setLibraryState((current) => ({
            ...current,
            createdFolders: [
                ...current.createdFolders,
                { id: crypto.randomUUID(), name, parentId },
            ],
        }))
    }

    function deleteFolder(folderId: string) {
        const folderIds = new Set([folderId])
        let previousSize = 0

        while (folderIds.size !== previousSize) {
            previousSize = folderIds.size
            allFolders.forEach((folder) => {
                if (folder.parentId && folderIds.has(folder.parentId)) {
                    folderIds.add(folder.id)
                }
            })
        }

        setLibraryState((current) => ({
            ...current,
            folderIds: [...new Set([...current.folderIds, ...folderIds])],
        }))
    }

    function deleteRecording(recordingId: string) {
        setLibraryState((current) => ({
            ...current,
            recordingIds: [...new Set([...current.recordingIds, recordingId])],
        }))
    }

    return (
        <DemoLibraryContext.Provider
            value={{
                folders: visibleFolders,
                recordings: visibleRecordings,
                createFolder,
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
