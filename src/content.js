import {
  DEFAULT_PROJECT_ID,
  getProjectById,
  deleteProjectById,
  getUniqueTitle,
  saveProjectList,
} from "./project-storage.js";
import { createToDo } from "./to-do.js";
import {
  getToDoById,
  getToDoListByProjectId,
  clearCompletedByProjectId,
  saveToDoList,
  deleteAllToDosByProjectId,
} from "./to-do-storage.js";
import { format, isPast } from "date-fns";

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
  const contentFooter = renderContentFooter();
  content.append(contentHeader, contentBody, contentFooter);
}

function renderContentHeader() {
  const contentHeader = document.createElement("div");
  contentHeader.classList.add("content-header");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;
  projectTitle.setAttribute("title", "Click to edit project title");

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

  const btnSaveEdit = document.createElement("button");
  btnSaveEdit.classList.add("primary");
  btnSaveEdit.textContent = "Save";

  const btnCancelEdit = document.createElement("button");
  btnCancelEdit.classList.add("cancel");
  btnCancelEdit.type = "button";
  btnCancelEdit.textContent = "Cancel";

  const btnDeleteProject = document.createElement("button");
  btnDeleteProject.classList.add("delete");
  btnDeleteProject.type = "button";
  btnDeleteProject.textContent = "Delete";

  // btnContainer.append(btnSaveEdit, btnCancelEdit, btnDeleteProject);
  btnContainer.append(btnDeleteProject, btnCancelEdit, btnSaveEdit);

  return btnContainer;
}

function renderContentBody() {
  const contentBody = document.createElement("div");
  contentBody.classList.add("content-body");

  const toDoList = getToDoListByProjectId(project.id);

  toDoList.forEach((toDo) => {
    const toDoElement = renderToDoElement(toDo);
    contentBody.append(toDoElement);
  });

  return contentBody;
}

function renderToDoElement(toDo) {
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("to-do-element");
  toDoElement.dataset.id = toDo.id;

  const checkBox = document.createElement("input");
  checkBox.classList.add("to-do-check-box");
  checkBox.type = "checkbox";
  checkBox.checked = toDo.checked;
  toDoElement.classList.toggle("checked", toDo.checked);

  const title = document.createElement("h3");
  title.classList.add("to-do-title");
  title.setAttribute("title", "Click to edit Todo");
  title.textContent = toDo.title;

  const description = document.createElement("div");
  description.classList.add("to-do-description");
  description.textContent = toDo.description;

  const dueDate = renderDueDate(toDo);

  const priority = document.createElement("div");
  const priorityStr = `p${toDo.priority}`;

  priority.textContent = priorityStr;
  priority.classList.add("to-do-priority");
  toDoElement.classList.add(priorityStr);

  toDoElement.append(checkBox, title, description, dueDate, priority);

  return toDoElement;
}

function renderDueDate(toDo) {
  const dueDate = document.createElement("div");
  dueDate.classList.add("to-do-due-date");

  const dueDateRaw = toDo.dueDate;
  const dueDateText = format(dueDateRaw, "yyyy-MM-dd a hh:mm");
  dueDate.textContent = `Due Date: ${dueDateText}`;

  if (isPast(dueDateRaw)) {
    dueDate.textContent += " (Expired)"
  }

  return dueDate;
}

function renderContentFooter() {
  const contentFooter = document.createElement("div");
  contentFooter.classList.add("content-footer");

  const btnAddToDo = document.createElement("button");
  btnAddToDo.classList.add("add-to-do");
  btnAddToDo.textContent = "Add Todo";

  const btnClearCompleted = document.createElement("button");
  btnClearCompleted.classList.add("clear-completed");
  btnClearCompleted.textContent = "Clear Completed";

  contentFooter.append(btnAddToDo, btnClearCompleted);

  return contentFooter;
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
  deleteProjectById(project.id);
  saveProjectList();
  deleteAllToDosByProjectId(project.id);
  saveToDoList();
}

export function checkToDoFromUI(toDoId) {
  const toDo = getToDoById(toDoId);
  toDo.check();
  saveToDoList();
}

export function clearCompletedFromUI() {
  clearCompletedByProjectId(project.id);
  saveToDoList();
}

export default content;
