export const fileBrowserDragType = "application/x-audio-saas-item"

export type DraggedItem = {
    kind: "audio" | "folder"
    id: string
    sourceFolderId: string | null
}

export function startItemDrag(dataTransfer: DataTransfer, item: DraggedItem) {
    dataTransfer.effectAllowed = "move"
    dataTransfer.setData(fileBrowserDragType, JSON.stringify(item))
}

export function readDraggedItem(
    dataTransfer: DataTransfer
): DraggedItem | null {
    try {
        const item = JSON.parse(
            dataTransfer.getData(fileBrowserDragType)
        ) as DraggedItem
        if (
            (item.kind === "audio" || item.kind === "folder") &&
            typeof item.id === "string"
        ) {
            return item
        }
    } catch {
        return null
    }
    return null
}
