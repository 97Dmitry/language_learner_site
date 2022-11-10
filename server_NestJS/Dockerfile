FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

RUN yarn build
