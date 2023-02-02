CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  tab_id int NOT NULL,
  label varchar(255) NOT NULL,
  _value varchar(255) NOT NULL,
  content text NOT NULL,
  _type varchar NOT NULL,
  picture varchar(255) NOT NULL,
  links varchar[] DEFAULT NULL
)
