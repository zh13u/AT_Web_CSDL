"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { api } from "@/lib/api";
import { useUIStore } from "@/store/ui";

const forgotSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const { addToast } = useUIStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotForm>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = async (data: ForgotForm) => {
        setIsLoading(true);
        try {
            await api.post("/api/auth/forgot", data);
            setIsSent(true);
            addToast({
                id: Date.now().toString(),
                type: "success",
                message: "Link đặt lại mật khẩu đã được gửi đến email của bạn",
            });
        } catch (error: any) {
            addToast({
                id: Date.now().toString(),
                type: "error",
                message: error.message || "Có lỗi xảy ra",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <div className="card max-w-md w-full p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Quên mật khẩu</h1>

                {!isSent ? (
                    <>
                        <p className="text-muted text-center mb-6">
                            Nhập email đăng ký của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full"
                            >
                                {isLoading ? "Đang gửi..." : "Gửi link đặt lại"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-lg mb-4">Email đã được gửi!</p>
                        <p className="text-muted text-sm">
                            Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
                        </p>
                    </div>
                )}

                <p className="text-center mt-6 text-sm text-muted">
                    <Link href="/auth/login" className="text-brand hover:underline">
                        Quay lại đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}
