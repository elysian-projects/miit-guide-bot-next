CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  tab_id int NOT NULL,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  photo_url varchar(255) NOT NULL,
  links varchar[] DEFAULT NULL
)
