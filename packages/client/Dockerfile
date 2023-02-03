FROM node:18

WORKDIR /packages/client

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
