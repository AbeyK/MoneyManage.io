import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';

@inject(Router, User)
export class personalinfo {
    constructor(router, user) {
        this.router = router;
        this.user = user;
    }
}