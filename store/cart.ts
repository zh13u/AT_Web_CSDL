import { create } from "zustand";
import { CartItem } from "@/lib/types";

type CartStore = {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (sku: string) => void;
    updateQuantity: (sku: string, quantity: number) => void;
    clearCart: () => void;
    setOpen: (isOpen: boolean) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    isOpen: false,

    addItem: (newItem) =>
        set((state) => {
            const existingIndex = state.items.findIndex(
                (item) => item.variant.sku === newItem.variant.sku
            );

            if (existingIndex > -1) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex].quantity += newItem.quantity;
                return { items: updatedItems };
            }

            return { items: [...state.items, newItem] };
        }),

    removeItem: (sku) =>
        set((state) => ({
            items: state.items.filter((item) => item.variant.sku !== sku),
        })),

    updateQuantity: (sku, quantity) =>
        set((state) => ({
            items: state.items.map((item) =>
                item.variant.sku === sku ? { ...item, quantity } : item
            ),
        })),

    clearCart: () => set({ items: [] }),

    setOpen: (isOpen) => set({ isOpen }),

    getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
}));
