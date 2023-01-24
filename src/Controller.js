import UI from './UI';
import Task from './Task';
import ProjectList from "./ProjectList";
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
        this.projectList = new ProjectList();

        this.tasksInEditMode = [];
        this.taskAddOpen = false;
        this.currentProject = null;

        this.renderProjectList();
        this.renderTaskList();
    }

    renderProjectList() {
        const projectListNode = document.querySelectorAll('.sidebar ol')[0];
        projectListNode.innerHTML = '';
        projectListNode.insertAdjacentHTML('beforeend', UI.allProjectsLine());

        let sortedProjects = this.projectList.getAllProjects([]);
        console.log(sortedProjects);

        for (let i = 0; i < sortedProjects.length; i++) {
            projectListNode.insertAdjacentHTML('beforeend', UI.projectUI(sortedProjects[i].name));
        }
    }

    renderTaskList() {
        const taskListNode = document.querySelectorAll('.content-area ol')[0];
        let visibleTasks = this.projectList.getAllTasks('asc', []);

        taskListNode.innerHTML = '';
        for (let i = 0; i < visibleTasks.length; i++) {
            if (this.tasksInEditMode.includes(visibleTasks[i].name)) {
                taskListNode.insertAdjacentHTML('beforeend', UI.preExistingTaskEditUI(visibleTasks[i]));
                let taskNode = taskListNode.querySelectorAll('li:last-of-type')[0];
                this.initEditModeTask(visibleTasks[i], taskNode, false);
            } else {
                taskListNode.insertAdjacentHTML('beforeend', UI.taskUI(i, visibleTasks[i].name, visibleTasks[i].dueDate));
                let taskNode = taskListNode.querySelectorAll('li:last-of-type')[0];
                this.initCollapsedTask(visibleTasks[i], taskNode);
            }
        }

        if (this.taskAddOpen) {
            taskListNode.insertAdjacentHTML('beforeend', UI.taskEditUI());
            let taskNode = taskListNode.querySelectorAll('li:last-of-type')[0];
            this.initEditModeTask(null, taskNode, true);
        } else {
            taskListNode.insertAdjacentHTML('beforeend', UI.addTaskLineUI());
            let addTaskNode = taskListNode.querySelectorAll('.add-task')[0];
            this.initAddTask(addTaskNode);
        }
    }

    initCollapsedTask(task, taskNode) {
        this.initTaskEditButton(task, taskNode);
        this.initTaskDeleteButton(task, taskNode);
    }

    initEditModeTask(task, taskNode, addMode) {
        this.initTaskEditSubmitButton(task, taskNode, addMode);
        this.initTaskEditCancelButton(task, taskNode, addMode);
    }

    initAddTask(addTaskNode) {
        const addTaskButtonNode = addTaskNode.querySelectorAll('.add-button')[0];

        addTaskButtonNode.addEventListener('click', e => {
            this.taskAddOpen = true;
            this.renderTaskList();
        });
    }

    initTaskEditButton(task, taskNode) {
        let taskEditButtonNode = taskNode.querySelectorAll('.control-area img:first-of-type')[0];
        console.log(taskEditButtonNode);

        taskEditButtonNode.addEventListener('click', e => {
            this.tasksInEditMode.push(task.name);
            this.renderTaskList();
        });
    }

    initTaskDeleteButton(task, taskNode) {
        let taskDeleteButtonNode = taskNode.querySelectorAll('.control-area img:last-of-type')[0];

        taskDeleteButtonNode.addEventListener('click', e => {
            this.projectList.removeTask(task.name);
            this.renderProjectList();
            this.renderTaskList();
        });
    }

    initTaskEditSubmitButton(task, taskEditNode, addMode) {
        const submitButtonNode = taskEditNode.querySelectorAll('.edit-control button:first-of-type')[0];

        submitButtonNode.addEventListener('click', e => {
            const taskName = taskEditNode.querySelectorAll('.task-title-input')[0].value;
            const taskDescription = taskEditNode.querySelectorAll('.task-description-input')[0].value;
            const taskDueDate = taskEditNode.querySelectorAll('.due-date-input')[0].value;
            const taskProjectName = taskEditNode.querySelectorAll('.project-name-input')[0].value;

            let task = new Task(taskName, taskDescription, taskDueDate, taskProjectName);
            let project = this.projectList.getProject(taskProjectName);

            if (project === null) {
                project = new Project(taskProjectName);
            }
            project.addTask(task);
            this.projectList.addProject(project);

            if (!addMode && this.tasksInEditMode.indexOf(task.name) !== -1) {
                this.tasksInEditMode.splice(this.tasksInEditMode.indexOf(task.name), 1);
            }

            if (addMode) {
                this.taskAddOpen = false;
            }

            this.renderTaskList();
            this.renderProjectList();
        });

    }

    initTaskEditCancelButton(task, taskEditNode, addMode) {
        const cancelButtonNode = taskEditNode.querySelectorAll('.edit-control button:last-of-type')[0];

        cancelButtonNode.addEventListener('click', e => {
            if (!addMode && this.tasksInEditMode.indexOf(task.name) !== -1) {
                this.tasksInEditMode.splice(this.tasksInEditMode.indexOf(task.name), 1);
            }

            if (addMode) {
                this.taskAddOpen = false;
            }

            this.renderTaskList();
        });
    }

    initLoginButton() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const emailInputNode = loginAreaNode.querySelectorAll('.login-line #login-email')[0];
        const passwordInputNode = loginAreaNode.querySelectorAll('.login-line #login-password')[0];
        const loginButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:first-of-type')[0];
        const signUpButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:last-of-type')[0];

        loginButtonNode.addEventListener('click', e => {
            let account = Storage.getAccount(emailInputNode.value, passwordInputNode.value);
            if (account) {
                this.loadMainPage(account.name);
            }
        });
    }

    initSignUpButton() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const emailInputNode = loginAreaNode.querySelectorAll('.login-line #login-email')[0];
        const passwordInputNode = loginAreaNode.querySelectorAll('.login-line #login-password')[0];
        const loginButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:first-of-type')[0];
        const signUpButtonNode = loginAreaNode.querySelectorAll('.login-buttons button:last-of-type')[0];

        signUpButtonNode.addEventListener('click',e => {
            const emailInput = emailInputNode.value;
            const passwordInput = passwordInputNode.value;

            UI.loadSignUpPage(emailInput, passwordInput);
            this.initCreateAccountButton();
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

                this.loadMainPage(account.name);
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