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

        //CAR EXPENSES
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
    }
}