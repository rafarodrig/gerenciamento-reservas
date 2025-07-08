#!/bin/sh

echo "🚀 Iniciando setup da aplicação Laravel..."

# Aguarda o banco de dados ficar disponível
echo "⏳ Aguardando banco de dados na porta 3306..."
until nc -z db 3306; do
  sleep 1
done
echo "✅ Banco de dados disponível."

# Cria o .env se não existir
if [ ! -f ".env" ]; then
  echo "📄 Criando arquivo .env a partir de .env.example..."
  cp .env.example .env
fi

# Gera APP_KEY se ainda não estiver gerada
if ! grep -q "APP_KEY=base64" .env; then
  echo "🔑 Gerando APP_KEY..."
  php artisan key:generate --force
fi

# Corrige permissões
echo "🔧 Corrigindo permissões para storage/ e bootstrap/cache..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Roda migrate se a tabela de migrations não existir
if ! php artisan migrate:status > /dev/null 2>&1; then
  echo "📦 Executando migrations e seeders..."
  php artisan migrate --seed --force
else
  echo "✔️ Migrations já aplicadas."
fi

# Copia crontab e inicia cron
echo "⏰ Instalando e iniciando cron..."
crontab /var/www/docker/php/crontab
crond -f &

# Inicia o PHP-FPM
echo "🚀 Iniciando PHP-FPM..."
php-fpm

