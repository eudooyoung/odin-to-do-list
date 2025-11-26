import { getProjectById } from "./project";

const content = document.createElement("div");
content.id = "content";

export const toDoAddButton = document.createElement("button");
toDoAddButton.classList.add("button", "add-toDo");
toDoAddButton.textContent = "Add Todo";

let project = null;
let toDoList = null;

export function setContentWithProjectId(id) {
  clearContent();
  project = getProjectById(id);
  toDoList = project.toDoList;
  displayContent();
}

function displayContent() {
  displayContentHeader();
  displayToDoList();
  content.appendChild(toDoAddButton);
}

function displayContentHeader() {
  const contentHeader = document.createElement("div");
  contentHeader.classList.add("header");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  const editProjectButton = document.createElement("button");
  editProjectButton.classList.add("button", "edit-project");
  editProjectButton.textContent = "Edit";

  contentHeader.append(projectTitle, editProjectButton);

  content.append(contentHeader);
}

function displayToDoList() {
  toDoList.forEach((toDo) => {
    const toDoItem = setToDoElement(toDo);
    content.append(toDoItem);
  });
}

function setToDoElement(toDo) {
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
  project.addToDo();
  clearContent();
  displayContent();
}

export function clearContent() {
  content.innerHTML = "";
}

export default content;
