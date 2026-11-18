import type { AudioStatus } from "@/lib/upload-audio"

export type Folder = { id: string; name: string }
export type Tag = { id: string; name: string }

export interface AudioFile {
    id: string
    requestId: string
    recordId: string
    processingJobId: string | null
    originalFilename: string
    contentType: string
    sizeBytes: number
    status: AudioStatus
    errorMessage: string | null
    folder: Folder | null
    tags: Tag[]
    resultAvailable: boolean
    resultFilename: string | null
    resultSizeBytes: number | null
    createdAt: string
    updatedAt: string
}

export async function getAudioFiles(
    signal?: AbortSignal
): Promise<AudioFile[]> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim().replace(
        /\/+$/,
        ""
    )
    if (!backendUrl) {
        throw new Error("Не задан адрес сервера")
    }

    const response = await fetch(`${backendUrl}/api/v1/audio`, {
        credentials: "include",
        headers: { Accept: "application/json" },
        signal,
    })

    if (!response.ok) {
        throw new Error(
            `Не удалось загрузить историю (HTTP ${response.status})`
        )
    }

    const files = (await response.json()) as AudioFile[]
    if (!Array.isArray(files)) {
        throw new Error("Сервер вернул некорректную историю загрузок")
    }
    return files
}
