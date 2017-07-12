export class PersonalInfoData {
    constructor() {
        this.age = 30;
        this.income = 0;

        this.goalsList=["Private School", "College", "Wedding", "Vacation",
            "Boat", "New Car", "Other"];
        this.checkSchool = false;
        this.checkCollege = false;
        this.checkWedding = false;
        this.checkVacation = false;
        this.checkBoat = false;
        this.checkCar = false;
        this.checkOther = false;
        
        this.currentGoals = [];
    }
}