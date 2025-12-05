import { createProject, getProjectList, getUniqueTitle } from "./project.js";

const sidebar = document.createElement("div");
sidebar.id = "sidebar";

export function renderSidebar() {
  clearSidebar();
  const sidebarHeader = renderSidebarHeader();
  const sidebarBody = renderSidebarBody();
  const sidebarFooter = renderSidebarFooter();
  sidebar.append(sidebarHeader, sidebarBody, sidebarFooter);
}

function renderSidebarHeader() {
  const sidebarHeader = document.createElement("div");
  sidebarHeader.classList.add("sidebar-header");

  const banner = document.createElement("h1");
  banner.classList.add("banner");
  banner.textContent = "Todos";

  sidebarHeader.append(banner);

  return sidebarHeader;
}

function renderSidebarBody() {
  const sidebarBody = document.createElement("div");
  sidebarBody.classList.add("sidebar-body");

  const projectList = getProjectList();
  projectList.forEach((project) => {
    const projectItem = renderProjectItem(project);
    sidebarBody.append(projectItem);
  });

  return sidebarBody;
}

export function renderProjectCreateForm() {
  const projectCreateForm = document.createElement("form");
  projectCreateForm.classList.add("create-project");

  const projectTitleInput = document.createElement("input");
  projectTitleInput.name = "project-title";
  projectTitleInput.value = "New Project";

  const btnConfirmCreateProject = document.createElement("button");
  btnConfirmCreateProject.classList.add("confirm");
  btnConfirmCreateProject.textContent = "Confirm";

  const btnCancelCreateProject = document.createElement("button");
  btnCancelCreateProject.classList.add("cancel");
  btnCancelCreateProject.type = "button";
  btnCancelCreateProject.textContent = "Cancel";

  projectCreateForm.append(
    projectTitleInput,
    btnConfirmCreateProject,
    btnCancelCreateProject
  );

  return projectCreateForm;
}

export function addProjectCreateForm(projectCreateForm) {
  const sidebarBody = sidebar.querySelector(".sidebar-body");
  sidebarBody.append(projectCreateForm);
}

export function removeProjectCreateForm(projectCreateForm) {
  projectCreateForm.remove();
}

export function focusTitleInput(form) {
  const input = form.querySelector("input[name='project-title']");
  input.focus();
}

export function getProjectCreateForm() {
  return sidebar.querySelector("form.create-project");
}

export function addProjectFromUI(projectCreateForm) {
  const projectTitle = projectCreateForm
    .querySelector("input[name='project-title']")
    .value.trim();
  const uniqueTitle = getUniqueTitle(projectTitle);
  const project = createProject(uniqueTitle);
  return project;
}

function renderProjectItem(project) {
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item");
  projectItem.dataset.id = project.id;

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  projectItem.append(projectTitle);

  return projectItem;
}

export function getProjectItemById(projectId) {
  return sidebar.querySelector(`.project-item[data-id="${projectId}"]`);
}

export function markProjectItem(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
}

export function getSelectedProjectItem() {
  return sidebar.querySelector(".project-item.selected");
}

function renderSidebarFooter() {
  const sidebarFooter = document.createElement("div");
  sidebarFooter.classList.add("sidebar-footer");

  const btnAddProject = document.createElement("button");
  btnAddProject.classList.add("add-project");
  btnAddProject.textContent = "Add Project";

  sidebarFooter.append(btnAddProject);

  return sidebarFooter;
}

function clearSidebar() {
  sidebar.innerHTML = "";
}
export default sidebar;
