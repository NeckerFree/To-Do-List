import Storage from './storage.js';
import Task from './task.js';

const ITEM_STORAGE = 'toDoTasks';
/**
 * Class to Add, Remove and Get tasks from Storage from
 */
export default class TaskStore {
  tasksCollection = [];

  taskStorage;

  constructor() { this.taskStorage = new Storage(ITEM_STORAGE); }

  add= (description) => {
    this.tasksCollection = this.taskStorage.getItemStorage();
    const id = (this.tasksCollection !== null) ? this.tasksCollection.length + 1 : 1;
    const objectTask = new Task(id, false, description);
    this.taskStorage.addItemStorage(objectTask);
  }

  remove=(id) => {
    if (id > 0) {
      this.tasksCollection = this.taskStorage.getItemStorage();
      const resultCollection = this.tasksCollection.filter((t) => t.index !== parseInt(id, 10));
      let newId = 1;
      // reindexation
      resultCollection.forEach((element) => {
        element.index = newId;
        newId += 1;
      });
      this.taskStorage.removeItemStorage(resultCollection);
    }
  }

  update=(id, description, completed) => {
    if (id > 0) {
      this.tasksCollection = this.taskStorage.getItemStorage();
      const indexArray = this.tasksCollection.findIndex((t) => t.index === parseInt(id, 10));
      if (indexArray !== null) {
        if (description !== '') {
          this.tasksCollection[indexArray].description = description;
        }
        this.tasksCollection[indexArray].completed = completed;
      }
      this.taskStorage.setCollectionStorage(this.tasksCollection);
    }
  }

  gettasks=() => this.taskStorage.getItemStorage();

  storageAvailable=() => this.taskStorage.storageAvailable();
}
