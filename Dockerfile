FROM node:alpine AS build

WORKDIR /usr/src/uploader

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY src/ src
COPY tsconfig.json tsconfig.json

RUN npm run build

FROM node:alpine

WORKDIR /usr/src/uploader

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci npm ci --production --only=production --no-optional

COPY --from=build /usr/src/uploader/build/ /usr/src/uploader/build/

ENTRYPOINT node --experimental-wasm-threads /usr/src/uploader/build/index.js