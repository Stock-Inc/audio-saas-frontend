export type AudioOptions = {
    diarization: boolean
    summary: boolean
    tasks: boolean
}

export type AudioStatus =
    "RECEIVED" | "FORWARDED" | "PROCESSING" | "COMPLETED" | "FAILED"

export type AudioStatusResponse = {
    status: AudioStatus
    errorMessage?: string | null
}

export type AudioJob = AudioStatusResponse & {
    id: string
    requestId: string
    recordId: string
}

const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim().replace(/\/+$/, "")

function getBackendUrl() {
    if (!backendUrl) {
        throw new Error("Не задан адрес сервера")
    }
    return backendUrl
}

async function readAudioStatus(
    response: Response
): Promise<AudioStatusResponse> {
    const job = (await response.json()) as AudioStatusResponse
    if (
        ![
            "RECEIVED",
            "FORWARDED",
            "PROCESSING",
            "COMPLETED",
            "FAILED",
        ].includes(job.status)
    ) {
        throw new Error("Сервер вернул некорректный статус обработки")
    }
    return job
}

export async function uploadAudio(file: File, options: AudioOptions) {
    const body = new FormData()
    body.append("file", file, file.name)
    body.append(
        "options",
        new Blob([JSON.stringify(options)], { type: "application/json" })
    )

    const response = await fetch(`${getBackendUrl()}/api/v1/audio`, {
        method: "POST",
        credentials: "include",
        body,
    })

    if (response.status !== 202) {
        throw new Error(`Не удалось отправить файл (HTTP ${response.status})`)
    }

    const job = (await readAudioStatus(response)) as AudioJob
    if (!job.id) {
        throw new Error("Сервер не вернул id загрузки")
    }
    return job
}

export async function getAudioStatus(id: string, signal?: AbortSignal) {
    const response = await fetch(
        `${getBackendUrl()}/api/v1/audio/${encodeURIComponent(id)}`,
        {
            credentials: "include",
            headers: { Accept: "application/json" },
            signal,
        }
    )

    if (!response.ok) {
        throw new Error(`Не удалось получить статус (HTTP ${response.status})`)
    }

    return readAudioStatus(response)
}
