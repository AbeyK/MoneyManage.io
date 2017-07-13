import {inject} from 'aurelia-framework';
import {User} from '../services/user';

@inject(User)
export class calculateExpenses {
    constructor(user) {
        this.user = user;
    }
    homeExpenses(){
        var tempHomeTotal = 
        parseInt(this.user.expenses.mortgage) + parseInt(this.user.expenses.propertTax) +
        parseInt(this.user.expenses.phone) + parseInt(this.user.expenses.internet) +        
        parseInt(this.user.expenses.cable) + parseInt(this.user.expenses.netfix) +
        parseInt(this.user.expenses.groceries) + parseInt(this.user.expenses.utilities) +
        parseInt(this.user.expenses.homeMaintenance) + parseInt(this.user.expenses.clothes);
        console.log(tempHomeTotal);
        if(isNaN(tempHomeTotal)){
            alert("Please input a number");
        }else{
            this.user.expenses.totalHomeExpense = tempHomeTotal;
        }
    }
    carExpenses(val){
        this.user.expenses.totalCarExpense+=parseInt(val);

    }
    healthExpenses(val){
        this.user.expenses.totalHealthExpense+=parseInt(val);

    }
    discretionaryExpenses(val){
        this.user.expenses.totalDiscretionaryExpense+=parseInt(val);
    }
}