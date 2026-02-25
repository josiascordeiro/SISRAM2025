<p align="center">
  <img src="logo.png" alt="SISRAM2025" width="180" />
</p>

# SISRAM2025

> Sistema escolar para envio, listagem e gestão de atestados com foco em simplicidade de implantação (SQLite embarcado) e camada de segurança modular.

## Visão Geral
- Upload de atestados (com foto) e listagem por turma/ano.
- Autenticação via Google (Firebase) e login tradicional.
- Camada de segurança separada em módulos (`security center/`): hardening, rate limit, CSP, origens, perf, IP logging.
- Banco embarcado SQLite por padrão (`local.db`) e opção de MySQL.
- Templates em EJS + Express; assets em `public/`.

## Stack
- Node.js + Express
- EJS (views)
- SQLite (padrão) | MySQL (opcional)
- Multer (upload em memória)
- Firebase Auth (Google Sign-In)

## Estrutura Rápida
- `app.js` — app Express e cadeia de middlewares de segurança.
- `routes/` — rotas principais (login, listagens, upload).
- `views/` — páginas EJS.
- `public/` — assets estáticos (favicon/logo, ícone Google).
- `security center/` — módulos de segurança (back, front, users, link, db, performance, shared).
- `scripts/init-sqlite.js` — cria/zera `local.db` com schema.
- `local.db` — banco SQLite embarcado.

## Ambiente
Crie um `.env` com, no mínimo:

```
DB_DRIVER=sqlite           # ou mysql
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=senha
MYSQL_DATABASE=sisram2
MYSQL_PORT=3306
PORT=3000
ALLOWED_ORIGINS=           # separado por vírgula (opcional)
FORCE_HTTPS=false          # true em produção atrás de HTTPS
```

SQLite é o padrão. Para MySQL, mude `DB_DRIVER=mysql` e preencha as variáveis.

## Instalação e Uso
```
npm install
npm run db:reset   # opcional: recria local.db com schema (fica vazio se já limpo)
npm start
```
- `npm run db:reset` usa SQLite e recria `local.db`. Execute somente se quiser zerar.
- Com MySQL, crie manualmente a tabela `enviar_atestado` com o mesmo schema do SQLite (veja `scripts/init-sqlite.js`).

## Rotas Principais
- `GET /` — página inicial.
- `GET /login` — login do aluno (Google Sign-In).
- `POST /enviardocs_aluno` — upload de atestado.
- `GET /listarAtestado` — listagem geral.
- Filtradas: `/doisAds`, `/doisBds`, `/doisAmm`, `/doisBmm`, `/umAds`, `/umBds`, `/umAmm`, `/umBmm`, `/tresAds`, `/tresBds`, `/tresAmm`, `/tresBmm`.
- `GET /imagem/:id` — retorna imagem do atestado.
- `GET /health` — healthcheck.

## Segurança
- IP logging em `security center/logs/ip-events.log` (middleware `ipCapture`).
- Rate limiting para back e login; hardening de headers; CSP permitindo Google/Firebase.
- Enforce de origens permitidas via `ALLOWED_ORIGINS`.
- Medição de latência e log de requisições lentas.

## CAPTCHAs
- Recomenda-se proteger formulários sensíveis (login e upload) com CAPTCHA (ex.: Google reCAPTCHA v2/v3 ou hCaptcha).
- Armazene as chaves em variáveis de ambiente e valide no backend antes de prosseguir.
- Mantenha o rate limit ativo mesmo com CAPTCHA para mitigar abuso automatizado.

## Deploy Rápido (VPS Ubuntu, SQLite)
1. Copie o código e `local.db` (ou rode `npm run db:reset`).
2. Garanta `.env` com `DB_DRIVER=sqlite` e permissão de escrita no diretório.
3. `npm install && npm start`.

## Contatos (Instagram)
- @ytallo_gabriel.dev — Ytallo Gabriel
- @josiasjosiascordeiro — Josias Cordeiro
- @garra_inc_technology — Startup Garra Inc Technology
- @eteginasiopernambucano — Escola Técnica Estadual Ginásio Pernambucano

## Licença
Projeto acadêmico/educacional desenvolvido pela equipe da Garra inc Technology
