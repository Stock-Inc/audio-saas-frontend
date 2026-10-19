import { FileBrowserList } from "@/components/file-browser/file-browser-list"
import { FileBrowserToolbar } from "@/components/file-browser/file-browser-toolbar"

export function FileBrowser({ folderId = null }: { folderId?: string | null }) {
    return (
        <>
            <FileBrowserToolbar folderId={folderId} />
            <FileBrowserList folderId={folderId} />
        </>
    )
}
