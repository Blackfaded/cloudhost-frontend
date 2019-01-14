FROM node:10 as dev
WORKDIR /usr/app/frontend
COPY package*.json ./
RUN npm i


