export default function ReturnPolicyPage() {
    return (
        <div className="container py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Chính sách đổi trả</h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Thời gian đổi trả</h2>
                    <p className="text-muted mb-4">
                        Quý khách có thể đổi trả sản phẩm trong vòng <strong>7 ngày</strong> kể từ ngày mua
                        hàng (theo dấu trên hóa đơn).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Điều kiện đổi trả</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted">
                        <li>Sản phẩm còn nguyên tem, hộp, phụ kiện đầy đủ</li>
                        <li>Sản phẩm chưa qua sử dụng, không có dấu hiệu trầy xước</li>
                        <li>Có hóa đơn mua hàng hợp lệ</li>
                        <li>Lỗi do nhà sản xuất hoặc vận chuyển</li>
                        <li>Sản phẩm không đúng như mô tả</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Quy trình đổi trả</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-muted">
                        <li>Liên hệ hotline 1800 6969 để được hỗ trợ</li>
                        <li>Chuẩn bị sản phẩm, hộp, phụ kiện và hóa đơn</li>
                        <li>Mang đến cửa hàng PhoneShop gần nhất</li>
                        <li>Nhân viên kiểm tra và xác nhận điều kiện đổi trả</li>
                        <li>Đổi sản phẩm mới hoặc hoàn tiền (nếu không còn hàng)</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Lưu ý</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted">
                        <li>Phí vận chuyển đổi trả do PhoneShop chịu (nếu lỗi từ nhà sản xuất)</li>
                        <li>
                            Phí vận chuyển do khách hàng chịu (nếu khách hàng đổi ý hoặc không vừa ý về sản phẩm)
                        </li>
                        <li>Sản phẩm khuyến mãi, giảm giá đặc biệt không áp dụng chính sách đổi trả</li>
                    </ul>
                </section>

                <div className="bg-brand/5 border border-brand/20 rounded-2xl p-6 mt-8">
                    <h3 className="font-semibold mb-2">Hỗ trợ đổi trả</h3>
                    <p className="text-sm text-muted">
                        Hotline: 1800 6969 - Email: doitra@phoneshop.vn
                    </p>
                </div>
            </div>
        </div>
    );
}
