FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS dev-dependencies
RUN npm ci

FROM base AS build
COPY . .
COPY --from=dev-dependencies /app/node_modules ./node_modules
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
USER nginx
CMD ["nginx", "-g", "daemon off;"]
