FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENV PORT=8240

EXPOSE 8240

CMD ["npm", "run", "dev"]