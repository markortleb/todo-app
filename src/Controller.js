import UI from './UI';
import Renderer from "./Renderer";
import EventBoard from "./EventBoard";
import AppState from "./AppState";


export default class Controller {

    static init() {
        AppState.initState();
        UI.initImages();
        this.loadLoginPage();
    }

    static loadLoginPage() {
        Renderer.renderLoginPage();
        EventBoard.initLoginPage();
    }

    static loadSignUpPage() {
        Renderer.renderSignUpPage();
        EventBoard.initSignUpPage();
    }

    static loadMainPage() {
        Renderer.renderMainSkeleton();
        EventBoard.initMainPage();
    }
}