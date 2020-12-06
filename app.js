//Imports into our file
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");
const Employee = require("./lib/Employee");
const { listenerCount } = require("process");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamMem = [];
const emptyId = [];

//initial manager question
const empQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your ID?",
    name: "id",
  },
  {
    type: "input",
    message: "what is your email?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your role within the company?",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

// function to initialize program
function employee() {
  inquirer.prompt(empQuestions).then(function (answer) {
    //   console.log(answer);

    const emp = new Employee(answer.name, answer.id, answer.email, answer.role);

    teamMem.push(emp);
    emptyId.push(answer.id);

    manager();
    //   writeToFile("team.html", outputPath(answer));
  });
}

function buildTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "memType",
        choices: ["Engineer", "Intern", "No further team members"],
      },
    ])
    .then(function (answer) {
      if (answer.memType === "Manager") {
        manager();
      } else if (answer.memType === "Engineer") {
        engineer();
      } else if (answer.memType === "Intern") {
        intern();
      }else(generateTeam());
    });
}

function manager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
      },
    ])
    .then(function (answer) {
      const manager = new Manager(
        answer.name,
        answer.id,
        answer.email,
        answer.github
      );

      teamMem.push(manager);
      emptyId.push(answer.officeNumber);

      buildTeam();
      //   writeToFile("team.html", outputPath(answer));
    });
}

function engineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID?",
        name: "id",
      },
      {
        type: "input",
        message: "what is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your GitHub user name?",
        name: "github",
      },
    ])
    .then(function (answer) {
      const engineer = new Engineer(
        answer.name,
        answer.id,
        answer.email,
        answer.github
      );

      teamMem.push(engineer);
      emptyId.push(answer.github);

      buildTeam();
      //   writeToFile("team.html", outputPath(answer));
    });
}

function intern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your ID?",
        name: "id",
      },
      {
        type: "input",
        message: "what is your email?",
        name: "email",
      },
      {
        type: "input",
        message: "What school did you attend?",
        name: "school",
      },
    ])
    .then(function (answer) {
      const intern = new Intern(
        answer.name,
        answer.id,
        answer.email,
        answer.school
      );

      teamMem.push(intern);
      emptyId.push(answer.school);

      buildTeam();
      //   writeToFile("team.html", outputPath(answer));
    });
}

function generateTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMem), "utf-8");
}

// function call to initialize program
employee();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
