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
        this.user.results.advancedAmounts = [];
        this.user.results.homePercentageArray = [];
        this.user.results.homePercentage = (home / total) * 100;

        this.user.results.homePercentageArray.push(this.user.results.mortgagePercentage = (this.user.expenses.mortgage / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.mortgage);

        this.user.results.homePercentageArray.push(this.user.results.propertyTaxPercentage = (this.user.expenses.propertyTax / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.propertyTax);
        
        this.user.results.homePercentageArray.push(this.user.results.phonePercentage = (this.user.expenses.phone / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.phone);

        this.user.results.homePercentageArray.push(this.user.results.internetPercentage = (this.user.expenses.internet / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.internet);

        this.user.results.homePercentageArray.push(this.user.results.cablePercentage = (this.user.expenses.cable / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.cable);

        this.user.results.homePercentageArray.push(this.user.results.netflixPercentage = (this.user.expenses.netfix / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.netfix);

        this.user.results.homePercentageArray.push(this.user.results.groceriesPercentage = (this.user.expenses.groceries / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.groceries);

        this.user.results.homePercentageArray.push(this.user.results.utilitiesPercentage = (this.user.expenses.utilities / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.utilities);

        this.user.results.homePercentageArray.push(this.user.results.homeMaintenancePercentage = (this.user.expenses.homeMaintenance / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.homeMaintenance);

        this.user.results.homePercentageArray.push(this.user.results.clothesPercentage = (this.user.expenses.clothes / home) * this.user.results.homePercentage);
        this.user.results.advancedAmounts.push(this.user.expenses.clothes);
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
        this.user.recommend.homePercentageArray = [];
        this.user.recommend.homePercentage = (home / total) * 100;
        this.user.recommend.homePercentageArray.push(this.user.recommend.mortgagePercentage = (this.user.recommend.mortgage / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.propertyTaxPercentage = (this.user.recommend.propertyTax / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.phonePercentage = (this.user.recommend.phone / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.internetPercentage = (this.user.recommend.internet / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.cablePercentage = (this.user.recommend.cable / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.netflixPercentage = (this.user.recommend.netfix / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.groceriesPercentage = (this.user.recommend.groceries / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.utilitiesPercentage = (this.user.recommend.utilities / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.homeMaintenancePercentage = (this.user.recommend.homeMaintenance / home) * this.user.recommend.homePercentage);
        this.user.recommend.homePercentageArray.push(this.user.recommend.clothesPercentage = (this.user.recommend.clothes / home) * this.user.recommend.homePercentage);
    }

    calculateCarPercentagesRecommended(car, total) {
        this.user.recommend.carPercentageArray = [];
        this.user.recommend.carPercentage = (car / total) * 100;
        this.user.recommend.carPercentageArray.push(this.user.recommend.carPaymentPercentage = (this.user.recommend.carPayment / car) * this.user.recommend.carPercentage);
        this.user.recommend.carPercentageArray.push(this.user.recommend.carInsurancePercentage = (this.user.recommend.carInsurance / car) * this.user.recommend.carPercentage);
        this.user.recommend.carPercentageArray.push(this.user.recommend.publicTransportPercentage = (this.user.recommend.publicTransport / car) * this.user.recommend.carPercentage);
        this.user.recommend.carPercentageArray.push(this.user.recommend.gasPercentage = (this.user.recommend.gas / car) * this.user.recommend.carPercentage);
        this.user.recommend.carPercentageArray.push(this.user.recommend.carMaintenancePercentage = (this.user.recommend.carMaintenance / car) * this.user.recommend.carPercentage);
    }

    calculateHealthPercentagesRecommended(health, total) {
        this.user.recommend.healthPercentageArray = [];
        this.user.recommend.healthPercentage = (health / total) * 100;
        this.user.recommend.healthPercentageArray.push(this.user.recommend.healthInsurancePercentage = (this.user.recommend.healthInsurance / health) * this.user.recommend.healthPercentage);
        this.user.recommend.healthPercentageArray.push(this.user.recommend.medicationPercentage = (this.user.recommend.medication / health) * this.user.recommend.healthPercentage);
        this.user.recommend.healthPercentageArray.push(this.user.recommend.unexpectedMedicalProblemsPercentage = (this.user.recommend.unexpectedMedicalProblems / health) * this.user.recommend.healthPercentage);
        this.user.recommend.healthPercentageArray.push(this.user.recommend.eyeCarePercentage = (this.user.recommend.eyeCare / health) * this.user.recommend.healthPercentage);
        this.user.recommend.healthPercentageArray.push(this.user.recommend.dentalInsurancePercentage = (this.user.recommend.dentalInsurance / health) * this.user.recommend.healthPercentage);
        this.user.recommend.healthPercentageArray.push(this.user.recommend.cavitiesPercentage = (this.user.recommend.cavities / health) * this.user.recommend.healthPercentage);
        this.user.recommend.healthPercentageArray.push(this.user.recommend.bracesPercentage = (this.user.recommend.braces / health) * this.user.recommend.healthPercentage);
    }

    calculateDiscretionaryPercentagesRecommended(discretionary, total) {
        this.user.recommend.discretionaryPercentageArray = [];
        this.user.recommend.discretionaryPercentage = (discretionary / total) * 100;
        this.user.recommend.discretionaryPercentageArray.push(this.user.recommend.eatingOutPercentage = (this.user.recommend.eatingOut / discretionary) * this.user.recommend.discretionaryPercentage);
        this.user.recommend.discretionaryPercentageArray.push(this.user.recommend.barsPercentage = (this.user.recommend.bars / discretionary) * this.user.recommend.discretionaryPercentage); 
        this.user.recommend.discretionaryPercentageArray.push(this.user.recommend.funMoneyPercentage = (this.user.recommend.funMoney / discretionary) * this.user.recommend.discretionaryPercentage);
        this.user.recommend.discretionaryPercentageArray.push(this.user.recommend.otherPercentage = (this.user.recommend.other / discretionary) * this.user.recommend.discretionaryPercentage);
    }
}