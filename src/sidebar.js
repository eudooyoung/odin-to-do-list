import { createProject, getProjectList } from "./project.js";

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

export function renderSidebar() {
  clearSidebar();
  renderSidebarBody();
  sidebar.append(banner, sidebarBody, btnAddProject);
}

function clearSidebar() {
  sidebarBody.innerHTML = "";
}

function renderSidebarBody() {
  const projectList = getProjectList();
  projectList.forEach((project) => {
    const projectItem = renderProjectElement(project);
    sidebarBody.append(projectItem);
  });
}

function renderProjectElement(project) {
  const projectItem = document.createElement("h2");
  projectItem.classList.add("project-item");
  projectItem.dataset.id = project.id;
  projectItem.textContent = project.title;

  return projectItem;
}

export function addProjectFromUI() {
  const project = createProject();
  const projectItem = renderProjectElement(project);
  sidebarBody.append(projectItem);
  
  return projectItem;
}

export function updateSelectedProjectItem(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
}

renderSidebar();

export default sidebar;
