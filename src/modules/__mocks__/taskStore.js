import Task from '../task.js';

/**
 * Class to Add, Remove and Get tasks from Storage from
 */
class TaskStore {
    tasksCollection;
  
    constructor() { this.tasksCollection = [] }

  add= (description) => {
    const id = (this.tasksCollection !== null) ? this.tasksCollection.length + 1 : 1;
    const objectTask = new Task(id, false, description);
    this.tasksCollection.push(objectTask);
  }

  remove = (id) => {
    var indexArray = this.tasksCollection.findIndex((t) => t.index === parseInt(id, 10));
    if (indexArray !== -1) {
      this.tasksCollection.splice(indexArray, 1);
      let newId = 1;
      // reindexation
      this.tasksCollection.forEach((element) => {
        element.index = newId;
        newId += 1;
      });
    }
    else {
      return "item not found";
    }
  }

  clearCompleted=() => {
    const resultCollection = this.tasksCollection.filter((t) => t.completed === false);
    let newId = 1;
    // reindexation
    resultCollection.forEach((element) => {
      element.index = newId;
      newId += 1;
    });
    this.tasksCollection=resultCollection;
  }

  updateDescription=(id, description) => {
    if (id > 0) {
      const indexArray = this.tasksCollection.findIndex((t) => t.index === parseInt(id, 10));
      if (indexArray !== null) {
        if (description !== '') {
          this.tasksCollection[indexArray].description = description;
        }
      }
      this.tasksCollection=resultCollection;
    }
  }

  updateStatus=(id, completed) => {
    if (id > 0) {
      const indexArray = this.tasksCollection.findIndex((t) => t.index === parseInt(id, 10));
      if (indexArray !== null) {
        this.tasksCollection[indexArray].completed = completed;
      }
      this.tasksCollection=resultCollection;
    }
  }

  gettasks=() => this.tasksCollection;

  storageAvailable=() => true;
}
const taskStore = new TaskStore();
module.exports = taskStore;

