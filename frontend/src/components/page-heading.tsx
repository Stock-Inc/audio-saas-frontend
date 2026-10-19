import type { ReactNode } from "react"

type PageHeadingProps = {
    title: string
    eyebrow?: string
    action?: ReactNode
}

export function PageHeading({ title, eyebrow, action }: PageHeadingProps) {
    return (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
                {eyebrow && (
                    <p className="mb-1 font-mono text-xs uppercase tracking-wide text-primary">
                        {eyebrow}
                    </p>
                )}
                <h1 className="text-2xl font-normal tracking-tight">
                    {title}
                </h1>
            </div>
            {action}
        </div>
    )
}
