FROM node:erbium

MAINTAINER Yena Park

COPY . /src

WORKDIR /src/ass1-server

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]