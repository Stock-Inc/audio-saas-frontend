import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import { AuthGate } from "@/components/auth-gate"
import { AppLayout } from "@/components/layout/app-layout"
import { HistoryPage } from "@/pages/history/history-page"
import { OverviewPage } from "@/pages/overview/overview-page"
import { FolderPage } from "@/pages/recordings/folder-page"
import { ProcessingPage } from "@/pages/recordings/processing-page"
import { RecordingPage } from "@/pages/recordings/recording-page"
import { RecordingsPage } from "@/pages/recordings/recordings-page"
import { UploadPage } from "@/pages/recordings/upload-page"
import { SearchPage } from "@/pages/search/search-page"

export function App() {
    return (
        <BrowserRouter>
            <AuthGate>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            path="/"
                            element={<OverviewPage />}
                        />
                        <Route
                            path="/recordings"
                            element={<RecordingsPage />}
                        />
                        <Route
                            path="/history"
                            element={<HistoryPage />}
                        />
                        <Route
                            path="/recordings/folders/:folderId"
                            element={<FolderPage />}
                        />
                        <Route
                            path="/search"
                            element={<SearchPage />}
                        />
                        <Route
                            path="/upload"
                            element={<UploadPage />}
                        />
                        <Route
                            path="/recordings/:recordingId/processing"
                            element={<ProcessingPage />}
                        />
                        <Route
                            path="/recordings/:recordingId"
                            element={<RecordingPage />}
                        />
                    </Route>
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/"
                                replace
                            />
                        }
                    />
                </Routes>
            </AuthGate>
        </BrowserRouter>
    )
}

export default App
