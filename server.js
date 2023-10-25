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
    user: 'root',
    password: 'rootroot',
    database: 'employees_db',
});

// Connection to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to the employees_db database.');
    }
});

// Function for the questions/choices
// Function for the questions/choices
function init() {
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
                    db.end((err) => {
                        if (err) {
                            console.error('Error closing the database connection:', err);
                        } else {
                            console.log('Database connection closed.');
                            process.exit();
                        }
                    });
                    break;
            }
        });
}

//View & add Department(s)
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

//View & add Employee(s)
function viewEmployees() {
    db.query('SELECT e.id AS Employee_ID, e.first_name AS First_Name, e.last_name AS Last_Name, r.title AS Job_Title, d.name AS Department, r.salary AS Salary, m.first_name AS Manager_First_Name, m.last_name AS Manager_Last_Name FROM employee AS e JOIN role AS r ON e.role_id = r.id JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id; ', (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
}

function addEmployees() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the employee(s) first name:',
                name: 'first_name',
            },
            {
                type: 'input',
                message: 'Enter the employee(s) last name:',
                name: 'last_name',
            },
            {
                type: 'input',
                message: 'Enter the employee(s) role ID:',
                name: 'role_id',
            },
            {
                type: 'input',
                message: 'Enter the employee(s) manager ID (If needed):',
                name: 'manager_id',
            },
        ])
        .then((answer) => {
            const { first_name, last_name, role_id, manager_id } = answer;

            // Inserting the new employee in the database
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                [first_name, last_name, role_id, manager_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding employee:', err);
                        return;
                    }

                    console.log(`Employee "${first_name} ${last_name}" added successfully with ID ${result.insertId}`);
                    init();
                }
            );
        });
}

//View, add & update Roles
function viewRoles() {
    db.query('SELECT title AS Job_Title, role.id AS Role_ID, department.name AS Department, salary AS Salary FROM role JOIN department ON role.department_id = department.id;', (err, results) => {
        if (err) throw err;
        console.table(results);
        init();
    });
}

function updateRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the ID of the employee you want to update:',
                name: 'employee_id',
            },
            {
                type: 'input',
                message: 'Enter the new role ID for the employee:',
                name: 'new_role',
            },
        ])
        .then((answers) => {
            const { employee_id, new_role_id } = answers;

            // Updating roles in the database
            db.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [new_role_id, employee_id],
                (err, result) => {
                    if (err) {
                        console.error('Error updating employee role:', err);
                        return;
                    }

                    if (result.affectedRows === 0) {
                        console.log('No employee with that ID found.');
                    } else {
                        console.log(`Employee with ID ${employee_id} has been updated to the new role with ID ${new_role_id}`);
                    }

                    init();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter the title of the new role:',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Enter the salary for the new role:',
                name: 'salary',
            },
            {
                type: 'input',
                message: 'Enter the department ID for the new role:',
                name: 'department_id',
            },
        ])
        .then((answer) => {
            const { title, salary, department_id } = answer;

            // Inserting the new role in the database
            db.query(
                'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                [title, salary, department_id],
                (err, result) => {
                    if (err) {
                        console.error('Error adding role:', err);
                        return;
                    }

                    console.log(`Role "${title}" added successfully with ID ${result.insertId}`);
                    init();
                }
            );
        });
}

init();
