# MIIT Guide Bot

Telegram бот, который проводит экскурсию по территории университета РУТ (МИИТ).

## Цели проекта

- познакомить студентов и гостей ВУЗа с историей РУТ (МИИТ)

## Запуск

- установить `docker` на компьютер
- создать в корне файл `.env`, скопировать в него следующие данные:

  ```
  # Telegram
  TOKEN=<your_token>

  # Server
  HTTPS=false
  SERVER_PORT=5000
  SERVER_HOST=<your_local_host>
  SECRET_KEY=<your_secret_key>
  SALT=15

  # Database
  PGHOST=localhost
  PGUSER=docker
  PGDATABASE=miit
  PGPASSWORD=admin
  PGPORT=5432
  DATABASE_URL="postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}"

  # Flags
  PRODUCTION=false
  ```
- заполнить файл `.env` значениями (для режима разработки оставить значения `#Database` по умолчанию)
- выполнить команды

  ```
  npm run install:all
  npm run start
  ```
