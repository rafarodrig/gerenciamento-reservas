#!/bin/bash

# Caminho do projeto (você pode ajustar se necessário)
PROJECT_PATH="$HOME/gerenciamento-reservas"
COMMAND="cd $PROJECT_PATH && docker compose exec app php artisan schedule:run >> /dev/null 2>&1"

# Verifica se está no WSL
if grep -qi microsoft /proc/version; then
    echo "🔧 Ambiente WSL detectado."
else
    echo "❌ Este script é projetado para WSL."
    exit 1
fi

# Verifica se docker compose está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instale-o antes de continuar."
    exit 1
fi

# Verifica se a linha já existe
crontab -l 2>/dev/null | grep -F "$COMMAND" > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Cron já configurado."
else
    echo "➕ Adicionando cron..."
    (crontab -l 2>/dev/null; echo "* * * * * $COMMAND") | crontab -
    echo "✅ Cron configurado com sucesso."
fi
