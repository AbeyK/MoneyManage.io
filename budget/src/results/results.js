import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {Chart} from '../utilities/chart';
import {Constants} from '../services/constants';
import {calculateExpenses} from '../utilities/calculateExpenses';
import {calculateRecommended} from '../utilities/calculateRecommended';
import {calculatePercentages} from '../utilities/calculatePercentages';

@inject(Router, User, Chart, Constants, calculateExpenses, calculatePercentages, calculateRecommended)
export class results {
    selectedOptions = {};
    someOptions = [];

    constructor(router, user, chart, constants, calculateExpenses, calculatePercentages, calculateRecommended) {
        this.router = router;
        this.user = user;
        this.chart = chart;
        this.constants = constants;
        this.calculateExpenses = calculateExpenses;
        this.calculateRecommended = calculateRecommended;
        this.calculatePercentages = calculatePercentages;

        this.selectedChart = [];
        this.chartOptions = [
            {"text" : "Simple Budget"}, 
            {"text" : "Advanced Budget"},
            {"text" : "Projected Expenses"},
            {"text" : "Goals"}
        ];
        this.selectedChart = {"text" : "Simple Budget"};
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
        this.calculateExpenses.get5YearEstimates();
        this.calculateRecommended.getRecommendedTotals();
        this.calculatePercentages.calculateAllPercentages();
        this.calculateExpenses.getChartResults();

        console.log(this.user.expenses);
        console.log(this.user.results);
        console.log(this.user.recommend);
        
        this.chart.createFiveYearGoalsChart('fiveYearGoalsContainer', this.user.results);
        this.chart.createFiveYearExpensesChart('fiveYearExpensesContainer', this.user.results);
        this.chart.createSimpleChart('resultsContainerSimple', this.user.results);
        this.chart.createAdvancedChart('resultsContainerAdvanced', this.user.results);

        this.chart.createRecommendedChart('recommendedContainer', this.user.results, this.user.recommend);
        this.chart.createAdvancedRecommendedChart('recommendedContainerAdvanced', this.user.results, this.user.recommend);
    }

    showChart(option) {
        if(option == "Simple Budget") {
            this.user.results.showBudget = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showExpenses = false;
            this.user.results.showAdvanced = false;
        }
        else if(option == "Advanced Budget") {
            this.user.results.showAdvanced = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showExpenses = false;
            this.user.results.showBudget = false;
        }
        else if(option == "Projected Expenses") {
            this.user.results.showExpenses = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showBudget = false;
            this.user.results.showAdvanced = false;
        }
        else if(option == "Goals") {
            this.user.results.showGoalsChart = true;
            this.user.results.showExpenses = false;
            this.user.results.showBudget = false;
            this.user.results.showAdvanced = false;
        }
        
        this.selectedChart.text = option;
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

    home() {
        this.router.navigate('#/home');
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
        this.getChartData();

        if(this.user.personalInfo.currentGoals.length > 0) this.user.results.showGoals = true;
        else this.user.results.showGoals = false;
    }
}