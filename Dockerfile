FROM node:20-slim

WORKDIR /app

COPY ./app/ ./

RUN npm install

RUN npm run build

EXPOSE 80
CMD ["npm", "run", "host-prod"]
