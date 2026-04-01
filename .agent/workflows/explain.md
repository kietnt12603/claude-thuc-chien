---
description: Giải thích code, concepts, flow, hoặc decisions (Hỗ trợ EN/VI).
---

# Explain Workflow

**Scope:** Phân tích và giải thích code, tệp tin, hoặc tóm tắt luồng hoạt động.
**Arguments:** `[code|concept|flow|why] [target]` `[--en|--vi]` (Ngôn ngữ đầu ra. Mặc định là `--vi`).

## Usage

```
/explain code [feature-name]        → What the code does
/explain concept [concept-name]     → Pattern/concept explanation
/explain flow [feature-name]        → Request/data flow
/explain why [decision]             → Reasoning behind decisions
```

## Workflow Steps

1. **Ask language**: "English or Vietnamese? (en/vi)" (Nếu user không truyền flag). Mặc định là Tiếng Việt.
2. **Read docs FIRST (no source scanning):**
   - Lựa chọn thứ tự đọc tài liệu dựa trên Mode:
     | Mode | Đọc theo thứ tự (ưu tiên cao -> thấp) |
     |------|---------------|
     | `code` | `CONTEXT.md` (của feature) → `BE/FE-ARCHITECTURE.md` |
     | `concept` | `BE/FE-PROJECT-RULES.md` → `ARCHITECTURE.md` |
     | `flow` | `API_SPEC.md` → `CONTEXT.md` (của feature) |
     | `why` | `PROJECT-RULES.md` → `DATABASE.md` (nếu liên quan) |

3. **Only read specific source file** nếu user cung cấp chính xác đường dẫn file cần giải thích.
4. **Use Template**: Áp dụng ĐÚNG template dưới đây tuỳ theo Ngôn ngữ (EN/VI) và Mode (`code`, `concept`, `flow`, `why`).

## Rules
- **NEVER Glob/scan source code**: Tài liệu chứa quyết định kiến trúc, `CONTEXT.md` chứa chi tiết feature. Hãy tập trung vào tài liệu.
- Chỉ đọc source file gốc nếu có chỉ thị cụ thể từ đường dẫn.

---

## 🇻🇳 Tiếng Việt Templates

### 1. Giải thích Code
```markdown
## 📁 File: {filename}

### Mục đích
[1-2 câu mô tả file này làm gì]

### Phân tích
**Imports**
- Import X từ Y để [mục đích]

**Class/function chính**
- [Giải thích logic]
- [Dùng ví dụ đời thường nếu cần]

**Các methods**
- `methodX()`: [làm gì, khi nào được gọi]

### 💡 Điểm cần nhớ
- Điểm 1
- Điểm 2

### 🔗 Liên kết
- Được gọi bởi: ...
- Gọi tới: ...
```

### 2. Giải thích Concept
```markdown
## 🎯 {Tên Concept}

### Là gì?
[Giải thích đơn giản, 2-3 câu]

### Ví dụ đời thường
[So sánh với thứ quen thuộc]
Ví dụ: Repository Pattern giống như **thủ thư**: Bạn không vào kho tìm sách, bạn hỏi thủ thư.

### Trong code
\```typescript
// Ví dụ code ngắn
\```

### Tại sao cần? / Không dùng thì sao?
- Lý do dùng | Vấn đề khi không dùng

### 📚 Tìm hiểu thêm
- Từ khóa để search
```

### 3. Giải thích Flow
```markdown
## 🔄 Flow: {Tên Action}

### Tổng quan & Sơ đồ
[1-2 câu mô tả flow]
\```
[Client] -> [Controller] -> [Service] -> [Repository] -> [DB] -> [Response]
\```

### Chi tiết từng bước
**Bước 1: Client gửi request** (Endpoint: POST /xxx)
**Bước 2: Controller nhận** (Validate DTO, chuyển logic)
**Bước 3: Service xử lý** (Xử lý nghiệp vụ)
**Bước 4: Repository truy vấn** (Lệnh gửi xuống Database)

### 🔍 Mẹo debug
- Nếu lỗi ở bước X, kiểm tra...
```

### 4. Giải thích Why
```markdown
## ❓ Tại sao: {Câu hỏi}

### Trả lời ngắn
[1-2 câu trực tiếp]

### Giải thích chi tiết
**Lý do 1:** ...
**Lý do 2:** ...

### Đánh đổi (Trade-offs)
| Ưu điểm | Nhược điểm |
|---------|------------|
| ... | ... |

### Có cách khác không?
[Lựa chọn thay thế]
```

---

## 🇬🇧 English Templates

### 1. Code Explanation
```markdown
## 📁 File: {filename}
### Purpose
[1-2 sentences overview]

### Breakdown
**Imports**: - X from Y for [purpose]
**Main class/function**: [Logic & Analogies]
**Methods**: `methodX()` [purpose]
### 💡 Key Points / 🔗 Connections
```

### 2. Concept Explanation
```markdown
## 🎯 {Concept Name}
### What is it?
[Simple explanation]
### Real-world Analogy
[Analogy e.g. Librarian for Repository]
### In code / Why use it? / Without it?
```

### 3. Flow Explanation
```markdown
## 🔄 Flow: {Action Name}
### Overview & Diagram
\```
[Client] -> [Controller] -> [Service] -> ...
\```
### Step by Step / 🔍 Debug tips
```

### 4. Why Explanation
```markdown
## ❓ Why: {Question}
### Short Answer
[1-2 sentences]
### Detailed / Trade-offs / Alternatives
```
