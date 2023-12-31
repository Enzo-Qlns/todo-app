FROM node:20

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN npm install -g json-server && npm i json-server

COPY . .

EXPOSE 8000

# command to run on container start
CMD [ "json-server", "--watch", "db.json", "--port", "8000", "--host", "0.0.0.0" ]
