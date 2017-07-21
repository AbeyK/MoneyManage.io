export class RecommendedData {
    constructor() {
        this.totalExpense = 0;
        this.totalHomeExpense = 0;
        this.totalCarExpense = 0;
        this.totalHealthExpense = 0;
        this.totalDiscretionaryExpense = 0;

        //HOME
        this.mortgage = 0;
        this.propertyTax = 0;
        this.homeownerInsurance = 0;
        this.phone = 0;
        this.internet = 0;
        this.cable = 0;
        this.netfix = 0;
        this.groceries = 0;
        this.utilities = 0;
        this.homeMaintenance = 0;
        this.clothes = 0;

        //CAR
        this.carPayment = 0;
        this.carInsurance = 0;
        this.publicTransport = 0;
        this.gas = 0;
        this.carMaintenance = 0;

        //HEALTH
        this.healthInsurance = 0;
        this.medication = 0;
        this.unexpectedMedicalProblems = 0;
        this.eyeCare = 0;
        this.dentalInsurance = 0;
        this.cavities = 0;
        this.braces = 0;

        //DISCRETIONARY
        this.eatingOut = 0;
        this.bars = 0;
        this.funMoney = 0;
        this.other = 0;
        
        
        //HOME PERCENTAGES
        this.homePercentage = 0;
        this.mortgagePercentage = 0;
        this.propertyTaxPercentage = 0;
        this.phonePercentage = 0;
        this.internetPercentage = 0;
        this.cablePercentage = 0;
        this.netflixPercentage = 0;
        this.groceriesPercentage = 0;
        this.utilitiesPercentage = 0;
        this.homeMaintenancePercentage = 0;
        this.clothesPercentage = 0;
        this.homePercentageArray = [];

        //CAR PERCENTAGES
        this.carPercentage = 0;
        this.carPaymentPercentage = 0;
        this.carInsurancePercentage = 0;
        this.publicTransportPercentage = 0;
        this.gasPercentage = 0;
        this.carMaintenancePercentage = 0;
        this.carPercentageArray = [];

        //HEALTH PERCENTAGES
        this.healthPercentage = 0;
        this.healthInsurancePercentage = 0;
        this.medicationPercentage = 0;
        this.unexpectedMedicalProblemsPercentage = 0;
        this.eyeCarePercentage = 0;
        this.dentalInsurancePercentage = 0;
        this.cavitiesPercentage = 0;
        this.bracesPercentage = 0;
        this.healthPercentageArray = [];

        //DISCRETIONARY PERCENTAGES
        this.discretionaryPercentage = 0;
        this.eatingOutPercentage = 0;
        this.barsPercentage = 0; 
        this.funMoneyPercentage = 0;
        this.otherPercentage = 0;
        this.discretionaryPercentageArray = [];
    }
}