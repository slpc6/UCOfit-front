FROM node:18-alpine

WORKDIR /UCOfit-front

COPY package*.json ./
RUN npm install

COPY server.js ./
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]