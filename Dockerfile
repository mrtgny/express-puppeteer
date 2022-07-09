FROM node

WORKDIR /usr/src/app/mrtgny

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
