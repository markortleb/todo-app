import Project from "./Project";


export default class ProjectList {

    constructor(currentState) {
        if (currentState === null) {
            this.list = [];
        } else {
            this.list = this.loadFromCurrentState(currentState);
        }
    }

    loadFromCurrentState(currentState) {
        let list = [];

        for (let i = 0; i < currentState.list.length; i++) {
            list.push(
                new Project(
                    currentState.list[i].name,
                    currentState.list[i]
                )
            );
        }

        return list;
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

    getAllProjects(projectsToLimitBy) {
        return this.list.filter(
            project => !projectsToLimitBy.includes(project.name)
        ).sort((a, b) => a.name.localeCompare(b.name));
    }

    getAllTasks(dateOrder, projectList) {
        return this.list.filter(
            project => projectList.includes(project.name)
        ).map(project => project.taskList).flat().sort(
            dateOrder === 'asc' ? (a, b) => {
                return a.dueDate.localeCompare(b.dueDate);
            } : (a, b) => {
                return b.dueDate.localeCompare(a.dueDate);
            }
        );

    }

}