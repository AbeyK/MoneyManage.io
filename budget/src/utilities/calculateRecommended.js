import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import {Constants} from '../services/constants';

@inject(User, Constants)
export class calculateRecommended {
    constructor(user, constants) {
        this.user = user;
        this.constants = constants;
    }

    getRecommendedTotals() {
        var home = this.user.expenses.totalHomeExpense;
        var car = this.user.expenses.totalCarExpense;
        var health = this.user.expenses.totalHealthExpense;
        var discretionary = this.user.expenses.totalDiscretionaryExpense;
        var total = this.user.expenses.totalExpense;

        this.getOriginalExpenses();

        var chartGoals = this.user.results.chartGoals;

        var goalsTotal = 0;
        if(chartGoals[0].length <= 0) goalsTotal = 0;
        else goalsTotal = chartGoals[0][chartGoals[0].length-1].data;
        
        var earningsTotal = this.user.results.fiveYearSavings[4];


        this.user.recommend.totalHomeExpense = 0;
        this.user.recommend.totalCarExpense = 0;
        this.user.recommend.totalHealthExpense = 0;
        this.user.recommend.totalDiscretionaryExpense = 0;
        this.user.recommend.totalExpense = 0;

        //Decrease values if locked
        for(var i = 0; i < this.constants.HomeExpenses.length; i++) {
            if(!this.user.recommend[this.constants.HomeExpenses[i].value + 'lock']);
            else {
                if(this.user.recommend[this.constants.HomeExpenses[i].value + 'check']);
                else {
                    this.user.recommend[this.constants.HomeExpenses[i].value] *= .50;
                }
            }

            this.user.recommend.totalHomeExpense += this.user.recommend[this.constants.HomeExpenses[i].value];
        }

        for(var i = 0; i < this.constants.CarExpenses.length; i++) {
            if(!this.user.recommend[this.constants.CarExpenses[i].value + 'lock']);
            else {
                if(this.user.recommend[this.constants.CarExpenses[i].value + 'check']);
                else {
                    this.user.recommend[this.constants.CarExpenses[i].value] *= .50;
                }
            }

            this.user.recommend.totalCarExpense += this.user.recommend[this.constants.CarExpenses[i].value];
        }

        for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
            if(!this.user.recommend[this.constants.HealthExpenses[i].value + 'lock']);
            else {
                if(this.user.recommend[this.constants.HealthExpenses[i].value + 'check']);
                else {
                    this.user.recommend[this.constants.HealthExpenses[i].value] *= .50;
                }
            }

            this.user.recommend.totalHealthExpense += this.user.recommend[this.constants.HealthExpenses[i].value];
        }

        for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
            if(!this.user.recommend[this.constants.DiscretionaryExpenses[i].value + 'lock']);
            else {
                if(this.user.recommend[this.constants.DiscretionaryExpenses[i].value + 'check']);
                else {
                    this.user.recommend[this.constants.DiscretionaryExpenses[i].value] *= .50;
                }
            }

            this.user.recommend.totalDiscretionaryExpense += this.user.recommend[this.constants.DiscretionaryExpenses[i].value];
        }

        this.user.recommend.totalExpense = this.user.recommend.totalHomeExpense + this.user.recommend.totalCarExpense +
            this.user.recommend.totalHealthExpense + this.user.recommend.totalDiscretionaryExpense;
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