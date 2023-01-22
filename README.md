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

  # Database
  HOST="127.0.0.1"
  PORT="5432"
  DBNAME="miit"
  USER_NAME="postgres"
  PASSWORD="admin"
  ```
- заполнить файл `.env` значениями (для режима разработки оставить значения `#Database` по умолчанию)
- выполнить команды

  ```
  npm install
  npm run migrate
  docker compose up
  ```
