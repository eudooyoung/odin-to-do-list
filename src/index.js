import "./styles.css";
import sidebar, {
  renderSidebar,
  renderProjectCreateForm,
  addProjectCreateForm,
  getTitleInputFocus,
  getProjectItemById,
  addProjectFromUI,
  updateSelectedProjectItem,
} from "./sidebar.js";
import content, {
  renderContentByProjectId,
  clearContent,
  getEditProjectForm,
  showEditProjectForm,
  updateProjectFromUI,
  deleteProjectFromUI,
  addToDoFromUI,
  toggleToDoDetail,
  hideEditProjectForm,
} from "./content.js";

const body = document.body;

function renderPage() {
  renderSidebar();
  body.append(sidebar, content);
}

function handleProjectSelection(projectItem) {
  const isSelected = projectItem.classList.contains("selected");

  if (isSelected) {
    deselectProject();
  } else {
    selectProject(projectItem);
  }
}

function selectProject(projectItem) {
  updateSelectedProjectItem(projectItem);

  const id = projectItem.dataset.id;
  renderContentByProjectId(id);
}

function deselectProject() {
  updateSelectedProjectItem(null);
  clearContent();
}

function autoSave() {
  const projectEditForm = content.querySelector("form.project-edit");
  if (projectEditForm) {
    updateProjectFromUI(projectEditForm);
    renderSidebar();
  }
}

sidebar.addEventListener("click", (e) => {
  if (e.target.matches(".banner")) {
    updateSelectedProjectItem(null);
    clearContent();
    return;
  }

  const projectItem = e.target.closest(".project-item");
  if (projectItem) {
    // handleProjectSelection(projectItem);
    return;
  }

  if (e.target.matches("button.add-project")) {
    // autoSave();
    const projectCreateForm = renderProjectCreateForm();
    addProjectCreateForm(projectCreateForm);
    getTitleInputFocus(projectCreateForm);
    // const project = addProjectFromUI();
    // renderSidebar();
    // const projectItem = getProjectItemById(project.id);
    // getTitleInputFocus(projectItem);
    return;
  }
});

sidebar.addEventListener("submit", (e) => {
  if (e.target.matches("form.create-project")) {
    e.preventDefault();
    const form = e.target;
    
    console.log("hi");
  }
})

content.addEventListener("click", (e) => {
  if (e.target.matches(".project-title")) {
    showEditProjectForm();
  }

  if (e.target.matches(".edit-project .cancel")) {
    hideEditProjectForm();
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
    renderSidebar();
    updateSelectedProjectItem(getProjectItemById(updatedProject.id));
  }
});

renderPage();
