FROM node:20 AS builder

WORKDIR /app

# Copiar pacotes e instalar dependências
COPY dashboard/package*.json ./dashboard/
RUN npm install --prefix ./dashboard

# Copiar os arquivos do dashboard e do shared
COPY dashboard ./dashboard
COPY shared ./shared

# Copiar a configuração do Tailwind para o dashboard
COPY ./host/tailwind.config.js /app/dashboard/tailwind.config.js

# Garantir que o arquivo Tailwind existe
RUN mkdir -p /app/dashboard/src/styles && echo "@tailwind base; @tailwind components; @tailwind utilities;" > /app/dashboard/src/styles/tailwind.css

# Compilar TailwindCSS
RUN npx tailwindcss --config /app/dashboard/tailwind.config.js \
    -i /app/dashboard/src/styles/tailwind.css \
    -o /app/dashboard/dist/styles.css

# Build do dashboard
RUN npm run build --prefix ./dashboard

# Servir com Nginx
FROM nginx:alpine

COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

EXPOSE 3002

COPY dashboard/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
