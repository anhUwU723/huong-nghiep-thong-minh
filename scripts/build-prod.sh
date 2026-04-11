#!/bin/sh
set -e

echo "==> [1/3] Pushing database schema..."
pnpm --filter @workspace/db run push-force

echo "==> [2/3] Seeding database (skipped if data exists)..."
pnpm --filter @workspace/scripts run seed

echo "==> [3/3] Expanding database with more data..."
pnpm --filter @workspace/scripts run expand

echo "==> [4/4] Building API server..."
pnpm --filter @workspace/api-server run build

echo "==> Build complete!"
