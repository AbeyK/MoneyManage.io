import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class ExpensesConstants {
    constructor(user) {
        this.user = user;

        this.homeExpenseConstants = {
            "Maintenance" : (this.user.personalInfo.squareFootHome / 12),
            "Clothes" : Math.floor(this.user.personalInfo.income * .05),
            //Mortgage numbers go from income of 10000 to income of 150000
            "Mortgage" : [461, 461, 461, 493, 614, 678, 678, 759, 939, 939, 1037, 1037, 1211, 1211, 1211, 1686][Math.min(15, Math.floor(this.user.personalInfo.income / 10000))],
            //Grocery numbers change based on household sizes up to 11 members
            "Grocery" : [332, 332, 607, 814, 1006, 1176, 1412, 1577, 1799, 1985, 2286, 2341][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            "Netflix" : 9,
            "Cable" : 50
        };

        this.healthExpenseConstants = {
            "Emergency" : this.user.personalInfo.householdSize * 250,
            "Braces" : 6000
        }

        this.carExpenseConstants = {
            "Payment" : 479,
            "Gas" : 250,
            "Maintenance" : 76
        }
        
        this.discretionaryExpenseConstants = {
            "Eating" : Math.floor(this.user.personalInfo.income * .045),
            "Club" : 300
        }
    }
}