// TODO: Write code to define and export the Employee class

// cant remember what that is for????? - don't think it does anything
//const EditorPrompt = require("inquirer/lib/prompts/editor");

class Employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }
  getName() {
    console.log(this.name);
    return this.name;
  }
  getId() {
    console.log(this.id);
    return this.id;
  }
  getEmail() {
    console.log(this.email);
    return this.email;
  }
  getRole() {
    console.log(this.role);
    return "Employee";
  }
}

const bobEmployee = new Employee("Bob", 1, "bob@gmail.com", "guy", 23, "bob123");

bobEmployee.getName();
bobEmployee.getId();
bobEmployee.getEmail();
bobEmployee.getRole();

module.exports = Employee;
