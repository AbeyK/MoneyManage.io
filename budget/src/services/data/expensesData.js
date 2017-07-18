export class ExpensesData {
    constructor() {
        //TOTALS
        this.totalExpense = 0;
        this.totalHomeExpense = 0;
        this.totalCarExpense = 0;
        this.totalHealthExpense = 0;
        this.totalDiscretionaryExpense = 0;

        //HOME EXPENSES
        this.mortgage = 0;
        this.propertyTax = 0;
        this.phone = 0;
        this.internet = 0;
        this.cable = 0;
        this.netfix = 0;
        this.groceries = 0;
        this.utilities = 0;
        this.homeMaintenance = 0;
        this.clothes = 0;

        this.mortgagecheck = true;
        this.propertyTaxcheck = true;
        this.phonecheck = true;
        this.internetcheck = true;
        this.cablecheck = true;
        this.netfixcheck = true;
        this.groceriescheck = true;
        this.utilitiescheck = true;
        this.homeMaintenancecheck = true;
        this.clothescheck = true;

        this.mortgagelock = true;
        this.propertyTaxlock = true;
        this.phonelock = true;
        this.internetlock = true;
        this.cablelock = true;
        this.netfixlock = true;
        this.grocerieslock = true;
        this.utilitieslock = true;
        this.homeMaintenancelock = true;
        this.clotheslock = true;

        
        //CAR EXPENSES
        this.carPayment = 0;
        this.carInsurance = 0;
        this.publicTransport = 0;
        this.gas = 0;
        this.carMaintenance = 0;

        this.carPaymentcheck = true;
        this.carInsurancecheck = true;
        this.publicTransportcheck = true;
        this.gascheck = true;
        this.carMaintenancecheck = true;

        this.carPaymentlock = true;
        this.carInsurancelock = true;
        this.publicTransportlock = true;
        this.gaslock = true;
        this.carMaintenancelock = true;

        //HEALTH
        this.healthInsurance = 0;
        this.medication = 0;
        this.unexpectedMedicalProblems = 0;
        this.eyeCare = 0;
        this.dentalInsurance = 0;
        this.cavities = 0;
        this.braces = 0;

        this.healthInsurancecheck = true;
        this.medicationcheck = true;
        this.unexpectedMedicalProblemscheck = true;
        this.eyeCarecheck = true;
        this.dentalInsurancecheck = true;
        this.cavitiescheck = true;
        this.bracescheck = true;


        this.healthInsurancelock = true;
        this.medicationlock = true;
        this.unexpectedMedicalProblemslock = true;
        this.eyeCarelock = true;
        this.dentalInsurancelock = true;
        this.cavitieslock = true;
        this.braceslock = true;

        //DISCRETIONARY
        this.eatingOut = 0;
        this.bars = 0;
        this.funMoney = 0;
        this.other = 0;

        this.eatingOutcheck = true;
        this.barscheck = true;
        this.funMoneycheck = true;
        this.othercheck = true;

        this.eatingOutlock = true;
        this.barslock = true;
        this.funMoneylock = true;
        this.otherlock = true;
    }
}