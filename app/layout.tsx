import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
    title: "PhoneShop - Hệ thống bán lẻ điện thoại uy tín",
    description:
        "Mua điện thoại chính hãng, giá tốt nhất. Bảo hành 12 tháng, đổi trả trong 7 ngày.",
    keywords: "điện thoại, smartphone, iPhone, Samsung, Xiaomi, OPPO",
    openGraph: {
        title: "PhoneShop - Hệ thống bán lẻ điện thoại uy tín",
        description:
            "Mua điện thoại chính hãng, giá tốt nhất. Bảo hành 12 tháng, đổi trả trong 7 ngày.",
        type: "website",
        locale: "vi_VN",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <Providers>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <Toast />
                </Providers>
            </body>
        </html>
    );
}
