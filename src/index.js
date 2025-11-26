import "./styles.css";
import sidebar, { addProjectFromUI, updateSelectedProject } from "./sidebar.js";
import content, {
  addToDoFromUI,
  renderContentByProjectId,
  toggleToDoDetail,
  clearContent,
} from "./content.js";

const body = document.body;

sidebar.addEventListener("click", (e) => {
  const banner = e.target.closest(".banner");
  if (banner) {
    updateSelectedProject(null);
    clearContent();
    return;
  }

  const projectItem = e.target.closest(".project-item");
  if (projectItem) {
    const isSelected = projectItem.classList.contains("selected");

    if (isSelected) {
      updateSelectedProject(null);
      clearContent();
    } else {
      updateSelectedProject(projectItem);

      const id = projectItem.dataset.id;
      renderContentByProjectId(id);
    }

    return;
  }

  const projectAddButton = e.target.closest(".button.add-project");
  if (projectAddButton) {
    addProjectFromUI();
    return;
  }
});

content.addEventListener("click", (e) => {
  const toDoItem = e.target.closest(".todo-item");
  if (toDoItem) {
    toggleToDoDetail(toDoItem);
    return;
  }

  const toDoAddButton = e.target.closest(".button.add-todo");
  if (toDoAddButton) {
    addToDoFromUI();
    return;
  }
});

body.appendChild(sidebar);
body.appendChild(content);
