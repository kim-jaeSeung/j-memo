# 예시: Next.js 앱을 빌드하는 다단계 Dockerfile
# 1. 빌드 단계
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. 실행 단계
FROM node:18-alpine AS runner

WORKDIR /app

# 올바른 ENV 형식
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN npm install --production

EXPOSE 3000

CMD ["node", "server.js"]