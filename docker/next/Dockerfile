# Stage: Development
FROM node:24-alpine

# 安裝基礎工具與 Bun
RUN apk add --no-cache bash curl unzip libc6-compat \
    && curl -fsSL https://bun.sh/install | bash \
    && ln -s /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /app

# 環境變數
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 預設情況下將原始碼掛載進容器（docker-compose 或 -v）
# 所以不在這裡 COPY 整個專案或 package 檔案
# 如果在這裡 COPY 也會再掛載時被覆蓋掉

# 開放埠口
EXPOSE 3000

# 啟動 Next.js 開發伺服器（含熱重載）
CMD [ "sh", "-c", "bun install && bun run dev" ]

# CMD [ "sh", "-c", "if [ ! -d node_modules ]; then bun install; fi && bun run dev" ]
