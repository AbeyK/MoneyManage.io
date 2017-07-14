import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class calculateExpenses {
    constructor(user) {
        this.user = user;
    }
    
    homeExpenses(){
        var tempHomeTotal = 
            parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertyTax) +
            parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) +        
            parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.netfix) +
            parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) +
            parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes);

        if(isNaN(tempHomeTotal)) alert("Please enter a valid input");
        else this.user.expenses.totalHomeExpense = tempHomeTotal;
    }

    carExpenses(val){
        var tempCarTotal = 
            parseInt(this.user.expenses.carPayment) + parseInt(this.user.expenses.carInsurance) +
            parseInt(this.user.expenses.publicTransport) + parseInt(this.user.expenses.gas) +        
            parseInt(this.user.expenses.carMaintenance);

        if(isNaN(tempCarTotal)) alert("Please enter a valid input");
        else this.user.expenses.totalCarExpense = tempCarTotal;
    }

    healthExpenses(val){
        var tempHealthTotal = 
            parseInt(this.user.expenses.healthInsurance) + parseInt(this.user.expenses.medication) +
            parseInt(this.user.expenses.unexpectedMedicalProblems) + parseInt(this.user.expenses.dentalInsurance) +        
            parseInt(this.user.expenses.cavities) + parseInt(this.user.expenses.eyeCare) +        
            parseInt(this.user.expenses.braces);

        if(isNaN(tempHealthTotal)) alert("Please enter a valid input");
        else this.user.expenses.totalHealthExpense = tempHealthTotal;
    }

    discretionaryExpenses(val){
        var tempDiscretionaryTotal = 
            parseInt(this.user.expenses.eatingOut) + parseInt(this.user.expenses.bars) +
            parseInt(this.user.expenses.funMoney) + parseInt(this.user.expenses.other);

        if(isNaN(tempDiscretionaryTotal)) alert("Please enter a valid input");
        else this.user.expenses.totalDiscretionaryExpense = tempDiscretionaryTotal; 
    }
}