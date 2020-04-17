FROM node:12

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["node", "server.js"]