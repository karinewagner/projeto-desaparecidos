# Etapa 1: Construção da aplicação Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2: Servindo a aplicação com Nginx
FROM nginx:1.21-alpine

COPY --from=build /app/dist/projeto-desaparecidos/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
