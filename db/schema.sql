DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id: INT PRIMARY KEY
name: VARCHAR(30)
);

CREATE TABLE role (
id: INT PRIMARY KEY
title: VARCHAR(30)
salary: DECIMAL
department_id: INT
);