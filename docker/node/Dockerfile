# Imagem base leve e moderna
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /var/www

# Copia os arquivos de dependências primeiro para otimizar o cache de build
COPY package*.json ./

# Instala dependências de forma limpa (sem cache e lockfile local)
RUN npm ci

# Copia o restante do código-fonte
COPY . .

# Copia o script de entrada
COPY docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expõe a porta do Vite (desenvolvimento)
EXPOSE 5173

# Executa o entrypoint customizado
CMD ["sh", "/entrypoint.sh"]