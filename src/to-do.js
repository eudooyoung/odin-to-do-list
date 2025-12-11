const toDoList = [];

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

export function createToDo(title, description, dueDate, priority, project) {
  const toDo = new ToDo(title, description, dueDate, priority, project);
  toDoList.push(toDo);
  return toDo;
}

export function getAllToDo() {
  return toDoList;
}

export default ToDo;
