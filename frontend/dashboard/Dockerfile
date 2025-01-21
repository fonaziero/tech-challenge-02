FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências específicas do dashboard
COPY dashboard/package*.json ./dashboard/

# Remover arquivos antigos e reinstalar dependências
RUN rm -rf ./dashboard/node_modules ./dashboard/package-lock.json
RUN npm install --prefix ./dashboard

# Instalar os tipos do Node.js
RUN npm install --save-dev @types/node --prefix ./dashboard

# Copiar o restante dos arquivos necessários
COPY dashboard ./dashboard
COPY shared ./shared

# Gerar o build
RUN npm run build --prefix ./dashboard

# Servir o build com Nginx
FROM nginx:alpine

COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

EXPOSE 3001

COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
