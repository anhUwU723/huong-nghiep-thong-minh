# Hướng Nghiệp Thông Minh

## Overview

Ứng dụng hỗ trợ hướng nghiệp thông minh cho học sinh THPT Việt Nam. Hệ thống tra cứu thông tin tuyển sinh, dự báo cơ hội trúng tuyển và cẩm nang nghề nghiệp.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + TailwindCSS (artifacts/huong-nghiep)
- **API framework**: Express 5 (artifacts/api-server)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Features

1. **Tra cứu trường đại học** - Tìm kiếm theo tên, khu vực, học phí
2. **Cẩm nang ngành nghề** - Mô tả công việc, mức lương, tố chất cần có
3. **Dự báo trúng tuyển** - Nhập điểm thi thử, so sánh với điểm chuẩn 3 năm
4. **Diễn đàn cộng đồng** - Chia sẻ kinh nghiệm chọn trường

## Routes

- `/` — Trang chủ
- `/truong` — Danh sách trường đại học
- `/truong/:id` — Chi tiết trường
- `/nganh` — Danh sách ngành nghề
- `/nganh/:id` — Chi tiết ngành
- `/du-bao` — Dự báo trúng tuyển
- `/dien-dan` — Diễn đàn
- `/dien-dan/:id` — Chi tiết bài viết

## Key Commands

- `pnpm run typecheck` — full typecheck
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks
- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/scripts run seed` — seed initial data

## Database Schema

- `universities` — thông tin trường đại học
- `majors` — ngành học và nghề nghiệp
- `admission_scores` — điểm chuẩn theo năm
- `forum_posts` — bài viết diễn đàn
- `forum_replies` — bình luận diễn đàn
