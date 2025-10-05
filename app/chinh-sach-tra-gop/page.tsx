export default function ChinhSachTraGopPage() {
    return (
        <div className="container py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Chính Sách Trả Góp</h1>

                <div className="card p-6 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Điều Kiện Trả Góp</h2>
                        <div className="space-y-2 text-muted">
                            <p>• Công dân Việt Nam từ 18 tuổi trở lên</p>
                            <p>• Có CMND/CCCD còn hiệu lực</p>
                            <p>• Có nguồn thu nhập ổn định</p>
                            <p>• Giá trị đơn hàng từ 3.000.000đ trở lên</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Hình Thức Trả Góp</h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-surface rounded-xl">
                                <h3 className="font-semibold mb-2">Trả góp qua thẻ tín dụng</h3>
                                <p className="text-sm text-muted mb-2">
                                    Áp dụng cho các thẻ tín dụng: Visa, Mastercard, JCB, Amex
                                </p>
                                <ul className="text-sm text-muted space-y-1">
                                    <li>• Kỳ hạn: 3, 6, 9, 12, 18, 24 tháng</li>
                                    <li>• Lãi suất: 0% cho kỳ hạn 3-6 tháng</li>
                                    <li>• Phí chuyển đổi: Tùy theo ngân hàng phát hành</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-surface rounded-xl">
                                <h3 className="font-semibold mb-2">Trả góp qua công ty tài chính</h3>
                                <p className="text-sm text-muted mb-2">
                                    Hợp tác với: Home Credit, FE Credit, HD Saison
                                </p>
                                <ul className="text-sm text-muted space-y-1">
                                    <li>• Kỳ hạn: 6, 9, 12, 18, 24 tháng</li>
                                    <li>• Lãi suất: Từ 0% - 2.5%/tháng</li>
                                    <li>• Trả trước: 0% - 20% giá trị đơn hàng</li>
                                    <li>• Duyệt hồ sơ nhanh trong 30 phút</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. Hồ Sơ Cần Thiết</h2>
                        <div className="space-y-2 text-muted">
                            <p>• CMND/CCCD (bản gốc hoặc photo công chứng)</p>
                            <p>• Hộ khẩu hoặc sổ tạm trú</p>
                            <p>• Giấy tờ chứng minh thu nhập (tùy chọn):</p>
                            <div className="ml-6 space-y-1">
                                <p>- Hợp đồng lao động</p>
                                <p>- Sao kê thu nhập 3 tháng gần nhất</p>
                                <p>- Giấy xác nhận lương</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Ưu Đãi Trả Góp</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border border-brand rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🎁</span>
                                    <h3 className="font-semibold">Trả góp 0%</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Áp dụng cho đơn hàng từ 5 triệu, kỳ hạn 3-6 tháng
                                </p>
                            </div>

                            <div className="p-4 border border-brand rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">💳</span>
                                    <h3 className="font-semibold">Không cần thẻ</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Trả góp online qua công ty tài chính, duyệt nhanh
                                </p>
                            </div>

                            <div className="p-4 border border-brand rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">⚡</span>
                                    <h3 className="font-semibold">Duyệt tức thì</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Hồ sơ được xét duyệt trong vòng 30 phút
                                </p>
                            </div>

                            <div className="p-4 border border-brand rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">📱</span>
                                    <h3 className="font-semibold">Trả góp online</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Đăng ký trực tuyến, nhận hàng tại nhà
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Quy Trình Trả Góp</h2>
                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium">Chọn sản phẩm và hình thức trả góp</p>
                                    <p className="text-sm text-muted">Chọn kỳ hạn và công ty tài chính phù hợp</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium">Điền thông tin và tải hồ sơ</p>
                                    <p className="text-sm text-muted">Cung cấp đầy đủ thông tin cá nhân và giấy tờ</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium">Chờ duyệt hồ sơ</p>
                                    <p className="text-sm text-muted">Thời gian duyệt: 15-30 phút</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-brand-fg flex items-center justify-center font-semibold">
                                    4
                                </div>
                                <div>
                                    <p className="font-medium">Ký hợp đồng và nhận hàng</p>
                                    <p className="text-sm text-muted">Ký xác nhận và nhận sản phẩm ngay</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-surface p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-3">📞 Liên Hệ Tư Vấn</h2>
                        <p className="text-muted mb-2">
                            Hotline: <a href="tel:1900xxxx" className="text-brand font-semibold">1900 xxxx</a> (8:00 - 21:00)
                        </p>
                        <p className="text-muted">
                            Email: <a href="mailto:hotro@phonestore.vn" className="text-brand">hotro@phonestore.vn</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
