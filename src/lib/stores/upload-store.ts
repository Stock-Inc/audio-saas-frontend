import { create } from "zustand"

export type QueuedAudioFile = {
    id: string
    file: File
}

type UploadState = {
    files: QueuedAudioFile[]
    addFiles: (files: File[]) => void
    removeFile: (id: string) => void
}

export const useUploadStore = create<UploadState>((set) => ({
    files: [],
    addFiles: (files) =>
        set((state) => ({
            files: [
                ...state.files,
                ...files.map((file) => ({ id: crypto.randomUUID(), file })),
            ],
        })),
    removeFile: (id) =>
        set((state) => ({
            files: state.files.filter((item) => item.id !== id),
        })),
}))
