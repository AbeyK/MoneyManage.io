export class PersonalInfoData {
    constructor() {
        this.age = 30;
        this.income = 0;

        this.goalsList=["Private School", "College", "Wedding", "Vacation",
            "Boat", "New Car", "Other"];
        this.checkSchool = false;
        this.privateSchool = 0;

        this.checkCollege = false;
        this.college = 0;

        this.checkWedding = false;
        this.wedding = 0;

        this.checkVacation = false;
        this.vacation = 0;

        this.checkBoat = false;
        this.boat = 0;

        this.checkCar = false;
        this.newCar = 0;

        this.checkOther = false;
        this.other = 0;
        
        this.currentGoals = [];
    }
}