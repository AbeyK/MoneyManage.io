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
        var total = home + car + health + discretionary;
        this.user.expenses.totalExpense = total;

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

        this.user.recommend.expensesChange = 0;
        this.user.recommend.adjustedSavingsTotal = adjustedSavingsTotal;

        //GET HEALTH PERCENTAGE CHANGES
        var medicationPerc = (this.user.recommend.medication / expenseTotal - .05) / 5;
        if(medicationPerc < 0) medicationPerc = .01;

        while(adjustingHandler) {
            this.user.recommend.totalHomeExpense = 0;
            this.user.recommend.totalCarExpense = 0;
            this.user.recommend.totalHealthExpense = 0;
            this.user.recommend.totalDiscretionaryExpense = 0;
            this.user.recommend.totalExpense = 0;

            //HOME CHANGES
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
                        this.user.recommend[expenseName + 'check'] = true;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;

                    this.user.recommend.homeChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalHomeExpense += this.user.recommend[expenseName];
            }

            //CAR CHANGES
            for(var i = 0; i < this.constants.CarExpenses.length; i++) {
                var expenseName = this.constants.CarExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'carPayment') adjusted = this.user.expenses.carExpenseConstants.Payment;
                        else if(expenseName == 'gas') adjusted = this.user.expenses.carExpenseConstants.Gas;
                        else if(expenseName == 'carMaintenance') adjusted = this.user.expenses.carExpenseConstants.Maintenance;
                        this.user.recommend[expenseName + 'check'] = true;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;


                    this.user.recommend.carChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalCarExpense += this.user.recommend[expenseName];
            }

            //HEALTH CHANGES
            for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
                var expenseName = this.constants.HealthExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'unexpectedMedicalProblems') adjusted = this.user.expenses.healthExpenseConstants.Emergency;
                        this.user.recommend[expenseName + 'check'] = true;
                    }
                    else {
                        if(expenseName == 'medication') adjusted = this.user.recommend[expenseName] - this.user.recommend[expenseName] * medicationPerc;
                        else if(expenseName == 'unexpectedMedicalProblems') {
                            if(this.user.recommend[expenseName] > this.user.expenses.healthExpenseConstants.Emergency) adjusted = this.user.recommend[expenseName] * .75;
                            if(this.user.recommend[expenseName] <= this.user.expenses.healthExpenseConstants.Emergency) adjusted = this.user.expenses.healthExpenseConstants.Emergency;
                        }
                        else adjusted = this.user.recommend[expenseName] * .75;
                    }

                    this.user.recommend.healthChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalHealthExpense += this.user.recommend[expenseName];
            }

            //DISCRETIONARY CHANGES
            for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                var expenseName = this.constants.DiscretionaryExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(!this.user.recommend[expenseName + 'check']) {
                        if(expenseName == 'eatingOut') adjusted = this.user.expenses.discretionaryExpenseConstants.Eating;
                        else if(expenseName == 'bars') adjusted = this.user.expenses.discretionaryExpenseConstants.Club;
                        this.user.recommend[expenseName + 'check'] = true;
                    }
                    else adjusted = this.user.recommend[expenseName] * .75;

                    this.user.recommend.discretionaryChanges[expenseName] = this.user.expenses[expenseName] - adjusted;
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalDiscretionaryExpense += this.user.recommend[expenseName];
            }

            //ADD NEW TOTAL EXPENSE
            this.user.recommend.totalExpense = this.user.recommend.totalHomeExpense + this.user.recommend.totalCarExpense +
                this.user.recommend.totalHealthExpense + this.user.recommend.totalDiscretionaryExpense;
        
            expenseTotal = this.user.recommend.totalExpense;

            var tempAdjusted = adjustedSavingsTotal + (incomeTotal - expenseTotal);
            count++;

            this.user.recommend.expensesChange = this.user.expenses.totalExpense - this.user.recommend.totalExpense;

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