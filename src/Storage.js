import Account from "./Account";

export default class Storage {

    static putAccount(account){
        localStorage.setItem("accountName", account.name);
        localStorage.setItem("accountEmail", account.email);
        localStorage.setItem("accountPassword", account.password);
    }

    static getAccount(accountEmail, accountPassword) {
        let account = null;

        if (accountEmail === localStorage.getItem("accountEmail")
            && accountPassword === localStorage.getItem("accountPassword")) {
            account = new Account(
                accountEmail,
                accountPassword,
                localStorage.getItem("accountName")
            );
        }

        return account;
    }

}