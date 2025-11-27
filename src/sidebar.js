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
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item");
  projectItem.dataset.id = project.id;

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  const btnOpenMenu = document.createElement("button");
  btnOpenMenu.classList.add("open-menu");
  btnOpenMenu.textContent = "…";

  const projectMenu = renderProjectMenu();

  projectItem.append(projectTitle, btnOpenMenu, projectMenu);

  return projectItem;
}

function renderProjectMenu() {
  const projectMenu = document.createElement("div");
  projectMenu.classList.add("edit-menu");

  const btnRenameProject = document.createElement("button");
  btnRenameProject.classList.add("rename-project");
  btnRenameProject.textContent = "Rename";

  const btnDeleteProject = document.createElement("button");
  btnDeleteProject.classList.add("delete-project");
  btnDeleteProject.textContent = "Delete";

  projectMenu.append(btnRenameProject, btnDeleteProject);

  return projectMenu;
}

export function updateSelectedProject(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
}

export function toggleProjectMenu(projectItem, btnOpenMenu) {
  const projectMenu = projectItem.querySelector(".edit-menu");
  projectMenu.classList.toggle("open");
  setMenuPosition(btnOpenMenu, projectMenu);
}

function setMenuPosition(btnOpenMenu, projectMenu) {
  const rect = btnOpenMenu.getBoundingClientRect();
  projectMenu.style.left = `${rect.left - 30}px`;
  projectMenu.style.top = `${rect.bottom}px`;
  console.log(rect);
}

sidebar.append(banner, sidebarBody, btnAddProject);

export default sidebar;
