import { createProject } from "./project.js";

const sidebar = document.createElement("div");
sidebar.id = "sidebar";

const banner = document.createElement("h1");
banner.classList.add("sidebar-header", "banner");
banner.textContent = "Todos";

const sidebarBody = document.createElement("div");
sidebarBody.classList.add("sidebar-body");

const btnAddProject = document.createElement("button");
btnAddProject.classList.add("sidebar-footer", "add-project");
btnAddProject.textContent = "Add Project";

export function addProjectFromUI() {
  const project = createProject();
  const projectItem = renderProjectElement(project);
  sidebarBody.append(projectItem);
}

function renderProjectElement(project) {
  const projectItem = document.createElement("h2");
  projectItem.classList.add("project-item");
  projectItem.dataset.id = project.id;
  projectItem.textContent = project.title;

  return projectItem;
}

export function updateSelectedProject(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
}

sidebar.append(banner, sidebarBody, btnAddProject);

export default sidebar;
