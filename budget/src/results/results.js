import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';

@inject(Router, User, Chart)
export class results {
    constructor(router, user, chart) {
        this.router = router;
        this.user = user;
        this.chart = chart;
    }

    back() {
        this.router.navigate('#/expenses');
    }

    attached() {
        this.user.results.expensesResults = [];
        this.user.results.expensesResults.push(['Home', this.user.expenses.totalHomeExpense]);
        this.user.results.expensesResults.push(['Car', this.user.expenses.totalCarExpense]);
        this.user.results.expensesResults.push(['Health', this.user.expenses.totalHealthExpense]);
        this.user.results.expensesResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense]);
        
        this.chart.createChart('resultsContainer', this.user.results);
    }
}