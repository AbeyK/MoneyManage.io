import {App} from '../../src/app';
import {User} from '../../src/services/user';

// describe('the app', () => {
//   it('says hello', () => {
//     expect(new App().message).toBe('Hello World!');
//   });
// });

describe('Personal Info tests:', () => {
    var user = new User();
    
    //Sets up the client data before each test
    beforeEach(() => {
        //AGES
        user.personalInfo.age = 30;

        //INCOME
        user.personalInfo.income = 10000;

        //SAVINGS
        user.personalInfo.savingsPerMonth = 1000;

        //HOUSEHOLD SIZE
        user.personalInfo.householdSize = 1;
        
        //SIZE OF HOME
        user.personalInfo.squareFootHome = 300;

        //WISHES
        user.personalInfo.currentGoals = ["Boat", "Other"];
    });

    //BMI
    it('Age should be 30', () => {
        expect(user.personalInfo.age).toBe(30);
    })
});
