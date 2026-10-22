import type { BreadcrumbItem } from "@/components/breadcrumbs"
import { getFolderPath, type DemoFolder } from "@/data/demo"

export function getFileBreadcrumbs(
    folderId: string | null,
    recordingName: string | undefined,
    folders: DemoFolder[]
): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
        { label: "Записи", to: "/recordings" },
        ...getFolderPath(folderId, folders).map((folder) => ({
            label: folder.name,
            to: `/recordings/folders/${folder.id}`,
        })),
    ]

    if (recordingName) {
        items.push({ label: recordingName })
    } else {
        delete items[items.length - 1].to
    }

    return items
}
