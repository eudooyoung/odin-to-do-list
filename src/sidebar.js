import {
  createProject,
  addProject,
  saveProjectList,
  getAllProject,
  getUniqueTitle,
} from "./project-storage.js";

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

  const projectList = getAllProject();
  projectList.forEach((project) => {
    const projectElement = renderProjectElement(project);
    sidebarBody.append(projectElement);
  });

  return sidebarBody;
}

function renderProjectElement(project) {
  const projectElement = document.createElement("div");
  projectElement.classList.add("project-element");
  projectElement.dataset.id = project.id;

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  projectElement.append(projectTitle);

  return projectElement;
}

export function renderProjectCreateForm() {
  const projectCreateForm = document.createElement("form");
  projectCreateForm.classList.add("create-project");

  const projectTitleLabel = document.createElement("label");
  projectTitleLabel.htmlFor = "create-project-title";

  const projectTitleInput = document.createElement("input");
  projectTitleInput.name = "project-title";
  projectTitleInput.id = "create-project-title";
  projectTitleInput.value = "New Project";
  projectTitleInput.maxLength = 25;

  const btnConfirmCreateProject = document.createElement("button");
  btnConfirmCreateProject.classList.add("primary");
  btnConfirmCreateProject.textContent = "Create";

  const btnCancelCreateProject = document.createElement("button");
  btnCancelCreateProject.classList.add("cancel");
  btnCancelCreateProject.type = "button";
  btnCancelCreateProject.textContent = "Cancel";

  projectCreateForm.append(
    projectTitleLabel,
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

export function getProjectCreateForm() {
  return sidebar.querySelector("form.create-project");
}

export function getProjectElementById(projectId) {
  return sidebar.querySelector(`.project-element[data-id="${projectId}"]`);
}

export function getSelectedElement() {
  return sidebar.querySelector(".project-element.selected");
}

function renderSidebarFooter() {
  const sidebarFooter = document.createElement("div");
  sidebarFooter.classList.add("sidebar-footer");

  const btnAddProject = document.createElement("button");
  btnAddProject.classList.add("add-project");
  btnAddProject.textContent = "Add Project";

  const btnAddToDo = document.createElement("button");
  btnAddToDo.classList.add("add-to-do");
  btnAddToDo.textContent = "Add Todo";

  sidebarFooter.append(btnAddProject, btnAddToDo);

  return sidebarFooter;
}

export function clearSidebar() {
  sidebar.innerHTML = "";
}

export function focusTitleInput(form) {
  const input = form.querySelector("input[name='project-title']");
  input.focus();
}

export function addProjectFromUI(projectCreateForm) {
  const formData = new FormData(projectCreateForm);
  const projectTitle = formData.get("project-title").trim();
  const uniqueTitle = getUniqueTitle(projectTitle);
  const newProject =  createProject({title: uniqueTitle});
  addProject(newProject);
  saveProjectList(newProject);
  return newProject.id;
}

export function markProjectElement(projectElement) {
  const projectElements = sidebar.querySelectorAll(".project-element");
  projectElements.forEach((element) => {
    element.classList.toggle("selected", element === projectElement);
  });
}

export default sidebar;
