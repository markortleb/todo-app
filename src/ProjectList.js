export default class ProjectList {

    constructor() {
        this.list = [];
    }

    addProject(project) {
        this.list.push(project);
    }

    hasProject(project) {
        let exists = false;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] === project) {
                exists = true;
                break;
            }
        }
        return exists;
    }

}