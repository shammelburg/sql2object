##### Stage 1
FROM node:14.17.3-alpine as node
LABEL author="Sander Hammelburg"
LABEL org.opencontainers.image.source https://github.com/shammelburg/sql2object
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

##### Stage 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/sql2object /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t sql2object:1.0.0 -f nginx.prod.dockerfile .
# docker run -p 8080:80 sql2object:1.0.0
