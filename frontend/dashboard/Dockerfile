FROM node:20-alpine AS builder

WORKDIR /app

# Copiar pacotes e instalar dependências
COPY dashboard/package*.json ./dashboard/
RUN npm install --prefix ./dashboard

# Copiar os arquivos do dashboard e do shared
COPY dashboard ./dashboard
COPY shared ./shared

# Build do dashboard
RUN npm run build --prefix ./dashboard

# Servir com Nginx
FROM nginx:alpine

COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

EXPOSE 3002

COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
