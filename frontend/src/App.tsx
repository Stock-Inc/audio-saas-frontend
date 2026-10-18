import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import { AppLayout } from "@/components/layout/app-layout"
import { AuthLayout } from "@/components/layout/auth-layout"
import { LoginPage } from "@/pages/auth/login-page"
import { RegisterPage } from "@/pages/auth/register-page"
import { FoldersPage } from "@/pages/folders/folders-page"
import { IntegrationsPage } from "@/pages/integrations/integrations-page"
import { ProcessingPage } from "@/pages/recordings/processing-page"
import { RecordingPage } from "@/pages/recordings/recording-page"
import { RecordingsPage } from "@/pages/recordings/recordings-page"
import { UploadPage } from "@/pages/recordings/upload-page"

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route
                        path="/"
                        element={<RecordingsPage />}
                    />
                    <Route
                        path="/recordings"
                        element={<RecordingsPage />}
                    />
                    <Route
                        path="/upload"
                        element={<UploadPage />}
                    />
                    <Route
                        path="/folders"
                        element={<FoldersPage />}
                    />
                    <Route
                        path="/integrations"
                        element={<IntegrationsPage />}
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
                <Route element={<AuthLayout />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage />}
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
        </BrowserRouter>
    )
}

export default App
