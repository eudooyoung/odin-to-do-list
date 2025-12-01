import { getProjectById, deleteProjectById } from "./project";
import { createToDo } from "./toDoItem";

const content = document.createElement("div");
content.id = "content";

const contentHeader = document.createElement("div");
contentHeader.classList.add("content-header");

const projectTitle = document.createElement("h2");
projectTitle.classList.add("project-title");

const editProjectForm = document.createElement("form");
editProjectForm.classList.add("edit-project");

const contentBody = document.createElement("div");
contentBody.classList.add("content-body");

const toDoAddButton = document.createElement("button");
toDoAddButton.classList.add("content-footer", "add-todo");
toDoAddButton.textContent = "Add Todo";

export function renderContentByProjectId(id) {
  clearContent();
  content.dataset.projectId = id;
  const project = getProjectById(id);
  renderContent(project);
}

export function clearContent() {
  contentHeader.innerHTML = "";
  editProjectForm.innerHTML = "";
  contentBody.innerHTML = "";
}

function renderContent(project) {
  renderContentHeader(project);
  renderContentBody(project);
  content.append(contentHeader, contentBody, toDoAddButton);
}

function renderContentHeader(project) {
  projectTitle.textContent = project.title;

  renderEditProjectForm(project);

  contentHeader.append(projectTitle, editProjectForm);
}

function renderEditProjectForm(project) {
  const projectTitleLabel = document.createElement("label");
  projectTitleLabel.htmlFor = "new-project-title";

  const projectTitleInput = document.createElement("input");
  projectTitleInput.type = "text";
  projectTitleInput.id = "new-project-title";
  projectTitleInput.name = "new-project-title";
  projectTitleInput.value = project.title;

  const editFormBtnContainer = renderEditFormBtnContainer();

  editProjectForm.append(
    projectTitleLabel,
    projectTitleInput,
    editFormBtnContainer
  );
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

export function showEditProjectForm() {
  projectTitle.classList.add("hide");
  editProjectForm.classList.add("show");
}

export function hideEditProjectForm() {
  projectTitle.classList.remove("hide");
  editProjectForm.classList.remove("show");
}

export function updateProjectFromUI(form) {
  const newTitle = form.querySelector("input[name='new-project-title']");
  const project = getProjectById(content.dataset.projectId);
  project.title = newTitle.value;
  hideEditProjectForm();
  clearContent();
  renderContent(project);
}

export function deleteProjectFromUI() {
  deleteProjectById(content.dataset.projectId);
}

function renderContentBody(project) {
  const toDoList = project.toDoList;

  toDoList.forEach((toDo) => {
    const toDoItem = renderToDoElement(toDo);
    contentBody.append(toDoItem);
  });

  return contentBody;
}

function renderToDoElement(toDo) {
  const toDoItem = document.createElement("div");
  toDoItem.classList.add("todo-item");
  toDoItem.dataset.id = toDo.id;

  const title = document.createElement("h3");
  title.classList.add("todo-title");
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

export function addToDoFromUI() {
  const toDo = createToDo("test", "test", "test", "test");

  const project = getProjectById(content.dataset.projectId);
  project.addToDo(toDo);

  const toDoItem = renderToDoElement(toDo);

  contentBody.append(toDoItem);
}

export default content;
