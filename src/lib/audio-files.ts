import type { AudioStatus } from "@/lib/upload-audio"

export type Folder = {
    id: string
    name: string
    parentId: string | null
    createdAt: string
    updatedAt: string
}
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
    signal?: AbortSignal,
    folderId?: string | null
): Promise<AudioFile[]> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim().replace(
        /\/+$/,
        ""
    )
    if (!backendUrl) {
        throw new Error("Не задан адрес сервера")
    }

    const query =
        folderId === undefined
            ? ""
            : `?folderId=${encodeURIComponent(folderId ?? "null")}`
    const response = await fetch(`${backendUrl}/api/v1/audio${query}`, {
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

export async function getFolderChildren(
    folderId: string | null,
    signal?: AbortSignal
): Promise<Folder[]> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim().replace(
        /\/+$/,
        ""
    )
    if (!backendUrl) {
        throw new Error("Не задан адрес сервера")
    }

    const response = await fetch(
        `${backendUrl}/api/v1/folders/${encodeURIComponent(folderId ?? "null")}/children`,
        {
            credentials: "include",
            headers: { Accept: "application/json" },
            signal,
        }
    )
    if (!response.ok) {
        throw new Error(`Не удалось загрузить папки (HTTP ${response.status})`)
    }

    const folders = (await response.json()) as Folder[]
    if (!Array.isArray(folders)) {
        throw new Error("Сервер вернул некорректный список папок")
    }
    return folders
}
