import {
  DEFAULT_PROJECT_ID,
  getProjectById,
  deleteProjectById,
  getUniqueTitle,
} from "./project-storage.js";
import { createToDo } from "./to-do.js";
import { getToDoListByProjectId } from "./to-do-storage.js";

const content = document.createElement("div");
content.id = "content";

let project = null;

export function setContentByProjectId(projectId) {
  project = getProjectById(projectId);
  content.dataset.id = projectId;
}

export function renderContent() {
  clearContent();

  if (!project) {
    return;
  }

  const contentHeader = renderContentHeader();
  const contentBody = renderContentBody();
  content.append(contentHeader, contentBody);
}

function renderContentHeader() {
  const contentHeader = document.createElement("div");
  contentHeader.classList.add("content-header");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;
  projectTitle.title = "Click to edit project title";

  const projectEditForm = renderEditProjectForm();

  contentHeader.append(projectTitle, projectEditForm);

  return contentHeader;
}

function renderEditProjectForm() {
  const projectEditForm = document.createElement("form");
  projectEditForm.classList.add("edit-project", "hide");

  const projectTitleLabel = renderProjectTitleLabel();
  const editFormBtnContainer = renderEditFormBtnContainer();

  projectEditForm.append(projectTitleLabel, editFormBtnContainer);

  return projectEditForm;
}

function renderProjectTitleLabel() {
  const projectTitleLabel = document.createElement("label");

  const projectTitleInput = document.createElement("input");
  projectTitleInput.name = "title";
  projectTitleInput.value = project.title;

  projectTitleLabel.append(projectTitleInput);

  return projectTitleLabel;
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

function renderContentBody() {
  const contentBody = document.createElement("div");
  contentBody.classList.add("content-body");

  const toDoList = getToDoListByProjectId(project.id);

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

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const title = document.createElement("h3");
  title.classList.add("to-do-title");
  title.textContent = toDo.title;

  const description = document.createElement("div");
  description.classList.add("to-do-description");
  description.textContent = toDo.description;

  const dueDate = document.createElement("div");
  dueDate.textContent = toDo.dueDate;

  const priority = `p${toDo.priority}`;
  toDoItem.classList.add(priority);

  toDoItem.append(checkBox, title, description, dueDate);

  return toDoItem;
}

function clearContent() {
  content.innerHTML = "";
}

export function toggleEditProjectForm() {
  if (project.id === DEFAULT_PROJECT_ID) {
    alert("Default project cannot be edited");
    return;
  }

  const projectTitle = content.querySelector(".project-title");
  projectTitle.classList.toggle("hide");

  const projectEditForm = content.querySelector("form.edit-project");
  projectEditForm.classList.toggle("hide");
}

export function focusNewTitleInput() {
  const input = content.querySelector(".edit-project input[name='title']");
  input.focus();
}

export function updateProjectFromUI(projectUpdateForm) {
  const formData = new FormData(projectUpdateForm);
  const newTitle = formData.get("title");
  const uniqueTitle = getUniqueTitle(newTitle, project);
  project.updateProjectTitle(uniqueTitle);
}

export function deleteProjectFromUI() {
  deleteProjectById(content.dataset.id);
}

export default content;
