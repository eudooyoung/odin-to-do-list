import { getAllProject, getProjectById } from "./project-storage.js";
import { createToDo, addToDo, saveToDoList } from "./to-do-storage.js";

const modal = document.createElement("dialog");
modal.id = "modal";
modal.setAttribute("closedby", "any");

let toDo = null;

export function setModalByToDoId(toDoId) {
  toDo = getToDoById(toDoId);
}

export function renderModal() {
  clearModal();
  const toDoCreateForm = renderToDoCreateForm();
  modal.append(toDoCreateForm);
}

function renderToDoCreateForm() {
  const toDoCreateForm = document.createElement("form");
  toDoCreateForm.classList.add("create-to-do", "hide");

  const toDoTextField = renderToDoTextField();
  const toDoMetaField = renderToDoMetaField();
  const toDoBtnField = renderToDoBtnField();

  toDoCreateForm.append(toDoTextField, toDoMetaField, toDoBtnField);

  return toDoCreateForm;
}

function renderToDoTextField() {
  const toDoTextField = document.createElement("div");
  toDoTextField.classList.add("text-field");

  const toDoTitleLabel = document.createElement("label");
  const toDoTitleInput = document.createElement("input");
  toDoTitleInput.name = "title";
  toDoTitleLabel.append(toDoTitleInput);

  const toDoDescriptionLabel = document.createElement("label");
  const toDoDescriptionInput = document.createElement("textarea");
  toDoDescriptionInput.name = "description";
  toDoDescriptionLabel.append(toDoDescriptionInput);

  toDoTextField.append(toDoTitleLabel, toDoDescriptionLabel);

  return toDoTextField;
}

function renderToDoMetaField() {
  const toDoMetaField = document.createElement("div");
  toDoMetaField.classList.add("meta-field");

  const projectLabel = renderProjectLabel();
  const dueDateLabel = renderDueDateLabel();
  const priorityLabel = renderPriorityLabel();

  toDoMetaField.append(projectLabel, dueDateLabel, priorityLabel);

  return toDoMetaField;
}

function renderProjectLabel() {
  const projectLabel = document.createElement("label");

  const projectSelection = document.createElement("select");
  projectSelection.name = "project";

  const projectList = getAllProject();
  projectList.forEach((project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.id;
    projectOption.textContent = project.title;
    projectSelection.append(projectOption);
  });

  projectLabel.append(projectSelection);

  return projectLabel;
}

function renderDueDateLabel() {
  const dueDateLabel = document.createElement("label");

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "datetime-local";
  dueDateInput.name = "due-date";

  dueDateLabel.append(dueDateInput);
  return dueDateLabel;
}

function renderPriorityLabel() {
  const priorityLabel = document.createElement("label");

  const prioritySelection = document.createElement("select");
  prioritySelection.name = "priority";

  for (let i = 1; i <= 4; i++) {
    const priorityOption = document.createElement("option");
    priorityOption.value = i;
    priorityOption.textContent = `P${i}`;
    prioritySelection.append(priorityOption);
  }

  priorityLabel.append(prioritySelection);

  return priorityLabel;
}

function renderToDoBtnField() {
  const toDoBtnField = document.createElement("div");
  toDoBtnField.classList.add("btn-field");

  const btnConFirmCreateToDo = document.createElement("button");
  btnConFirmCreateToDo.classList.add("confirm");
  btnConFirmCreateToDo.textContent = "Confirm";

  const btnCancelCreateToDo = document.createElement("button");
  btnCancelCreateToDo.classList.add("cancel");
  btnCancelCreateToDo.type = "button";
  btnCancelCreateToDo.textContent = "Cancel";

  toDoBtnField.append(btnConFirmCreateToDo, btnCancelCreateToDo);

  return toDoBtnField;
}

function clearModal() {
  modal.innerHTML = "";
}

export function showModal(projectId) {
  const toDoCreateForm = modal.querySelector("form");
  toDoCreateForm.classList.remove("hide");

  const projectSelection = modal.querySelector("select[name='project']");
  projectSelection.value = projectId;

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

export default modal;
