export class PersonalInfoData {
    constructor() {
        this.age = 30;
        this.income = 0;

        this.goalsList=["Private School", "College", "Wedding", "Vacation",
            "Boat", "New Car", "Other"];
        this.checkSchool = false;
        this.PrivateSchool = 0;

        this.checkCollege = false;
        this.College = 0;

        this.checkWedding = false;
        this.Wedding = 0;

        this.checkVacation = false;
        this.Vacation = 0;

        this.checkBoat = false;
        this.Boat = 0;

        this.checkCar = false;
        this.NewCar = 0;

        this.checkOther = false;
        this.Other = 0;
        
        this.currentGoals = [];
    }
}