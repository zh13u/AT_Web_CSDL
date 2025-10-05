export default function ChinhSachBaoMatPage() {
    return (
        <div className="container py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Chính Sách Bảo Mật Thông Tin</h1>

                <div className="card p-6 space-y-6">
                    <section>
                        <p className="text-muted mb-4">
                            <strong>Cập nhật lần cuối:</strong> 05/10/2025
                        </p>
                        <p className="text-muted">
                            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng.
                            Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Thông Tin Chúng Tôi Thu Thập</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">1.1. Thông tin cá nhân</h3>
                                <ul className="text-muted space-y-1 ml-4">
                                    <li>• Họ tên, số điện thoại, email</li>
                                    <li>• Địa chỉ giao hàng, địa chỉ thanh toán</li>
                                    <li>• CMND/CCCD (chỉ khi trả góp)</li>
                                    <li>• Thông tin thanh toán (được mã hóa)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">1.2. Thông tin tự động</h3>
                                <ul className="text-muted space-y-1 ml-4">
                                    <li>• Địa chỉ IP, loại thiết bị, trình duyệt</li>
                                    <li>• Thời gian truy cập, trang đã xem</li>
                                    <li>• Cookie và công nghệ theo dõi tương tự</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Mục Đích Sử Dụng Thông Tin</h2>
                        <div className="space-y-2 text-muted">
                            <p>✓ Xử lý đơn hàng và giao hàng</p>
                            <p>✓ Gửi thông báo về trạng thái đơn hàng</p>
                            <p>✓ Cung cấp dịch vụ chăm sóc khách hàng</p>
                            <p>✓ Cải thiện trải nghiệm mua sắm</p>
                            <p>✓ Gửi thông tin khuyến mãi (nếu đã đồng ý)</p>
                            <p>✓ Phòng chống gian lận và bảo mật</p>
                            <p>✓ Tuân thủ yêu cầu pháp lý</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. Bảo Vệ Thông Tin</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-surface rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🔒</span>
                                    <h3 className="font-semibold">Mã hóa SSL/TLS</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Tất cả dữ liệu truyền tải được mã hóa an toàn
                                </p>
                            </div>

                            <div className="p-4 bg-surface rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🛡️</span>
                                    <h3 className="font-semibold">Tường lửa</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Hệ thống tường lửa bảo vệ chống truy cập trái phép
                                </p>
                            </div>

                            <div className="p-4 bg-surface rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🔐</span>
                                    <h3 className="font-semibold">Xác thực 2 lớp</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Tùy chọn bảo mật tài khoản với xác thực 2 yếu tố
                                </p>
                            </div>

                            <div className="p-4 bg-surface rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">👥</span>
                                    <h3 className="font-semibold">Quyền truy cập</h3>
                                </div>
                                <p className="text-sm text-muted">
                                    Chỉ nhân viên được ủy quyền mới truy cập được
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Chia Sẻ Thông Tin</h2>
                        <div className="space-y-3">
                            <p className="text-muted">
                                Chúng tôi <strong>KHÔNG</strong> bán hoặc cho thuê thông tin cá nhân của bạn.
                                Thông tin chỉ được chia sẻ với:
                            </p>
                            <div className="space-y-2 text-muted ml-4">
                                <p>• <strong>Đối tác vận chuyển:</strong> Để giao hàng đến bạn</p>
                                <p>• <strong>Đối tác thanh toán:</strong> Để xử lý giao dịch an toàn</p>
                                <p>• <strong>Công ty tài chính:</strong> Khi bạn chọn trả góp</p>
                                <p>• <strong>Cơ quan pháp luật:</strong> Khi có yêu cầu hợp pháp</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Quyền Của Bạn</h2>
                        <div className="space-y-2 text-muted">
                            <p>✓ <strong>Truy cập:</strong> Xem thông tin cá nhân chúng tôi lưu trữ</p>
                            <p>✓ <strong>Sửa đổi:</strong> Cập nhật thông tin không chính xác</p>
                            <p>✓ <strong>Xóa:</strong> Yêu cầu xóa tài khoản và dữ liệu</p>
                            <p>✓ <strong>Từ chối:</strong> Không nhận email marketing</p>
                            <p>✓ <strong>Di chuyển:</strong> Xuất dữ liệu sang định dạng khác</p>
                            <p>✓ <strong>Khiếu nại:</strong> Liên hệ nếu có vi phạm quyền riêng tư</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">6. Cookie</h2>
                        <p className="text-muted mb-3">
                            Chúng tôi sử dụng cookie để:
                        </p>
                        <div className="space-y-2 text-muted ml-4">
                            <p>• Ghi nhớ đăng nhập và giỏ hàng</p>
                            <p>• Phân tích lưu lượng truy cập</p>
                            <p>• Cá nhân hóa nội dung</p>
                            <p>• Cải thiện hiệu suất website</p>
                        </div>
                        <p className="text-muted mt-3">
                            Bạn có thể tắt cookie trong trình duyệt, nhưng một số tính năng có thể không hoạt động.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">7. Lưu Trữ Thông Tin</h2>
                        <p className="text-muted">
                            Thông tin của bạn được lưu trữ:
                        </p>
                        <div className="space-y-2 text-muted ml-4 mt-2">
                            <p>• Trong thời gian bạn còn tài khoản</p>
                            <p>• Hoặc theo yêu cầu pháp lý (ít nhất 5 năm cho hóa đơn)</p>
                            <p>• Sau đó sẽ được xóa hoặc ẩn danh hóa an toàn</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">8. Bảo Mật Trẻ Em</h2>
                        <p className="text-muted">
                            Dịch vụ của chúng tôi không dành cho trẻ em dưới 16 tuổi.
                            Chúng tôi không cố ý thu thập thông tin từ trẻ em.
                            Nếu bạn là phụ huynh và phát hiện con mình cung cấp thông tin,
                            vui lòng liên hệ để chúng tôi xóa dữ liệu.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">9. Cập Nhật Chính Sách</h2>
                        <p className="text-muted">
                            Chúng tôi có thể cập nhật chính sách này theo thời gian.
                            Thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo trên website.
                            Việc bạn tiếp tục sử dụng dịch vụ sau khi cập nhật đồng nghĩa với việc chấp nhận chính sách mới.
                        </p>
                    </section>

                    <section className="bg-surface p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-3">📞 Liên Hệ</h2>
                        <p className="text-muted mb-3">
                            Nếu bạn có câu hỏi về chính sách bảo mật hoặc muốn thực hiện quyền của mình:
                        </p>
                        <div className="space-y-2 text-muted">
                            <p>
                                <strong>Email:</strong>{" "}
                                <a href="mailto:privacy@phonestore.vn" className="text-brand">
                                    privacy@phonestore.vn
                                </a>
                            </p>
                            <p>
                                <strong>Hotline:</strong>{" "}
                                <a href="tel:1900xxxx" className="text-brand font-semibold">
                                    1900 xxxx
                                </a>
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
