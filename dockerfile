FROM node:22.11.0-alpine as api
WORKDIR /api
COPY ./.env .
COPY ./packages/backend ./packages/backend
COPY ./package.json .
RUN yarn workspace backend install
RUN yarn prisma:generate
RUN yarn workspace backend build
