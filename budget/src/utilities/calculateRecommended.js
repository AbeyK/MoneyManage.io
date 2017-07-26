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
                    if(expenseName == 'phone') {
                        adjusted = this.user.recommend[expenseName] * .90;
                    }
                    else if(expenseName == 'internet') {
                        adjusted = this.user.recommend[expenseName] * .90;
                    }
                    else if(expenseName == 'cable') {
                        if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.CableMax) {
                            adjusted = this.user.expenses.homeExpenseConstants.CableMax;
                        }
                        else if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.CableExpanded) {
                            adjusted = this.user.expenses.homeExpenseConstants.CableExpanded;
                        }
                        else if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.CableBasic) {
                            adjusted = this.user.expenses.homeExpenseConstants.CableBasic;
                        }
                        else adjusted = 0;
                    }
                    else if(expenseName == 'streaming') {
                        if(this.user.recommend['cable'] == 0 && this.user.recommend.homeChanges['cable'] > 0 && count == 4) adjusted = this.user.expenses.homeExpenseConstants.Streaming;
                        else adjusted = this.user.recommend[expenseName];
                    }
                    else if(expenseName == 'groceries') {
                        if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.GroceryLiberal) {
                            adjusted = this.user.expenses.homeExpenseConstants.GroceryLiberal;
                        }
                        else if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.GroceryModerate) {
                            adjusted = this.user.expenses.homeExpenseConstants.GroceryModerate;
                        }
                        else if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.GroceryLow) {
                            adjusted = this.user.expenses.homeExpenseConstants.GroceryLow;
                        }
                        else if(this.user.recommend[expenseName] >= this.user.expenses.homeExpenseConstants.GroceryThrifty) {
                            adjusted = this.user.expenses.homeExpenseConstants.GroceryThrifty;
                        }
                        else adjusted = this.user.recommend[expenseName];
                    }
                    else if(expenseName == 'utilities') {
                        var decrease = 0;
                        if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.Utilities) {
                            decrease = (this.user.expenses[expenseName] - this.user.expenses.homeExpenseConstants.Utilities) / 5;
                            if(decrease < 0) adjusted = this.user.recommend[expenseName];
                            else adjusted = this.user.recommend[expenseName] - decrease;
                        }
                        if(this.user.recommend[expenseName] <= this.user.expenses.homeExpenseConstants.Utilities) {
                            if(this.user.recommend.homeChanges[expenseName] != 0) adjusted = this.user.expenses.homeExpenseConstants.Utilities;
                            else adjusted = this.user.recommend[expenseName];
                        }
                    }
                    else if(expenseName == 'homeMaintenance') {
                        var decrease = 0;
                        if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.Maintenance) {
                            decrease = (this.user.expenses[expenseName] - this.user.expenses.homeExpenseConstants.Maintenance) / 5;
                            if(decrease < 0) adjusted = this.user.recommend[expenseName];
                            else adjusted = this.user.recommend[expenseName] - decrease;
                        }
                        if(this.user.recommend[expenseName] <= this.user.expenses.homeExpenseConstants.Maintenance) {
                            adjusted = this.user.expenses.homeExpenseConstants.Maintenance;
                        }
                    }
                    else if(expenseName == 'clothes') {
                        var decrease = 0;
                        if(this.user.recommend[expenseName] > this.user.expenses.homeExpenseConstants.Clothes) {
                            decrease = (this.user.expenses[expenseName] - this.user.expenses.homeExpenseConstants.Clothes) / 5;
                            if(decrease < 0) adjusted = this.user.recommend[expenseName];
                            else adjusted = this.user.recommend[expenseName] - decrease;
                        }
                        if(this.user.recommend[expenseName] <= this.user.expenses.homeExpenseConstants.Clothes) {
                            if(this.user.recommend.homeChanges[expenseName] != 0) adjusted = this.user.expenses.homeExpenseConstants.Clothes;
                            else adjusted = this.user.recommend[expenseName];
                        }
                    }

                    this.user.recommend.homeChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                    this.user.recommend[expenseName] = adjusted;
                }

                if(expenseName == 'propertyTax') this.user.recommend.totalHomeExpense += this.user.recommend[expenseName];
                else this.user.recommend.totalHomeExpense += this.user.recommend[expenseName] * 12;
            }

            //CAR CHANGES
            for(var i = 0; i < this.constants.CarExpenses.length; i++) {
                var expenseName = this.constants.CarExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(expenseName == 'gas') {
                        if(this.user.recommend[expenseName] > this.user.expenses.carExpenseConstants.GasMax) {
                            adjusted = this.user.expenses.carExpenseConstants.GasMax;
                        }
                        else if(this.user.recommend[expenseName] <= this.user.expenses.carExpenseConstants.GasMin) {
                            if(this.user.recommend.carChanges[expenseName] != 0) adjusted = this.user.expenses.carExpenseConstants.GasMin;
                            else adjusted = this.user.recommend[expenseName];
                        }
                        else {
                            var decrease = (this.user.expenses[expenseName] - this.user.expenses.carExpenseConstants.GasMin) / 5;
                            if(decrease < 0) adjusted = this.user.recommend[expenseName];
                            else adjusted = this.user.recommend[expenseName] - decrease;

                            if(adjusted <= this.user.expenses.carExpenseConstants.GasMin || count == 4) {
                                adjusted = this.user.expenses.carExpenseConstants.GasMin;
                            }
                        }
                    }
                    else if(expenseName == 'publicTransport') {
                        var temp = 0;
                        if(this.user.recommend.carChanges["gas"] > 0) {
                            var gasPerc = (this.user.recommend["gas"] - this.user.expenses.carExpenseConstants.GasMin) / (this.user.expenses.carExpenseConstants.GasMax - this.user.expenses.carExpenseConstants.GasMin);
                            temp = this.user.expenses.carExpenseConstants.PublicTransport - (this.user.expenses.carExpenseConstants.PublicTransport * gasPerc);
                            
                            if(this.user.recommend.carChanges["gas"] > temp) adjusted = temp;
                            else adjusted = this.user.recommend[expenseName];
                        }
                        else adjusted = this.user.recommend[expenseName];
                    }
                    else if(expenseName == 'carMaintenance') {
                        var decrease = 0;
                        if(this.user.recommend['carInsurance'] == 0) this.user.recommend[expenseName] = 0;
                        else {
                            if(this.user.recommend[expenseName] > this.user.expenses.carExpenseConstants.Maintenance) {
                                decrease = (this.user.expenses[expenseName] - this.user.expenses.carExpenseConstants.Maintenance) / 5;
                                if(decrease < 0) adjusted = this.user.recommend[expenseName];
                                else adjusted = this.user.recommend[expenseName] - decrease;
                            }
                            if(this.user.recommend[expenseName] <= this.user.expenses.carExpenseConstants.Maintenance) {
                                adjusted = this.user.expenses.carExpenseConstants.Maintenance;
                            }
                        }
                    }

                    this.user.recommend.carChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalCarExpense += this.user.recommend[expenseName] * 12;
            }

            //HEALTH CHANGES
            for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
                var expenseName = this.constants.HealthExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(expenseName == 'medication') {
                        var decrease = (this.user.expenses.medication - this.user.expenses.healthExpenseConstants.MedicationMin) / 5;
                        if(decrease < 0) adjusted = this.user.recommend[expenseName];
                        else adjusted = this.user.recommend[expenseName] - decrease;
                    }
                    else if(expenseName == 'unexpectedMedicalProblems') {
                        if(this.user.recommend[expenseName] > this.user.expenses.healthExpenseConstants.Emergency) adjusted = this.user.recommend[expenseName] * .90;
                        if(this.user.recommend[expenseName] <= this.user.expenses.healthExpenseConstants.Emergency) adjusted = this.user.expenses.healthExpenseConstants.Emergency;
                    }

                    this.user.recommend.healthChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalHealthExpense += this.user.recommend[expenseName] * 12;
            }

            //DISCRETIONARY CHANGES
            for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
                var expenseName = this.constants.DiscretionaryExpenses[i].value;
                var adjusted = 0;

                if(!this.user.recommend[expenseName + 'lock']);
                else {
                    if(expenseName == 'eatingOut') {
                        var decrease = 0;
                        if(this.user.recommend[expenseName] > this.user.expenses.discretionaryExpenseConstants.Eating) {
                            decrease = (this.user.expenses[expenseName] - this.user.expenses.discretionaryExpenseConstants.Eating) / 5;
                            if(decrease < 0) adjusted = this.user.recommend[expenseName];
                            else adjusted = this.user.recommend[expenseName] - decrease;
                        }
                        if(this.user.recommend[expenseName] <= this.user.expenses.discretionaryExpenseConstants.Eating) {
                            if(this.user.recommend.discretionaryChanges[expenseName] != 0) adjusted = this.user.expenses.discretionaryExpenseConstants.Eating;
                            else adjusted = this.user.recommend[expenseName];
                        }
                    }
                    else if(expenseName == 'bars') {
                        var decrease = 0;
                        if(this.user.recommend[expenseName] > this.user.expenses.discretionaryExpenseConstants.Club) {
                            decrease = (this.user.expenses[expenseName] - this.user.expenses.discretionaryExpenseConstants.Club) / 5;
                            if(decrease < 0) adjusted = this.user.recommend[expenseName];
                            else adjusted = this.user.recommend[expenseName] - decrease;
                        }
                        if(this.user.recommend[expenseName] <= this.user.expenses.discretionaryExpenseConstants.Club) {
                            if(this.user.recommend.discretionaryChanges[expenseName] != 0) adjusted = this.user.expenses.discretionaryExpenseConstants.Club;
                            else adjusted = this.user.recommend[expenseName];
                        }
                    }
                    else adjusted = this.user.recommend[expenseName] * .90;

                    this.user.recommend.discretionaryChanges[expenseName] = adjusted - this.user.expenses[expenseName];
                    this.user.recommend[expenseName] = adjusted;
                }

                this.user.recommend.totalDiscretionaryExpense += this.user.recommend[expenseName] * 12;
            }

            //ADD NEW TOTAL EXPENSE
            this.user.recommend.totalExpense = this.user.recommend.totalHomeExpense + this.user.recommend.totalCarExpense +
                this.user.recommend.totalHealthExpense + this.user.recommend.totalDiscretionaryExpense;
        
            expenseTotal = this.user.recommend.totalExpense;

            var tempAdjusted = adjustedSavingsTotal + (incomeTotal - expenseTotal);
            count++;

            this.user.recommend.expensesChange = this.user.recommend.totalExpense - this.user.expenses.totalExpense;

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