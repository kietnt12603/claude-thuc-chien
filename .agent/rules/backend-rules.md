# Quy tắc Backend (Backend Rules)

Dự án: **backend-nest-hoidanit**

## 1. Cấu trúc thư mục (Architecture)
- **Tính năng**: Phát triển theo mô hình feature-based tại `src/features/[feature-name]/`.
- **Cơ cốt lõi (Core)**: `src/core/` cho các thiết lập ban đầu (database, logger...).
- **Tiện ích chung (Shared)**: `src/shared/` cho decorators, guards, interceptors, pipes, utils.

## 2. Quy tắc phát triển (Development Patterns)
- **Controller**: Tuyệt đối **KHÔNG** viết logic nghiệp vụ. Chỉ dùng để routing, validate đầu vào và định nghĩa Swagger.
- **Service**: Nơi tập trung toàn bộ business logic.
- **Repository**: Chỉ dùng cho các truy vấn phức tạp (Sử dụng `createQueryBuilder`). Các truy vấn đơn giản hãy gọi trực tiếp thông qua repo mặc định trong Service.
- **Thực thể (Entity)**: Phải khớp hoàn toàn với `01-share-docs/DATABASE.md`.
- **Validation**: Bắt buộc sử dụng `class-validator` trong DTOs.
- **Xử lý lỗi**: Sử dụng NestJS built-in exceptions (như `NotFoundException`, `ForbiddenException`...).

## 3. Quy định khác
- **KHÔNG** sử dụng kiểu `any`.
- LUÔN sử dụng `ConfigService` để lấy các biến môi trường từ `.env`.
- Mã lỗi API cần tuân thủ tiền tố theo tính năng (ví dụ: `AUTH_001`, `PRODUCT_001`).
- Luôn đăng ký Module mới trong `app.module.ts`.
