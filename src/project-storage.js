import Project from "./project.js";

const projectList = [];
const DEFAULT_PROJECT_ID = "default";
projectList.push({
  id: DEFAULT_PROJECT_ID,
  title: "Inbox",
  toDoList: [],
});

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
