"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AuthDialogProps {
    isOpen: boolean;
    onClose: () => void;
    redirectUrl?: string;
}

export function AuthDialog({ isOpen, onClose, redirectUrl }: AuthDialogProps) {
    const router = useRouter();

    const handleLogin = () => {
        onClose();
        const url = redirectUrl ? `/auth/login?redirect=${redirectUrl}` : "/auth/login";
        router.push(url);
    };

    const handleRegister = () => {
        onClose();
        const url = redirectUrl ? `/auth/register?redirect=${redirectUrl}` : "/auth/register";
        router.push(url);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <div className="text-center py-6">
                    {/* Smember Robot Icon */}
                    <div className="w-24 h-24 mx-auto mb-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="45" fill="#FF4444" />
                            <circle cx="35" cy="40" r="8" fill="white" />
                            <circle cx="65" cy="40" r="8" fill="white" />
                            <circle cx="35" cy="40" r="4" fill="#333" />
                            <circle cx="65" cy="40" r="4" fill="#333" />
                            <path d="M 30 65 Q 50 75 70 65" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-danger mb-3">Smember</h2>

                    <p className="text-muted mb-6">
                        Vui lòng đăng nhập tài khoản Smember để xem
                        <br />
                        ưu đãi và thanh toán dễ dàng hơn.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={handleLogin}
                            className="w-full btn-primary"
                        >
                            Đăng nhập
                        </button>

                        <button
                            onClick={handleRegister}
                            className="w-full btn-outline"
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
