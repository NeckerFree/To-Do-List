
//'use strict';

jest.mock('./taskStore.js');
const taskStore= require('./taskStore.js');


describe('To-Do List', () => {
    let taskToAdd='Standup team meeting';
    describe('add task', () => {
        let expectedTask=[{index:1, completed:false, description: taskToAdd}];
        test('add taskToAdd', () => {
               taskStore.add(taskToAdd);
               const allTasks=taskStore.gettasks();
               const actualTask=allTasks.filter(t=> t.index===1);
               expect(actualTask).toEqual(expectedTask);
        });

    });
    describe('delete task', () => {
        test('delete existing task', () => {
               let idToRemove=1;
               taskStore.remove(idToRemove);
               const allTasks=taskStore.gettasks();
               const actualTask=allTasks.filter(t=> t.index===idToRemove);
               expect(actualTask).toEqual([]);
        });
    });
    describe('delete task', () => {
        test('delete non-existent task', () => {
               let idToRemove=8;
               expect(taskStore.remove(idToRemove)).toEqual("item not found");
        });
    });
    
});


    