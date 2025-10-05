export default function WarrantyPolicyPage() {
    return (
        <div className="container py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Chính sách bảo hành</h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Thời gian bảo hành</h2>
                    <p className="text-muted mb-4">
                        Tất cả sản phẩm điện thoại tại PhoneShop đều được bảo hành chính hãng 12 tháng kể từ
                        ngày mua hàng.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Điều kiện bảo hành</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted">
                        <li>Sản phẩm còn trong thời gian bảo hành</li>
                        <li>Có phiếu bảo hành và hóa đơn mua hàng hợp lệ</li>
                        <li>Lỗi do nhà sản xuất (lỗi kỹ thuật, phần cứng)</li>
                        <li>Tem bảo hành còn nguyên vẹn, không bị rách, mờ hoặc tẩy xóa</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Các trường hợp không được bảo hành</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted">
                        <li>Sản phẩm hết thời gian bảo hành</li>
                        <li>Không có hóa đơn hoặc phiếu bảo hành</li>
                        <li>Lỗi do người sử dụng (rơi vỡ, va đập, ngấm nước...)</li>
                        <li>Sản phẩm đã qua sửa chữa bởi bên thứ ba không được ủy quyền</li>
                        <li>Tem bảo hành bị rách, mờ hoặc có dấu hiệu can thiệp</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Quy trình bảo hành</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-muted">
                        <li>Mang sản phẩm và phiếu bảo hành đến cửa hàng PhoneShop gần nhất</li>
                        <li>Nhân viên kiểm tra và xác nhận lỗi</li>
                        <li>Tiếp nhận sản phẩm và cấp phiếu bảo hành</li>
                        <li>Thời gian xử lý: 7-15 ngày làm việc</li>
                        <li>Nhận lại sản phẩm đã được sửa chữa hoặc thay thế</li>
                    </ol>
                </section>

                <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6 mt-8">
                    <h3 className="font-semibold mb-2">Liên hệ hỗ trợ</h3>
                    <p className="text-sm text-muted">
                        Hotline: 1800 6969 (Miễn phí) - Email: support@phoneshop.vn
                    </p>
                </div>
            </div>
        </div>
    );
}
