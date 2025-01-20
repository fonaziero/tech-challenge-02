FROM node:20 AS builder

WORKDIR /app

# Copiar dependências específicas do dashboard
COPY dashboard/package*.json ./dashboard/
RUN npm install --prefix ./dashboard

# Copiar somente a pasta `shared` e o restante dos arquivos do dashboard
COPY dashboard ./dashboard
COPY shared ./shared

# Gerar o build
RUN npm run build --prefix ./dashboard

# Servir o build com Nginx
FROM nginx:alpine

COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

EXPOSE 3002

COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
