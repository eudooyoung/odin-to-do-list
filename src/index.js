import "./styles.css";
import sidebar, {
  addProjectFromUI,
  updateSelectedProject,
} from "./sidebar.js";
import content, {
  toDoAddButton,
  addToDoFromUI,
  setContentWithProjectId,
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
      setContentWithProjectId(id);
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
  if (!toDoItem) return;

  toggleToDoDetail(toDoItem);
});

toDoAddButton.addEventListener("click", () => {
  addToDoFromUI();
});

body.appendChild(sidebar);
body.appendChild(content);
