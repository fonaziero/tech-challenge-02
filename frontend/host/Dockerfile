FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências específicas do host
COPY host/package*.json ./host/

# Remover arquivos antigos e reinstalar dependências
RUN rm -rf ./host/node_modules ./host/package-lock.json
RUN npm install --prefix ./host

# Instalar os tipos do Node.js
RUN npm install --save-dev @types/node --prefix ./host

# Copiar o restante dos arquivos necessários
COPY host ./host
COPY shared ./shared

# Gerar o build
RUN npm run build --prefix ./host

# Servir o build com Nginx
FROM nginx:alpine

COPY --from=builder /app/host/dist /usr/share/nginx/html

EXPOSE 3001

COPY host/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
