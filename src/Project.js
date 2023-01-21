



export default class Project {

    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    addTask(task) {
        this.taskList.push(task);
    }

    hasTask(task) {
        let exists = false;
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i] === task) {
                exists = true;
                break;
            }
        }
        return exists;
    }

}