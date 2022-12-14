# build environment
FROM node:lts-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_ENVIRONMENT="production"
ENV REACT_APP_LAMBDA_ENDPOINT=https://hqugz3tx5v3za777e6ankhfegi0pzdax.lambda-url.eu-west-2.on.aws
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@4.0.3 -g
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
#custon nginx config for react
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]