#FROM ubuntu:16.04

#LABEL description="Sistema Cloud Computing" Autor="Rodolfo La Cruz" Version="V1.0.0"


#WORKDIR /usr/src/app

#COPY package.json /usr/src/app

#COPY yarn.lock /usr/src/app

#ENTRYPOINT apt-get install  python make g++ nodejs yarn &&  yarn  install

#COPY . /usr/src/app

#EXPOSE 3000

#CMD ["yarn", "start"]

#FROM ubuntu:18.04
#WORKDIR /app
#
#COPY package.json /app
#COPY yarn.lock /app
#COPY . /app
#ENTRYPOINT apt-get update && \
#       apt-get install -y nodejs && apt-get install -y  yarn && apt-get install -y build-essential


#CMD  yarn install

#COPY . /app

#CMD  yarn start

#EXPOSE 3000
#COPY . /app
#ENTRYPOINT yarn start


FROM node:11

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

ENV NODE_ENV=pro \
    PORT=3000 \
    MONGO_USERNAME=root \
    MONGO_PASSWORD=MongoDB2019!

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD [ "node", "server.js" ]

