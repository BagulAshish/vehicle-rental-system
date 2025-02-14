FROM node:16-alpine
WORKDIR /pr2

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD ["npx", "serve", "build"]