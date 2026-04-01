---
description: Xem thông tin tóm tắt về dự án, cấu trúc thư mục, và các quy tắc (Rules) quan trọng.
---

# Thông tin Dự án và Quy tắc (Rules)

Sử dụng quy trình này khi bạn muốn có cái nhìn tổng quan về trạng thái hiện tại của repo và các quy tắc đang áp dụng.

## 1. Tổng quan dự án
- **Tên dự án**: hoidanit-ecommerce
- **Mô tả**: Nền tảng thương mại điện tử hoàn thiện.
- **Cấu trúc**:
    - `backend-nest-hoidanit/`: NestJS API.
    - `frontend-react-hoidanit/`: React UI.
    - `01-share-docs/`: Tài liệu chung (DB, API).

## 2. Quy tắc quan trọng (Rules)
- Tuân thủ cấu trúc thư mục dựa trên **Feature**.
- Sử dụng **Kebab-case** cho tệp tin/thư mục.
- Sử dụng **PascalCase** cho các Class/Component.
- Luôn sử dụng **TanStack Query** (v5) cho quản lý trạng thái server ở frontend.
- Luôn thực hiện **Validation** dữ liệu đầu vào bằng DTOs (backend) và Zod (frontend).

## 3. Các lệnh điều khiển sẵn có (Commands)
- `/init-base [backend|frontend]`: Khởi tạo kiến trúc.
- `/be-crud [tính năng]`: Tạo CRUD cho backend.
- `/fe-crud [tính năng]`: Tạo CRUD cho frontend.
- `/be-test [tính năng]`: Viết bộ kiểm thử cho backend.
- `/fe-test [tính năng]`: Viết bộ kiểm thử cho frontend.

## 4. Kiểm tra mã nguồn nhanh
Hãy chỉ định tính năng hoặc tệp tin bạn muốn tôi phân tích cấu trúc ngay bây giờ.
