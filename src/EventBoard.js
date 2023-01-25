import Task from "./Task";
import Project from "./Project";
import UI from "./UI";
import Storage from "./Storage";
import Account from "./Account";
import AppState from './AppState';
import Renderer from './Renderer';
import Controller from "./Controller";

export default class EventBoard {

    static initCollapsedTask(task, taskNode) {
        this.initTaskEditButton(task, taskNode);
        this.initTaskDeleteButton(task, taskNode);
    }

    static initEditModeTask(task, taskNode, addMode) {
        this.initTaskEditSubmitButton(task, taskNode, addMode);
        this.initTaskEditCancelButton(task, taskNode, addMode);
    }

    static initLoginPage() {
        this.initLoginButton();
        this.initSignUpButton();
    }

    static initSignUpPage() {
        this.initCreateAccountButton();
    }

    static initMainPage() {
        this.initDateOrderButton();
        this.initLogoutButton();
    }

    static initAddTask(addTaskNode) {
        const addTaskButtonNode = addTaskNode.querySelectorAll('.add-button')[0];

        addTaskButtonNode.addEventListener('click', e => {
            AppState.taskAddOpen = true;
            Renderer.renderTaskList();
        });
    }

    static initTaskEditButton(task, taskNode) {
        let taskEditButtonNode = taskNode.querySelectorAll('.control-area img:first-of-type')[0];
        console.log(taskEditButtonNode);

        taskEditButtonNode.addEventListener('click', e => {
            AppState.tasksInEditMode.push(task.name);
            Renderer.renderTaskList();
        });
    }

    static initTaskDeleteButton(task, taskNode) {
        let taskDeleteButtonNode = taskNode.querySelectorAll('.control-area img:last-of-type')[0];

        taskDeleteButtonNode.addEventListener('click', e => {
            AppState.projectList.removeTask(task.name);
            Renderer.renderProjectList();
            Renderer.renderTaskList();
        });
    }

    static initTaskEditSubmitButton(task, taskEditNode, addMode) {
        const submitButtonNode = taskEditNode.querySelectorAll('.edit-control button:first-of-type')[0];

        submitButtonNode.addEventListener('click', e => {
            const taskName = taskEditNode.querySelectorAll('.task-title-input')[0].value;
            const taskDescription = taskEditNode.querySelectorAll('.task-description-input')[0].value;
            const taskDueDate = taskEditNode.querySelectorAll('.due-date-input')[0].value;
            const taskProjectName = taskEditNode.querySelectorAll('.project-name-input')[0].value;

            let task = new Task(taskName, taskDescription, taskDueDate, taskProjectName);
            let project = AppState.projectList.getProject(taskProjectName);

            if (project === null) {
                project = new Project(taskProjectName);
            }
            project.addTask(task);
            AppState.projectList.addProject(project);

            if (!addMode && AppState.tasksInEditMode.indexOf(task.name) !== -1) {
                AppState.tasksInEditMode.splice(AppState.tasksInEditMode.indexOf(task.name), 1);
            }

            if (addMode) {
                AppState.taskAddOpen = false;
            }

            Renderer.renderTaskList();
            Renderer.renderProjectList();
        });

    }

    static initTaskEditCancelButton(task, taskEditNode, addMode) {
        const cancelButtonNode = taskEditNode.querySelectorAll('.edit-control button:last-of-type')[0];

        cancelButtonNode.addEventListener('click', e => {
            if (!addMode && AppState.tasksInEditMode.indexOf(task.name) !== -1) {
                AppState.tasksInEditMode.splice(AppState.tasksInEditMode.indexOf(task.name), 1);
            }

            if (addMode) {
                AppState.taskAddOpen = false;
            }

            Renderer.renderTaskList();
        });
    }

    static initDateOrderButton () {
        const dateArea = document.querySelectorAll('.content-area .list-header .date-area')[0];

        dateArea.addEventListener('click', e => {
            if (AppState.taskDateOrder === 'desc') {
                AppState.taskDateOrder = 'asc';
            } else if (AppState.taskDateOrder === 'asc') {
                AppState.taskDateOrder = 'desc';
            }
            dateArea.innerHTML = UI.dateAreaInteriorUI(AppState.taskDateOrder);
            Renderer.renderTaskList();
        });
    }

    static initLoginButton() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const emailInputNode = loginAreaNode.querySelectorAll('.login-line #login-email')[0];
        const passwordInputNode = loginAreaNode.querySelectorAll('.login-line #login-password')[0];
        const loginButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:first-of-type')[0];

        loginButtonNode.addEventListener('click', e => {
            let account = Storage.getAccount(emailInputNode.value, passwordInputNode.value);
            if (account) {
                AppState.account = account;
                Controller.loadMainPage();
            }
        });
    }

    static initSignUpButton() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const signUpButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:last-of-type')[0];

        signUpButtonNode.addEventListener('click',e => {
            Controller.loadSignUpPage();
        });
    }

    static initCreateAccountButton() {
        const signUpAreaNode = document.querySelectorAll('.signup-area')[0];
        const emailInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-email')[0];
        const passwordInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-password')[0];
        const confirmPasswordInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-confirm-password')[0];
        const yourNameInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-your-name')[0];
        const createAccountButtonNode = signUpAreaNode.querySelectorAll('.signup-buttons button')[0];

        createAccountButtonNode.addEventListener('click', e => {
            if (emailInputNode.value !== '' && passwordInputNode.value !== '' &&
                passwordInputNode.value === confirmPasswordInputNode.value) {

                AppState.account = new Account(
                    emailInputNode.value,
                    passwordInputNode.value,
                    yourNameInputNode.value
                );
            }
        });
    }

    static initLogoutButton() {
        const logoutButtonNode = document.querySelectorAll('button')[0];

        logoutButtonNode.addEventListener('click', e => {
            Controller.loadLoginPage();
        });
    }
}