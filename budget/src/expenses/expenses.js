import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Constants} from '../services/constants';
import {ExpensesConstants} from '../services/constants';
import {calculateExpenses} from '../utilities/calculateExpenses';

@inject(Router, User, Constants, calculateExpenses, expensesConstants)
export class expenses {
    constructor(router, user, constants, calculateExpenses) {
        this.router = router;
        this.user = user;
        this.constants = constants;
        this.calculateExpenses = calculateExpenses;
        this.expensesConstants = expensesConstants;
    }

    back() {
        this.router.navigate('#/personalinfo');
    }

    next() {
        this.router.navigate('#/results');
    }
}