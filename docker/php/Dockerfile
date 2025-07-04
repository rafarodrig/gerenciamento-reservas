FROM php:8.2-fpm-alpine

# Instala dependências
RUN apk add --no-cache git zip unzip curl bash libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copia os arquivos necessários
COPY composer.json composer.lock ./

# Instala as dependências do Laravel
RUN composer install --no-dev --prefer-dist --no-scripts --no-interaction

# Copia o restante da aplicação
COPY . .

# Copia o script de inicialização customizado
COPY docker/php/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Define o entrypoint (que roda as migrations/seed se necessário)
ENTRYPOINT ["/entrypoint.sh"]

CMD ["php-fpm"]
