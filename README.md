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
  API_KEY=<your_api_key>

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
  ```
