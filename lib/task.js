class Task {
  constructor(caption, fromDate, id, done = false) {
    this.caption = caption;
    this.id = id;
    this.fromDate = fromDate;
    this.done = done;
  }
  editCaption(caption) {
    this.caption = caption;
    return this.caption;
  }
  toggleStatus() {
    this.done = !this.done;
    return this.done;
  }
  toJSON() {
    return this;
  }
}

module.exports = Task;
