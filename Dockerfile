FROM node:20-alpine3.19

# Upgrade OS packages to apply security patches
RUN apk update && apk upgrade --no-cache

# Upgrade npm to remediate bundled dependency CVEs
RUN npm install -g npm@latest

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
