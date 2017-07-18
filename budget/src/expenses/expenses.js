import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
import { Constants } from '../services/constants';
import { ExpensesConstants } from '../services/expensesConstants';
import { calculateExpenses } from '../utilities/calculateExpenses';

@inject(Router, User, Constants, calculateExpenses, ExpensesConstants)
export class expenses {
    constructor(router, user, constants, calculateExpenses, expensesConstants) {
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
        console.log(this.user.expenses);
        this.router.navigate('#/results');
    }

    lockStateChange(myElement) {
        if (this.user.expenses[myElement + 'lock']){
            this.user.expenses[myElement + 'lock']=false
        }else{
            this.user.expenses[myElement + 'lock']=true
        }
        // document.getElementById(id);
        console.log(myElement);
    }
}