import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class calculatePercentages {
    constructor(user) {
        this.user = user;
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
    }
    
    calculateHomePercentages(home, total) { 
        this.user.results.homePercentageArray = [];
        this.user.results.homePercentage = (home / total) * 100;
        this.user.results.homePercentageArray.push(this.user.results.mortgagePercentage = (this.user.expenses.mortgage / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.propertyTaxPercentage = (this.user.expenses.propertyTax / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.phonePercentage = (this.user.expenses.phone / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.internetPercentage = (this.user.expenses.internet / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.cablePercentage = (this.user.expenses.cable / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.netflixPercentage = (this.user.expenses.netfix / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.groceriesPercentage = (this.user.expenses.groceries / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.utilitiesPercentage = (this.user.expenses.utilities / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.homeMaintenancePercentage = (this.user.expenses.homeMaintenance / home) * this.user.results.homePercentage);
        this.user.results.homePercentageArray.push(this.user.results.clothesPercentage = (this.user.expenses.clothes / home) * this.user.results.homePercentage);
    }

    calculateCarPercentages(car, total) {
        this.user.results.carPercentageArray = [];
        this.user.results.carPercentage = (car / total) * 100;
        this.user.results.carPercentageArray.push(this.user.results.carPaymentPercentage = (this.user.expenses.carPayment / car) * this.user.results.carPercentage);
        this.user.results.carPercentageArray.push(this.user.results.carInsurancePercentage = (this.user.expenses.carInsurance / car) * this.user.results.carPercentage);
        this.user.results.carPercentageArray.push(this.user.results.publicTransportPercentage = (this.user.expenses.publicTransport / car) * this.user.results.carPercentage);
        this.user.results.carPercentageArray.push(this.user.results.gasPercentage = (this.user.expenses.gas / car) * this.user.results.carPercentage);
        this.user.results.carPercentageArray.push(this.user.results.carMaintenancePercentage = (this.user.expenses.carMaintenance / car) * this.user.results.carPercentage);
    }

    calculateHealthPercentages(health, total) {
        this.user.results.healthPercentageArray = [];
        this.user.results.healthPercentage = (health / total) * 100;
        this.user.results.healthPercentageArray.push(this.user.results.healthInsurancePercentage = (this.user.expenses.healthInsurance / health) * this.user.results.healthPercentage);
        this.user.results.healthPercentageArray.push(this.user.results.medicationPercentage = (this.user.expenses.medication / health) * this.user.results.healthPercentage);
        this.user.results.healthPercentageArray.push(this.user.results.unexpectedMedicalProblemsPercentage = (this.user.expenses.unexpectedMedicalProblems / health) * this.user.results.healthPercentage);
        this.user.results.healthPercentageArray.push(this.user.results.eyeCarePercentage = (this.user.expenses.eyeCare / health) * this.user.results.healthPercentage);
        this.user.results.healthPercentageArray.push(this.user.results.dentalInsurancePercentage = (this.user.expenses.dentalInsurance / health) * this.user.results.healthPercentage);
        this.user.results.healthPercentageArray.push(this.user.results.cavitiesPercentage = (this.user.expenses.cavities / health) * this.user.results.healthPercentage);
        this.user.results.healthPercentageArray.push(this.user.results.bracesPercentage = (this.user.expenses.braces / health) * this.user.results.healthPercentage);
    }

    calculateDiscretionaryPercentages(discretionary, total) {
        this.user.results.discretionaryPercentageArray = [];
        this.user.results.discretionaryPercentage = (discretionary / total) * 100;
        this.user.results.discretionaryPercentageArray.push(this.user.results.eatingOutPercentage = (this.user.expenses.eatingOut / discretionary) * this.user.results.discretionaryPercentage);
        this.user.results.discretionaryPercentageArray.push(this.user.results.barsPercentage = (this.user.expenses.bars / discretionary) * this.user.results.discretionaryPercentage); 
        this.user.results.discretionaryPercentageArray.push(this.user.results.funMoneyPercentage = (this.user.expenses.funMoney / discretionary) * this.user.results.discretionaryPercentage);
        this.user.results.discretionaryPercentageArray.push(this.user.results.otherPercentage = (this.user.expenses.other / discretionary) * this.user.results.discretionaryPercentage);
    }
}