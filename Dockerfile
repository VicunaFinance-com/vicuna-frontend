# Install dependencies only when needed
FROM node:20-alpine3.20 AS deps
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache git
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package*.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:20-alpine3.20 AS builder
RUN apk add --no-cache git
RUN apk add --no-cache openssl

WORKDIR /app
COPY . .
COPY .env .
COPY --from=deps /app/node_modules ./node_modules
# RUN npm run prisma:db-push
RUN npm run prisma:generate
RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine3.20 AS runner


WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# You can copy other env files if you want to use them
COPY --from=builder /app/.env.production ./.env.production

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
