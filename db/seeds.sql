INSERT INTO department (name)
VALUES ("Finance"),
       ("Human Resources"),
       ("Sales"),
       ("Technology");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief financial officer", 250, 1),
       ("Financial planner", 71, 1),
       ("Portfolio manager", 148, 1),
       ("Chief Human Resource Officer", 110, 2),
       ("Staff", 60, 2),
       ("Staff", 72, 2),
       ("Sales Lead", 81, 3),
       ("Salesperson", 38, 3),
       ("IT Lead", 300, 4),
       ("IT staff", 243, 4),
       ("IT Intern", 50, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sharon", "Hoover", 1, 1),
       ("Carol", "James", 2, null),
       ("Kate", "Woods", 3, null),
       ("Barb", "Smith", 4, 2),
       ("Jacob", "Krabs", 5, null),
       ("Steve", "Jackson", 6, null),
       ("Miles", "Jones", 7, 3),
       ("Nacy", "Miller", 8, null),
       ("Leo", "Williams", 9, 4),
       ("Danny", "Wilson", 10, null),
       ("Laura", "Adams", 11, null);