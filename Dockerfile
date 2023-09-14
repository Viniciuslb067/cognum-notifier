FROM node:18

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:dev"]