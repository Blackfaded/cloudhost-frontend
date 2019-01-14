FROM node:10 as modules
WORKDIR /usr/app/frontend
COPY package*.json ./
RUN npm i

FROM modules as build
COPY . .
RUN npm run build

FROM nginx:latest as prod
COPY --from=build /usr/app/frontend/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


