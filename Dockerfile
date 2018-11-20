FROM node:11
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i
COPY . .
EXPOSE 5000 3000 80
CMD ["npm", "start"]
