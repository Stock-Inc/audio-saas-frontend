export type AudioOptions = {
    diarization: boolean
    summary: boolean
    tasks: boolean
}

export async function uploadAudio(
    file: File,
    recordingId: string,
    options: AudioOptions
) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim().replace(/\/+$/, "")
    if (!backendUrl) {
        throw new Error("Не задан адрес сервера")
    }

    const body = new FormData()
    body.append("requestId", crypto.randomUUID())
    body.append("recordId", recordingId)
    body.append("file", file, file.name)
    body.append(
        "options",
        new Blob([JSON.stringify(options)], { type: "application/json" })
    )

    const response = await fetch(`${backendUrl}/api/v1/audio`, {
        method: "POST",
        credentials: "include",
        body,
    })

    if (!response.ok) {
        response.json().then(r => console.log(r))
        throw new Error(`Не удалось отправить файл (HTTP ${response.status})`)
    }
}
