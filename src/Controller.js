import UI from './UI';
import Task from './Task';
import Project from "./Project";
import Account from "./Account";
import Storage from "./Storage";


export default class Controller {

    constructor() {
        UI.initImages();
        this.loadLoginPage();
    }

    loadLoginPage() {
        UI.loadLoginPage();
        this.initLoginButton();
        this.initSignUpButton();
    }

    loadSignUpPage() {
        UI.loadSignUpPage();
        this.initCreateAccountButton();
    }

    loadMainPage(username) {
        UI.loadMainSkeleton(username);
        this.initAddTaskButton();
        this.initAddProjectButton();
        this.initLogoutButton();
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

    initLoginButton() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const emailInputNode = loginAreaNode.querySelectorAll('.login-line #login-email')[0];
        const passwordInputNode = loginAreaNode.querySelectorAll('.login-line #login-password')[0];
        const loginButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:first-of-type')[0];
        const signUpButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:last-of-type')[0];

        loginButtonNode.addEventListener('click', e => {
            if (emailInputNode.value !== '' && passwordInputNode.value !== '') {
                const emailInput = emailInputNode.value;
                const passwordInput = passwordInputNode.value;

                UI.loadMainSkeleton();
                this.initAddTaskButton();
                this.initAddProjectButton();
            }
        });
    }

    initSignUpButton() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const emailInputNode = loginAreaNode.querySelectorAll('.login-line #login-email')[0];
        const passwordInputNode = loginAreaNode.querySelectorAll('.login-line #login-password')[0];
        const loginButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:first-of-type')[0];
        const signUpButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:last-of-type')[0];

        signUpButtonNode.addEventListener('click', e => {
            if (emailInputNode.value !== '' && passwordInputNode.value !== '') {
                const emailInput = emailInputNode.value;
                const passwordInput = passwordInputNode.value;

                UI.loadSignUpPage();
                this.initCreateAccountButton();
            }
        });
    }

    initCreateAccountButton() {
        const signUpAreaNode = document.querySelectorAll('.signup-area')[0];
        const emailInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-email')[0];
        const passwordInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-password')[0];
        const confirmPasswordInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-confirm-password')[0];
        const yourNameInputNode = signUpAreaNode.querySelectorAll('.signup-line #signup-your-name')[0];
        const createAccountButtonNode = signUpAreaNode.querySelectorAll('.signup-buttons button')[0];

        createAccountButtonNode.addEventListener('click', e => {
            if (emailInputNode.value !== '' && passwordInputNode.value !== '' &&
                    passwordInputNode.value === confirmPasswordInputNode.value) {
                const emailInput = emailInputNode.value;
                const passwordInput = passwordInputNode.value;
                const yourNameInput = yourNameInputNode.value;
                const account = new Account(emailInput, passwordInput, yourNameInput);

                Storage.putAccount(account);

                UI.loadMainSkeleton(account.name);
                this.initAddTaskButton();
                this.initAddProjectButton();
            }
        });
    }

    initLogoutButton() {
        const accountInfoNode = document.querySelectorAll('.topbar .account-info')[0];
        const logoutButtonNode = document.querySelectorAll('button')[0];

        logoutButtonNode.addEventListener('click', e => {
            UI.loadLoginPage();
            this.initLoginButton();
            this.initSignUpButton();
        });
    }
}