import UI from './UI';
import Task from './Task';
import Project from "./Project";


export default class Controller {

    constructor() {
        UI.initImages();
        UI.loadSkeleton();

        this.initAddTaskButton();
        this.initAddProjectButton();
    }

    initAddTaskButton() {
        const taskListNode = document.querySelectorAll('.content-area ol')[0];
        const addTaskNode = taskListNode.querySelectorAll('.add-task')[0];
        const addTaskButtonNode = addTaskNode.querySelectorAll('.add-button')[0];

        addTaskButtonNode.addEventListener('click', (e) => {
            addTaskNode.remove();
            taskListNode.innerHTML += UI.taskEditUI();
            this.initAddTaskSubmitButton();
            this.initAddTaskCancelButton();
        });
    }

    initAddTaskSubmitButton() {
        const taskListNode = document.querySelectorAll('.content-area ol')[0];
        const taskEditNode = taskListNode.querySelectorAll('.task-edit-mode')[0];
        const submitButtonNode = taskEditNode.querySelectorAll('.edit-control button:first-of-type')[0];

        submitButtonNode.addEventListener('click', (e) => {
            const taskName = taskEditNode.querySelectorAll('.task-title-input')[0].value;
            const taskDescription = taskEditNode.querySelectorAll('.task-description-input')[0].value;
            const taskDueDate = taskEditNode.querySelectorAll('.due-date-input')[0].value;
            const taskProjectName = taskEditNode.querySelectorAll('.project-name-input')[0].value;

            let task = new Task(taskName, taskDescription, taskDueDate, taskProjectName);

            taskEditNode.remove();
            taskListNode.innerHTML += UI.taskUI(1, taskName, taskDueDate);
            taskListNode.innerHTML += UI.addTaskLineUI();
            this.initAddTaskButton();
        });
    }

    initAddTaskCancelButton() {
        const taskListNode = document.querySelectorAll('.content-area ol')[0];
        const taskEditNode = taskListNode.querySelectorAll('.task-edit-mode')[0];
        const cancelButtonNode = taskEditNode.querySelectorAll('.edit-control button:last-of-type')[0];

        cancelButtonNode.addEventListener('click', (e) => {
            taskEditNode.remove();
            taskListNode.innerHTML += UI.addTaskLineUI();
            this.initAddTaskButton();
        });
    }

    initAddProjectButton() {
        const projectListNode = document.querySelectorAll('.sidebar ol')[0];
        const addProjectButtonNode = projectListNode.querySelectorAll('.add-project')[0];

        addProjectButtonNode.addEventListener('click', (e) => {
            addProjectButtonNode.remove();
            projectListNode.innerHTML += UI.addProjectInputLine();
            this.initAddProjectSubmitButton();
            this.initAddProjectCancelButton();
        });
    }

    initAddProjectSubmitButton() {
        const projectListNode = document.querySelectorAll('.sidebar ol')[0];
        const addProjectInputNode = projectListNode.querySelectorAll('.add-project-input')[0];
        const submitButtonNode = addProjectInputNode.querySelectorAll('.add-project-buttons button:first-of-type')[0];

        submitButtonNode.addEventListener('click', (e) => {
            const projectName = addProjectInputNode.querySelectorAll('input')[0].value;

            let project = new Project(projectName);

            addProjectInputNode.remove();
            projectListNode.innerHTML += UI.projectUI(projectName);
            projectListNode.innerHTML += UI.addProjectLine();
            this.initAddProjectButton();
        });
    }

    initAddProjectCancelButton() {
        const projectListNode = document.querySelectorAll('.sidebar ol')[0];
        const addProjectInputNode = projectListNode.querySelectorAll('.add-project-input')[0];
        const cancelButtonNode = addProjectInputNode.querySelectorAll('.add-project-buttons button:last-of-type')[0];

        cancelButtonNode.addEventListener('click', (e) => {
            addProjectInputNode.remove();
            projectListNode.innerHTML += UI.addProjectLine();
            this.initAddProjectButton();
        });
    }
}