const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Created a MySQL connection
const db = mysql.createConnection({
  host: 'localhost', //127.0.0.1 for MAC if localhost is not working
  user: '',
  password: '',
  database: 'employees_db',

},
console.log(`Connected to the employer_db database.`)
);
