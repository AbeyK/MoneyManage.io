import { inject } from 'aurelia-framework';
import { User } from '../services/user';
import { ExpensesConstants } from '../services/expensesConstants';

@inject(User, ExpensesConstants)
export class calculateExpenses {
    constructor(user, expensesConstants) {
        this.user = user;
        this.expensesConstants = expensesConstants;
    }

    homeExpenses() {
        var tempHomeTotal =
            parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertyTax) +
            parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) +
            parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.netfix) +
            parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) +
            parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes);

        if (isNaN(tempHomeTotal)) alert("Please enter a valid input");
        else {
            this.user.expenses.totalHomeExpense = tempHomeTotal;
            if (this.user.expenses.mortgage > this.expensesConstants.homeExpenseConstants["Mortgage"]) {
                this.user.expenses.mortgagecheck = false;
            }
            if (this.user.expenses.clothes > this.expensesConstants.homeExpenseConstants["Clothes"]) {
                this.user.expenses.clothescheck = false;
            }
            if (this.user.expenses.homeMaintenance > this.expensesConstants.homeExpenseConstants["Maintenance"]) {
                this.user.expenses.homeMaintenancecheck = false;
            }
            if (this.user.expenses.netfix > this.expensesConstants.homeExpenseConstants["Netflix"]) {
                this.user.expenses.netfixcheck = false;
            }
            if (this.user.expenses.cable > this.expensesConstants.homeExpenseConstants["Cable"]) {
                this.user.expenses.cablecheck = false;
            }
        }
    }

    carExpenses() {
        var tempCarTotal =
            parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) +
            parseInt(this.user.expenses.publicTransport) + parseInt(this.user.expenses.gas) +
            parseInt(this.user.expenses.carMaintenance);

        if (isNaN(tempCarTotal)) alert("Please enter a valid input");
        else {
            this.user.expenses.totalCarExpense = tempCarTotal;
            if (this.user.expenses.carPayment > this.expensesConstants.carExpenseConstants["Payment"]) {
                this.user.expenses.carPaymentcheck = false;
            }
            if (this.user.expenses.gas > this.expensesConstants.carExpenseConstants["Gas"]) {
                this.user.expenses.gascheck = false;
            }
            if (this.user.expenses.carMaintenance > this.expensesConstants.carExpenseConstants["Maintenance"]) {
                this.user.expenses.carMaintenancecheck = false;
            }
        }

    }
    healthExpenses() {
        var tempHealthTotal =
            parseInt(this.user.expenses.healthInsurance) + parseInt(this.user.expenses.medication) +
            parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.dentalInsurance) +
            parseInt(this.user.expenses.cavities) + parseInt(this.user.expenses.eyeCare) +
            parseInt(this.user.expenses.braces);

        if (isNaN(tempHealthTotal)) alert("Please enter a valid input");
        else {
            this.user.expenses.totalHealthExpense = tempHealthTotal;
            if (this.user.expenses.unexpectedMedicalProblems > this.expensesConstants.healthExpenseConstants["Emergency"]) {
                this.user.expenses.unexpectedMedicalProblemscheck = false;
            }
            if (this.user.expenses.braces > this.expensesConstants.healthExpenseConstants["Braces"]) {
                this.user.expenses.bracescheck = false;
            }
        }
    }

    discretionaryExpenses() {
        var tempDiscretionaryTotal =
            parseInt(this.user.expenses.eatingOut) + parseInt(this.user.expenses.bars) +
            parseInt(this.user.expenses.funMoney) + parseInt(this.user.expenses.other);

        if (isNaN(tempDiscretionaryTotal)) alert("Please enter a valid input");
        else {
            this.user.expenses.totalDiscretionaryExpense = tempDiscretionaryTotal;
            if (this.user.expenses.eatingOut > this.expensesConstants.discretionaryExpenseConstants["Eating"]) {
                this.user.expenses.eatingOutcheck = false;
            }
            if (this.user.expenses.bars > this.expensesConstants.discretionaryExpenseConstants["Club"]) {
                this.user.expenses.barscheck = false;
            }
        }
    }
}