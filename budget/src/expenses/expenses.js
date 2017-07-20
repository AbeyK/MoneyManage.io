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

    lockStateChange(myElement) {
        if(this.user.expenses[myElement + 'lock']) this.user.expenses[myElement + 'lock'] = false;
        else this.user.expenses[myElement + 'lock'] = true;
    }

    back() {
        this.router.navigate('#/personalinfo');
    }

    next() {
        console.log(this.user.expenses);

        if(!this.user.expenses.homeCanGoToNext) alert('Please enter valid home expenses');
        else if(!this.user.expenses.carCanGoToNext) alert('Please enter valid car expenses');
        else if(!this.user.expenses.healthCanGoToNext) alert('Please enter valid health expenses');
        else if(!this.user.expenses.discretionaryCanGoToNext) alert('Please enter valid discretionary expenses');
        else this.router.navigate('#/results');
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
         
        $('#expensesTooltip').tooltip({
            content: "Enter all expenses as monthly amounts unless stated otherwise.<br>" +
                "Lock values you don't want changed."
        });
    }
}