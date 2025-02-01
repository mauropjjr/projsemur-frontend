FROM node:19.9.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN  node --max-old-space-size=4096 ./node_modules/@angular/cli/bin/ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/projsemur/browser /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
