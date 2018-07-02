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
