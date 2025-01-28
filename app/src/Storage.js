import Account from "./Account";
import AppState from "./AppState";
import { MD5 } from "md5-js-tools";

export default class Storage {

    static generateAccountKey(email, password) {
        return MD5.generate(email + password);
    }

    static createAccount(account) {
        if (!this.accountExists(account.email, account.password)) {
            AppState.initAppState(account);
            this.setAccount(account);
        }
    }

    static setAccount(account) {
        localStorage.setItem(
            this.generateAccountKey(account.email, account.password),
            AppState.stringify()
        );
    }

    static accountExists(accountEmail, accountPassword) {
        let exists = true;
        const appStateString = localStorage.getItem(
            this.generateAccountKey(accountEmail, accountPassword)
        );

        if (appStateString === null) {
            exists = false;
        }

        return false;
    }

    static getAccount(accountEmail, accountPassword) {
        let success = true;
        const appStateString = localStorage.getItem(
            this.generateAccountKey(accountEmail, accountPassword)
        );

        if (appStateString === null) {
            success = false;
        } else {
            AppState.loadFromString(appStateString);
        }

        return success;
    }




}