import ToDo from "./to-do.js";

const toDoList = [];

export function getAllToDo() {
  return toDoList;
}

export function createToDo(title, description, dueDate, priority, project) {
  const toDo = new ToDo(title, description, dueDate, priority, project);
  toDoList.push(toDo);
  return toDo;
}
