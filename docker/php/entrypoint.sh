#!/bin/sh

echo "⏳ Aguardando banco de dados..."

# Aguarda o banco responder na porta 3306
until nc -z db 3306; do
  sleep 1
done

echo "✅ Banco de dados disponível."

# Testa se a tabela `migrations` existe no banco de dados
php artisan db:show 2>/dev/null | grep -q migrations

if [ $? -ne 0 ]; then
  echo "📦 Rodando migrations e seeders (primeira vez)..."
  php artisan migrate --seed --force
else
  echo "✅ Banco já inicializado."
fi

# Inicia o PHP-FPM normalmente (para containers PHP-FPM)
exec php-fpm
