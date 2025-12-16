class Project {
  constructor({ id, title } = {}) {
    this.id = id ?? "P-" + crypto.randomUUID();
    this.title = title;
  }

  updateProjectTitle(title) {
    this.title = title;
  }
}

export default Project;
