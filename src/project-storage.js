import Project from "./project.js";

let projectList = [];
export const DEFAULT_PROJECT_ID = "default";

export function createDefaultProject() {
  if (getProjectById(DEFAULT_PROJECT_ID)) {
    return;
  }
  const defaultProject = new Project({ title: "Inbox" });
  defaultProject.id = DEFAULT_PROJECT_ID;
  projectList.unshift(defaultProject);
}

export function getAllProject() {
  return projectList;
}

export function createProject({ id, title }) {
  const project = new Project({ id, title });
  return project;
}

export function addProject(project) {
  projectList.push(project);
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

export function saveProjectList() {
  localStorage.setItem("project-list", JSON.stringify(projectList));
}

export function loadProjectList() {
  const rawData = JSON.parse(localStorage.getItem("project-list"));
  projectList = rawData ? rawData.map((raw) => new Project(raw)) : [];
}
