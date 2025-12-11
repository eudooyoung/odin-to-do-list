class Project {
  constructor(title) {
    this.id = "P-" + crypto.randomUUID();
    this.title = title;
    this.toDoList = [];
  }

  addToDo(toDo) {
    this.toDoList.push(toDo);
  }

  updateProjectTitle(title) {
    this.title = title;
  }
}

export default Project;
