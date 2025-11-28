import "./styles.css";
import sidebar, { addProjectFromUI, updateSelectedProject } from "./sidebar.js";
import content, {
  renderContentByProjectId,
  clearContent,
  showEditProjectForm,
  updateProjectFromUI,
  addToDoFromUI,
  toggleToDoDetail,
} from "./content.js";

const body = document.body;

function handleProjectSelection(projectItem) {
  const isSelected = projectItem.classList.contains("selected");

  if (isSelected) {
    updateSelectedProject(null);
    clearContent();
  } else {
    updateSelectedProject(projectItem);

    const id = projectItem.dataset.id;
    renderContentByProjectId(id);
  }
}

sidebar.addEventListener("click", (e) => {
  if (e.target.matches(".banner")) {
    updateSelectedProject(null);
    clearContent();
    return;
  }

  const projectItem = e.target.closest(".project-item");
  if (projectItem) {
    handleProjectSelection(projectItem);
    return;
  }

  if (e.target.matches("button.add-project")) {
    addProjectFromUI();
    return;
  }
});

content.addEventListener("click", (e) => {
  if (e.target.matches(".project-title")) {
    showEditProjectForm();
  }

  const toDoItem = e.target.closest(".todo-item");
  if (toDoItem) {
    toggleToDoDetail(toDoItem);
    return;
  }

  if (e.target.matches("button.add-todo")) {
    addToDoFromUI();
    return;
  }
});

content.addEventListener("submit", (e) => {
  if (e.target.matches("form.edit-project")) {
    e.preventDefault();

    const form = e.target;
    updateProjectFromUI(form);
  }
});

body.appendChild(sidebar);
body.appendChild(content);
