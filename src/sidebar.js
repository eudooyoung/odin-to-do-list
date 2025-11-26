import { createProject } from "./project.js";

const sidebar = document.createElement("div");
sidebar.id = "sidebar";

const banner = document.createElement("h1");
banner.classList.add("sidebar-header", "banner");
banner.textContent = "Todos";

const sidebarBody = document.createElement("div");
sidebarBody.classList.add("sidebar-body");

const projectAddButton = document.createElement("button");
projectAddButton.classList.add("sidebar-footer", "button", "add-project");
projectAddButton.textContent = "Add Project";

export function addProjectFromUI() {
  const project = createProject();
  renderProject(project);
}

function renderProject(project) {
  const projectItem = setProjectElement(project);
  sidebarBody.append(projectItem);
}

function setProjectElement(project) {
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item");
  projectItem.dataset.id = project.id;

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  projectItem.append(projectTitle);

  return projectItem;
}

export function updateSelectedProject(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
}

sidebar.append(banner, sidebarBody, projectAddButton);

export default sidebar;
