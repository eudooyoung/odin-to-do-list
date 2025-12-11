class ToDo {
  constructor(title, description, dueDate, priority, project) {
    this.id = "T-" + crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}

export default ToDo;
