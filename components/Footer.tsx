import Link from "next/link";
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-surface border-t border-border mt-auto">
            <div className="container py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-semibold mb-4">Về PhoneShop</h3>
                        <p className="text-sm text-muted mb-4">
                            Hệ thống bán lẻ điện thoại di động uy tín tại Việt Nam với hàng trăm cửa hàng trên toàn quốc.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-border rounded-lg"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-border rounded-lg"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="font-semibold mb-4">Sản phẩm</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/dien-thoai?brand=apple" className="text-muted hover:text-brand">
                                    iPhone
                                </Link>
                            </li>
                            <li>
                                <Link href="/dien-thoai?brand=samsung" className="text-muted hover:text-brand">
                                    Samsung
                                </Link>
                            </li>
                            <li>
                                <Link href="/dien-thoai?brand=xiaomi" className="text-muted hover:text-brand">
                                    Xiaomi
                                </Link>
                            </li>
                            <li>
                                <Link href="/dien-thoai?brand=oppo" className="text-muted hover:text-brand">
                                    OPPO
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="font-semibold mb-4">Chính sách</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/chinh-sach-bao-hanh" className="text-muted hover:text-brand">
                                    Chính sách bảo hành
                                </Link>
                            </li>
                            <li>
                                <Link href="/chinh-sach-doi-tra" className="text-muted hover:text-brand">
                                    Chính sách đổi trả
                                </Link>
                            </li>
                            <li>
                                <Link href="/chinh-sach-tra-gop" className="text-muted hover:text-brand">
                                    Chính sách trả góp
                                </Link>
                            </li>
                            <li>
                                <Link href="/chinh-sach-bao-mat" className="text-muted hover:text-brand">
                                    Chính sách bảo mật
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Liên hệ</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <Phone className="h-4 w-4 mt-0.5 text-muted" />
                                <span className="text-muted">1800 6969 (Miễn phí)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="h-4 w-4 mt-0.5 text-muted" />
                                <span className="text-muted">support@phoneshop.vn</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5 text-muted" />
                                <span className="text-muted">
                                    123 Đường ABC, Quận 1, TP. Hồ Chí Minh
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted">
                    <p>© 2024 PhoneShop. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
}
