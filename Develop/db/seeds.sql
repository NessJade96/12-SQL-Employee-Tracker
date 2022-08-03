INSERT INTO department (name)
VALUES ("Human Resources"),
       ("IT"),
       ("Finance"),
       ("Legal"),
       ("Marketing");


INSERT INTO job (title, salary, department_id)
VALUES ("Administration Officer", 70000, 1),
       ("Help Desk", 75000, 2),
       ("Accountant", 75000, 3),
       ("Senior Accountant", 95000, 3),
       ("Senior Help Desk", 95000, 2),
       ("Legal administrator", 75000, 4),
       ("Social Media Expert", 75000, 5);

    

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ("Rosie", "Shaw", 1, 2),
       ("Lachlan", "Maclean", 2),
       ("Adam", "Nicholson", 3, 4),
       ("Keely", "Easterbrook", 4),
       ("Kaili", "Bayne", 5),
       ("Samantha", "Harrison", 6),
       ("Sandy", "Bloom", 7);

