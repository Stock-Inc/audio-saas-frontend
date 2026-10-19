import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { AuthCard, AuthField } from "@/pages/auth/components/auth-form"

export function LoginPage() {
    return (
        <AuthCard
            title="Вход"
            description="Войдите, чтобы продолжить работу с записями."
        >
            <div className="mt-4 space-y-3">
                <AuthField
                    id="login-email"
                    label="Эл. почта"
                    type="email"
                    placeholder="name@company.com"
                />
                <AuthField
                    id="login-password"
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                />
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                        <Checkbox
                            id="remember-me"
                            className="size-3"
                        />
                        <Label
                            htmlFor="remember-me"
                            className="font-mono text-xs font-normal normal-case tracking-normal text-muted-foreground"
                        >
                            Запомнить меня
                        </Label>
                    </div>
                    <span className="font-mono text-xs text-primary">Забыли пароль?</span>
                </div>
                <Button
                    type="button"
                    className="h-8 w-full normal-case tracking-normal"
                >
                    Войти
                </Button>
                <p className="text-center font-mono text-xs text-muted-foreground">
                    Нет аккаунта?{" "}
                    <Link
                        to="/register"
                        className="text-primary hover:underline"
                    >
                        Создать аккаунт
                    </Link>
                </p>
            </div>
        </AuthCard>
    )
}
