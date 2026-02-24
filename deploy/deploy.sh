#!/bin/bash
set -euo pipefail

# Script de deploy para ser executado na VPS (rodar como usuário com permissões adequadas)
# Ajuste `GIT_REMOTE` e `TARGET_DIR` conforme seu ambiente.

GIT_REMOTE="git@github.com:josiascordeiro/SISRAM2025.git"
BRANCH="main"
TARGET_DIR="/var/www/sisram"

echo "Iniciando deploy..."
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

if [ ! -d .git ]; then
  git init
  git remote add origin "$GIT_REMOTE"
fi

git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "Instalando dependências (produção)..."
npm ci --omit=dev

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Instalando pm2 globalmente..."
  npm i -g pm2
fi

pm2 startOrRestart "$TARGET_DIR/ecosystem.config.js"
pm2 save

echo "Deploy concluído com sucesso."
