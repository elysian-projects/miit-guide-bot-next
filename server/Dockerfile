FROM node:19

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
