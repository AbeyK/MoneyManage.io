import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class ExpensesConstants {
    constructor(user) {
        this.user = user;
    }

    getExpenseConstants() {
        var emergencyValue = 0;
        if(this.user.personalInfo.householdSize == 1) emergencyValue == 3300; //Per year
        else emergencyValue == 6550;

        this.user.expenses.homeExpenseConstants = {
            //Mortgage numbers go from income of 10000 to income of 150000
            "Mortgage" : [461, 461, 461, 493, 614, 678, 678, 759, 939, 939, 1037, 1037, 1211, 1211, 1211, 1686][Math.min(15, Math.floor(this.user.personalInfo.income / 10000))],
            "Cable" : 50,
            "Netflix" : 9,
            //Grocery numbers change based on household sizes up to 11 members
            "Grocery" : [332, 332, 607, 814, 1006, 1176, 1412, 1577, 1799, 1985, 2286, 2341][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            "Utilities" : 200 + (200 * .02 * this.user.personalInfo.householdSize),
            "Maintenance" : this.user.personalInfo.squareFootHome,
            "Clothes" : Math.floor(this.user.personalInfo.income * .05)
        };

        this.user.expenses.carExpenseConstants = {
            "Payment" : 479,
            "Gas" : 250,
            "Maintenance" : 76
        };

        this.user.expenses.healthExpenseConstants = {
            "Emergency" : emergencyValue,
            "Braces" : 6000
        };

        this.user.expenses.discretionaryExpenseConstants = {
            "Eating" : Math.floor(this.user.personalInfo.income * .045),
            "Club" : 300
        };
    }
}