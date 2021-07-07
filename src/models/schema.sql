DROP TABLE IF EXISTS food;
CREATE TABLE food(
  id SERIAL PRIMARY KEY,
  name varchar(255),
  price INT
);

DROP TABLE IF EXISTS clothes;
CREATE TABLE clothes(
  id SERIAL PRIMARY KEY,
  name varchar(255),
  price INT
);