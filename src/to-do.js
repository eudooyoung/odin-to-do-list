import { DEFAULT_PROJECT_ID } from "./project-storage";

class ToDo {
  constructor({
    id,
    title,
    description,
    dueDate,
    priority,
    projectId = DEFAULT_PROJECT_ID,
    checked = false,
  } = {}) {
    this.id = id ?? "T-" + crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.checked = checked;
  }

  check() {
    this.checked = !this.checked;
  }
}

export default ToDo;
