export function formatFileSize(bytes: number) {
    const megabyte = 1024 * 1024
    const size = bytes >= megabyte ? bytes / megabyte : bytes / 1024
    const unit = bytes >= megabyte ? "МБ" : "КБ"

    return `${new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(size)} ${unit}`
}
