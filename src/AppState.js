import ProjectList from "./ProjectList";
import Account from "./Account";

export default class AppState {

    static initState() {
        this.account = null;
        this.projectList = new ProjectList();
        this.tasksInEditMode = [];
        this.taskAddOpen = false;
        this.currentProject = 'All Projects';
        this.taskDateOrder = 'asc';
    }

    static parse(jsonString) {
        const json = JSON.parse(jsonString);
        this.account = json.account;
        this.projectList = json.projectList;
        this.tasksInEditMode = json.tasksInEditMode;
        this.taskAddOpen = json.taskAddOpen;
        this.currentProject = json.currentProject;
        this.taskDateOrder = json.taskDateOrder;
    }

    static stringify() {
        return JSON.stringify(this);
    }

}