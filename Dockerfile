FROM node:24-alpine AS base

# Set args
ARG PORT=8080

# Set runtime args
ARG BASE_URI=http://host.docker.internal:3000

# 1. Rebuild the source code only when needed
FROM base AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set build args
ARG NEXT_PUBLIC_BASE_URI=http://localhost:3000

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# 2. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

ENV BASE_URI=$BASE_URI

# RUN addgroup --system --gid 1001 nodejs && \
#     adduser --system --uid 1001 --ingroup nodejs --disabled-password --no-create-home nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# USER nextjs

ENV PORT=$PORT
ENV HOSTNAME="0.0.0.0"

EXPOSE $PORT

CMD ["node", "server.js"]
