import { create } from "zustand"

export type QueuedAudioFile = {
    id: string
    file: File
    wavFile: File | null
    status: "queued" | "converting" | "ready" | "error"
    error: string | null
}

type UploadState = {
    files: QueuedAudioFile[]
    addFiles: (files: File[]) => void
    removeFile: (id: string) => void
    setConverting: (id: string) => void
    setConverted: (id: string, wavFile: File) => void
    setConversionError: (id: string, error: string) => void
}

export const useUploadStore = create<UploadState>((set) => ({
    files: [],
    addFiles: (files) =>
        set((state) => ({
            files: [
                ...state.files,
                ...files.map((file) => ({
                    id: crypto.randomUUID(),
                    file,
                    wavFile: null,
                    status: "queued" as const,
                    error: null,
                })),
            ],
        })),
    removeFile: (id) =>
        set((state) => ({
            files: state.files.filter((item) => item.id !== id),
        })),
    setConverting: (id) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id
                    ? { ...item, status: "converting", error: null }
                    : item
            ),
        })),
    setConverted: (id, wavFile) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id
                    ? { ...item, status: "ready", wavFile, error: null }
                    : item
            ),
        })),
    setConversionError: (id, error) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id ? { ...item, status: "error", error } : item
            ),
        })),
}))
