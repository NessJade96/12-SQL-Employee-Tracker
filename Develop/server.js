//https://www.npmjs.com/package/console.table
// call once somewhere in the beginning of the app
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
const review = require("express").Router();
const mysql = require("mysql2");

//creates port - and local host 3001
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //MIGHT NEED TO CHANGE THIS

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
