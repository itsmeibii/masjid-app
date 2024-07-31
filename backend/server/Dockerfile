FROM node:18-alpine

WORKDIR /user/src/app

ENV PORT=8080
ENV HOST=0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]


LABEL authors="itsmeibi"

