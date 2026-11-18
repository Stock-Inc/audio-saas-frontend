import { Navigate, useParams } from "react-router"

import { FileBrowser } from "@/components/file-browser/file-browser"

export function FolderPage() {
    const { folderId } = useParams()
    if (!folderId) {
        return (
            <Navigate
                to="/recordings"
                replace
            />
        )
    }

    return (
        <FileBrowser
            key={folderId}
            folderId={folderId}
        />
    )
}
