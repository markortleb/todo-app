import Task from "./Task";


export default class Project {

    constructor(name, currentState) {
        this.name = name;

        if (currentState === null) {
            this.taskList = [];
        } else {
            this.taskList = this.loadFromCurrentState(currentState);
        }
    }

    loadFromCurrentState(currentState) {
        let list = [];

        for (let i = 0; i < currentState.taskList.length; i++) {
            list.push(
                new Task(
                    currentState.taskList[i].name,
                    currentState.taskList[i].description,
                    currentState.taskList[i].dueDate,
                    currentState.taskList[i].projectName,
                    currentState.taskList[i].isDone
                )
            );
        }

        return list;
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

    removeTask(taskName) {
        let index = this.getTaskIndex(taskName);
        if (index > -1) {
            this.taskList.splice(index, 1);
        }
        return this.taskList.length;
    }

}