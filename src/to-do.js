class ToDo {
  constructor(title, description, dueDate, priority, projectId) {
    this.id = "T-" + crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
  }
}

export default ToDo;
