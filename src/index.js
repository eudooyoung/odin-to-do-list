import "./styles.css";
import sidebar, {
  addProjectFromUI,
  updateSelectedProject,
  toggleProjectMenu,
} from "./sidebar.js";
import content, {
  addToDoFromUI,
  renderContentByProjectId,
  toggleToDoDetail,
  clearContent,
} from "./content.js";

const body = document.body;

function handleBannerClick() {
  updateSelectedProject(null);
  clearContent();
}

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
    handleBannerClick();
    return;
  }

  const projectItem = e.target.closest(".project-item");
  if (projectItem) {
    const btnOpenMenu = e.target.closest("button.open-menu");
    if (btnOpenMenu) {
      toggleProjectMenu(projectItem, btnOpenMenu);
      return;
    }

    handleProjectSelection(projectItem);
    return;
  }

  if (e.target.matches("button.add-project")) {
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

  const btnAddToDo = e.target.closest(".button.add-todo");
  if (btnAddToDo) {
    addToDoFromUI();
    return;
  }
});

body.appendChild(sidebar);
body.appendChild(content);
