// Imports mysql2, inquirer, console.table
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//creates port - and local host 3001
const PORT = process.env.PORT || 3001;

// Connect to the company database
const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL username,
		user: "root",
		// MySQL password
		password: "1234",
		// database name
		database: "company_db",
	},
	console.log(`Connected to the books_db database.`)
);

//Example:
// let deletedRow = 2;

// db.query(
// 	`DELETE FROM favorite_books WHERE id = ?`,
// 	deletedRow,
// 	(err, result) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		console.log(result);
// 	}
// );

// Array containing the main menu inquirer prompts
const mainMenu = [
	{
		type: "list",
		name: "menu",
		message: "What would you like to do?",
		choices: [
			"View All Employees",
			"Add an Employee",
			"Update an Employee Role",
			"View All Roles",
			"Add a Role",
			"View All Departments",
			"Add a Department",
			"Quit",
		],
	},
];

//function to render a table showing department names and ids
function mainMenuQuestions() {
	return inquirer.prompt(mainMenu).then((answers) => {
		viewDepartments(answers);
		viewEmployees(answers);
		viewRoles(answers);
		renderEmployee(answers);
		renderDepartment(answers);
		renderRole(answers);
	});
}

//function to create employee-
const renderEmployee = async (answers) => {
	if (answers.menu === "Add an Employee") {
		const rolesPromise = new Promise((res) => {
			db.query("SELECT title, id FROM job", (err, results) => {
				if (err) {
					throw err;
				}
				return res(results);
			});
		});
		const managersPromise = new Promise((res) => {
			db.query(
				"SELECT first_name, last_name, id FROM employee",
				(err, results) => {
					if (err) {
						throw err;
					}
					return res(results);
				}
			);
		});

		const [roles, managers] = await Promise.all([
			rolesPromise,
			managersPromise,
		]);
		const roleTitles = roles.map(({ title }) => title);
		const managerNames = managers.map(
			({ first_name, last_name }) => `${first_name} ${last_name}`
		);

		inquirer
			.prompt([
				{
					type: "input",
					name: "employeeFirstName",
					message: "What is the employee's first name?",
				},
				{
					type: "input",
					name: "employeeLastName",
					message: "What is the employee's last name?",
				},
				{
					type: "list",
					name: "employeeRole",
					message: "What is the employee's role?",
					choices: roleTitles,
				},
				{
					type: "list",
					name: "employeeManager",
					message: "Who is the employee's manager?",
					choices: ["none", ...managerNames],
				},
			])
			.then((answers) => {
				const selectedRole = roles.find(
					(role) => role.title === answers.employeeRole
				);
				const selectedManager = managers.find(
					(manager) =>
						`${manager.first_name} ${manager.last_name}` ===
						answers.employeeManager
				);
				const managersID = selectedManager ? selectedManager.id : 0;
				const newEmployee = [
					[
						answers.employeeFirstName,
						answers.employeeLastName,
						selectedRole.id,
						managersID,
					],
				];
				db.query(
					"INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES ?",
					[newEmployee],
					function (err, result) {
						if (err) throw err;
						console.log("Employee added to system!");
					}
				);
			});
	}
};

// Create role on request
const renderRole = async (answers) => {
	if (answers.menu === "Add a Role") {
		const rolesPromise = new Promise((res) => {
			db.query("SELECT title, id FROM job", (err, results) => {
				if (err) {
					throw err;
				}
				return res(results);
			});
		});
		const roles = await rolesPromise;
		const roleTitles = roles.map(({ title }) => title);
		console.log(
			"🚀 ~ file: index.js ~ line 167 ~ renderRole ~ roleTitles",
			roleTitles
		);

		inquirer
			.prompt([
				{
					type: "input",
					name: "roleName",
					message: "What is the name of the new role?",
				},
				{
					type: "input",
					name: "roleSalary",
					message: "What is the salary of the new role?",
					validate: (answer) => {
						if (isNaN(answer)) {
							return "please enter a number";
						}
						return true;
					},
				},
				{
					type: "list",
					name: "roleDepartmentId",
					message: "What department is the new role in?",
					choices: roleTitles,
				},
			])
			.then((answers) => {
				console.log(answers);
				const selectedRole = roles.find(
					(role) => role.title === answers.roleDepartmentId
				);

				const newRole = [
					[answers.roleName, answers.roleSalary, selectedRole.id],
				];

				console.log(
					"🚀 ~ file: index.js ~ line 199 ~ .then ~ newRole",
					newRole
				);
				db.query(
					"INSERT INTO job (title, salary, department_id) VALUES ?",
					[newRole],
					function (err, result) {
						if (err) throw err;
						console.log("New role added to system!");
					}
				);
			});
	}
};

// Create department on request
const renderDepartment = async (answers) => {
	if (answers.menu === "Add a Department") {
		inquirer
			.prompt([
				{
					type: "input",
					name: "departmentName",
					message: "What is the name of the department?",
				},
			])
			.then((answers) => {
				const newDepartment = [[[answers.departmentName]]];
				db.query(
					"INSERT INTO department (department_name) VALUES ?",

					newDepartment,
					function (err, result) {
						if (err) throw err;
						console.log("Department added to system!");
					}
				);
			});
	}
};

// This function allows the user to view the departments in a table
function viewDepartments(answers) {
	if (answers.menu === "View All Departments") {
		db.query("SELECT * FROM department", function (err, results) {
			if (err) {
				throw err;
			}
			if (results) {
				console.log("Showing All Departments");
				console.table(results);
			}
		});
	}
}

// This function allows the user to view the employees in a table
function viewEmployees(answers) {
	if (answers.menu === "View All Employees") {
		db.query("SELECT * FROM employee", function (err, results) {
			if (err) {
				throw err;
			}
			if (results) {
				console.log("Showing All Employees");
				console.table(results);
			}
		});
	}
}

// This function allows the user to view the roles in a table
function viewRoles(answers) {
	if (answers.menu === "View All Roles") {
		db.query("SELECT * FROM job", function (err, results) {
			if (err) {
				throw err;
			}
			if (results) {
				console.log("Showing All Roles");
				console.table(results);
			}
		});
	}
}

// This starts the inquirer prompts :)
mainMenuQuestions();
