import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SettingSelect({
    label,
    defaultValue,
    options,
}: {
    label: string
    defaultValue: string
    options: { value: string; label: string }[]
}) {
    return (
        <div className="grid items-center gap-2 sm:grid-cols-[1fr_1.05fr]">
            <span className="font-mono text-sm">{label}</span>
            <Select defaultValue={defaultValue}>
                <SelectTrigger className="h-7 w-full border border-border/70 bg-card px-2 font-mono text-sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
