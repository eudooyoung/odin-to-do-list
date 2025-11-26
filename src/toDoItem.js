class ToDoItem {
  constructor(title, description, dueDate, priority) {
    this.id = "T-" + crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export default ToDoItem;
