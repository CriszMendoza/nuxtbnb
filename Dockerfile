FROM node:18-alpine3.15
LABEL org.opencontainers.image.authors="criszmendoza212@gmail.com"

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 3000

WORKDIR /app

USER node