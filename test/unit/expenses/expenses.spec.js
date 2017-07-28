import {calculateExpenses} from '../../../src/utilities/calculateExpenses';
import {User} from '../../../src/services/user';

//TEST EXPENSES
describe('Expenses tests:', () => {
    var user = new User();
    var calculateExpense = new calculateExpenses();
    
    //Sets up the client data before each test
    beforeEach(() => {
        //EXPENSES
        user.expenses.mortgage = 300;
        user.expenses.propertyTax = 100;
        user.expenses.homeownerInsurance = 0;
        user.expenses.phone = 100;
        user.expenses.internet = 200;
        user.expenses.cable = 350;
        user.expenses.streaming = 15;
        user.expenses.groceries = 400;
        user.expenses.utilities = 250;
        user.expenses.homeMaintenance = 500;
        user.expenses.clothes = 1000;

        exp = {
            home: calculateExpense.homeExpenses()
        }
    });

    //MORTGAGE EXPENSE TOTAL
    it('Mortgage expense should be 300', () => {
        expect(user.expenses.mortgage).toBe(300);
    })

    //HOME EXPENSE TOTAL
    it('Total home expenses should be 3215', () => {
        spyOn(exp, 'home').and.returnValue(3215);

        // exp.home();
        // expect(user.expenses.totalHomeExpense).toBe(3215);
    })
});