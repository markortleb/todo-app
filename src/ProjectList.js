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

}