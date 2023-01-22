export default class ProjectList {

    constructor() {
        this.list = [];
    }

    getProjectIndex(projectName) {
        let index = -1;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name === projectName) {
                index = i;
                break;
            }
        }
        return index;
    }

    addProject(project) {
        let index = this.getProjectIndex(project.name);
        if (index < 0) {
            this.list.push(project);
        } else {
            this.list[index] = project;
        }
    }

    getProject(projectName) {
        let project = null;
        let index = this.getProjectIndex(projectName);

        if (index >= 0) {
            project = this.list[index];
        }

        return project;
    }

    getTask(taskName) {
        let task = null;

        for (let i = 0; i < this.list.length; i++) {
            task = this.list[i].getTask(taskName);
            if (task !== null) {
                break;
            }
        }
        return task;
    }

    removeTask(taskName) {
        let projectToRemove = null;

        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].getTask(taskName) !== null) {
                if (this.list[i].removeTask(taskName) === 0) {
                    projectToRemove = this.list[i];
                }
            }
        }

        if (projectToRemove !== null) {
            this.removeProject(projectToRemove.name);
        }
    }

    removeProject(projectName) {
        let index = this.getProjectIndex(projectName);
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }

    getSize() {
        return this.list.length;
    }

    getProjectByIndex(index) {
        return this.list[index];
    }

}