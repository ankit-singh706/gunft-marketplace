<<<<<<< HEAD
FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN -rm -rf ./*
COPY --from=builder /app/dist .
=======
FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN -rm -rf ./*
COPY --from=builder /app/dist .
>>>>>>> 4ecbf1f2c1172ad0a3ae0ae8f1f9e408c7eaf019
ENTRYPOINT ["nginx", "-g", "daemon off;"]