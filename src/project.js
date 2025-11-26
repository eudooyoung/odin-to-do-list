import ToDoItem from "./toDoItem.js";

const projectList = [];

class Project {
  constructor(title = "New Project") {
    this.id = "P-" + crypto.randomUUID();
    this.title = title;
    this.toDoList = [];
  }

  addToDo() {
    this.toDoList.push(new ToDoItem("test", "test", "test", "test"));
  }
}

export function createProject(title) {
  const project = new Project(title);
  projectList.push(project);
  return project;
}

export function getProjectById(id) {
  return projectList.find((project) => project.id === id);
}

export default Project;
