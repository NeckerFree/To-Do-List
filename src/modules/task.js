export default class Task{
    index= 0; 
    completed= false; 
    description='';
    constructor(index, completed, description) {
        this.index = index;
        this.completed = completed;
        this.description = description;
    }
}
