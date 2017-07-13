import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {calculateExpenses} from '../utilities/calculateExpenses';

@inject(Router, User, calculateExpenses)
export class expenses {
    constructor(router, user, calculateExpenses) {
        this.router = router;
        this.user = user;
        this.calculateExpenses = calculateExpenses;
    }

}