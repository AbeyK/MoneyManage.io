import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import {Constants} from '../services/constants';
import {ExpensesConstants} from '../services/expensesConstants';

@inject(User, Constants, ExpensesConstants)
export class calculateRecommended {
    constructor(user, constants, expensesConstants) {
        this.user = user;
        this.constants = constants;
        this.expensesConstants = expensesConstants;
    }

    getRecommendedTotals() {
        var home = this.user.expenses.totalHomeExpense;
        var car = this.user.expenses.totalCarExpense;
        var health = this.user.expenses.totalHealthExpense;
        var discretionary = this.user.expenses.totalDiscretionaryExpense;
        var total = this.user.expenses.totalExpense;

        this.expensesConstants.getExpenseConstants();
        this.getOriginalExpenses();

        var chartGoals = this.user.results.chartGoals;

        var goalsTotal = 0;
        if(chartGoals[0].length <= 0) goalsTotal = 0;
        else goalsTotal = chartGoals[0][chartGoals[0].length-1].data;
        
        var savingsTotal = this.user.results.fiveYearSavings[4];
        var incomeTotal = this.user.results.fiveYearIncome[4];
        var expenseTotal = this.user.results.fiveYearExpenses[4];
        var adjustedSavingsTotal = savingsTotal - (incomeTotal - expenseTotal);
        var adjustingHandler = true;
        var count = 0;

        this.user.recommend.adjustedSavingsTotal = adjustedSavingsTotal;

        while(adjustingHandler) {
            this.user.recommend.totalHomeExpense = 0;
            this.user.recommend.totalCarExpense = 0;
            this.user.recommend.totalHealthExpense = 0;
            this.user.recommend.totalDiscretionaryExpense = 0;
            this.user.recommend.totalExpense = 0;

            //Decrease values if locked
            for(var i = 0; i < this.constants.HomeExpenses.length; i++) {
                var expenseName = this.constants.HomeExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'cable') adjusted = this.user.expenses.homeExpenseConstants.Cable;
                        else if(expenseName == 'netflix') adjusted = this.user.expenses.homeExpenseConstants.Netflix;
                        else if(expenseName == 'groceries') adjusted = this.user.expenses.homeExpenseConstants.Grocery;
                        else if(expenseName == 'utilities') adjusted = this.user.expenses.homeExpenseConstants.Utilities;
                        else if(expenseName == 'homeMaintenance') adjusted = this.user.expenses.homeExpenseConstants.Maintenance;
                        else if(expenseName == 'clothes') adjusted = this.user.expenses.homeExpenseConstants.Clothes;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;

                    console.log("answers", expenseName, adjusted);
                    if(adjusted < 1) {
                        adjusted = this.user.recommend[expenseName];
                    }

                    this.user.recommend.homeChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalHomeExpense += this.user.recommend[expenseName];
            }

            for(var i = 0; i < this.constants.CarExpenses.length; i++) {
                var expenseName = this.constants.CarExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'carPayment') adjusted = this.user.expenses.carExpenseConstants.Payment;
                        else if(expenseName == 'gas') adjusted = this.user.expenses.carExpenseConstants.Gas;
                        else if(expenseName == 'carMaintenance') adjusted = this.user.expenses.carExpenseConstants.Maintenance;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;

                    if(adjusted < 1) {
                        adjusted = this.user.recommend[expenseName];
                    }

                    this.user.recommend.carChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalCarExpense += this.user.recommend[expenseName];
            }

            for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
                var expenseName = this.constants.HealthExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'unexpectedMedicalProblems') adjusted = this.user.expenses.healthExpenseConstants.Emergency;
                        else if(expenseName == 'braces') adjusted = this.user.expenses.healthExpenseConstants.Braces;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;

                    if(adjusted < 1) {
                        adjusted = this.user.recommend[expenseName];
                    }

                    this.user.recommend.healthChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalHealthExpense += this.user.recommend[expenseName];
            }

            for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                var expenseName = this.constants.DiscretionaryExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'eatingOut') adjusted = this.user.expenses.discretionaryExpenseConstants.Eating;
                        else if(expenseName == 'bars') adjusted = this.user.expenses.discretionaryExpenseConstants.Club;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;

                    if(adjusted < 1) {
                        adjusted = this.user.recommend[expenseName];
                    }

                    this.user.recommend.discretionaryChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalDiscretionaryExpense += this.user.recommend[expenseName];
            }

            this.user.recommend.totalExpense = this.user.recommend.totalHomeExpense + this.user.recommend.totalCarExpense +
                this.user.recommend.totalHealthExpense + this.user.recommend.totalDiscretionaryExpense;
        
            expenseTotal = this.user.recommend.totalExpense;

            console.log("Savings, income, expense, goals: ", adjustedSavingsTotal, incomeTotal, expenseTotal, goalsTotal);
            var tempAdjusted = adjustedSavingsTotal + (incomeTotal - expenseTotal);
            console.log("Temp adjusted: ", tempAdjusted);
            count++;

            if(tempAdjusted >= goalsTotal) {
                this.user.recommend.message = "With our recommendations, you meet your goals!";
                this.user.recommend.messageStyle = "alert alert-success";
                adjustingHandler = false;
            }
            if(count > 4) {
                this.user.recommend.message = "You do not meet your goals with our recommendations. Consider a more reasonable approach.";
                this.user.recommend.messageStyle = "alert alert-danger";
                adjustingHandler = false;
            }
        }
    }

    getOriginalExpenses() {
        for(var i = 0; i < this.constants.HomeExpenses.length; i++) {
            this.user.recommend[this.constants.HomeExpenses[i].value] = parseInt(this.user.expenses[this.constants.HomeExpenses[i].value]);
            this.user.recommend[this.constants.HomeExpenses[i].value + 'lock'] = this.user.expenses[this.constants.HomeExpenses[i].value + 'lock'];
            this.user.recommend[this.constants.HomeExpenses[i].value + 'check'] = this.user.expenses[this.constants.HomeExpenses[i].value + 'check'];
        }

        for(var i = 0; i < this.constants.CarExpenses.length; i++) {
            this.user.recommend[this.constants.CarExpenses[i].value] = parseInt(this.user.expenses[this.constants.CarExpenses[i].value]);
            this.user.recommend[this.constants.CarExpenses[i].value + 'lock'] = this.user.expenses[this.constants.CarExpenses[i].value + 'lock'];
            this.user.recommend[this.constants.CarExpenses[i].value + 'check'] = this.user.expenses[this.constants.CarExpenses[i].value + 'check'];
        }

        for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
            this.user.recommend[this.constants.HealthExpenses[i].value] = parseInt(this.user.expenses[this.constants.HealthExpenses[i].value]);
            this.user.recommend[this.constants.HealthExpenses[i].value + 'lock'] = this.user.expenses[this.constants.HealthExpenses[i].value + 'lock'];
            this.user.recommend[this.constants.HealthExpenses[i].value + 'check'] = this.user.expenses[this.constants.HealthExpenses[i].value + 'check'];
        }

        for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
            this.user.recommend[this.constants.DiscretionaryExpenses[i].value] = parseInt(this.user.expenses[this.constants.DiscretionaryExpenses[i].value]);
            this.user.recommend[this.constants.DiscretionaryExpenses[i].value + 'lock'] = this.user.expenses[this.constants.DiscretionaryExpenses[i].value + 'lock'];
            this.user.recommend[this.constants.DiscretionaryExpenses[i].value + 'check'] = this.user.expenses[this.constants.DiscretionaryExpenses[i].value + 'check'];
        }
    }
}