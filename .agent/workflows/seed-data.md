---
description: Tạo dữ liệu mẫu sử dụng @faker-js/faker cho backend.
---

# Seed Data Generator

## Use when: 
User says "seed", "fake data", "generate data", "mock data", "tạo data test", "tạo dữ liệu mẫu", or wants sample data for testing.

## Argument Hint:
`[entity-name] [count]`

## Usage

```
/seed-data users 20         → Seed 20 users (auto-seed roles first)
/seed-data products 50      → Seed products (auto-seed categories first)
```

## Workflow

1. **Read**: `01-share-docs/DATABASE.md` + `backend-nest-hoidanit/package.json`

2. **Check prerequisites**:
   - `@faker-js/faker` in devDependencies?
   - `scripts.seed` exists in `package.json`?

3. **Resolve dependencies** from `backend-nest-hoidanit/.claude/skills/seed-data/references/dependency-map.md`

4. **Show plan & confirm** (see `backend-nest-hoidanit/.claude/skills/seed-data/templates/plan.md`)

5. **Execute after "yes"**:
   - Install missing deps: `npm install -D @faker-js/faker`
   - Update `package.json` if needed (add `seed` script: `ts-node src/database/seeds/run-seed.ts`)
   - Create seeders from `backend-nest-hoidanit/.claude/skills/seed-data/templates/seeder.ts`
   - Run: `npm run seed -- {entity} {count}` (inside `backend-nest-hoidanit/`)

## Rules

- Check entity exists in `src/features/` before creating seeder
- Auto-seed dependencies (recursive)
- Skip if already seeded (check count in DB)
- Fixed accounts for testing: admin@example.com / admin123
- Hash passwords always using the project's hashing utility
