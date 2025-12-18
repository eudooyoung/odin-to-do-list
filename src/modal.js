import { getAllProject } from "./project-storage.js";
import {
  createToDo,
  addToDo,
  deleteToDoById,
  saveToDoList,
  getToDoById,
} from "./to-do-storage.js";

const modal = document.createElement("dialog");
modal.id = "modal";
modal.setAttribute("closedby", "any");

export function renderModal({ toDoId = null } = {}) {
  clearModal();

  if (toDoId) {
    modal.dataset.id = toDoId;
  } else {
    delete modal.dataset.id;
  }

  const toDo = toDoId ? getToDoById(toDoId) : null;
  const toDoForm = renderToDoForm(toDo);

  modal.append(toDoForm);
}

function renderToDoForm(toDo) {
  const toDoForm = document.createElement("form");
  toDoForm.classList.add("to-do", "hide");

  const toDoTextField = renderToDoTextField(toDo);
  const toDoMetaField = renderToDoMetaField(toDo);
  const toDoBtnField = renderToDoBtnField(toDo);

  toDoForm.append(toDoTextField, toDoMetaField, toDoBtnField);

  return toDoForm;
}

function renderToDoTextField(toDo) {
  const toDoTextField = document.createElement("div");
  toDoTextField.classList.add("text-field");

  const toDoTitleLabel = document.createElement("label");
  const toDoTitleInput = document.createElement("input");
  toDoTitleInput.name = "title";
  if (toDo) toDoTitleInput.value = toDo.title;
  toDoTitleLabel.append(toDoTitleInput);

  const toDoDescriptionLabel = document.createElement("label");
  const toDoDescriptionInput = document.createElement("textarea");
  toDoDescriptionInput.name = "description";
  if (toDo) toDoDescriptionInput.textContent = toDo.description;
  toDoDescriptionLabel.append(toDoDescriptionInput);

  toDoTextField.append(toDoTitleLabel, toDoDescriptionLabel);

  return toDoTextField;
}

function renderToDoMetaField(toDo) {
  const toDoMetaField = document.createElement("div");
  toDoMetaField.classList.add("meta-field");

  const projectLabel = renderProjectLabel(toDo);
  const dueDateLabel = renderDueDateLabel(toDo);
  const priorityLabel = renderPriorityLabel(toDo);

  toDoMetaField.append(projectLabel, dueDateLabel, priorityLabel);

  return toDoMetaField;
}

function renderProjectLabel(toDo) {
  const projectLabel = document.createElement("label");

  const projectSelect = document.createElement("select");
  projectSelect.name = "project";

  const projectList = getAllProject();
  projectList.forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.id;
    projectOption.textContent = project.title;
    projectSelect.append(projectOption);
  });

  if (toDo) projectSelect.value = toDo.projectId;

  projectLabel.append(projectSelect);

  return projectLabel;
}

function renderDueDateLabel(toDo) {
  const dueDateLabel = document.createElement("label");

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "datetime-local";
  dueDateInput.name = "due-date";
  if (toDo) dueDateInput.value = toDo.dueDate;

  dueDateLabel.append(dueDateInput);
  return dueDateLabel;
}

function renderPriorityLabel(toDo) {
  const priorityLabel = document.createElement("label");

  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";

  for (let i = 1; i <= 4; i++) {
    const priorityOption = document.createElement("option");
    priorityOption.value = i;
    priorityOption.textContent = `P${i}`;
    prioritySelect.append(priorityOption);
  }

  if (toDo) prioritySelect.value = toDo.priority;
  prioritySelect.dataset.priority = prioritySelect.value;

  priorityLabel.append(prioritySelect);

  return priorityLabel;
}

function renderToDoBtnField(toDo) {
  const toDoBtnField = document.createElement("div");
  toDoBtnField.classList.add("btn-field");

  const btnSubmit = document.createElement("button");
  btnSubmit.classList.add("primary");
  btnSubmit.textContent = toDo ? "Save" : "Create";

  const btnCancelCreateToDo = document.createElement("button");
  btnCancelCreateToDo.classList.add("cancel");
  btnCancelCreateToDo.type = "button";
  btnCancelCreateToDo.textContent = "Cancel";

  // toDoBtnField.append(btnSubmit, btnCancelCreateToDo);
  toDoBtnField.append(btnCancelCreateToDo, btnSubmit);

  if (toDo) {
    const btnDeleteTodo = document.createElement("button");
    btnDeleteTodo.classList.add("delete");
    btnDeleteTodo.type = "button";
    btnDeleteTodo.textContent = "Delete";
    // toDoBtnField.append(btnDeleteTodo);
    toDoBtnField.prepend(btnDeleteTodo);
  }

  return toDoBtnField;
}

function clearModal() {
  modal.innerHTML = "";
}

export function showModal(projectId) {
  const toDoCreateForm = modal.querySelector("form");
  toDoCreateForm.classList.remove("hide");

  if (projectId) {
    const projectSelect = modal.querySelector("select[name='project']");
    projectSelect.value = projectId;
  }

  modal.showModal();
}

export function closeModal() {
  modal.close();
}

export function addToDoFromUI(toDoCreateForm) {
  const formData = new FormData(toDoCreateForm);
  const newToDo = createToDo({
    title: formData.get("title"),
    description: formData.get("description"),
    dueDate: formData.get("due-date"),
    priority: formData.get("priority"),
    projectId: formData.get("project"),
  });

  addToDo(newToDo);
  saveToDoList();

  return newToDo.id;
}

export function deleteToDoFromUI() {
  const toDoId = modal.dataset.id;
  deleteToDoById(toDoId);
}

export default modal;
