import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
var bootbox = require('bootbox');

@inject(Router, User)

export class login {

    constructor(router, user) {
        this.router = router;
        this.user = user;
    }
    attached() {
        this.user.personalInfo.showNavbar = true;

    }
    loginClick(){
        this.user.personalInfo.showNavbar = true;
        this.router.navigate('#/personalinfo');
    }
    attached(){
bootbox.alert({
    title: "MoneyManage",
    message: "The login feature is experimental.",
    backdrop: true

});
    }
}