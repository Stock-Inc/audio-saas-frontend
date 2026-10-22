import { createContext, useContext } from "react"

import type { DemoFolder, DemoRecording } from "@/data/demo"

export type DemoLibrary = {
    folders: DemoFolder[]
    recordings: DemoRecording[]
    deleteFolder: (folderId: string) => void
    deleteRecording: (recordingId: string) => void
}

export const DemoLibraryContext = createContext<DemoLibrary | null>(null)

export function useDemoLibrary() {
    const library = useContext(DemoLibraryContext)

    if (!library) {
        throw new Error("DemoLibraryContext is missing")
    }

    return library
}
