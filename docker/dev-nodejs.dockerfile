FROM node:10.16.3-alpine

RUN apk update && apk upgrade
RUN npm install -g npm

WORKDIR /usr/src/app
USER node
