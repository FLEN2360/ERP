# ERP 系統

## 快速開始

無論是使用 Linux OR Windows 都需要安裝 docker

### 請前往 Better-auth 官網生成 自己的 Secret Key

[獲取 Secret Key](https://www.better-auth.com/docs/installation#set-environment-variables)

將其寫入 .env 的 BETTER_AUTH_SECRET

### 使用 Linux 開發

```bash
# 複製設定檔
cp .env.example .env
# 開發時請將
# Node environment (development, production, test)
# NODE_ENV="production"
# 改為
# Node environment (development, production, test)
# NODE_ENV="development"
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
# 遷移資料庫
docker compose exec next bun drizzle-kit generate
docker compose exec next bun drizzle-kit migrate
# 建立初始管理員帳號
docker compose exec next bun run db:admin
# 關閉並清除資料
docker compose down -v
```

### 使用 windows 開發

```bash
# 安裝 bun
powershell -c "irm bun.sh/install.ps1|iex"
# 複製設定檔
cp .env.win.example .env
# 開發時請將
# Node environment (development, production, test)
# NODE_ENV="production"
# 改為
# Node environment (development, production, test)
# NODE_ENV="development"
bun install
# 開啟資料庫
bun run windev
# 遷移資料庫
bun drizzle-kit generate
bun drizzle-kit migrate
# 建立初始管理員帳號
bun run db:admin
# 開啟開發伺服器
bun run dev
# 關閉資料庫
bun run windevdown
# 關閉並清除資料
bun run windelete
```

### 清除資料庫資料

需先關閉 docker 再刪除
將 @/docker/postgres/data 資料夾全部刪除之後再次開啟 docker 即可初始化
