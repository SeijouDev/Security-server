CREATE SCHEMA `securitydb` ;

CREATE TABLE `securitydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));

INSERT INTO `securitydb`.`users` (`name`, `email`, `password`)
 VALUES ('Marlon Castillo', 'alejo.1395@hotmail.com', '123456');


 /********************/

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
