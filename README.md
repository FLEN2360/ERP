# ERP 系統

## 快速開始

無論是使用 Linux OR Windows 都需要安裝 docker

### 使用 Linux 開發

```bash
# 複製設定檔
cp .env.example .env
# 啟動
docker compose up -d --build
# 使用這種方式啟動需要稍等
# 透過以下指令查詢是否有問題
docker compose logs next
# 出現
# erp-next-app  | $ next dev
# erp-next-app  |    ▲ Next.js 16.0.1 (Turbopack)
# erp-next-app  |    - Local:        http://localhost:3000
# erp-next-app  |    - Network:      http://172.18.0.4:3000
# erp-next-app  |    - Environments: .env
# erp-next-app  |
# erp-next-app  |  ✓ Starting...
# erp-next-app  |  ✓ Ready in 28.1s
# 代表開好
# 如果只有
# erp-next-app  | $ next dev
# 還需稍等
# 關閉
docker compose down
# 不保留資料的關閉
docker compose down -v
# 遷移資料庫
docker compose exec next bun drizzle-kit generate
docker compose exec next bun drizzle-kit migrate
```

### 使用 windows 開發

```bash
# 安裝 bun
powershell -c "irm bun.sh/install.ps1|iex"
# 複製設定檔
cp .env.win.example .env
bun install
# 遷移資料庫
bun drizzle-kit generate
bun drizzle-kit migrate
# 開啟資料庫
bun run windev
bun run dev
# 關閉資料庫
bun run windevdown
```
