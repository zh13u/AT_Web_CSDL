"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/schemas";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated, isLoginLoading, loginError } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const onSubmit = (data: LoginInput) => {
        login(data);
    };

    return (
        <div className="container max-w-md py-16">
            <div className="card p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="help text-danger">{errors.email.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && <p className="help text-danger">{errors.password.message}</p>}
                    </div>

                    {loginError && <p className="text-sm text-danger">{String(loginError)}</p>}

                    <Button type="submit" variant="primary" className="w-full" disabled={isLoginLoading}>
                        {isLoginLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link href="/auth/forgot" className="text-brand hover:underline">
                        Quên mật khẩu?
                    </Link>
                </div>

                <div className="mt-4 text-center text-sm text-muted">
                    Chưa có tài khoản?{" "}
                    <Link href="/auth/register" className="text-brand hover:underline">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}
