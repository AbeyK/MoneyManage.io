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

        if(overallCategory == 'Home') this.calculateExpenses.homeExpenses();
        else if(overallCategory == 'Car') this.calculateExpenses.carExpenses();
        else if(overallCategory == 'Health') this.calculateExpenses.healthExpenses();
        else if(overallCategory == 'Discretionary') this.calculateExpenses.discretionaryExpenses();
    }

    getChartData() {
        var home = this.user.expenses.totalHomeExpense;
        var car = this.user.expenses.totalCarExpense;
        var health = this.user.expenses.totalHealthExpense;
        var discretionary = this.user.expenses.totalDiscretionaryExpense;

        this.user.expenses.totalExpense = home + car + health + discretionary;
        var total = this.user.expenses.totalExpense;
        console.log(total); 

        this.user.results.homePercentage = (home / total) * 100;
        this.user.results.carPercentage = (car / total) * 100;
        this.user.results.healthPercentage = (health / total) * 100;
        this.user.results.discretionaryPercentage = (discretionary / total) * 100;
        console.log(this.user.results.homePercentage);
        console.log( this.user.results.carPercentage);
        console.log(this.user.results.healthPercentage);
        console.log(this.user.results.discretionaryPercentage);


        this.user.results.expensesResults = [];
        this.user.results.expensesResults.push(['Home', this.user.expenses.totalHomeExpense+1]);
        this.user.results.expensesResults.push(['Car', this.user.expenses.totalCarExpense+1]);
        this.user.results.expensesResults.push(['Health', this.user.expenses.totalHealthExpense+1]);
        this.user.results.expensesResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense+1]);
        
        this.user.results.recommendedResults = [];
        this.user.results.recommendedResults.push(['Home', this.user.expenses.totalHomeExpense+30]);
        this.user.results.recommendedResults.push(['Car', this.user.expenses.totalCarExpense+31]);
        this.user.results.recommendedResults.push(['Health', this.user.expenses.totalHealthExpense+32]);
        this.user.results.recommendedResults.push(['Discretionary', this.user.expenses.totalDiscretionaryExpense+33]);

        this.chart.createChart('resultsContainer', this.user.results);
        this.chart.createRecommendedChart('recommendedContainer', this.user.results);
    }

    back() {
        this.router.navigate('#/expenses');
    }

    attached() {
        this.getChartData();

        if(this.user.personalInfo.currentGoals.length > 0) this.user.results.showGoals = true;
        else this.user.results.showGoals = false;
    }
}