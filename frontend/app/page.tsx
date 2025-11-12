import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default function HomePage() {
    const hotProducts = MOCK_PRODUCTS.filter((p) => p.isHot).slice(0, 8);
    const newProducts = MOCK_PRODUCTS.filter((p) => p.isNew).slice(0, 8);

    return (
        <div>
            {/* Hero Banner */}
            <section className="bg-gradient-to-r from-brand to-brand-dark text-white">
                <div className="container py-16 sm:py-24">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Điện thoại chính hãng
                            <br />
                            Giá tốt nhất thị trường
                        </h1>
                        <p className="text-lg mb-8 opacity-90">
                            Bảo hành 12 tháng, đổi trả trong 7 ngày. Trả góp 0% lãi suất.
                        </p>
                        <Link href="/dien-thoai" className="btn bg-white text-brand hover:bg-gray-100">
                            Khám phá ngay
                        </Link>
                    </div>
                </div>
            </section>

            {/* Hot Products */}
            <section className="section">
                <div className="container">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="section-title mb-0">Sản phẩm bán chạy</h2>
                        <Link href="/dien-thoai?sort=popular" className="text-brand hover:underline">
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="grid-products">
                        {hotProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Products */}
            <section className="section bg-bg">
                <div className="container">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="section-title mb-0">Sản phẩm mới</h2>
                        <Link href="/dien-thoai?sort=newest" className="text-brand hover:underline">
                            Xem tất cả →
                        </Link>
                    </div>
                    <div className="grid-products">
                        {newProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-brand"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Chính hãng 100%</h3>
                            <p className="text-sm text-muted">Cam kết sản phẩm chính hãng, bảo hành toàn quốc</p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-brand"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Trả góp 0%</h3>
                            <p className="text-sm text-muted">Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng</p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand/10 flex items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-brand"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Đổi trả dễ dàng</h3>
                            <p className="text-sm text-muted">Đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
