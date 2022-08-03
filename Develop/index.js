//https://www.npmjs.com/package/console.table
// call once somewhere in the beginning of the app to enable pretty tables
// const cTable = require('console.table');
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// // prints
// name  age
// ----  ---
// foo   10
// bar   20

// Import and require mysql2, inquirer, express
const inquirer = require("inquirer");

const mysql = require("mysql2");

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

// Query database
db.query("SELECT * FROM employee", function (err, results) {
	console.log("List of employees", results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// db.connect(function (error) {
// 	if (error) throw error;
// 	console.log("connected at " + connection.threadId + "\n");
// 	addCharacter();
// });
addCharacter();

function addCharacter() {
	inquirer
		.prompt([
			/* Pass your questions in here */

			{
				type: "list",
				name: "menu",
				message: "What would you like to do?",
				choices: [
					"View All Employees",
					"Add Employee",
					"Update Employee Role",
					"View All Roles",
					"Add Role",
					"View All Departments",
					"Add Department",
					"Quit",
				],
			},
			{
				type: "input",
				name: "first_name",
				message: "What is your name?",
			},
		])
		.then((answers) => {
			// Use user feedback for... whatever!!
			console.log(answers);
			renderEmployee()
				// db.createQuery(
				// 	"INSERT INTO employee SET ?",
				// 	{
				// 		characterName: answers.characterName,
				// 	},
				// 	function (error) {
				// 		if (error) throw error;
				// 		console.log("added character");
				// 		querying();
				// 	}
				// );

				.catch((error) => {
					if (error.isTtyError) {
						// Prompt couldn't be rendered in the current environment
					} else {
						// Something else went wrong
					}
				});
		});
}

//function to create employee-
const renderEmployee = ({ first_name, last_name, manager }) => {
	db.query(
		"INSERT INTO employee (first_name, last_name, manager)    VALUES ?",
		("first_name", "last_name", "manager"),
		function (err, result) {
			if (err) throw err;
		}
	);
};
