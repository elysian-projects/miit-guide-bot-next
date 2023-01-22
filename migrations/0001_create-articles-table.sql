CREATE TABLE articles (
  id int PRIMARY KEY,
  tab_id int NOT NULL,
  location_id int,
  label varchar(255) NOT NULL,
  content text NOT NULL,
  photo_url varchar(255) NOT NULL,
  links varchar(255)[]
)
