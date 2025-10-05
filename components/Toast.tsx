"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useUIStore } from "@/store/ui";

export function Toast() {
    const { toasts, removeToast } = useUIStore();

    useEffect(() => {
        toasts.forEach((toast) => {
            const timer = setTimeout(() => {
                removeToast(toast.id);
            }, 3000);
            return () => clearTimeout(timer);
        });
    }, [toasts, removeToast]);

    if (toasts.length === 0) return null;

    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        warning: AlertTriangle,
        info: Info,
    };

    const colors = {
        success: "bg-success text-white",
        error: "bg-danger text-white",
        warning: "bg-warning text-white",
        info: "bg-brand text-brand-fg",
    };

    return (
        <div className="fixed bottom-4 right-4 z-[100] space-y-2 max-w-sm w-full px-4">
            {toasts.map((toast) => {
                const Icon = icons[toast.type];
                return (
                    <div
                        key={toast.id}
                        className={`flex items-start gap-3 p-4 rounded-xl shadow-soft animate-in slide-in-from-bottom ${colors[toast.type]}`}
                    >
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <p className="flex-1 text-sm">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 hover:opacity-70"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
