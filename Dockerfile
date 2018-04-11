FROM node:carbon

RUN apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /quest-microsite
WORKDIR /quest-microsite

ADD yarn.lock yarn.lock
ADD package.json package.json
RUN yarn

ADD . /quest-microsite
RUN yarn build

WORKDIR /quest-microsite/dist

CMD ["nginx", "-g", "daemon off;"]
