import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
    id: string;
    type: ToastType;
    message: string;
};

type UIStore = {
    toasts: Toast[];
    isMobileMenuOpen: boolean;
    addToast: (type: ToastType, message: string) => void;
    removeToast: (id: string) => void;
    setMobileMenuOpen: (isOpen: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
    toasts: [],
    isMobileMenuOpen: false,

    addToast: (type, message) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, type, message }],
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id),
            }));
        }, 3000);
    },

    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),

    setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
}));
