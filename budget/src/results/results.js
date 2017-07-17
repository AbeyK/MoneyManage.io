import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';
import {Constants} from '../services/constants';
import {calculateExpenses} from '../utilities/calculateExpenses';

@inject(Router, User, Chart, Constants, calculateExpenses)
export class results {
    constructor(router, user, chart, constants, calculateExpenses) {
        this.router = router;
        this.user = user;
        this.chart = chart;
        this.constants = constants;
        this.calculateExpenses = calculateExpenses;
    }

    checkValue(expenses, value, category, overallCategory) {
        var val = parseInt(value);
        if(val < 0) expenses[category.value + 'check'] = false;
        else if(val > 0) expenses[category.value + 'check'] = true;

        var calculate = overallCategory.toLowerCase() + 'Expenses()';
        this.calculateExpenses[calculate];
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
        
        this.user.results.recommendedResults = [];
        this.user.results.recommendedResults.push(['Home', this.user.expenses.totalHomeExpense+30]);
        this.user.results.recommendedResults.push(['Car', this.user.expenses.totalCarExpense+31]);
        this.user.results.recommendedResults.push(['Health', this.user.expenses.totalHealthExpense+32]);
        this.user.results.recommendedResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense+33]);

        this.chart.createChart('resultsContainer', this.user.results);
        this.chart.createRecommendedChart('recommendedContainer', this.user.results);
    }
}