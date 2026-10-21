export type DemoFolder = {
    id: string
    name: string
    parentId: string | null
}

export type DemoRecording = {
    id: string
    name: string
    fileName: string
    uploadedAt: string
    duration: string
    status: string
    speakers: number
    folderId: string | null
    path: string
}

export const folders: DemoFolder[] = [
    { id: "interviews", name: "Интервью", parentId: null },
    { id: "product", name: "Продукт", parentId: null },
    { id: "archive", name: "Архив", parentId: null },
    {
        id: "user-research",
        name: "Исследования пользователей",
        parentId: "interviews",
    },
    { id: "roadmap", name: "Планирование", parentId: "product" },
]

export const recordings: DemoRecording[] = [
    {
        id: "product-meeting",
        name: "Встреча по продукту",
        fileName: "product-meeting.mp3",
        uploadedAt: "21.10.2026",
        duration: "32:14",
        status: "Готово",
        speakers: 4,
        folderId: "roadmap",
        path: "/recordings/product-meeting",
    },
    {
        id: "technical-interview",
        name: "Техническое интервью",
        fileName: "technical-interview.mp3",
        uploadedAt: "19.10.2026",
        duration: "48:06",
        status: "Расшифровка",
        speakers: 2,
        folderId: "interviews",
        path: "/recordings/technical-interview",
    },
    {
        id: "user-interview",
        name: "Интервью с пользователем",
        fileName: "user-interview.m4a",
        uploadedAt: "17.10.2026",
        duration: "21:37",
        status: "Обработка ИИ",
        speakers: 3,
        folderId: "user-research",
        path: "/recordings/user-interview",
    },
    {
        id: "weekly-sync",
        name: "Еженедельная встреча",
        fileName: "weekly-sync.m4a",
        uploadedAt: "15.10.2026",
        duration: "16:52",
        status: "Готово",
        speakers: 5,
        folderId: null,
        path: "/recordings/weekly-sync",
    },
]

export function getFolderPath(folderId: string | null): DemoFolder[] {
    const path: DemoFolder[] = []
    let currentId = folderId

    while (currentId) {
        const folder = folders.find((item) => item.id === currentId)

        if (!folder) {
            break
        }

        path.unshift(folder)
        currentId = folder.parentId
    }

    return path
}

export const uploadQueue = [
    { name: "product-interview-07.mp3", duration: "48:06", size: "86 МБ" },
    { name: "weekly-sync.m4a", duration: "16:52", size: "40 МБ" },
]
