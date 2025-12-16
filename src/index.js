import "./styles.css";
import sidebar, {
  renderSidebar,
  renderProjectCreateForm,
  getProjectCreateForm,
  addProjectCreateForm,
  removeProjectCreateForm,
  focusTitleInput,
  getProjectElementById,
  addProjectFromUI,
  markProjectElement,
  getSelectedElement,
} from "./sidebar.js";
import content, {
  setContentByProjectId,
  renderContent,
  toggleEditProjectForm,
  focusNewTitleInput,
  updateProjectFromUI,
  deleteProjectFromUI,
  checkToDoFromUI,
} from "./content.js";
import modal, {
  renderModal,
  showModal,
  closeModal,
  addToDoFromUI,
} from "./modal.js";
import {
  createDefaultProject,
  DEFAULT_PROJECT_ID,
  loadProjectList,
} from "./project-storage.js";
import { loadToDoList } from "./to-do-storage.js";

const body = document.body;

function initApp() {
  loadToDoList();
  loadProjectList();
  createDefaultProject();
  renderPage();
  selectProjectElementById();
}

function renderPage() {
  clearPage();
  renderSidebar();
  renderContent();
  renderModal();
  body.append(sidebar, content, modal);
}

function clearPage() {
  body.innerHTML = "";
}

function selectProjectElementById(projectId = DEFAULT_PROJECT_ID) {
  const projectElement = getProjectElementById(projectId);
  if (!projectElement) {
    return;
  }

  markProjectElement(projectElement);
  openProject(projectElement);
}

function openProject(projectElement) {
  const projectId = projectElement.dataset.id;
  setContentByProjectId(projectId);
  renderContent();
}

function autoSaveProjectForm() {
  const projectCreateForm = getProjectCreateForm();

  if (projectCreateForm) {
    return addProjectFromUI(projectCreateForm);
  }
}

function autoSaveContent() {
  // const projectEditForm =
}

sidebar.addEventListener("click", (e) => {
  if (e.target.matches(".banner")) {
    renderPage();
    selectProjectElementById();
    return;
  }

  const projectElement = e.target.closest(".project-element");
  if (projectElement) {
    selectProjectElementById(projectElement.dataset.id);
    return;
  }

  if (e.target.matches("button.cancel")) {
    const projectCreateForm = e.target.closest("form");
    removeProjectCreateForm(projectCreateForm);
  }

  if (e.target.matches("button.add-project")) {
    const newProjectId = autoSaveProjectForm();
    const selectedElement = getSelectedElement();
    renderPage();
    selectProjectElementById(newProjectId ?? selectedElement.dataset.id);
    const projectCreateForm = renderProjectCreateForm();
    addProjectCreateForm(projectCreateForm);
    focusTitleInput(projectCreateForm);
    return;
  }

  if (e.target.matches("button.add-to-do")) {
    const newProjectId = autoSaveProjectForm();
    const selectedElement = getSelectedElement();
    renderPage();
    selectProjectElementById(newProjectId ?? selectedElement.dataset.id);
    showModal(newProjectId ?? selectedElement.dataset.id);
  }
});

sidebar.addEventListener("submit", (e) => {
  if (e.target.matches("form.create-project")) {
    e.preventDefault();
    const projectCreateForm = e.target;
    const newProjectId = addProjectFromUI(projectCreateForm);
    renderPage();
    selectProjectElementById(newProjectId);
  }
});

content.addEventListener("click", (e) => {
  if (e.target.matches(".project-title")) {
    if (content.dataset.id === DEFAULT_PROJECT_ID) {
      return;
    }
    toggleEditProjectForm();
    focusNewTitleInput();
  }

  if (e.target.matches(".edit-project .cancel")) {
    toggleEditProjectForm();
  }

  if (e.target.matches(".edit-project .delete")) {
    deleteProjectFromUI();
    renderPage();
  }

  if (e.target.matches("button.add-todo")) {
    addToDoFromUI();
    return;
  }
});

content.addEventListener("submit", (e) => {
  if (e.target.matches("form.edit-project")) {
    e.preventDefault();
    const projectUpdateForm = e.target;
    updateProjectFromUI(projectUpdateForm);
    renderSidebar();
    selectProjectElementById(content.dataset.id);
  }
});

content.addEventListener("change", (e) => {
  const checkbox = e.target;
  const toDoElement = checkbox.closest(".to-do-element");
  if (checkbox.matches("input[type='checkbox']")) {
    checkToDoFromUI(toDoElement.dataset.id);
    renderContent();
  }
});

modal.addEventListener("submit", (e) => {
  if (e.target.matches("form.create-to-do")) {
    e.preventDefault();
    const toDoCreateForm = e.target;
    addToDoFromUI(toDoCreateForm);
    const projectId = toDoCreateForm.elements.project.value;
    closeModal();
    renderPage();
    selectProjectElementById(projectId);
  }
});

modal.addEventListener("click", (e) => {
  if (e.target.matches(".cancel")) {
    closeModal();
    renderModal();
  }
});

modal.addEventListener("close", () => {
  renderModal();
});

initApp();
