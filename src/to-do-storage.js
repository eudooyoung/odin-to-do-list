import ToDo from "./to-do.js";
import { getProjectById } from "./project-storage.js";

const toDoList = [];

export function createToDo(
  title,
  description,
  dueDate,
  priority,
  projectId = "default"
) {
  const toDo = new ToDo(title, description, dueDate, priority, projectId);
  toDoList.push(toDo);

  const project = getProjectById(projectId);
  project.addToDo(toDo);
}

export function getToDoById(toDoId) {
  return;
}
