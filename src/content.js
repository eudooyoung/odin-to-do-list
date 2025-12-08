import {
  getProjectById,
  updateProjectTitle,
  deleteProjectById,
  // getUniqueTitle,
} from "./project";
import { createToDo } from "./toDoItem";

const content = document.createElement("div");
content.id = "content";

export function setContentProjectId(id) {
  content.dataset.projectId = id;
}

export function renderContent() {
  clearContent();

  const projectId = content.dataset.projectId;
  const project = getProjectById(projectId);

  const contentHeader = renderContentHeader(project);
  const contentBody = renderContentBody(project);
  const contentFooter = renderContentFooter();

  content.append(contentHeader, contentBody, contentFooter);
}

function renderContentHeader(project) {
  const contentHeader = document.createElement("div");
  contentHeader.classList.add("content-header");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  const projectEditForm = renderEditProjectForm(project);

  contentHeader.append(projectTitle, projectEditForm);

  return contentHeader;
}

function renderEditProjectForm(project) {
  const projectEditForm = document.createElement("form");
  projectEditForm.classList.add("edit-project", "hide");

  const projectTitleInput = document.createElement("input");
  projectTitleInput.name = "new-project-title";
  projectTitleInput.value = project.title;

  const editFormBtnContainer = renderEditFormBtnContainer();

  projectEditForm.append(projectTitleInput, editFormBtnContainer);

  return projectEditForm;
}

function renderEditFormBtnContainer() {
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  const btnConfirmEdit = document.createElement("button");
  btnConfirmEdit.classList.add("confirm");
  btnConfirmEdit.textContent = "Confirm";

  const btnCancelEdit = document.createElement("button");
  btnCancelEdit.classList.add("cancel");
  btnCancelEdit.type = "button";
  btnCancelEdit.textContent = "Cancel";

  const btnDeleteProject = document.createElement("button");
  btnDeleteProject.classList.add("delete");
  btnDeleteProject.type = "button";
  btnDeleteProject.textContent = "Delete";

  btnContainer.append(btnConfirmEdit, btnCancelEdit, btnDeleteProject);

  return btnContainer;
}

export function toggleEditProjectForm() {
  const projectTitle = content.querySelector(".project-title");
  projectTitle.classList.toggle("hide");

  const projectEditForm = content.querySelector("form.edit-project");
  projectEditForm.classList.toggle("hide");
}

export function updateProjectFromUI(form) {
  const newTitle = form
    .querySelector("input[name='new-project-title']")
    .value.trim();
  const projectId = content.dataset.projectId;
  const project = getProjectById(projectId);
  const uniqueTitle = getUniqueTitle(newTitle, project);
  updateProjectTitle(project, uniqueTitle);
  hideEditProjectForm();
  renderContent(project);
  return project;
}

export function deleteProjectFromUI() {
  deleteProjectById(content.dataset.projectId);
}

function renderContentBody(project) {
  const contentBody = document.createElement("div");
  contentBody.classList.add("content-body");

  const toDoList = project.toDoList;

  toDoList.forEach((toDo) => {
    const toDoItem = renderToDoItem(toDo);
    contentBody.append(toDoItem);
  });

  return contentBody;
}

function renderToDoItem(toDo) {
  const toDoItem = document.createElement("div");
  toDoItem.classList.add("to-do-item");
  toDoItem.dataset.id = toDo.id;

  const title = document.createElement("h3");
  title.classList.add("to-do-title");
  title.textContent = toDo.title;

  const description = document.createElement("div");
  description.textContent = toDo.description;
  description.style.display = "none";

  const dueDate = document.createElement("div");
  dueDate.textContent = toDo.dueDate;
  dueDate.style.display = "none";

  const priority = document.createElement("div");
  priority.textContent = toDo.priority;
  priority.style.display = "none";

  toDoItem.append(title, description, dueDate, priority);

  return toDoItem;
}

export function toggleToDoDetail(toDoItem) {
  const isOpen = toDoItem.classList.contains("open");

  if (isOpen) {
    toDoItem.classList.toggle("open");
    hideToDoDetail(toDoItem);
  } else {
    toDoItem.classList.toggle("open");
    showToDoDetail(toDoItem);
  }
}

function showToDoDetail(toDoItem) {
  const toDoDetail = getToDoDetail(toDoItem);
  toDoDetail.forEach((child) => {
    child.style.display = "block";
  });
}

function hideToDoDetail(toDoItem) {
  const toDoDetail = getToDoDetail(toDoItem);
  toDoDetail.forEach((child) => {
    child.style.display = "none";
  });
}

function getToDoDetail(toDoItem) {
  const toDoDetail = [...toDoItem.children].filter(
    (detail) => !detail.classList.contains("todo-title")
  );
  return toDoDetail;
}

function renderContentFooter() {
  const contentFooter = document.createElement("div");
  contentFooter.classList.add("content-footer");

  const toDoAddButton = document.createElement("button");
  toDoAddButton.classList.add("content-footer", "add-todo");
  toDoAddButton.textContent = "Add Todo";

  contentFooter.append(toDoAddButton);

  return contentFooter;
}

export function addToDoFromUI() {
  const toDo = createToDo("test", "test", "test", "test");

  const project = getProjectById(content.dataset.projectId);
  project.addToDo(toDo);

  const toDoItem = renderToDoElement(toDo);

  contentBody.append(toDoItem);
}

function toggleProjectContent() {
  contentHeader.classList.toggle("hide");
  contentBody.classList.toggle("hide");
  toDoAddButton.classList.toggle("hide");
}

function renderProjectCreateForm() {
  const projectTitleInput = document.createElement("input");
  projectTitleInput.classList.add("new-project-title");
  projectTitleInput.name = "new-project-title";
  projectTitleInput.value = "New Project";

  projectCreateForm.append(projectTitleInput);
}

export function clearContent() {
  content.innerHTML = "";
}

export default content;
