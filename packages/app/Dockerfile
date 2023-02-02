FROM node:19

WORKDIR /packages/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
