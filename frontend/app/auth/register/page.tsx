"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { api } from "@/lib/api";
import { useUIStore } from "@/store/ui";

const registerSchema = z.object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useUIStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true);
        try {
            await api.post("/api/auth/register", {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
            });

            addToast({
                id: Date.now().toString(),
                type: "success",
                message: "Đăng ký thành công! Vui lòng đăng nhập.",
            });

            router.push("/auth/login");
        } catch (error: any) {
            addToast({
                id: Date.now().toString(),
                type: "error",
                message: error.message || "Đăng ký thất bại",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className="card max-w-md w-full p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Họ và tên</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="Nguyễn Văn A"
                        />
                        {errors.name && (
                            <p className="text-danger text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="email@example.com"
                        />
                        {errors.email && (
                            <p className="text-danger text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Số điện thoại</label>
                        <input
                            type="tel"
                            {...register("phone")}
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="0912345678"
                        />
                        {errors.phone && (
                            <p className="text-danger text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-danger text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            {...register("confirmPassword")}
                            className="w-full px-4 py-2 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
                            <p className="text-danger text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full"
                    >
                        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-muted">
                    Đã có tài khoản?{" "}
                    <Link href="/auth/login" className="text-brand hover:underline">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
