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
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item");
  projectItem.dataset.id = project.id;

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  const projectCreateForm = renderProjectCreateForm();

  projectItem.append(projectTitle, projectCreateForm);

  return projectItem;
}

function renderProjectCreateForm() {
  const projectCreateForm = document.createElement("form");
  projectCreateForm.classList.add("create-project");

  const projectTitleLabel = document.createElement("label");
  projectTitleLabel.htmlFor = "new-project-title";

  const projectTitleInput = document.createElement("input");
  projectTitleInput.type = "text";
  projectTitleInput.id = "new-project-title";
  projectTitleInput.name = "new-project-title";
  projectTitleInput.value = "New Project";

  projectCreateForm.append(projectTitleLabel);

  return projectCreateForm;
}

 function getProjectItemById(projectId) {
  return sidebarBody.querySelector(`.project-item[data-id="${projectId}"]`);
}

export function addProjectFromUI() {
  const project = createProject();
  renderSidebar();
  const projectItem = getProjectItemById(project.id);
  // getFocusOnSelectedItem(projectItem);
  return projectItem;
}

function getFocusOnSelectedItem(projectItem) {
  projectItem.querySelector("input").focus();
}

export function updateSelectedProjectItem(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
}

export default sidebar;
