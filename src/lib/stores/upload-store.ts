import { create } from "zustand"
import type {
    AudioJob,
    AudioStatus,
    AudioStatusResponse,
} from "@/lib/upload-audio"

export type QueuedAudioFile = {
    id: string
    file: File
    wavFile: File | null
    status:
        "queued" | "converting" | "ready" | "uploading" | "uploaded" | "error"
    error: string | null
    serverId: string | null
    requestId: string | null
    recordId: string | null
    serverStatus: AudioStatus | null
    pollError: string | null
}

type UploadState = {
    files: QueuedAudioFile[]
    addFiles: (files: File[]) => void
    removeFile: (id: string) => void
    setConverting: (id: string) => void
    setConverted: (id: string, wavFile: File) => void
    setUploading: (id: string) => void
    setUploaded: (id: string, job: AudioJob) => void
    setServerStatus: (id: string, job: AudioStatusResponse) => void
    setPollError: (id: string, error: string) => void
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
                    serverId: null,
                    requestId: null,
                    recordId: null,
                    serverStatus: null,
                    pollError: null,
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
    setUploading: (id) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id
                    ? { ...item, status: "uploading", error: null }
                    : item
            ),
        })),
    setUploaded: (id, job) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status: "uploaded",
                          error:
                              job.status === "FAILED"
                                  ? job.errorMessage ||
                                    "Обработка завершилась ошибкой"
                                  : null,
                          serverId: job.id,
                          requestId: job.requestId,
                          recordId: job.recordId,
                          serverStatus: job.status,
                          pollError: null,
                      }
                    : item
            ),
        })),
    setServerStatus: (id, job) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          serverStatus: job.status,
                          error:
                              job.status === "FAILED"
                                  ? job.errorMessage ||
                                    "Обработка завершилась ошибкой"
                                  : null,
                          pollError: null,
                      }
                    : item
            ),
        })),
    setPollError: (id, error) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id ? { ...item, pollError: error } : item
            ),
        })),
    setConversionError: (id, error) =>
        set((state) => ({
            files: state.files.map((item) =>
                item.id === id ? { ...item, status: "error", error } : item
            ),
        })),
}))
