FROM 420361828844.dkr.ecr.ap-southeast-1.amazonaws.com/xendit/node-16:20211022-065424-402f9a7-builder AS base

# Builder
FROM base AS builder

ARG NPM_TOKEN
WORKDIR /app
COPY --chown=app:app package*.json .npmrc.example ./
RUN set -ex; \
    mv .npmrc.example .npmrc; \
    echo -ne "\n//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> .npmrc; \
    npm clean-install; \
    npm cache clean --force; \
    rm -f .npmrc;
COPY --chown=app:app . ./
RUN npm run build

# Deps Builder
FROM base AS deps-builder

ARG NPM_TOKEN
WORKDIR /app
COPY --chown=app:app package*.json .npmrc.example ./
RUN set -ex; \
    mv .npmrc.example .npmrc; \
    echo -ne "\n//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> .npmrc; \
    npm clean-install --only=production; \
    npm cache clean --force; \
    rm -f .npmrc;

# Dist
FROM base AS dist

WORKDIR /app
COPY --chown=app:app --from=deps-builder /app/node_modules ./node_modules
COPY --chown=app:app --from=builder /app/dist ./dist
COPY --chown=app:app --from=builder /app/docs ./docs
EXPOSE 3000
CMD ["node", "dist/src/server.js"]
