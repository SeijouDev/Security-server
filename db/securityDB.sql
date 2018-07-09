
-- Database: securitydb

-- DROP DATABASE securitydb;

CREATE DATABASE securitydb
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(45) NOT NULL);

INSERT INTO users (name,email, password) 
VALUES ('Marlon Castillo','alejo.1395@hotmail.com', '123456');


CREATE TABLE reports(
  id SERIAL PRIMARY KEY,
  address VARCHAR(45) NOT NULL,
  latitude decimal(11,8) NOT NULL,	
  longitude decimal(11,8) NOT NULL,
  date VARCHAR(45) NOT NULL,
  hour VARCHAR(45) NOT NULL,
  id_user int,
  state bool NOT NULL,
  type int,
  FOREIGN KEY (id_user) REFERENCES users(id)
);

/*

1. Robo con arma blanca, 
2. Robo con arma de fuego,
3. Robo sin armas,
4. Consumo de sustancias psicoactivas,
5. Robo a vehículos
6. Grupos sospechosos

*/
