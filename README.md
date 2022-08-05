# 12-SQL-Employee-Tracker

## Description

Create a command-line application to manage a company's employee database, using Node.js, Inquirer, and MySQL. An interface called content management systems (CMS).
Please note the comments in my projects is not how I would normally code, this is in here for easy of navigation and understanding :)

## User story:

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## User setup:

N/A at this stage

## Planning Notes:

1. Create database schema as per the img(data-schema.png) in assets. Create a seeds file to include some data during testing. DONE
   (You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.)

2. Write queries, write inquirer questions
   index.js inquirer planning -> - set the main menu and refer to the below instructions on how to create index.js file:
   GIVEN a command-line application that accepts user input
   WHEN I start the application
   THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
   WHEN I choose to view all departments
   THEN I am presented with a formatted table showing department names and department ids
   WHEN I choose to view all roles
   THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
   WHEN I choose to view all employees
   THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
   WHEN I choose to add a department
   THEN I am prompted to enter the name of the department and that department is added to the database
   WHEN I choose to add a role
   THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
   WHEN I choose to add an employee
   THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
   WHEN I choose to update an employee role
   THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Screenshots:

![Finished product](./develop/public/assets/images/)

## Links:

Walkthrough video:
GitHub: https://github.com/NessJade96/12-SQL-Employee-Tracker

## Commit notes:

1. Create file structure, npm i, inquirer, mysql2, console.table package setup.

2. Had chat with TA and gave me advice on where my main js code should be, and to remove my express lines.

3. Got the database up and running and planted with seeds.

4. Using inquirer I have created a prompt for the main menu. I have rendering the "view Employees, Roles, and Departments" tables when those choice are selected by the user in command line. To render the tables in node I am using the console.table package.

5. Through database queries I have been able to render the job roles and managers in a list for the inqurier questions.

6. using database queries and functions the "add an employee" option is now creating a new employee and adding it to the database.
