# MIIT Guide Bot

Telegram бот, который проводит экскурсию по территории университета РУТ (МИИТ).

## Цели проекта

- познакомить студентов и гостей ВУЗа с историей РУТ (МИИТ)

## Запуск

- установить `docker` на компьютер
- создать в корне файл `.env` и скопировать в него:

  ```
  # Telegram
  TOKEN=<your_token>

  # Server
  SERVER_PORT=5000
  SERVER_HOST=192.168.0.95

  # Database
  PGHOST=localhost
  PGUSER=docker
  PGDATABASE=miit
  PGPASSWORD=admin
  PGPORT=5432
  DATABASE_URL="jdbc:postgresql:/${PGDATABASE}"

  ```
- заполнить файл `.env` значениями (для режима разработки оставить значения `#Database` по умолчанию)
- выполнить команды

  ```
  npm install
  docker compose up
  npm run migrate
  ```
