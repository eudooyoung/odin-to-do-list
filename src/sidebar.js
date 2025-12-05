import { createProject, getProjectList } from "./project.js";

const sidebar = document.createElement("div");
sidebar.id = "sidebar";

export function renderSidebar() {
  clearSidebar();
  const sidebarHeader = renderSidebarHeader();
  const sidebarBody = renderSidebarBody();
  const sidebarFooter = renderSidebarFooter();
  sidebar.append(sidebarHeader, sidebarBody, sidebarFooter);
}

export function renderSidebarWithProjectCreateForm(projectCreateForm) {
  clearSidebar();
  const sidebarHeader = renderSidebarHeader();
  const sidebarBody = renderSidebarBody(projectCreateForm);
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

function renderSidebarBody(projectCreateForm = null) {
  const sidebarBody = document.createElement("div");
  sidebarBody.classList.add("sidebar-body");

  const projectList = getProjectList();
  projectList.forEach((project) => {
    const projectItem = renderProjectItem(project);
    sidebarBody.append(projectItem);
  });

  if (projectCreateForm) {
    sidebarBody.append(projectCreateForm);
  }

  return sidebarBody;
}

export function renderProjectCreateForm() {
  const projectCreateForm = document.createElement("form");
  projectCreateForm.classList.add("create-project");

  const projectTitleInput = document.createElement("input");
  projectTitleInput.name = "new-project-title";
  projectTitleInput.value = "New Project";

  const btnConfirmCreateProject = document.createElement("button");
  btnConfirmCreateProject.textContent = "Confirm";

  const btnCancelCreateProject = document.createElement("button");
  btnCancelCreateProject.textContent = "Cancel";

  projectCreateForm.append(
    projectTitleInput,
    btnConfirmCreateProject,
    btnCancelCreateProject
  );

  return projectCreateForm;
}

export function getTitleInputFocus(form) {
  const input = form.querySelector("input[name='new-project-title']");
  input.focus();
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

export function addProjectFromUI() {
  const project = createProject();
  return project;
}

export function updateSelectedProjectItem(projectItem) {
  document.querySelectorAll(".project-item").forEach((item) => {
    item.classList.toggle("selected", item === projectItem);
  });
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
