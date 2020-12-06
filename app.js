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

//Variables to store user input
const teamMem = [];
const emptyId = [];

//Function to start user prompts
function buildTeam() {
  console.log("Build your team")
    inquirer
    .prompt([
      {
        type: "list",
        message: "What type of team member would you like to add?",
        name: "memType",
        choices: ["Manager", "Engineer", "Intern", "No further team members"],
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

//Manager function to run manager prompts
function manager() {
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
        message: "What is your office number?",
        name: "officeNumber",
      },
    ])
    .then(function (answer) {
      const manager = new Manager(
        answer.name,
        answer.id,
        answer.email,
        answer.officeNumber
      );

      teamMem.push(manager);
      emptyId.push(answer.officeNumber);

      buildTeam();
    });
}

//Engineer function to run engineer prompts
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
    });
}

//Intern function to run intern prompts
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
    });
}

// function call to generate html file
function generateTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMem), "utf-8");
}

//Starts initial function
buildTeam();


