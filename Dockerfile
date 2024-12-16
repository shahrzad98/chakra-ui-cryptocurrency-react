FROM git.rabex.co:5055/infra/base_images/node:lts-alpine3.14 as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM git.rabex.co:5055/infra/base_images/nginx:1.21-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
