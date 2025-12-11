import ToDo from "./to-do.js";
import { getProjectById } from "./project-storage.js";

export function getAllToDo() {
  return toDoList;
}

export function createToDo(title, description, dueDate, priority, projectId) {
  const toDo = new ToDo(title, description, dueDate, priority, projectId);
  toDoList.push(toDo);
  const project = getProjectById(projectId);
  project.addToDo(toDo);
  return toDo;
}
