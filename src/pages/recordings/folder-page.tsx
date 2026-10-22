import { Navigate, useParams } from "react-router"

import { FileBrowser } from "@/components/file-browser/file-browser"
import { useDemoLibrary } from "@/lib/demo-library-context"

export function FolderPage() {
    const { folderId } = useParams()
    const { folders } = useDemoLibrary()
    const folder = folders.find((item) => item.id === folderId)

    if (!folder) {
        return (
            <Navigate
                to="/recordings"
                replace
            />
        )
    }

    return <FileBrowser folderId={folder.id} />
}
