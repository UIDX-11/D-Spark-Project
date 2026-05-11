#!/usr/bin/env bash
# 方式 C：生成本地 Dashboard 全页 PNG，拖入 Figma（Place image / 粘贴）。
# 用法：先启动你的 Vite 开发服（默认 http://127.0.0.1:5173/），再执行：
#   chmod +x docs/figma-handoff/capture-dashboard.sh
#   ./docs/figma-handoff/capture-dashboard.sh
#
# 可选环境变量：
#   DASHBOARD_URL   页面地址（默认 http://127.0.0.1:5173/）
#   OUT_PATH        输出 PNG 路径（默认 本仓库 docs/figma-handoff/dashboard-fullpage.png）

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
URL="${DASHBOARD_URL:-http://127.0.0.1:5173/}"
OUT="${OUT_PATH:-$ROOT/docs/figma-handoff/dashboard-fullpage.png}"

mkdir -p "$(dirname "$OUT")"

if ! curl -sf --max-time 3 "$URL" >/dev/null 2>&1; then
  echo "错误：无法访问 $URL" >&2
  echo "请先在本机启动开发服务器（例如在项目里执行 pnpm dev / npm run dev），再重试。" >&2
  exit 1
fi

echo "截图中: $URL -> $OUT"
cd "$ROOT"
npx -y playwright@1.49.0 screenshot "$URL" "$OUT" \
  --full-page \
  --wait-for-timeout=4000 \
  --timeout=60000

echo "完成。将 PNG 拖入 Figma 画布即可。"
