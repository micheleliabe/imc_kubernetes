FROM node:latest
WORKDIR /home/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "./src/index.js" ]
# ENTRYPOINT [ "npm", "run", "dev" ]
