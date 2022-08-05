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

// Default response for any other request (Not Found)
// app.use((req, res) => {
// 	res.status(404).end();
// });

// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });

// db.connect(function (error) {
// 	if (error) throw error;
// 	console.log("connected at " + connection.threadId + "\n");
// 	addCharacter();
// });

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
	});
}

// //function to create employee-
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
		// get the id from the dbquery rolesPromise, then save as a variable(object), then create a new variable without the id in the object - use this one in the inquirer questions, then use the OG variable to .find() the matching id number. make sure you console log everything

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

mainMenuQuestions();
