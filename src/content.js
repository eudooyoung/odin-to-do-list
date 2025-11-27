import { getProjectById } from "./project";
import { createToDo } from "./toDoItem";

const content = document.createElement("div");
content.id = "content";

const contentHeader = document.createElement("div");
contentHeader.classList.add("content-header");

const contentBody = document.createElement("div");
contentBody.classList.add("content-body");

const toDoAddButton = document.createElement("button");
toDoAddButton.classList.add("content-footer", "add-todo");
toDoAddButton.textContent = "Add Todo";

let project = null;
let toDoList = null;

export function renderContentByProjectId(id) {
  project = getProjectById(id);
  toDoList = project.toDoList;
  clearContent();
  renderContent();
}

function renderContent() {
  renderContentHeader();
  renderContentBody();
  content.append(contentHeader, contentBody, toDoAddButton);
}

function renderContentHeader() {
  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.title;

  const editProjectButton = document.createElement("button");
  editProjectButton.classList.add("edit-project");
  editProjectButton.textContent = "⋮";

  contentHeader.append(projectTitle);
}

function renderContentBody() {
  toDoList.forEach((toDo) => {
    const toDoItem = renderToDoElement(toDo);
    contentBody.append(toDoItem);
  });
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
  project.addToDo(toDo);

  const toDoItem = renderToDoElement(toDo);

  contentBody.append(toDoItem);
  // clearContent();
  // renderContent();
}

export function clearContent() {
  content.innerHTML = "";
  contentHeader.innerHTML = "";
  contentBody.innerHTML = "";
}

export default content;
