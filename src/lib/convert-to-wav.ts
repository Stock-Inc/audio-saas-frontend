import { FFmpeg } from "@ffmpeg/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import coreURL from "@ffmpeg/core?url"
import wasmURL from "@ffmpeg/core/wasm?url"

const ffmpeg = new FFmpeg()
let loadPromise: Promise<void> | null = null

async function getFFmpeg() {
    if (!loadPromise) {
        loadPromise = ffmpeg
            .load({ coreURL, wasmURL })
            .then(() => undefined)
            .catch((error: unknown) => {
                loadPromise = null
                throw error
            })
    }

    await loadPromise
    return ffmpeg
}

export async function convertToWav(file: File, id: string): Promise<File> {
    const engine = await getFFmpeg()
    const extension = file.name.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase()
    const inputPath = `${id}${extension ? `.${extension}` : ""}`
    const outputPath = `${id}-converted.wav`

    try {
        await engine.writeFile(inputPath, await fetchFile(file))

        const exitCode = await engine.exec([
            "-i",
            inputPath,
            "-map",
            "0:a:0",
            "-vn",
            "-c:a",
            "pcm_s16le",
            outputPath,
        ])

        if (exitCode !== 0) {
            throw new Error("Не удалось прочитать аудиодорожку файла")
        }

        const data = await engine.readFile(outputPath)
        if (typeof data === "string") {
            throw new Error("Неожиданный формат файла")
        }

        const name = `${file.name.replace(/\.[^.]+$/, "")}.wav`
        return new File([new Uint8Array(data)], name, { type: "audio/wav" })
    } finally {
        await Promise.allSettled([
            engine.deleteFile(inputPath),
            engine.deleteFile(outputPath),
        ])
    }
}
