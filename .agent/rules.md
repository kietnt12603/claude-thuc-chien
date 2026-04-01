# Quy tắc Dự án (Project Rules)

## 1. Công nghệ (Tech Stack)
- **Backend**: NestJS v11, TypeORM, MySQL 8.x
- **Frontend**: React 19 + Vite, TanStack Query, Tailwind CSS, Axios, Router v7
- **Ngôn ngữ**: TypeScript (Strict)

## 2. Quy tắc đặt tên (Naming)
- File/Folder: `kebab-case`.
- Class/Component: `PascalCase`.
- Var/Func: `camelCase`.
- Entity: `PascalCase` singular.

## 3. Mẫu thiết kế (Patterns)
- Feature-based architecture (`src/features/[name]`).
- Backend: Không logic trong Controller, dùng Repository cho query phức tạp.
- Frontend: Không dùng useEffect để fetch dữ liệu (Dùng TanStack Query).
- Luôn sử dụng Barrel exports (`index.ts`).

## 4. Quy trình làm việc
- Ngôn ngữ mã nguồn: tiếng Anh.
- Ngôn ngữ trao đổi/nhắc nhở: tiếng Việt.
- Tuân thủ nghiêm ngặt `01-share-docs/` (API & DB Spec).
