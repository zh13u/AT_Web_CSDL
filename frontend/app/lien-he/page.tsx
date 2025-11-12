export default function ContactPage() {
    return (
        <div className="container py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Liên hệ với chúng tôi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="card p-6">
                        <h2 className="font-semibold mb-4">Thông tin liên hệ</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium mb-1">Hotline</h3>
                                <p className="text-muted">1800 6969 (Miễn phí, 8:00 - 22:00)</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-1">Email</h3>
                                <p className="text-muted">support@phoneshop.vn</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-1">Địa chỉ</h3>
                                <p className="text-muted">123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-1">Giờ làm việc</h3>
                                <p className="text-muted">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h2 className="font-semibold mb-4">Mạng xã hội</h2>
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                            >
                                Facebook
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                            >
                                YouTube
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card p-6">
                    <h2 className="font-semibold mb-4">Gửi tin nhắn</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="label">Họ tên *</label>
                            <input type="text" className="input" placeholder="Nguyễn Văn A" required />
                        </div>
                        <div>
                            <label className="label">Email *</label>
                            <input type="email" className="input" placeholder="email@example.com" required />
                        </div>
                        <div>
                            <label className="label">Số điện thoại</label>
                            <input type="tel" className="input" placeholder="0912345678" />
                        </div>
                        <div>
                            <label className="label">Nội dung *</label>
                            <textarea
                                className="input"
                                rows={5}
                                placeholder="Nhập nội dung cần hỗ trợ..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            Gửi tin nhắn
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
