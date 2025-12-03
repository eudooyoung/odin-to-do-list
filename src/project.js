import ToDo from "./toDoItem.js";

const projectList = [];

class Project {
  title = "";
  
  constructor() {
    this.id = "P-" + crypto.randomUUID();
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

export function deleteProjectById(id) {
  const idxToDelete = projectList.findIndex((project) => project.id === id);
  projectList.splice(idxToDelete, 1);
}

export function getProjectById(id) {
  return projectList.find((project) => project.id === id);
}

export function getProjectList() {
  return projectList;
}

export default Project;
