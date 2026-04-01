---
description: Khởi tạo kiến trúc dự án (backend hoặc frontend). Cài đặt cấu hình, thư mục và dependencies cơ bản.
---

# Quy trình Khởi tạo Kiến trúc Dự án

Sử dụng quy trình này khi bạn muốn thiết lập cấu trúc thư mục, cài đặt dependencies và cấu hình môi trường cho backend hoặc frontend.

> [!IMPORTANT]
> Quy trình này CHỈ thiết lập khung sườn. Không bao gồm mã nguồn cho các tính năng (feature code).

## Các bước thực hiện

### 1. Kiểm tra đầu vào
- Xác định dự án cần khởi tạo: `backend` hoặc `frontend`.
- Kiểm tra xem thư mục mục tiêu đã có `package.json` chưa.

### 2. Đọc tài liệu hướng dẫn (BẮT BUỘC)
Trước khi tạo bất kỳ tệp tin nào, hãy đọc kỹ:
- `01-share-docs/DATABASE.md` (Schema, Entity)
- `01-share-docs/API_SPEC.md` (API contracts)
- Tài liệu Rules tương ứng (`BE-PROJECT-RULES.md` hoặc `FE-PROJECT-RULES.md`)

### 3. Cài đặt Dependencies còn thiếu
- Kiểm tra `package.json` hiện tại.
- Chỉ cài đặt những gói (package) còn thiếu đã được quy định trong tài liệu.
- Liệt kê danh sách và yêu cầu người dùng xác nhận trước khi chạy lệnh cài đặt.

### 4. Tạo cấu trúc thư mục
Tạo các thư mục theo chuẩn Architecture:
- `src/features/` (Các thư mục tính năng trống: `auth`, `product`, `cart`, `order`, `review`)
- `src/shared/` (Tiện ích dùng chung)
- `src/core/` (Backend: database, logger setup) hoặc `src/routes/` (Frontend: routing setup)

### 5. Thiết lập tệp cấu hình
- Tạo hoặc cập nhật `.env.example`.
- Thiết lập cấu hình cơ sở dữ liệu hoặc API client (Axios).
- Đăng ký các Filter, Interceptor, Pipe toàn cục (Global).

### 6. Xác nhận hoàn tất
- Sau khi xong, liệt kê danh sách các thư mục/tệp tin đã tạo.
- Hướng dẫn người dùng các bước tiếp theo (ví dụ: copy `.env.example` thành `.env`, chạy thử dự án).

---

## Các lưu ý quan trọng
- **KHÔNG** xóa hoặc ghi đè các tệp tin đã tồn tại mà không hỏi ý kiến người dùng.
- Báo cáo rõ ràng những tệp tin nào đã được bỏ qua vì đã tồn tại.
- Giữ cho mã nguồn "Hello World" (nếu có) luôn hoạt động sau khi khởi tạo.
