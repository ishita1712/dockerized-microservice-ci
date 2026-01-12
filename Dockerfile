FROM node:20-alpine3.19

WORKDIR /app

COPY package.json .
COPY index.js .
COPY test.js .

EXPOSE 3000

CMD ["npm", "start"]
