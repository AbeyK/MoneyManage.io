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

        //Recommended calculations
        // var homeRecommended = this.user.recommend.totalHomeExpense;
        // var carRecommended = this.user.recommend.totalCarExpense;
        // var healthRecommended = this.user.recommend.totalHealthExpense;
        // var discretionaryRecommended = this.user.recommend.totalDiscretionaryExpense;

        // this.user.recommend.totalExpenseRecommended = homeRecommended + carRecommended + healthRecommended + discretionaryRecommended;
        // var totalRecommended = this.user.recommend.totalExpenseRecommended;

        // this.calculateHomePercentagesRecommended(homeRecommended, totalRecommended);
        // this.calculateCarPercentagesRecommended(carRecommended, totalRecommended);
        // this.calculateHealthPercentagesRecommended(healthRecommended, totalRecommended);
        // this.calculateDiscretionaryPercentagesRecommended(discretionaryRecommended, totalRecommended);
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


    //RECOMMENDED VALUES PERCENTAGES
    calculateHomePercentagesRecommended(home, total) { 
        this.user.results.homePercentageRecommendedArray = [];
        this.user.results.homePercentageRecommended = (home / total) * 100;
        this.user.results.homePercentageRecommendedArray.push(this.user.results.mortgagePercentageRecommended = (this.user.expenses.mortgage / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.propertyTaxPercentageRecommended = (this.user.expenses.propertyTax / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.phonePercentageRecommended = (this.user.expenses.phone / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.internetPercentageRecommended = (this.user.expenses.internet / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.cablePercentageRecommended = (this.user.expenses.cable / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.netflixPercentageRecommended = (this.user.expenses.netfix / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.groceriesPercentageRecommended = (this.user.expenses.groceries / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.utilitiesPercentageRecommended = (this.user.expenses.utilities / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.homeMaintenancePercentageRecommended = (this.user.expenses.homeMaintenance / home) * this.user.results.homePercentageRecommended);
        this.user.results.homePercentageRecommendedArray.push(this.user.results.clothesPercentageRecommended = (this.user.expenses.clothes / home) * this.user.results.homePercentageRecommended);
    }

    calculateCarPercentagesRecommended(car, total) {
        this.user.results.carPercentageRecommendedArray = [];
        this.user.results.carPercentageRecommended = (car / total) * 100;
        this.user.results.carPercentageRecommendedArray.push(this.user.results.carPaymentPercentageRecommended = (this.user.expenses.carPayment / car) * this.user.results.carPercentageRecommended);
        this.user.results.carPercentageRecommendedArray.push(this.user.results.carInsurancePercentageRecommended = (this.user.expenses.carInsurance / car) * this.user.results.carPercentageRecommended);
        this.user.results.carPercentageRecommendedArray.push(this.user.results.publicTransportPercentageRecommended = (this.user.expenses.publicTransport / car) * this.user.results.carPercentageRecommended);
        this.user.results.carPercentageRecommendedArray.push(this.user.results.gasPercentageRecommended = (this.user.expenses.gas / car) * this.user.results.carPercentageRecommended);
        this.user.results.carPercentageRecommendedArray.push(this.user.results.carMaintenancePercentageRecommended = (this.user.expenses.carMaintenance / car) * this.user.results.carPercentageRecommended);
    }

    calculateHealthPercentagesRecommended(health, total) {
        this.user.results.healthPercentageRecommendedArray = [];
        this.user.results.healthPercentageRecommended = (health / total) * 100;
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.healthInsurancePercentageRecommended = (this.user.expenses.healthInsurance / health) * this.user.results.healthPercentageRecommended);
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.medicationPercentageRecommended = (this.user.expenses.medication / health) * this.user.results.healthPercentageRecommended);
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.unexpectedMedicalProblemsPercentageRecommended = (this.user.expenses.unexpectedMedicalProblems / health) * this.user.results.healthPercentageRecommended);
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.eyeCarePercentageRecommended = (this.user.expenses.eyeCare / health) * this.user.results.healthPercentageRecommended);
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.dentalInsurancePercentageRecommended = (this.user.expenses.dentalInsurance / health) * this.user.results.healthPercentageRecommended);
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.cavitiesPercentageRecommended = (this.user.expenses.cavities / health) * this.user.results.healthPercentageRecommended);
        this.user.results.healthPercentageRecommendedArray.push(this.user.results.bracesPercentageRecommended = (this.user.expenses.braces / health) * this.user.results.healthPercentageRecommended);
    }

    calculateDiscretionaryPercentagesRecommended(discretionary, total) {
        this.user.results.discretionaryPercentageRecommendedArray = [];
        this.user.results.discretionaryPercentageRecommended = (discretionary / total) * 100;
        this.user.results.discretionaryPercentageRecommendedArray.push(this.user.results.eatingOutPercentageRecommended = (this.user.expenses.eatingOut / discretionary) * this.user.results.discretionaryPercentageRecommended);
        this.user.results.discretionaryPercentageRecommendedArray.push(this.user.results.barsPercentageRecommended = (this.user.expenses.bars / discretionary) * this.user.results.discretionaryPercentageRecommended); 
        this.user.results.discretionaryPercentageRecommendedArray.push(this.user.results.funMoneyPercentageRecommended = (this.user.expenses.funMoney / discretionary) * this.user.results.discretionaryPercentageRecommended);
        this.user.results.discretionaryPercentageRecommendedArray.push(this.user.results.otherPercentageRecommended = (this.user.expenses.other / discretionary) * this.user.results.discretionaryPercentageRecommended);
    }
}