# ToLet

Aplicação web construída com **Laravel** (backend) e **Vue 3 + Inertia.js** (frontend), utilizando **PostgreSQL** como banco de dados.

## Stack utilizada

### Backend

| Tecnologia | Versão |
|---|---|
| PHP | 8.5.8 (NTS, Zend Engine v4.5.8) |
| Composer | 2.10.2 |
| Laravel Framework | ^13.17 (instalado: 13.23.0) |
| Inertia.js (Laravel adapter) | ^3.0 (instalado: 3.3.0) |
| Laravel Sanctum | ^4.0 (instalado: 4.3.3) |
| Laravel Fortify | ^1.37.2 (instalado: 1.37.3) |
| Laravel Tinker | ^3.0 (instalado: 3.0.2) |
| Laravel Wayfinder | ^0.1.14 (instalado: 0.1.20) |
| Laravel Chisel | ^0.1.0 (instalado: 0.1.1) |
| Spatie Laravel Permission | * (instalado: 8.3.0) |

### Frontend

| Tecnologia | Versão |
|---|---|
| Node.js | v24.18.0 |
| npm | 11.16.0 |
| Vue | ^3.5.13 (instalado: 3.5.40) |
| @inertiajs/vue3 | ^3.0.0 (instalado: 3.6.1) |
| @inertiajs/vite | ^3.0.0 (instalado: 3.6.1) |
| Vite | ^8.0.0 (instalado: 8.2.0) |
| TailwindCSS | ^4.1.1 (instalado: 4.3.3) |
| TypeScript | ^5.2.2 (instalado: 5.9.3) |
| vue-tsc | ^2.2.4 (instalado: 2.2.12) |
| ESLint | ^9.17.0 (instalado: 9.39.5) |
| Prettier | ^3.4.2 (instalado: 3.9.6) |
| reka-ui | ^2.9.8 (instalado: 2.10.1) |
| laravel-vite-plugin | ^3.0.0 (instalado: 3.1.3) |

### Ferramentas de qualidade e testes (dev)

| Tecnologia | Versão |
|---|---|
| Pest | ^5.0 (instalado: 5.0.3) |
| Pest Plugin Laravel | ^5.0 (instalado: 5.0.1) |
| Larastan (PHPStan) | ^3.9 (instalado: 3.10.0) |
| Laravel Pint | ^1.27 (instalado: 1.30.3) |
| Laravel Sail | ^1.53 (instalado: 1.64.0) |
| Laravel Boost | ^2.2 (instalado: 2.4.13) |
| Laravel Pail | ^1.2.5 (instalado: 1.2.7) |
| Laravel Pao | ^1.0.6 (instalado: 1.1.3) |
| Mockery | ^1.6 (instalado: 1.6.12) |
| FakerPHP | ^1.24 (instalado: 1.24.1) |
| Nunomaduro Collision | ^8.9.3 (instalado: 8.9.5) |

### Banco de dados

- **Driver em uso (`.env` local):** PostgreSQL (`pgsql`)
- **Driver padrão (`.env.example`):** PostgreSQL (`pgsql`)

## Extensões PHP necessárias/carregadas

Requisito mínimo do projeto: `php ^8.3` (Composer) / `ext-iconv` explícita via dependências.

Extensões carregadas no ambiente local (`php -m`):

```
bcmath, calendar, ctype, curl, date, dom, fileinfo, filter, gettext, hash,
iconv, json, lexbor, libxml, mbstring, mysqlnd, openssl, pcre, PDO, pdo_pgsql,
pdo_sqlite, pgsql, Phar, random, readline, Reflection, session, shmop,
SimpleXML, SPL, standard, tokenizer, uri, xml, xmlreader, xmlwriter, xsl,
Zend OPcache, zip, zlib
```

Destaques relevantes ao projeto:

- **pdo_pgsql / pgsql** — necessárias para a conexão com PostgreSQL.
- **pdo_sqlite** — necessária para o driver padrão do `.env.example` e para testes.
- **mbstring, ctype, iconv, tokenizer, xml, curl, fileinfo, filter, hash, openssl** — extensões-base exigidas pelo Laravel Framework.
- **bcmath** — usada por bibliotecas de precisão numérica (ex.: `brick/math`, dependência transitiva do ecossistema Laravel).
- **zip** — usada por Composer/artisan em operações de empacotamento.

## Ambiente de desenvolvimento

```bash
php -v        # PHP 8.5.8
composer -V   # Composer 2.10.2
node -v       # v24.18.0
npm -v        # 11.16.0
```

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run dev
```

Ou, de forma automatizada:

```bash
composer run setup
```
