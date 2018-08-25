FROM node:carbon as node

ARG CONFIG_ENV=$CONFIG_ENV

RUN mkdir /quest-microsite
WORKDIR /quest-microsite

ADD yarn.lock yarn.lock
ADD package.json package.json
RUN yarn install

ARG CONFIG_ENV=$CONFIG_ENV
ADD . /quest-microsite
RUN yarn build

FROM nginx:1.13
COPY --from=node /quest-microsite/dist /quest-microsite
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
