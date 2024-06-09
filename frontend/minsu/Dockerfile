FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm ci

COPY . /app

RUN npm run build

FROM node:lts-alpine

RUN npm install -g serve

COPY --from=build /app/dist /app

EXPOSE 80

CMD ["serve", "-s", "/app", "-l", "80"]

