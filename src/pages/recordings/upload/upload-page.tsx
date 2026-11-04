import { PageHeading } from "@/components/page-heading"
import { MediaDropzone } from "@/pages/recordings/upload/media-dropzone"
import { ProcessingSettings } from "@/pages/recordings/upload/processing-settings"
import { UploadQueue } from "@/pages/recordings/upload/upload-queue"

export function UploadPage() {
    return (
        <>
            <PageHeading title="Загрузите аудио или видео" />
            <div className="grid gap-3 md:grid-cols-2 md:items-start">
                <MediaDropzone />
                <ProcessingSettings />
            </div>
            <UploadQueue />
        </>
    )
}
