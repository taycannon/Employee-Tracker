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
          viewDepartments();
          break;
        case 'Add Department':
         addDepartment();
          break;
        case 'View All Employees':
          viewEmployees();
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
        addRole();
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

function viewDepartments() {
    db.query('SELECT name AS Department_Name, id AS Department_ID FROM department', 
    (err, results) => {
      if (err) throw err;
      console.table(results);
      init();
    });
  }

function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter the name of the new department:',
          name: 'name',
        },
      ])
      .then((answer) => {
        const { name } = answer;
  
        // Inserting the new department in the database
        db.query('INSERT INTO department (name) VALUES (?)', [name], (err, result) => {
          if (err) {
            console.error('Error adding department:', err);
            return;
          }
  
          console.log(`Department "${name}" added successfully with ID ${result.insertId}`);
          init(); 
        });
      });
  }
  
  
  function viewEmployees() {
  
  }
  
  function addEmployees() {
 
  }
  
  function viewRoles() {
 
  }
  
  function updateRole() {
 
  }
  
  function addRole() {
   
  }
  
  questions();
  