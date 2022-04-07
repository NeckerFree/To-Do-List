// 'use strict';

jest.mock('./taskStore.js');
const taskStore = require('./taskStore.js');

describe('To-Do List', () => {
  const taskToAdd = 'Standup team meeting';
  describe('add task', () => {
    const expectedTask = [{ index: 1, completed: false, description: taskToAdd }];
    test('add taskToAdd', () => {
      taskStore.add(taskToAdd);
      const allTasks = taskStore.gettasks();
      const actualTask = allTasks.filter((t) => t.index === 1);
      expect(actualTask).toEqual(expectedTask);
    });
  });
  describe('delete task', () => {
    test('delete existing task', () => {
      const idToRemove = 1;
      expect(taskStore.remove(idToRemove)).toEqual('item removed');
    });
    test('delete non-existent task', () => {
      const idToRemove = 8;
      expect(taskStore.remove(idToRemove)).toEqual('item not found');
    });
  });
});