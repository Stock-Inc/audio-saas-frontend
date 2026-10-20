import type { ReactNode } from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthCard({
    title,
    description,
    children,
}: {
    title: string
    description: string
    children: ReactNode
}) {
    return (
        <Card className="w-full max-w-sm gap-0 border border-border/60 bg-card p-5 shadow-none ring-0">
            <h1 className="text-2xl leading-tight">{title}</h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
                {description}
            </p>
            {children}
        </Card>
    )
}

export function AuthField({
    id,
    label,
    type = "text",
    placeholder,
}: {
    id: string
    label: string
    type?: string
    placeholder: string
}) {
    return (
        <div className="space-y-1">
            <Label
                htmlFor={id}
                className="font-mono text-xs font-normal text-muted-foreground"
            >
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                className="h-7 border border-border/70 px-2 font-mono text-xs"
            />
        </div>
    )
}
