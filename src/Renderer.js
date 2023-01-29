import UI from "./UI";
import AppState from './AppState';
import EventBoard from './EventBoard';

export default class Renderer {

    static renderLoginPage() {
        document.body.innerHTML = UI.loginPageUI();
    }

    static renderSignUpPage() {
        const loginAreaNode = document.querySelectorAll('.login-area')[0];
        const emailInputNode = loginAreaNode.querySelectorAll('.login-line #login-email')[0];
        const passwordInputNode = loginAreaNode.querySelectorAll('.login-line #login-password')[0];

        document.body.innerHTML = UI.signUpPageUI(
            emailInputNode.value,
            passwordInputNode.value,
        );
    }

    static renderMainSkeleton() {
        document.body.innerHTML = UI.loadMainSkeleton();
        this.renderProjectList();
        this.renderTaskList();
    }

    static renderProjectList() {
        const projectListNode = document.querySelectorAll('.sidebar ol')[0];
        projectListNode.innerHTML = '';
        projectListNode.insertAdjacentHTML('beforeend', UI.allProjectsLine());

        let sortedProjects = AppState.projectList.getAllProjects(AppState.tasksInEditMode);
        console.log(sortedProjects);

        for (let i = 0; i < sortedProjects.length; i++) {
            projectListNode.insertAdjacentHTML('beforeend', UI.projectUI(sortedProjects[i].name));
        }

        EventBoard.initClickableProjects();
    }

    static renderTaskList() {
        const taskListNode = document.querySelectorAll('.content-area ol')[0];
        let visibleTasks = null;

        if (AppState.currentProject === 'All Projects') {
            visibleTasks = AppState.projectList.getAllTasks(AppState.taskDateOrder, AppState.projectList.list.map(project => project.name));
        } else {
            visibleTasks = AppState.projectList.getAllTasks(AppState.taskDateOrder, [AppState.currentProject]);
        }


        taskListNode.innerHTML = '';
        for (let i = 0; i < visibleTasks.length; i++) {
            if (AppState.tasksInEditMode.includes(visibleTasks[i].name)) {
                taskListNode.insertAdjacentHTML('beforeend', UI.preExistingTaskEditUI(visibleTasks[i]));
                let taskNode = taskListNode.querySelectorAll('li:last-of-type')[0];
                EventBoard.initEditModeTask(visibleTasks[i], taskNode, false);
            } else {
                if (AppState.tasksInExpandedMode.includes(visibleTasks[i].name)) {
                    taskListNode.insertAdjacentHTML('beforeend', UI.taskExpandedUI(visibleTasks[i]));
                } else {
                    taskListNode.insertAdjacentHTML('beforeend', UI.taskUI(visibleTasks[i]));
                }
                let taskNode = taskListNode.querySelectorAll('li:last-of-type')[0];
                EventBoard.initTask(visibleTasks[i], taskNode);
            }
        }

        if (AppState.taskAddOpen) {
            taskListNode.insertAdjacentHTML('beforeend', UI.taskEditUI());
            let taskNode = taskListNode.querySelectorAll('li:last-of-type')[0];
            EventBoard.initEditModeTask(null, taskNode, true);
        } else {
            taskListNode.insertAdjacentHTML('beforeend', UI.addTaskLineUI());
            let addTaskNode = taskListNode.querySelectorAll('.add-task')[0];
            EventBoard.initAddTask(addTaskNode);
        }
    }

}