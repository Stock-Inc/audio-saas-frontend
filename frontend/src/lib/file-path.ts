import type { BreadcrumbItem } from "@/components/breadcrumbs"
import { getFolderPath } from "@/data/demo"

export function getFileBreadcrumbs(
    folderId: string | null,
    recordingName?: string
): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
        { label: "Записи", to: "/recordings" },
        ...getFolderPath(folderId).map((folder) => ({
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
