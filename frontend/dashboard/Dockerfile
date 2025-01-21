# Etapa 1: Construção
FROM node:20 AS builder

WORKDIR /app

# Copiar dependências específicas do dashboard
COPY dashboard/package*.json ./dashboard/
RUN npm install --prefix ./dashboard

# Copiar somente a pasta `shared` e o restante dos arquivos do dashboard
COPY dashboard ./dashboard
COPY shared ./shared
COPY ./host/tailwind.config.js /app/dashboard/tailwind.config.js

# Compilar o Tailwind CSS
RUN npx tailwindcss --config ./dashboard/tailwind.config.js -i ./dashboard/src/styles/tailwind.css -o ./dashboard/dist/styles.css

# Gerar o build do dashboard
RUN npm run build --prefix ./dashboard

# Etapa 2: Servir com Nginx
FROM nginx:alpine

COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

EXPOSE 3002

COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
