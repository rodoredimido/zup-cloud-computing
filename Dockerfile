
FROM node:11

LABEL description="Sistema Cloud Computing" Autor="Rodolfo La Cruz" Version="V1.0.0"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

ENV NODE_ENV=pro \
    PORT=3000 \
    MONGO_USERNAME= \
    MONGO_PASSWORD=

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD [ "node", "server.js" ]

