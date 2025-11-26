import ToDo from "./toDoItem.js";

const projectList = [];

class Project {
  constructor(title = "New Project") {
    this.id = "P-" + crypto.randomUUID();
    this.title = title;
    this.toDoList = [];
  }

  addToDo(toDo) {
    this.toDoList.push(toDo);
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
