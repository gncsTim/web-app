# # Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM tiangolo/node-frontend:10 as build-stage
# WORKDIR /app
# COPY package*.json /app/
# RUN npm install
# COPY ./ /app/
# RUN npm run build
# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15
# COPY --from=build-stage /app/build/ /usr/share/nginx/html
# # Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf


# pull official base image
FROM node:12.18.2-alpine AS build-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package-lock.json ./
COPY package*.json ./
COPY .env ./
RUN npm ci

COPY . .
# COPY src/* ./src/
# COPY public/* ./public/
RUN npm run build


FROM nginx:latest

RUN rm -rf ./usr/share/nginx/html/*

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./config/web/nginx.conf /etc/nginx/nginx.conf
# COPY ./config/web/default /etc/nginx/sites-enabled/
# ADD ./config/web/default /etc/nginx/conf.d/
# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
