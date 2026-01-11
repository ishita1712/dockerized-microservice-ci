FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY index.js .
COPY test.js .

EXPOSE 3000

CMD ["npm", "start"]
