import {User} from '../../../src/services/user';
import {calculateExpenses} from '../../../src/utilities/calculateExpenses';

//TEST EXPENSES
describe('Expenses tests:', () => {
    var user = new User();
    var calculateExpense = new calculateExpenses();
    
    //Sets up the client data before each test
    beforeEach(() => {
        //EXPENSES
        user.expenses.mortgage = 300;
        user.expenses.propertyTax = 100;
        user.expenses.phone = 100;
        user.expenses.internet = 200;
        user.expenses.cable = 350;
        user.expenses.netflix = 15;
        user.expenses.groceries = 400;
        user.expenses.utilities = 250;
        user.expenses.homeMaintenance = 500;
        user.expenses.clothes = 1000;
    });

    //HOME EXPENSE TOTAL
    it('Mortgage expense should be 300', () => {
        expect(user.expenses.mortgage).toBe(300);
    })

    //HOME EXPENSE TOTAL
    it('Total home expenses should be 3215', () => {
        calculateExpense.homeExpenses();
        expect(user.expenses.totalHomeExpense).toBe(3215);
    })
});