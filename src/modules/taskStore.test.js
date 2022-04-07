jest.mock('./taskStore.js');
const taskStore = require('./taskStore.js');

describe('To-Do List', () => {
  const taskToAdd = 'Standup team meeting';
  describe('add task', () => {
    const expectedTask = [{ index: 1, completed: false, description: taskToAdd }];
    test('new task', () => {
      taskStore.add(taskToAdd);
      const allTasks = taskStore.gettasks();
      const actualTask = allTasks.filter((t) => t.index === 1);
      expect(actualTask).toEqual(expectedTask);
    });
  });
  describe('edit task', () => {
    test('edit description', () => {
      const idEdited = 1;
      const newDescription = 'New task Description';
      taskStore.updateDescription(idEdited, newDescription);
      const allTasks = taskStore.gettasks();
      const actualTask = allTasks.filter((t) => t.index === idEdited);
      expect(actualTask[0].description).toEqual(newDescription);
    });
    test('update completed', () => {
      const idUpdated = 1;
      const newStatus = true;
      taskStore.updateStatus(idUpdated, newStatus);
      const allTasks = taskStore.gettasks();
      const actualTask = allTasks.filter((t) => t.index === idUpdated);
      expect(actualTask[0].completed).toEqual(newStatus);
    });
  });
  describe('Clear completed tasks', () => {
    test('remove all completed', () => {
      const idUpdated = 1;
      taskStore.clearCompleted();
      const allTasks = taskStore.gettasks();
      const actualTask = allTasks.filter((t) => t.index === idUpdated);
      expect(actualTask).toEqual([]);
    });
  });
  describe('delete task', () => {
    test('delete existing task', () => {
      const idToRemove = 1;
      const taskToAdd = 'Task to delete';
      taskStore.add(taskToAdd);
      expect(taskStore.remove(idToRemove)).toEqual('item removed');
    });
    test('delete non-existent task', () => {
      const idToRemove = 8;
      expect(taskStore.remove(idToRemove)).toEqual('item not found');
    });
  });
});