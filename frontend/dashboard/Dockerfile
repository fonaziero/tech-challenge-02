# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências específicas do dashboard
COPY dashboard/package*.json ./dashboard/

# Instalar dependências
RUN npm install --prefix ./dashboard

# Copiar o restante dos arquivos necessários
COPY dashboard ./dashboard
COPY shared ./shared

# Gerar o build
RUN npm run build --prefix ./dashboard

# Etapa 2: Servir com Nginx
FROM nginx:alpine AS runner

# Copiar o build para o diretório do Nginx
COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

# Copiar configuração personalizada do Nginx
COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta configurada
EXPOSE 3002

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
