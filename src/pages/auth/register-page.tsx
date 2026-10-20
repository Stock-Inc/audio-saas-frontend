import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AuthCard, AuthField } from "@/pages/auth/components/auth-form"

export function RegisterPage() {
    return (
        <AuthCard
            title="Создать аккаунт"
            description="Начните превращать аудио в текст и сводки."
        >
            <div className="mt-4 space-y-3">
                <AuthField
                    id="register-name"
                    label="Имя"
                    placeholder="Ваше имя"
                />
                <AuthField
                    id="register-email"
                    label="Эл. почта"
                    type="email"
                    placeholder="name@company.com"
                />
                <AuthField
                    id="register-password"
                    label="Пароль"
                    type="password"
                    placeholder="Не менее 8 символов"
                />
                <div className="flex items-center gap-1.5 py-1">
                    <Checkbox
                        id="accept-terms"
                        className="size-3"
                    />
                    <Label
                        htmlFor="accept-terms"
                        className="font-mono text-xs font-normal normal-case tracking-normal text-muted-foreground"
                    >
                        Согласен с условиями использования и политикой данных
                    </Label>
                </div>
                <Button
                    type="button"
                    className="h-8 w-full normal-case tracking-normal"
                >
                    Создать аккаунт
                </Button>
                <p className="text-center font-mono text-xs text-muted-foreground">
                    Уже есть аккаунт?{" "}
                    <Link
                        to="/login"
                        className="text-primary hover:underline"
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
