import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
import { Constants } from '../services/constants';
import { ExpensesConstants } from '../services/expensesConstants';
import { calculateExpenses } from '../utilities/calculateExpenses';
var bootbox = require('bootbox');

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
        if (myElement == 'mortgage' ||
            myElement == 'propertyTax' ||
            myElement == 'homeownerInsurance' ||
            myElement == 'carPayment' ||
            myElement == 'carInsurance' ||
            myElement == 'healthInsurance' ||
            myElement == 'visualInsurance' ||
            myElement == 'eyeCare' ||
            myElement == 'dentalInsurance' ||
            myElement == 'cavities' ||
            myElement == 'braces')
            return;

        if (this.user.expenses[myElement + 'lock']) this.user.expenses[myElement + 'lock'] = false;
        else this.user.expenses[myElement + 'lock'] = true;
    }

    back() {
        this.router.navigate('#/personalinfo');
    }

    next() {
        console.log(this.user.expenses);

        this.expensesConstants.getExpenseConstants();

        if (!this.user.expenses.homeCanGoToNext) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid home expenses before accessing Results.",
                backdrop: true
            });
        }
        else if (!this.user.expenses.carCanGoToNext) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid car expenses before accessing Results.",
                backdrop: true
            });

        }
        else if (!this.user.expenses.healthCanGoToNext) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid health expenses before accessing Results.",
                backdrop: true
            });
        }
        else if (!this.user.expenses.discretionaryCanGoToNext) {
            bootbox.alert({
                title: "MoneyManage",
                message: "Please enter valid discretionary expenses before accessing Results.",
                backdrop: true
            });
        }
        else this.router.navigate('#/results');
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
        this.calculateExpenses.homeExpenses();
        this.calculateExpenses.carExpenses();
        this.calculateExpenses.healthExpenses();
        this.calculateExpenses.discretionaryExpenses();

        //PERMANENT LOCKS
        this.user.expenses.mortgagelock = false;
        this.user.expenses.propertyTaxlock = false;
        this.user.expenses.homeownerInsurancelock = false;

        this.user.expenses.carPaymentlock = false;
        this.user.expenses.carInsurancelock = false;

        this.user.expenses.healthInsurancelock = false;
        this.user.expenses.visualInsurancelock = false;
        this.user.expenses.eyeCarelock = false;
        this.user.expenses.dentalInsurancelock = false;
        this.user.expenses.cavitieslock = false;
        this.user.expenses.braceslock = false;

        $('#expensesTooltip').tooltip({
            content: "Enter all expenses as monthly amounts unless stated otherwise. Lock values you don't want changed. We've locked some values that cannot be changed."
        });
    }
}