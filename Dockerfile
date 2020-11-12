FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY . .

RUN yarn install --production=false

RUN yarn build

FROM node:14-alpine as production

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=true

COPY --from=development /usr/src/app/dist ./dist

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "./dist/main.js"]
