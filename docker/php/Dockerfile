FROM php:8.2-fpm-alpine

# Dependências
RUN apk add --no-cache \
    bash git curl unzip icu-dev libxml2-dev oniguruma-dev libzip-dev \
    libpng-dev libjpeg-turbo-dev freetype-dev zlib-dev

# PHP Extensions
RUN docker-php-ext-install pdo_mysql mbstring zip intl exif pcntl

# Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
