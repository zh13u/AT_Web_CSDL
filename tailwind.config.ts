import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
    theme: {
        container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
        extend: {
            colors: {
                bg: "hsl(var(--bg))",
                surface: "hsl(var(--surface))",
                text: "hsl(var(--text))",
                muted: "hsl(var(--muted))",
                border: "hsl(var(--border))",
                brand: { DEFAULT: "hsl(var(--brand))", fg: "hsl(var(--brand-fg))", dark: "hsl(var(--brand-dark))" },
                success: "hsl(var(--success))",
                warning: "hsl(var(--warning))",
                danger: "hsl(var(--danger))",
            },
            boxShadow: {
                soft: "0 20px 60px rgba(15, 23, 42, .08)",
                card: "0 20px 35px rgba(15, 23, 42, .08)",
            },
            borderRadius: { lg: "1.5rem", md: "1rem", sm: ".75rem" },
            keyframes: {
                shimmer: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(100%)" } },
                in: { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
            },
            animation: { shimmer: "shimmer 1.2s linear infinite", in: "in .18s ease-out" },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
