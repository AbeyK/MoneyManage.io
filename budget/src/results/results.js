import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';
import {Constants} from '../services/constants';
import {calculateExpenses} from '../utilities/calculateExpenses';
import {calculatePercentages} from '../utilities/calculatePercentages';

@inject(Router, User, Chart, Constants, calculateExpenses, calculatePercentages)
export class results {
    selectedOptions = {};
    someOptions = [];

    constructor(router, user, chart, constants, calculateExpenses, calculatePercentages) {
        this.router = router;
        this.user = user;
        this.chart = chart;
        this.constants = constants;
        this.calculateExpenses = calculateExpenses;
        this.calculatePercentages = calculatePercentages;
        this.selectedOptions = [];
        this.someOptions = [
            {"text" : "Expenses Over 5 Years"}, 
            {"text" : "Simple Budget"}, 
            {"text" : "Advanced Budget"}
        ];
        this.selectedOption = {"text" : "Expenses Over 5 Years"};
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
        this.calculatePercentages.calculateAllPercentages();
        console.log(this.user.results);
        this.calculateExpenses.makeChartArry();

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

        this.chart.createFiveYearChart('fiveYearContainer', this.user.results);
        this.chart.createChart('resultsContainer', this.user.results);
        this.chart.createAdvancedChart('resultsContainerAdvanced');
        this.chart.createRecommendedChart('recommendedContainer', this.user.results);
        this.chart.createAdvancedRecommendedChart('recommendedContainerAdvanced');
    }

    test(option) {
        if(option == "Expenses Over 5 Years") {
            this.user.results.showExpenses = true;
            this.user.results.showBudget = false;
            this.user.results.showAdvanced = false;
        }
        else if(option == "Simple Budget") {
            this.user.results.showBudget = true;
            this.user.results.showExpenses = false;
            this.user.results.showAdvanced = false;
        }
        else if(option == "Advanced Budget") {
            this.user.results.showAdvanced = true;
            this.user.results.showExpenses = false;
            this.user.results.showBudget = false;
        }
        
        this.selectedOption.text = option;
        return true;
    }

    checkAdvanced() {
        this.user.results.showAdvanced = !this.user.results.showAdvanced;
    }

    checkAdvancedRecommended() {
        this.user.results.showAdvancedRecommended = !this.user.results.showAdvancedRecommended ;
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