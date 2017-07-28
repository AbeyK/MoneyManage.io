import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class ExpensesConstants {
    constructor(user) {
        this.user = user;
    }

    getExpenseConstants() {
        var emergencyValue = 0;
        if(this.user.personalInfo.householdSize == 1) {
            emergencyValue = 3300 / 12;
        }
        else emergencyValue = 6550 / 12;

        this.user.expenses.homeExpenseConstants = {
            //Mortgage numbers go from income of 10000 to income of 150000
            "Mortgage" : [461, 461, 461, 493, 614, 678, 678, 759, 939, 939, 1037, 1037, 1211, 1211, 1211, 1686][Math.min(15, Math.floor(this.user.personalInfo.income / 10000))],
            
            "CableMax" : 81.75,
            "CableExpanded" : 69.03,
            "CableBasic" : 23.79,
            "Streaming" : 9,
            
            //Grocery numbers change based on household sizes up to 11 members
            "GroceryThrifty" : [201, 201, 382, 504, 618, 717, 855, 949, 1080, 1203, 1393, 1483][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            "GroceryLow" : [267, 267, 488, 657, 811, 947, 1134, 1259, 1436, 1588, 1833, 1886][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            "GroceryModerate" : [332, 332, 607, 814, 1006, 1176, 1412, 1577, 1799, 1985, 2286, 2341][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            "GroceryLiberal" : [414, 414, 759, 999, 1222, 1423, 1698, 1887, 2148, 2375, 2739, 2812][Math.min(11, Math.floor(this.user.personalInfo.householdSize))],
            
            "Utilities" : 200 + (200 * .02 * parseInt(this.user.personalInfo.householdSize)),
            "Maintenance" : parseInt(this.user.personalInfo.squareFootHome / 12),
            "Clothes" : Math.floor(this.user.personalInfo.income * .05) / 12
        };

        this.user.expenses.carExpenseConstants = {
            "Payment" : 479,
            "GasMin" : 100,
            "GasMax" : 250,
            "PublicTransport" : 65,
            "Maintenance" : 913.50 / 12
        };

        this.user.expenses.healthExpenseConstants = {
            "MedicationMin" : parseFloat(this.user.expenses.medication) * .95,
            "Emergency" : emergencyValue,
            "Braces" : 6000 / 12
        };

        this.user.expenses.discretionaryExpenseConstants = {
            "Eating" : Math.floor(this.user.personalInfo.income * .045),
            "Club" : 162
        };
    }
}