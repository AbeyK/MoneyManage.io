export class PersonalInfoData {
    constructor() {
        this.age = 50;
        this.income = 0;
        this.savingsPerMonth = 0;
        this.householdSize = 1;
        this.squareFootHome = 0;

        this.validIncome = true;
        this.validSavings = true;
        this.validHouseholdSize = true;
        this.validHomeSize = true;

        this.goalsList=["Private School", "College", "Wedding", "Vacation",
            "Boat", "New Car", "Other"];
        this.checkSchool = false;
        this.PrivateSchool = 0;
        this.rankPrivateSchool = 0;

        this.checkCollege = false;
        this.College = 0;
        this.rankCollege = 0;

        this.checkWedding = false;
        this.Wedding = 0;
        this.rankWedding = 0;

        this.checkVacation = false;
        this.Vacation = 0;
        this.rankVacation = 0;

        this.checkBoat = false;
        this.Boat = 0;
        this.rankBoat = 0;

        this.checkCar = false;
        this.NewCar = 0;
        this.rankNewCar = 0;

        this.checkOther = false;
        this.Other = 0;
        this.rankOther = 0;
        
        this.currentGoals = [];
    }
}