
import TaskStore from './modules/taskStore.js';
const taskStore = new TaskStore();

describe('ToDo List', () => {
    describe('Add task', () => {
        let taskName='New Task';
        test('valid task', () => {
            expect(() => taskStore.add(taskName)).toBe(
                // let result= taskStore.gettasks(),
                // let taskExist=result.filter(task=> task===taskName );
            );
        });

    });
    describe('Delete task', () => {
        test('parameters invalid parameters', () => {
            expect(() => taskStore.remove('a', 'b')).toThrowError(Error);
        });

        
    });