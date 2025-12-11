import "./styles.css";
import sidebar, {
  renderSidebar,
  renderProjectCreateForm,
  getProjectCreateForm,
  addProjectCreateForm,
  removeProjectCreateForm,
  focusTitleInput,
  getProjectItemById,
  addProjectFromUI,
  markProjectItem,
  getSelectedProjectItem,
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

function handleProjectItemSelection(projectItem) {
  const isSelected = projectItem.classList.contains("selected");

  if (isSelected) {
    deselectProjectItem();
  } else {
    selectProjectItem(projectItem);
  }
}

function selectProjectItem(projectItem) {
  markProjectItem(projectItem);
  openProject(projectItem);
}

function deselectProjectItem() {
  markProjectItem(null);
  setContentByProjectId(null);
  renderContent();
}

function openProject(projectItem) {
  const projectId = projectItem.dataset.id;
  setContentByProjectId(projectId);
  renderContent();
}

function autoSaveSidebar() {
  const projectCreateForm = getProjectCreateForm();
  const selectedItem = getSelectedProjectItem();

  if (projectCreateForm) {
    addProjectFromUI(projectCreateForm);
    renderPage();
  }

  if (selectedItem) {
    const projectItem = getProjectItemById(selectedItem.dataset.id);
    selectProjectItem(projectItem);
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

  const projectItem = e.target.closest(".project-item");
  if (projectItem) {
    handleProjectItemSelection(projectItem);
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
    
    const projectItem = getProjectItemById(project.id);
    handleProjectItemSelection(projectItem);
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

  // const toDoItem = e.target.closest(".to-do-item");
  // if (toDoItem) {
  //   toggleToDoDetail(toDoItem);
  //   return;
  // }
});

content.addEventListener("submit", (e) => {
  if (e.target.matches("form.edit-project")) {
    e.preventDefault();
    const projectUpdateForm = e.target;
    updateProjectFromUI(projectUpdateForm);
    renderSidebar();
    const projectItem = getProjectItemById(content.dataset.projectId);
    handleProjectItemSelection(projectItem);
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
