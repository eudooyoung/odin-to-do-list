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

export function getProjectById(id) {
  return projectList.find((project) => project.id === id);
}

export function updateProjectTitle(project, title) {
  project.title = title;
}

export function deleteProjectById(id) {
  const idxToDelete = projectList.findIndex((project) => project.id === id);
  projectList.splice(idxToDelete, 1);
}

export function getProjectList() {
  return projectList;
}

export function getUniqueTitle(title, currentProject) {
  let uniqueTitle = title;
  let count = 1;

  while (isTitleDuplicate(uniqueTitle, currentProject)) {
    uniqueTitle = `${title} (${count})`;
    count++;
  }

  return uniqueTitle;
}

function isTitleDuplicate(title, currentProject) {
  return projectList.some(
    (project) => project !== currentProject && project.title === title
  );
}

export default Project;
