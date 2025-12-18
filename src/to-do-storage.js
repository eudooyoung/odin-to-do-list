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
  checked = false,
} = {}) {
  const toDo = new ToDo({
    id,
    title,
    description,
    dueDate,
    priority,
    projectId,
    checked,
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

export function deleteToDoById(toDoId) {
  const idxToDelete = toDoList.findIndex((toDo) => toDo.id === toDoId);
  toDoList.splice(idxToDelete, 1);
}

export function clearCompletedByProjectId(projectId) {
  toDoList = toDoList.filter((toDo) => {
    const isCurrentProject = toDo.projectId === projectId;
    const isCompleted = toDo.checked;
    return !isCurrentProject || !isCompleted;
  });
}

export function deleteAllToDosByProjectId(projectId) {
  toDoList = toDoList.filter((toDo) => {
    const isCurrentProject = toDo.projectId === projectId;
    return !isCurrentProject;
  });
}

export function saveToDoList() {
  localStorage.setItem("to-do-list", JSON.stringify(toDoList));
}

export function loadToDoList() {
  const rawData = JSON.parse(localStorage.getItem("to-do-list"));
  toDoList = rawData ? rawData.map((raw) => new ToDo(raw)) : [];
}
