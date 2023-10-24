const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost', //127.0.0.1 for MAC if localhost is not working
  user: '', 
  password: '', 
  database: 'employees_db',
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to the employees_db database.');
  }
});

// Function for the questions/choices
function questions() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: [
          'View All Departments',
          'Add Department',
          'View All Employees',
          'Add Employee',
          'View All Roles',
          'Update Employee Role',
          'Add Role',
          'Quit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.options) {
        case 'View All Departments':
          viewEmployess();
          break;
        case 'Add Department':
         addDepartment();
          break;
        case 'View All Employees':
          viewEmployess();
          break;
        case 'Add Employee':
         addEmployees();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'Update Employee Role':
         updateRole();
          break;
        case 'Add Role':
          addAbortListener();
          break;
        case 'Quit':
          console.log('Bye!');
          db.end(); 
          process.exit();
          break;
      }
    });
}

