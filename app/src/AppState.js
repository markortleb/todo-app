import ProjectList from "./ProjectList";
import Account from "./Account";
import Project from "./Project";
import Task from "./Task";
import { format } from "date-fns";

export default class AppState {

    static initAppState(account) {
        this.account = account;
        this.projectList = this.getDefaultProjectList(account);
        this.tasksInEditMode = [];
        this.tasksInExpandedMode = [];
        this.taskAddOpen = false;
        this.currentProject = 'All Projects';
        this.taskDateOrder = 'asc';
    }

    static getDefaultProjectList(account) {
        let currentDate = new Date();
        let defaultProjectList = new ProjectList(null);
        let defaultProject = new Project(`${account.name}'s First Project`);
        defaultProject.addTask(
            new Task(
                'Buy groceries',
                'Need to get chicken, buffalo sauce, and ranch dressing.',
                format(currentDate.setDate(currentDate.getDate() + 3), 'yyyy-MM-dd'),
                defaultProject.name
            )
        );

        defaultProject.addTask(
            new Task(
                'Get oil change',
                'Need to go to the mechanic to get an oil change for my vehicle.',
                format(currentDate.setDate(currentDate.getDate() + 14), 'yyyy-MM-dd'),
                defaultProject.name
            )
        );

        defaultProject.addTask(
            new Task(
                'Harvest the crops',
                'My turnips are ready to harvest, so I need to harvest them and take them to the local market.',
                format(currentDate.setDate(currentDate.getDate() + 7), 'yyyy-MM-dd'),
                defaultProject.name
            )
        );

        defaultProjectList.addProject(defaultProject);

        return defaultProjectList;
    }

    static loadFromString(appStateString) {
        const json = JSON.parse(appStateString);
        console.log(json);
        this.account = json.account;
        this.projectList = new ProjectList(json.projectList);
        this.tasksInEditMode = [];
        this.tasksInExpandedMode = [];
        this.taskAddOpen = false;
        this.currentProject = json.currentProject;
        this.taskDateOrder = json.taskDateOrder;
    }

    static stringify(jsonString) {
        const stateObject = {
            account: this.account,
            projectList: this.projectList,
            tasksInEditMode: this.tasksInEditMode,
            tasksInExpandedMode: this.tasksInExpandedMode,
            taskAddOpen: this.taskAddOpen,
            currentProject: this.currentProject,
            taskDateOrder: this.taskDateOrder
        };

        return JSON.stringify(stateObject);
    }


}