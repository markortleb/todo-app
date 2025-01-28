import LogoImg from './img/note-with-paperclip-clip-art.svg';
import PlusIconImg from './img/plus-circle-outline.png';
import AppEditIconImg from './img/application-edit-outline.png';
import TrashCanIconImg from './img/trash-can-outline.png';
import CheckboxBlankImg from './img/checkbox-blank-outline.svg';
import CheckboxMarkedImg from './img/checkbox-marked.svg';
import Task from './Task';
import AppState from "./AppState";


export default class UI {

    static #logoImg;
    static #plusIconImg;
    static #appEditIconImg;
    static #trashCanIconImg;
    static #checkboxBlankImg;
    static #checkboxMarkedImg;

    static initImages() {
        this.#logoImg = new Image();
        this.#plusIconImg = new Image();
        this.#appEditIconImg = new Image();
        this.#trashCanIconImg = new Image();
        this.#checkboxBlankImg = new Image();
        this.#checkboxMarkedImg = new Image();

        this.#logoImg.src = LogoImg;
        this.#plusIconImg.src = PlusIconImg;
        this.#appEditIconImg.src = AppEditIconImg;
        this.#trashCanIconImg.src = TrashCanIconImg;
        this.#checkboxBlankImg.src = CheckboxBlankImg;
        this.#checkboxMarkedImg.src = CheckboxMarkedImg;
    }

    static loginPageUI() {
        return `
        <div class="login-container">
            <div class="login-area">
                <div class="login-title">
                    <img src="${this.#logoImg.src}" alt="">
                    <h1>To-do..</h1>
                </div>
                <div class="login-line">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email">
                </div>
                <div class="login-line">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password">
                </div>
                <div class="login-buttons">
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
        `;
    }

    static signUpPageUI(email, password) {
        return `
        <div class="signup-container">
            <div class="signup-area">
                <div class="signup-title">
                    <img src="${this.#logoImg.src}" alt="">
                    <h1>To-do..</h1>
                </div>
                <div class="signup-line">
                    <label for="signup-email">Email</label>
                    <input type="email" id="signup-email" value="${email}">
                </div>
                <div class="signup-line">
                    <label for="signup-password">Password</label>
                    <input type="password" id="signup-password" value="${password}">
                </div>
                <div class="signup-line">
                    <label for="signup-confirm-password">Confirm Password</label>
                    <input type="password" id="signup-confirm-password">
                </div>
                <div class="signup-line">
                    <label for="signup-your-name">Your Name</label>
                    <input type="text" id="signup-your-name">
                </div>
                <div class="signup-buttons">
                    <button>Create Account</button>
                </div>
            </div>
        </div>
        `;
    }

    static loadMainSkeleton() {
        return `
            <div class="container">
                <div class="topbar">
                    <div class="title">
                        <img src="${this.#logoImg.src}" alt="">
                        <h1>To-do..</h1>
                    </div>
                    <div class="account-info">                   
                        <span>${AppState.account.name}</span>
                        <button>Logout</button>
                    </div>
                </div>
                <div class="sidebar">
                    <ol>
                        <li class="all-projects">All Projects</li>
                        <li class="add-project">
                            <img src="${this.#plusIconImg.src}" alt="">
                            <span>Add Project</span>
                        </li>
                    </ol>
                </div>
                <div class="content-area">
                    <div class="list-header">
                        <div class="title-area">
                            <span>${AppState.currentProject}</span>
                        </div>
                        <div class="date-area">
                            ${this.dateAreaInteriorUI(AppState.taskDateOrder)}
                        </div>
                    </div>
                    <ol>
                        <li class="add-task">
                            <div class="add-button">
                                <img src="${this.#plusIconImg.src}" alt="">
                                <span>Add Task</span>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        `;
    }

    static taskUI(task) {
        let checkboxUI = task.isDone ? `<img src="${this.#checkboxMarkedImg.src}" alt="">`
            : `<img src="${this.#checkboxBlankImg.src}" alt="">`;

        return `
            <li class="task">
                <div class="title-area">
                    ${checkboxUI}
                    <span>${this.strike(task.name, task.isDone)}</span>
                </div>
                <div class="date-area">
                    <span>${this.strike(task.dueDate, task.isDone)}</span>
                </div>
                <div class="control-area">
                    <img src="${this.#appEditIconImg.src}" alt="">
                    <img src="${this.#trashCanIconImg.src}" alt="">
                </div>
            </li>
        `;
    }

    static taskExpandedUI(task) {
        let checkboxUI = task.isDone ? `<img src="${this.#checkboxMarkedImg.src}" alt="">`
            : `<img src="${this.#checkboxBlankImg.src}" alt="">`;

        return `
            <li class="task-expanded-mode">
                <div class="task-expanded-mode-top">
                    <div class="title-area">
                        ${checkboxUI}
                        <span>${this.strike(task.name, task.isDone)}</span>
                    </div>
                    <div class="date-area">
                        <span>${this.strike(task.dueDate, task.isDone)}</span>
                    </div>
                    <div class="control-area">
                        <img src="${this.#appEditIconImg.src}" alt="">
                        <img src="${this.#trashCanIconImg.src}" alt="">
                    </div>
                </div>
                <div class="task-expanded-mode-bottom">
                    <span class="task-expanded-description">${this.strike(task.description, task.isDone)}</span>
                    <span class="task-expanded-project">${task.projectName}</span>
                </div>

            </li>
        `;
    }

    static taskEditUI() {
        return `
            <li class="task-edit-mode">
                <div class="edit-area">
                    <div class="edit-top">
                        <input type="text" class="task-title-input" placeholder="Task title..">
                        <textarea class="task-description-input" placeholder="Task description.."></textarea>
                    </div>
                    <div class="edit-bottom">
                        <input type="date" class="due-date-input">
                        <input type="text" class="project-name-input" placeholder="Project name..">
                    </div>
                </div>
                <div class="edit-control">
                    <button>Submit</button>
                    <button>Cancel</button>
                </div>
            </li>
        `;
    }

    static preExistingTaskEditUI(task) {
        return `
            <li class="task-edit-mode">
                <div class="edit-area">
                    <div class="edit-top">
                        <input type="text" class="task-title-input" placeholder="Task title.." value="${task.name}">
                        <textarea class="task-description-input" placeholder="Task description..">${task.description}</textarea>
                    </div>
                    <div class="edit-bottom">
                        <input type="date" class="due-date-input" value="${task.dueDate}">
                        <input type="text" class="project-name-input" placeholder="Project name.." value="${task.projectName}">
                    </div>
                </div>
                <div class="edit-control">
                    <button>Submit</button>
                    <button>Cancel</button>
                </div>
            </li>
        `;
    }

    static addTaskLineUI() {
        return `
            <li class="add-task">
                <div class="add-button">
                    <img src="${this.#plusIconImg.src}" alt="">
                    <span>Add Task</span>
                </div>
            </li>
        `;
    }

    static projectUI(name) {
        return `
            <li class="project">${name}</li>
        `;
    }

    static allProjectsLine() {
        return `
            <li class="all-projects">All Projects</li>
        `;
    }

    static dateAreaInteriorUI(dateOrder) {
        let arrow = '';
        if (dateOrder === 'desc') {
            arrow = '▼';
        } else if (dateOrder === 'asc') {
            arrow = '▲';
        }

        return `
            <span>Due Date</span>
            <span>${arrow}</span>
        `;
    }

    static strike(someString, isDone) {
        let returnString = someString;

        if (isDone) {
            returnString = `<s>${someString}</s>`;
        }

        return returnString;
    }

}


