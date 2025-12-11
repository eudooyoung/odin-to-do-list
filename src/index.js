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
  getSelectedProjectElement,
  clearSidebar,
} from "./sidebar.js";
import content, {
  setContentByProjectId,
  renderContent,
  toggleEditProjectForm,
  focusNewTitleInput,
  updateProjectFromUI,
  deleteProjectFromUI,
  clearContent,
} from "./content.js";
import modal, {
  renderModal,
  showModal,
  closeModal,
  addToDoFromUI,
} from "./modal.js";

const body = document.body;

function renderPage() {
  renderSidebar();
  renderContent();
  renderModal();
  body.append(sidebar, content, modal);
}

function handleProjectElementSelection(projectElement) {
  const isSelected = projectElement.classList.contains("selected");

  if (isSelected) {
    deselectProjectElement();
  } else {
    selectProjectElement(projectElement);
  }
}

function selectProjectElement(projectElement) {
  markProjectElement(projectElement);
  openProject(projectElement);
}

function deselectProjectElement() {
  markProjectElement(null);
  setContentByProjectId(null);
  renderContent();
}

function openProject(projectElement) {
  const projectId = projectElement.dataset.id;
  setContentByProjectId(projectId);
  renderContent();
}

function autoSaveSidebar() {
  const projectCreateForm = getProjectCreateForm();
  const selectedElement = getSelectedProjectElement();

  if (projectCreateForm) {
    addProjectFromUI(projectCreateForm);
    renderPage();
  }

  if (selectedElement) {
    const projectElement = getProjectElementById(selectedElement.dataset.id);
    selectProjectElement(projectElement);
  }
}

function autoSaveContent() {
  // const projectEditForm =
}

sidebar.addEventListener("click", (e) => {
  if (e.target.matches(".banner")) {
    renderPage();
    return;
  }

  const projectElement = e.target.closest(".project-element");
  if (projectElement) {
    handleProjectElementSelection(projectElement);
    return;
  }

  if (e.target.matches("button.cancel")) {
    const projectCreateForm = e.target.closest("form");
    removeProjectCreateForm(projectCreateForm);
  }

  if (e.target.matches("button.add-project")) {
    autoSaveSidebar();
    const projectCreateForm = renderProjectCreateForm();
    addProjectCreateForm(projectCreateForm);
    focusTitleInput(projectCreateForm);
    return;
  }

  if (e.target.matches("button.add-to-do")) {
    showModal();
  }
});

sidebar.addEventListener("submit", (e) => {
  if (e.target.matches("form.create-project")) {
    e.preventDefault();
    const projectCreateForm = e.target;
    const project = addProjectFromUI(projectCreateForm);

    renderSidebar();
    renderModal();
    
    const projectElement = getProjectElementById(project.id);
    handleProjectElementSelection(projectElement);
  }
});

content.addEventListener("click", (e) => {
  if (e.target.matches(".project-title")) {
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
    const projectElement = getProjectElementById(content.dataset.projectId);
    handleProjectElementSelection(projectElement);
  }
});

modal.addEventListener("click", (e) => {
  if (e.target.matches(".cancel")) {
    closeModal();
  }
});

modal.addEventListener("submit", (e) => {
  if (e.target.matches("form.create-to-do")) {
    e.preventDefault();
    const toDoCreateForm = e.target;
    addToDoFromUI(toDoCreateForm);
  }
});

renderPage();
