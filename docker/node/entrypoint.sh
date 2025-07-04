#!/bin/sh

# Espera a pasta node_modules estar pronta (útil em ambiente compartilhado)
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências..."
  npm install
fi

echo "Iniciando servidor Vite..."
npm run dev -- --host 0.0.0.0 --port 5173
