import ToDo from "./to-do.js";
import { DEFAULT_PROJECT_ID } from "./project-storage.js";

let toDoList = [];

export function createToDo({
  id,
  title,
  description,
  dueDate,
  priority,
  projectId = DEFAULT_PROJECT_ID,
}) {
  const toDo = new ToDo({
    id,
    title,
    description,
    dueDate,
    priority,
    projectId,
  });

  return toDo;
}

export function addToDo(toDo) {
  toDoList.push(toDo);
}

export function getToDoById(toDoId) {
  return toDoList.find((toDo) => toDo.id === toDoId);
}

export function getToDoListByProjectId(projectId) {
  return toDoList.filter((toDo) => toDo.projectId === projectId);
}

export function saveToDoList() {
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
}

export function loadToDoList() {
  const rawData = JSON.parse(localStorage.getItem("to-do-list"));
  console.log(rawData);
  toDoList = rawData ? rawData.map((raw) => new ToDo(raw)) : [];
  console.log(toDoList);
}
