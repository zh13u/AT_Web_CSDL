import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const registerSchema = z
    .object({
        name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
        email: z.string().email("Email không hợp lệ"),
        phone: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
        password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });

export const forgotPasswordSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
});

export const reviewSchema = z.object({
    rating: z.number().min(1, "Vui lòng chọn số sao").max(5),
    content: z.string().min(10, "Nội dung đánh giá phải có ít nhất 10 ký tự"),
    media: z
        .array(
            z.object({
                type: z.enum(["image", "video"]),
                file: z.instanceof(File),
                preview: z.string(),
            })
        )
        .max(5, "Tối đa 5 media")
        .optional(),
});

export const checkoutSchema = z.object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    phone: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    address: z.string().min(10, "Địa chỉ phải có ít nhất 10 ký tự"),
    city: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
    district: z.string().min(1, "Vui lòng chọn quận/huyện"),
    note: z.string().optional(),
    paymentMethod: z.enum(["cod", "transfer", "installment"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
