import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../services/user';
import { Chart } from '../utilities/chart';
import { Constants } from '../services/constants';
import { calculateExpenses } from '../utilities/calculateExpenses';
import { calculateRecommended } from '../utilities/calculateRecommended';
import { calculatePercentages } from '../utilities/calculatePercentages';
var bootbox = require('bootbox');

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
            { "text": "Simple Budget" },
            { "text": "Advanced Budget" },
            { "text": "Projected Expenses" },
            { "text": "Goals" }
        ];
        this.selectedChart = { "text": "Simple Budget" };

        this.homeChanges = Object.keys(this.user.recommend.homeChanges);
        this.carChanges = Object.keys(this.user.recommend.carChanges);
        this.healthChanges = Object.keys(this.user.recommend.healthChanges);
        this.discretionaryChanges = Object.keys(this.user.recommend.discretionaryChanges);

        this.currentHomeChanges = [];
        this.currentCarChanges = [];
        this.currentHealthChanges = [];
        this.currentDiscretionaryChanges = [];

        this.modelHomeChanges = [];
        this.modelCarChanges = [];
        this.modelHealthChanges = [];
        this.modelDiscretionaryChanges = [];
        this.modelExpenseChange = 0;
    }

    checkValue(expenses, value, category, overallCategory) {
        var val = parseInt(value);
        if (val < 0) expenses[category.value + 'check'] = false;
        else if (val > 0) expenses[category.value + 'check'] = true;

        if (overallCategory == 'Home') this.calculateExpenses.homeExpenses();
        else if (overallCategory == 'Car') this.calculateExpenses.carExpenses();
        else if (overallCategory == 'Health') this.calculateExpenses.healthExpenses();
        else if (overallCategory == 'Discretionary') this.calculateExpenses.discretionaryExpenses();
    }

    getChartData() {
        this.calculateExpenses.get5YearEstimates();
        this.calculateRecommended.getRecommendedTotals();
        this.calculatePercentages.calculateAllPercentages();
        this.calculateExpenses.getChartResults();

        console.log(this.user.expenses);
        console.log(this.user.results);
        console.log(this.user.recommend);

        this.formatModal();

        this.chart.createFiveYearGoalsChart('fiveYearGoalsContainer', this.user.results);
        this.chart.createFiveYearExpensesChart('fiveYearExpensesContainer', this.user.results);
        this.chart.createSimpleChart('resultsContainerSimple', this.user.results);
        this.chart.createAdvancedChart('resultsContainerAdvanced', this.user.results);

        this.chart.createRecommendedChart('recommendedContainer', this.user.results, this.user.recommend);
        this.chart.createAdvancedRecommendedChart('recommendedContainerAdvanced', this.user.results, this.user.recommend);
    }

    showChart(option) {
        if (option == "Simple Budget") {
            this.user.results.showBudget = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showExpenses = false;
            this.user.results.showAdvanced = false;
        }
        else if (option == "Advanced Budget") {
            this.user.results.showAdvanced = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showExpenses = false;
            this.user.results.showBudget = false;
        }
        else if (option == "Projected Expenses") {
            this.user.results.showExpenses = true;
            this.user.results.showGoalsChart = false;
            this.user.results.showBudget = false;
            this.user.results.showAdvanced = false;
        }
        else if (option == "Goals") {
            this.user.results.showGoalsChart = true;
            this.user.results.showExpenses = false;
            this.user.results.showBudget = false;
            this.user.results.showAdvanced = false;
        }

        this.selectedChart.text = option;
        return true;
    }

    showRecommendedChart(option) {
        if (option == "Recommended Simple Budget") {
            this.user.results.showAdvancedRecommended = false;
        }
        else this.user.results.showAdvancedRecommended = true;
    }

    checkAdvanced() {
        this.user.results.showAdvanced = !this.user.results.showAdvanced;
    }

    checkAdvancedRecommended() {
        this.user.results.showAdvancedRecommended = !this.user.results.showAdvancedRecommended;
    }

    back() {
        this.router.navigate('#/expenses');
    }

    home() {
        this.router.navigate('#/home');
    }

    formatModal() {
        this.modelHomeChanges = [];
        this.modelCarChanges = [];
        this.modelHealthChanges = [];
        this.modelDiscretionaryChanges = [];

        this.currentHomeChanges = [];
        this.currentCarChanges = [];
        this.currentHealthChanges = [];
        this.currentDiscretionaryChanges = [];

        for (var i = 0; i < this.homeChanges.length; i++) {
            var val = parseFloat(this.user.recommend.homeChanges[this.homeChanges[i]]);
            if (val < 0) {
                this.modelHomeChanges.push("-$" + Math.abs(val).toFixed(2));
                this.currentHomeChanges.push(this.homeChanges[i] + ":");
            }
            else if (val > 0) {
                this.modelHomeChanges.push("$" + Math.abs(val).toFixed(2));
                this.currentHomeChanges.push(this.homeChanges[i] + ":");
            }
        }

        if (this.currentHomeChanges.length == 0) this.currentHomeChanges.push('None');

        for (var i = 0; i < this.carChanges.length; i++) {
            var val = parseFloat(this.user.recommend.carChanges[this.carChanges[i]]);
            if (val < 0) {
                this.modelCarChanges.push("-$" + Math.abs(val).toFixed(2));
                this.currentCarChanges.push(this.carChanges[i] + ":");
            }
            else if (val > 0) {
                this.modelCarChanges.push("$" + Math.abs(val).toFixed(2));
                this.currentCarChanges.push(this.carChanges[i] + ":");
            }
        }

        if (this.currentCarChanges.length == 0) this.currentCarChanges.push('None');

        for (var i = 0; i < this.healthChanges.length; i++) {
            var val = parseFloat(this.user.recommend.healthChanges[this.healthChanges[i]]);
            if (val < 0) {
                this.modelHealthChanges.push("-$" + Math.abs(val).toFixed(2));
                this.currentHealthChanges.push(this.healthChanges[i] + ":");
            }
            else if (val > 0) {
                this.modelHealthChanges.push("$" + Math.abs(val).toFixed(2));
                this.currentHealthChanges.push(this.healthChanges[i] + ":");
            }
        }

        if (this.currentHealthChanges.length == 0) this.currentHealthChanges.push('None');

        for (var i = 0; i < this.discretionaryChanges.length; i++) {
            var val = parseFloat(this.user.recommend.discretionaryChanges[this.discretionaryChanges[i]]);
            if (val < 0) {
                this.modelDiscretionaryChanges.push("-$" + Math.abs(val).toFixed(2));
                this.currentDiscretionaryChanges.push(this.discretionaryChanges[i] + ":");
            }
            else if (val > 0) {
                this.modelDiscretionaryChanges.push("$" + Math.abs(val).toFixed(2));
                this.currentDiscretionaryChanges.push(this.discretionaryChanges[i] + ":");
            }
        }

        if (this.currentDiscretionaryChanges.length == 0) this.currentDiscretionaryChanges.push('None');

        var expenseChange = this.user.recommend.expensesChange;
        if (expenseChange < 0) this.modelExpenseChange = "-$" + Math.abs(expenseChange.toFixed(2));
        else this.modelExpenseChange = "$" + Math.abs(expenseChange.toFixed(2));
    }

    attached() {
        this.user.personalInfo.showNavbar = true;
        this.getChartData();

        this.user.results.showBudget = true;
        this.user.results.showGoalsChart = false;
        this.user.results.showExpenses = false;
        this.user.results.showAdvanced = false;
        this.user.results.showAdvancedRecommended = false;

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

        //Show goals if there are any
        if (this.user.personalInfo.currentGoals.length > 0) this.user.results.showGoals = true;
        else this.user.results.showGoals = false;

        if (this.user.expenses.totalHomeExpense + this.user.expenses.totalCarExpense + this.user.expenses.totalHealthExpense + this.user.expenses.totalDiscretionaryExpense == 0) {
            this.user.expenses.isTotalExpenseZero = true;

            bootbox.confirm({
                title: "MoneyManage",
                message: "Please input some spending habits before accessing results!",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> Cancel'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> Spending'
                    }
                },
                callback: (result) => {
                    if (result) {
                        console.log(result);
                        this.user.personalInfo.showNavbar = true;
                        this.router.navigate('#/expenses');
                    }
                }
            });
        } else {
            this.user.expenses.isTotalExpenseZero = false;
        }
    }
}