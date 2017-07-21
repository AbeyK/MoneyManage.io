import {inject} from 'aurelia-framework';
import {User} from '../services/user';
import {Constants} from '../services/constants';

@inject(User, Constants)
export class calculatePercentages {
    constructor(user, constants) {
        this.user = user;
        this.constants = constants;
    }

    calculateAllPercentages() {
        var home = this.user.expenses.totalHomeExpense;
        var car = this.user.expenses.totalCarExpense;
        var health = this.user.expenses.totalHealthExpense;
        var discretionary = this.user.expenses.totalDiscretionaryExpense;

        this.user.expenses.totalExpense = home + car + health + discretionary;
        var total = this.user.expenses.totalExpense;

        this.calculateHomePercentages(home, total);
        this.calculateCarPercentages(car, total);
        this.calculateHealthPercentages(health, total);
        this.calculateDiscretionaryPercentages(discretionary, total);

        //Recommended calculations
        var homeRecommended = this.user.recommend.totalHomeExpense;
        var carRecommended = this.user.recommend.totalCarExpense;
        var healthRecommended = this.user.recommend.totalHealthExpense;
        var discretionaryRecommended = this.user.recommend.totalDiscretionaryExpense;
        var totalRecommended = this.user.recommend.totalExpense;

        this.calculateHomePercentagesRecommended(homeRecommended, totalRecommended);
        this.calculateCarPercentagesRecommended(carRecommended, totalRecommended);
        this.calculateHealthPercentagesRecommended(healthRecommended, totalRecommended);
        this.calculateDiscretionaryPercentagesRecommended(discretionaryRecommended, totalRecommended);
    }
    
    calculateHomePercentages(home, total) { 
        this.user.results.advancedHomeAmounts = [];
        this.user.results.homePercentageArray = [];
        this.user.results.homePercentage = (home / total) * 100;

        for(var i = 0; i < this.constants.HomeExpenses.length; i++) {
            var expenseName = this.constants.HomeExpenses[i].value;
            this.user.results.homePercentageArray.push(this.user.results[expenseName + 'Percentage'] = (this.user.expenses[expenseName] / home) * this.user.results.homePercentage);
            this.user.results.advancedHomeAmounts.push(this.user.expenses[expenseName]);
        }
    }

    calculateCarPercentages(car, total) {
        this.user.results.advancedCarAmounts = [];
        this.user.results.carPercentageArray = [];
        this.user.results.carPercentage = (car / total) * 100;

        for(var i = 0; i < this.constants.CarExpenses.length; i++) {
            var expenseName = this.constants.CarExpenses[i].value;
            this.user.results.carPercentageArray.push(this.user.results[expenseName + 'Percentage'] = (this.user.expenses[expenseName] / car) * this.user.results.carPercentage);
            this.user.results.advancedCarAmounts.push(this.user.expenses[expenseName]);
        }
    }

    calculateHealthPercentages(health, total) {
        this.user.results.advancedCarAmounts = [];
        this.user.results.healthPercentageArray = [];
        this.user.results.healthPercentage = (health / total) * 100;

        for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
            var expenseName = this.constants.HealthExpenses[i].value;
            this.user.results.healthPercentageArray.push(this.user.results[expenseName + 'Percentage'] = (this.user.expenses[expenseName] / health) * this.user.results.healthPercentage);
            this.user.results.advancedHealthAmounts.push(this.user.expenses[expenseName]);
        }
    }

    calculateDiscretionaryPercentages(discretionary, total) {
        this.user.results.advancedDiscretionaryAmounts = [];
        this.user.results.discretionaryPercentageArray = [];
        this.user.results.discretionaryPercentage = (discretionary / total) * 100;

        for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
            var expenseName = this.constants.DiscretionaryExpenses[i].value;
            this.user.results.discretionaryPercentageArray.push(this.user.results[expenseName + 'Percentage'] = (this.user.expenses[expenseName] / discretionary) * this.user.results.discretionaryPercentage);
            this.user.results.advancedDiscretionaryAmounts.push(this.user.expenses[expenseName]);
        }
    }


    //RECOMMENDED VALUES PERCENTAGES
    calculateHomePercentagesRecommended(home, total) { 
        this.user.recommend.advancedHomeAmounts = [];
        this.user.recommend.homePercentageArray = [];
        this.user.recommend.homePercentage = (home / total) * 100;

        for(var i = 0; i < this.constants.HomeExpenses.length; i++) {
            var expenseName = this.constants.HomeExpenses[i].value;
            this.user.recommend.homePercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = (this.user.recommend[expenseName] / home) * this.user.recommend.homePercentage);
            this.user.recommend.advancedHomeAmounts.push(this.user.recommend[expenseName]);
        }
    }

    calculateCarPercentagesRecommended(car, total) {
        this.user.recommend.advancedCarAmounts = [];
        this.user.recommend.carPercentageArray = [];
        this.user.recommend.carPercentage = (car / total) * 100;

        for(var i = 0; i < this.constants.CarExpenses.length; i++) {
            var expenseName = this.constants.CarExpenses[i].value;
            this.user.recommend.carPercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = (this.user.recommend[expenseName] / car) * this.user.recommend.carPercentage);
            this.user.recommend.advancedCarAmounts.push(this.user.recommend[expenseName]);
        }
    }

    calculateHealthPercentagesRecommended(health, total) {
        this.user.recommend.advancedHealthAmounts = [];
        this.user.recommend.healthPercentageArray = [];
        this.user.recommend.healthPercentage = (health / total) * 100;

        for(var i = 0; i < this.constants.HealthExpenses.length; i++) {
            var expenseName = this.constants.HealthExpenses[i].value;
            this.user.recommend.healthPercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = (this.user.recommend[expenseName] / health) * this.user.recommend.healthPercentage);
            this.user.recommend.advancedHealthAmounts.push(this.user.recommend[expenseName]);
        }
    }

    calculateDiscretionaryPercentagesRecommended(discretionary, total) {
        this.user.recommend.advancedDiscretionaryAmounts = [];
        this.user.recommend.discretionaryPercentageArray = [];
        this.user.recommend.discretionaryPercentage = (discretionary / total) * 100;

        for(var i = 0; i < this.constants.DiscretionaryExpenses.length; i++) {
            var expenseName = this.constants.DiscretionaryExpenses[i].value;
            this.user.recommend.discretionaryPercentageArray.push(this.user.recommend[expenseName + 'Percentage'] = (this.user.recommend[expenseName] / discretionary) * this.user.recommend.discretionaryPercentage);
            this.user.recommend.advancedDiscretionaryAmounts.push(this.user.recommend[expenseName]);
        }
    }
}