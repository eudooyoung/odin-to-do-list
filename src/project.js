const projectList = [];

class Project {
  constructor(title) {
    this.id = "P-" + crypto.randomUUID();
    this.title = title;
    this.toDoList = [];
  }

  addToDo(toDo) {
    this.toDoList.push(toDo);
  }

  updateProjectTitle(title) {
    this.title = title;
  }
}

export function getAllProject() {
  return projectList;
}

export function createProject(title) {
  const project = new Project(title);
  projectList.push(project);
  return project;
}

export function getProjectById(id) {
  return projectList.find((project) => project.id === id);
}

export function deleteProjectById(id) {
  const idxToDelete = projectList.findIndex((project) => project.id === id);
  projectList.splice(idxToDelete, 1);
}

export function getUniqueTitle(projectTitle, currentProject = null) {
  let uniqueTitle = projectTitle;
  let count = 1;

  while (isTitleDuplicate(uniqueTitle, currentProject)) {
    uniqueTitle = `${projectTitle} (${count})`;
    count++;
  }

  return uniqueTitle;
}

function isTitleDuplicate(title, currentProject = null) {
  return projectList.some(
    (project) => project !== currentProject && project.title === title
  );
}

export default Project;
