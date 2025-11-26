class ToDo {
  constructor(title, description, dueDate, priority) {
    this.id = "T-" + crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export function createToDo(title, description, dueDate, priority) {
  return new ToDo(title, description, dueDate, priority);
}

export default ToDo;
