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
} from "./sidebar.js";
import content, {
  setContentProjectId,
  renderContent,
  toggleEditProjectForm,
  updateProjectFromUI,
  deleteProjectFromUI,
  addToDoFromUI,
  toggleToDoDetail,
  hideEditProjectForm,
  clearContent,
} from "./content.js";

const body = document.body;

function renderPage() {
  renderSidebar();
  clearContent();
  body.append(sidebar, content);
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
  clearContent();
}

function autoSaveSidebar() {
  const projectCreateForm = getProjectCreateForm();
  const selectedItem = getSelectedProjectItem();
  if (projectCreateForm) {
    addProjectFromUI(projectCreateForm);
    renderSidebar();
  }

  if (selectedItem) {
    const projectItem = getProjectItemById(selectedItem.dataset.id);
    markProjectItem(projectItem);
  }
}

function openProject(projectItem) {
  const projectId = projectItem.dataset.id;
  setContentProjectId(projectId);
  renderContent();
}

sidebar.addEventListener("click", (e) => {
  if (e.target.matches(".banner")) {
    deselectProjectItem();
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
});

sidebar.addEventListener("submit", (e) => {
  if (e.target.matches("form.create-project")) {
    e.preventDefault();
    const projectCreateForm = e.target;
    const project = addProjectFromUI(projectCreateForm);
    renderSidebar();
    const projectItem = getProjectItemById(project.id);
    handleProjectItemSelection(projectItem);
  }
});

content.addEventListener("click", (e) => {
  if (e.target.matches(".project-title")) {
    toggleEditProjectForm();
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

  const toDoItem = e.target.closest(".todo-item");
  if (toDoItem) {
    toggleToDoDetail(toDoItem);
    return;
  }
});

content.addEventListener("submit", (e) => {
  if (e.target.matches("form.edit-project")) {
    e.preventDefault();
    const form = e.target;
    const updatedProject = updateProjectFromUI(form);
    // renderSidebar();
    // updateSelectedProjectItem(getProjectItemById(updatedProject.id));
  }
});

renderPage();
