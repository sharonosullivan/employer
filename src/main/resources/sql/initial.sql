#creating database
CREATE DATABASE `test_database`
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
USE test_database;
#creating tables
CREATE TABLE IF NOT EXISTS tblDepartments (
  dpID   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dpName VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS tblEmployees (
  empID     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  empName   VARCHAR(255) NOT NULL,
  empActive BOOLEAN      NOT NULL,
  emp_dpID  INT          NOT NULL,
  FOREIGN KEY (emp_dpID) REFERENCES tblDepartments (dpID)
    ON DELETE CASCADE
);
#inserting values in department table
INSERT INTO tblDepartments (dpName) VALUES ('HR'), ('Finance'), ('Tech'), ('PM'), ('CEO');

