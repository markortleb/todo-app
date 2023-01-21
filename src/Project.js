



export default class Project {

    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    getTaskIndex(taskName) {
        let index = -1;
        for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].name === taskName) {
                index = i;
                break;
            }
        }
        return index;
    }

    addTask(task) {
        let index = this.getTaskIndex(task.name);
        if (index < 0) {
            this.taskList.push(task);
        } else {
            this.taskList[index] = task;
        }
    }

    getTask(taskName) {
        let task = null;
        let index = this.getTaskIndex(taskName);

        if (index >= 0) {
            task = this.taskList[index];
        }

        return task;
    }

}