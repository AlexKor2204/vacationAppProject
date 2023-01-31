import dal_mysql from "../Utils/dal_mysql";

const mysql_schema ="CREATE SCHEMA IF NOT EXISTS vacation"
const mysql_user = "CREATE TABLE IF NOT EXISTS user (id INT NOT NULL AUTO_INCREMENT, firstName VARCHAR(45) NULL, lastName VARCHAR(45) NULL, username VARCHAR(45) NULL, password VARCHAR(45) NULL, PRIMARY KEY (`id`));";
// const mysql_admin = "CREATE TABLE IF NOT EXISTS admin (username VARCHAR(45) NULL, password VARCHAR(45) NULL);";
const mysql_vacations = "CREATE TABLE IF NOT EXISTS vacations (id INT NOT NULL AUTO_INCREMENT, description VARCHAR(45) NULL, destination VARCHAR(45) NULL, image  LONGTEXT NULL DEFAULT NULL , startDate DATETIME NULL DEFAULT NULL, endDate DATETIME NULL DEFAULT NULL, price VARCHAR(45) NULL, followers INT NULL DEFAULT NULL, PRIMARY KEY (`id`));"
const mysql_favorites = "CREATE TABLE IF NOT EXISTS favorites (id INT NOT NULL AUTO_INCREMENT, userId INT NULL,  vacationId INT NULL, PRIMARY KEY (`id`));";


const mysql_init = () =>{
    dal_mysql.execute (mysql_schema);
    dal_mysql.execute (mysql_user);
    // dal_mysql.execute (mysql_admin);
    dal_mysql.execute (mysql_vacations);
    dal_mysql.execute (mysql_favorites);

};

export default mysql_init;