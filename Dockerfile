FROM node:16.14.2-slim as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
USER root

COPY package.json /usr/src/app/package.json
RUN npm install --force --prefer-offline --no-audit
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . /usr/src/app
RUN npm run build

# ### STAGE 2: NGINX ###
FROM registry.access.redhat.com/ubi8/nginx-120:latest
ADD ./nginx.conf "${NGINX_CONF_PATH}"
# COPY /dist .
COPY --from=build /usr/src/app/dist .

# COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/nginx.conf
# RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
#     chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# EXPOSE 3005:3005
# CMD ["nginx", "-g", "daemon off;"]
CMD ["nginx", "-g", "daemon off;"]
